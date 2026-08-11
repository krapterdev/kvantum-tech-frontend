import { RoutePlan } from './QueryRouter';
import { StructuredDataResult } from './DatabaseResolver';
import { RAGChunkResult } from '../search/SearchEngine';
import { Entities } from './EntityEngine';

export interface FusedContext {
  intent: string;
  entities: Entities;
  routePlan: RoutePlan;
  dbResult?: StructuredDataResult | null;
  ragChunks: RAGChunkResult[];
  ragSnippet: string;
  topScore: number;
  history: Array<{ role: 'user' | 'bot'; content: string }>;
}

export class ContextBuilder {
  /**
   * Combines Structured DB Result + Hybrid RAG Chunks + User Entities into a single context object.
   */
  build(
    intent: string,
    entities: Entities,
    routePlan: RoutePlan,
    dbResult: StructuredDataResult | null,
    ragChunks: RAGChunkResult[],
    history: any[] = []
  ): FusedContext {
    const ragSnippet = ragChunks
      .slice(0, 3)
      .map(c => `[${c.title}]: ${c.content}`)
      .join('\n\n');

    const topScore = Math.max(
      dbResult ? 0.9 : 0,
      ragChunks[0]?.score ?? 0
    );

    return {
      intent,
      entities,
      routePlan,
      dbResult,
      ragChunks,
      ragSnippet,
      topScore,
      history,
    };
  }
}
