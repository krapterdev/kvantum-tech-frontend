import { chatbotQuery, chatbotQueryOne } from '../database/db';
import { Entities } from './EntityEngine';

export interface ConversationContext {
  sessionId: string;
  lastIntent: string;
  entities: Entities;
  turnCount: number;
  history: Array<{ role: 'user' | 'bot'; content: string; intent?: string }>;
}

export class ContextEngine {
  private maxHistory = 8;

  /**
   * Load context from DB for a session
   */
  async load(sessionId: string): Promise<ConversationContext> {
    // Load context row
    const ctx = await chatbotQueryOne<any>(
      `SELECT entities, last_intent, turn_count FROM chat_context WHERE session_id = $1`,
      [sessionId]
    );

    // Load recent messages
    const msgs = await chatbotQuery<any>(
      `SELECT role, content, intent FROM chat_messages
       WHERE session_id = $1
       ORDER BY created_at DESC LIMIT $2`,
      [sessionId, this.maxHistory]
    );

    return {
      sessionId,
      lastIntent: ctx?.last_intent ?? '',
      entities: ctx?.entities ?? {},
      turnCount: ctx?.turn_count ?? 0,
      history: msgs.reverse(),
    };
  }

  /**
   * Merge new entities with existing context entities (carry forward)
   */
  mergeEntities(existing: Entities, fresh: Entities): Entities {
    return { ...existing, ...Object.fromEntries(
      Object.entries(fresh).filter(([, v]) => v !== undefined)
    )};
  }

  /**
   * Resolve ambiguous follow-up messages using previous context
   * E.g. "Aur ecommerce?" → carry forward pricing intent + add ecommerce service
   */
  resolve(message: string, context: ConversationContext): { intent?: string; entities?: Entities } {
    const lower = message.toLowerCase().trim();
    const resolved: { intent?: string; entities?: Entities } = {};

    // Short follow-up patterns
    const isShortFollowup = message.split(/\s+/).length <= 4;

    if (isShortFollowup && context.lastIntent) {
      // Carry forward last intent for short messages
      resolved.intent = context.lastIntent;
    }

    // If previous had entities, merge
    if (Object.keys(context.entities).length > 0) {
      resolved.entities = { ...context.entities };
    }

    // "Aur X?" patterns — resolve as pricing/detail of X
    const aurMatch = lower.match(/^(?:aur|aur bhi|or|and|what about|aur kya)\s+(.+?)\??$/);
    if (aurMatch && context.lastIntent) {
      resolved.intent = context.lastIntent;
    }

    return resolved;
  }

  /**
   * Save updated context to DB
   */
  async save(sessionId: string, intent: string, entities: Entities, turnCount: number): Promise<void> {
    try {
      await chatbotQuery(
        `INSERT INTO chat_context (session_id, last_intent, entities, turn_count, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (session_id) DO UPDATE SET
           last_intent = EXCLUDED.last_intent,
           entities = EXCLUDED.entities,
           turn_count = EXCLUDED.turn_count,
           updated_at = NOW()`,
        [sessionId, intent, JSON.stringify(entities), turnCount]
      );
    } catch (e) {
      // Non-critical — context is best-effort
      console.warn('[CONTEXT] Save failed:', e);
    }
  }

  /**
   * Save a single message to chat_messages
   */
  async saveMessage(
    sessionId: string,
    role: 'user' | 'bot',
    content: string,
    intent?: string,
    confidence?: number,
    entities?: Entities
  ): Promise<string | null> {
    try {
      const rows = await chatbotQuery<{ id: string }>(
        `INSERT INTO chat_messages (session_id, role, content, intent, confidence, entities)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [sessionId, role, content, intent ?? null, confidence ?? null, JSON.stringify(entities ?? {})]
      );
      return rows[0]?.id ?? null;
    } catch (e) {
      console.warn('[CONTEXT] Message save failed:', e);
      return null;
    }
  }

  /**
   * Get or create a chat session
   */
  async getOrCreateSession(sessionKey: string, ip?: string): Promise<string> {
    const existing = await chatbotQueryOne<{ id: string }>(
      `SELECT id FROM chat_sessions WHERE session_key = $1`,
      [sessionKey]
    );
    if (existing) {
      await chatbotQuery(
        `UPDATE chat_sessions SET last_active = NOW(), message_count = message_count + 1 WHERE id = $1`,
        [existing.id]
      );
      return existing.id;
    }

    const created = await chatbotQueryOne<{ id: string }>(
      `INSERT INTO chat_sessions (session_key, ip_address)
       VALUES ($1, $2) RETURNING id`,
      [sessionKey, ip ?? null]
    );
    return created!.id;
  }
}
