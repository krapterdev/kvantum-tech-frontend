/**
 * ChatEngine — Master Architecture Orchestrator
 * Pipeline: NLP → Intent → Entity → Context → Query Router → (Structured DB + Hybrid RAG) → Context Builder → Response Engine → Persist
 */

import { IntentEngine } from './IntentEngine';
import { EntityEngine, Entities } from './EntityEngine';
import { ContextEngine } from './ContextEngine';
import { QueryRouter } from './QueryRouter';
import { DatabaseResolver } from './DatabaseResolver';
import { SearchEngine, RAGChunkResult } from '../search/SearchEngine';
import { ContextBuilder } from './ContextBuilder';
import { ResponseEngine, assessConfidence, GeneratedResponse } from './ResponseEngine';
import { chatbotQuery } from '../database/db';

import { Language } from '../config/responses';

export interface ChatRequest {
  message: string;
  sessionKey: string;
  language?: Language;
  ip?: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  sessionKey: string;
  intent: string;
  confidence: number;
  quickReplies: string[];
  messageId?: string;
  needsLead?: boolean;
}

const intentEngine     = new IntentEngine();
const entityEngine     = new EntityEngine();
const contextEngine    = new ContextEngine();
const queryRouter      = new QueryRouter();
const databaseResolver = new DatabaseResolver();
const searchEngine     = new SearchEngine();
const contextBuilder   = new ContextBuilder();
const responseEngine   = new ResponseEngine();

const LEAD_TRIGGER_INTENTS = new Set(['booking', 'quotation', 'human_agent', 'lead']);

export async function processChat(req: ChatRequest): Promise<ChatResponse> {
  const { message, sessionKey, language = 'hinglish', ip } = req;

  // 1. Get or create chat session
  let sessionId: string;
  try {
    sessionId = await contextEngine.getOrCreateSession(sessionKey, ip);
  } catch (e) {
    sessionId = `tmp_${sessionKey}`;
  }

  // 2. Load conversation context
  let context;
  try {
    context = await contextEngine.load(sessionId);
  } catch (e) {
    context = { sessionId, lastIntent: '', entities: {}, turnCount: 0, history: [] };
  }

  // 3. Resolve follow-up queries using context memory
  const ctxResolved = contextEngine.resolve(message, context);

  // 4. Intent Detection
  const intentResult = intentEngine.detect(message, ctxResolved.intent ?? context.lastIntent);
  const finalIntent = intentResult.intent;

  // 5. Entity Extraction & Context Merge
  const freshEntities = entityEngine.extract(message);
  const mergedEntities: Entities = contextEngine.mergeEntities(
    ctxResolved.entities ?? context.entities,
    freshEntities
  );

  // 6. Query Router — decides execution path (Structured DB vs Hybrid RAG vs Both)
  const routePlan = queryRouter.route(finalIntent, mergedEntities, message);

  // 7. Structured DB Resolver (Live Data: Pricing, Contact, Services)
  let dbResult = null;
  if (routePlan.needsDb) {
    try {
      dbResult = await databaseResolver.resolve(finalIntent, mergedEntities);
    } catch (e) {
      console.warn('[CHAT ENGINE] DB Resolver error:', e);
    }
  }

  // 8. Hybrid RAG Search (Unstructured Knowledge: About, Services Features, Blogs, FAQs)
  let ragChunks: RAGChunkResult[] = [];
  if (routePlan.needsRag) {
    try {
      ragChunks = await searchEngine.search(message, 5, mergedEntities);
    } catch (e) {
      console.warn('[CHAT ENGINE] Hybrid RAG error:', e);
    }
  }

  // 9. Context Builder — Fuses DB data + RAG chunks + Entities + History into unified context
  const fusedContext = contextBuilder.build(
    finalIntent,
    mergedEntities,
    routePlan,
    dbResult,
    ragChunks,
    context.history
  );

  // 10. Assess Confidence
  const confidence = assessConfidence(intentResult.confidence, fusedContext.topScore);

  // 11. Generate Response via Context Synthesis
  const generated: GeneratedResponse = responseEngine.generate(fusedContext, confidence, language);

  // 12. Log low confidence queries for admin training
  if (confidence.level === 'fallback' && message.trim().length > 3) {
    logUnanswered(message, confidence.confidence).catch(() => null);
  }

  // 13. Persist turn in database
  let botMsgId: string | null = null;
  try {
    await contextEngine.saveMessage(sessionId, 'user', message, finalIntent, confidence.confidence, mergedEntities);
    botMsgId = await contextEngine.saveMessage(sessionId, 'bot', generated.text, finalIntent, confidence.confidence);
    await contextEngine.save(sessionId, finalIntent, mergedEntities, context.turnCount + 1);
  } catch (e) {
    console.warn('[CHAT ENGINE] Persistence error:', e);
  }

  return {
    reply: generated.text,
    sessionId,
    sessionKey,
    intent: finalIntent,
    confidence: confidence.confidence,
    quickReplies: generated.quickReplies,
    messageId: botMsgId ?? undefined,
    needsLead: LEAD_TRIGGER_INTENTS.has(finalIntent) || routePlan.needsLeadForm,
  };
}

async function logUnanswered(question: string, confidence: number): Promise<void> {
  const normalized = question.toLowerCase().trim().slice(0, 256);
  await chatbotQuery(
    `INSERT INTO chat_unanswered (question, normalized, confidence, last_asked)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (normalized) DO UPDATE SET
       frequency = chat_unanswered.frequency + 1,
       last_asked = NOW(),
       confidence = EXCLUDED.confidence
     `,
    [question.slice(0, 512), normalized, confidence]
  ).catch(() => null);
}

export async function saveChatLead(sessionId: string, leadData: {
  name?: string; phone?: string; email?: string;
  service?: string; budget?: string; requirement?: string;
}): Promise<boolean> {
  try {
    await chatbotQuery(
      `INSERT INTO chat_leads (session_id, name, phone, email, service, budget, requirement)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [sessionId, leadData.name, leadData.phone, leadData.email,
       leadData.service, leadData.budget, leadData.requirement]
    );
    return true;
  } catch (e) {
    console.warn('[CHAT ENGINE] Lead save failed:', e);
    return false;
  }
}
