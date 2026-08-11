import { chatbotQuery } from '../database/db';
import { normalize } from '../nlp/Normalizer';
import { tokenize } from '../nlp/Tokenizer';
import { removeStopWords } from '../nlp/StopWords';
import { stemTokens } from '../nlp/Stemmer';
import { expandWithSynonyms } from '../nlp/Synonyms';
import { termFrequency, tfidfVector, cosineSimilarity, TermFreqMap } from './TFIDF';
import { Entities } from '../engine/EntityEngine';

export interface RAGChunkResult {
  id: string;
  source_type: string;
  title: string;
  content: string;
  score: number;
  keywords?: string[];
}

export interface HybridRAGResult {
  chunks: RAGChunkResult[];
  topScore: number;
  contextSnippet: string;
}

export class SearchEngine {
  /**
   * Hybrid RAG Retrieval Engine:
   * 1. PostgreSQL Full Text Search (BM25 / tsvector ranking)
   * 2. Synonym expansion & Stemming
   * 3. TF-IDF vector similarity re-ranking
   * 4. Entity match boosting
   */
  async search(rawQuery: string, limit = 5, entities?: Entities): Promise<RAGChunkResult[]> {
    const res = await this.retrieveHybridRAG(rawQuery, limit, entities);
    return res.chunks;
  }

  async retrieveHybridRAG(rawQuery: string, limit = 5, entities?: Entities): Promise<HybridRAGResult> {
    const normalized = normalize(rawQuery);
    const tokens = removeStopWords(tokenize(normalized));
    const stemmed = stemTokens(tokens);
    const expanded = expandWithSynonyms([...tokens, ...stemmed]);
    const tsQuery = expanded.filter(t => t.length > 2).slice(0, 10).join(' | ');

    if (!tsQuery && tokens.length === 0) {
      return { chunks: [], topScore: 0, contextSnippet: '' };
    }

    let chunks: any[] = [];
    let faqs: any[] = [];

    // 1. PostgreSQL FTS on knowledge_chunks
    try {
      chunks = await chatbotQuery<any>(
        `SELECT id, source_type, title, content, keywords,
                ts_rank(search_vec, to_tsquery('english', $1)) as pg_rank
         FROM knowledge_chunks
         WHERE search_vec @@ to_tsquery('english', $1)
           AND status = 'active'
         ORDER BY pg_rank DESC
         LIMIT 20`,
        [tsQuery || 'kvantum']
      );
    } catch (e) {
      // Fallback: ILIKE search
      const likeQuery = `%${tokens.slice(0, 3).join('%')}%`;
      chunks = await chatbotQuery<any>(
        `SELECT id, source_type, title, content, keywords, 0 as pg_rank
         FROM knowledge_chunks
         WHERE (title ILIKE $1 OR content ILIKE $1)
           AND status = 'active'
         LIMIT 20`,
        [likeQuery]
      ).catch(() => []);
    }

    // 2. PostgreSQL FTS on chat_faqs
    try {
      faqs = await chatbotQuery<any>(
        `SELECT id, 'faq' as source_type, question as title, answer as content, keywords,
                ts_rank(search_vec, to_tsquery('english', $1)) as pg_rank
         FROM chat_faqs
         WHERE search_vec @@ to_tsquery('english', $1)
           AND status = 'active'
         ORDER BY pg_rank DESC
         LIMIT 10`,
        [tsQuery || 'kvantum']
      );
    } catch (e) {
      faqs = await chatbotQuery<any>(
        `SELECT id, 'faq' as source_type, question as title, answer as content, keywords, 0 as pg_rank
         FROM chat_faqs
         WHERE (question ILIKE $1 OR answer ILIKE $1) AND status = 'active'
         LIMIT 10`,
        [`%${tokens.slice(0, 2).join('%')}%`]
      ).catch(() => []);
    }

    const allResults = [...faqs, ...chunks];
    if (allResults.length === 0) {
      return { chunks: [], topScore: 0, contextSnippet: '' };
    }

    // 3. TF-IDF + Hybrid scoring
    const queryTF = termFrequency([...tokens, ...stemmed]);

    const corpus: TermFreqMap[] = allResults.map(r =>
      termFrequency(removeStopWords(tokenize(normalize(r.title + ' ' + r.content))))
    );

    const idf = new Map<string, number>();
    for (const t of tokens) idf.set(t, 1.5);

    const queryVec = tfidfVector(queryTF, idf);

    const targetService = entities?.service?.toLowerCase();

    const scored: RAGChunkResult[] = allResults.map((r, i) => {
      const docVec = tfidfVector(corpus[i], idf);
      let score = cosineSimilarity(queryVec, docVec);

      // FTS rank boost
      score += (r.pg_rank ?? 0) * 0.3;

      // FAQ boost
      if (r.source_type === 'faq') score += 0.15;

      // Entity match boost
      if (targetService) {
        const titleLower = r.title.toLowerCase();
        const contentLower = r.content.toLowerCase();
        const servName = targetService.replace(/_/g, ' ');
        if (titleLower.includes(targetService) || titleLower.includes(servName)) {
          score += 0.35;
        } else if (contentLower.includes(targetService) || contentLower.includes(servName)) {
          score += 0.20;
        }
      }

      return {
        id: r.id,
        source_type: r.source_type,
        title: r.title,
        content: r.content,
        score,
        keywords: r.keywords,
      };
    });

    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, limit);
    const topScore = sorted[0]?.score ?? 0;

    // Context snippet for RAG fusion
    const contextSnippet = sorted
      .slice(0, 3)
      .map(c => `[${c.title}]: ${c.content}`)
      .join('\n\n');

    return {
      chunks: sorted,
      topScore,
      contextSnippet,
    };
  }
}
