/**
 * ChatEngine — main orchestrator
 * Coordinates: NLP → Intent → Entity → Context → Search → Rank → Confidence → Response → Persist
 */

import { IntentEngine } from './IntentEngine';
import { EntityEngine, Entities } from './EntityEngine';
import { ContextEngine } from './ContextEngine';
import { SearchEngine } from '../search/SearchEngine';
import { ResponseEngine, assessConfidence, GeneratedResponse } from './ResponseEngine';
import { chatbotQuery } from '../database/db';

export interface ChatRequest {
  message: string;
  sessionKey: string;
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

const intentEngine   = new IntentEngine();
const entityEngine   = new EntityEngine();
const contextEngine  = new ContextEngine();
const searchEngine   = new SearchEngine();
const responseEngine = new ResponseEngine();

// Intents that should trigger lead form
const LEAD_TRIGGER_INTENTS = new Set(['booking', 'quotation', 'human_agent', 'lead']);

export async function processChat(req: ChatRequest): Promise<ChatResponse> {
  const { message, sessionKey, ip } = req;

  // 1. Get/create session
  let sessionId: string;
  try {
    sessionId = await contextEngine.getOrCreateSession(sessionKey, ip);
  } catch (e) {
    // DB not available — generate temp session ID
    sessionId = `tmp_${sessionKey}`;
  }

  // 2. Load conversation context
  let context;
  try {
    context = await contextEngine.load(sessionId);
  } catch (e) {
    context = { sessionId, lastIntent: '', entities: {}, turnCount: 0, history: [] };
  }

  // 3. Context resolution — handle follow-ups
  const ctxResolved = contextEngine.resolve(message, context);

  // 4. Intent detection
  const intentResult = intentEngine.detect(message, ctxResolved.intent ?? context.lastIntent);
  const finalIntent = intentResult.intent;

  // 5. Entity extraction + context merge
  const freshEntities = entityEngine.extract(message);
  const mergedEntities: Entities = contextEngine.mergeEntities(
    ctxResolved.entities ?? context.entities,
    freshEntities
  );

  // 6. Search relevant knowledge
  let searchResults: import('../search/SearchEngine').SearchResult[] = [];
  try {
    searchResults = await searchEngine.search(message, 5);
  } catch (e) {
    // Non-critical — continue without search results
    console.warn('[CHAT ENGINE] Search failed:', e);
  }

  // 7. Assess confidence
  const topSearchScore = searchResults[0]?.score ?? 0;
  const confidence = assessConfidence(intentResult.confidence, topSearchScore);

  // 8. Generate response
  const generated: GeneratedResponse = responseEngine.generate(
    finalIntent,
    confidence,
    searchResults,
    mergedEntities,
    context.history,
  );

  // 9. Log unanswered questions if confidence is very low
  if (confidence.level === 'fallback' && message.trim().length > 3) {
    logUnanswered(message, confidence.confidence).catch(() => null);
  }

  // 10. Persist messages and context
  let botMsgId: string | null = null;
  try {
    await contextEngine.saveMessage(sessionId, 'user', message, finalIntent, confidence.confidence, mergedEntities);
    botMsgId = await contextEngine.saveMessage(sessionId, 'bot', generated.text, finalIntent, confidence.confidence);
    await contextEngine.save(sessionId, finalIntent, mergedEntities, context.turnCount + 1);
  } catch (e) {
    console.warn('[CHAT ENGINE] Persistence failed (non-critical):', e);
  }

  return {
    reply: generated.text,
    sessionId,
    sessionKey,
    intent: finalIntent,
    confidence: confidence.confidence,
    quickReplies: generated.quickReplies,
    messageId: botMsgId ?? undefined,
    needsLead: LEAD_TRIGGER_INTENTS.has(finalIntent),
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

/**
 * Save lead from chat
 */
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
