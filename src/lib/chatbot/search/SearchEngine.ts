import { chatbotQuery } from '../database/db';
import { normalize } from '../nlp/Normalizer';
import { tokenize } from '../nlp/Tokenizer';
import { removeStopWords } from '../nlp/StopWords';
import { stemTokens } from '../nlp/Stemmer';
import { expandWithSynonyms } from '../nlp/Synonyms';
import { termFrequency, tfidfVector, cosineSimilarity, TermFreqMap } from './TFIDF';

export interface SearchResult {
  id: string;
  source_type: string;
  title: string;
  content: string;
  score: number;
  keywords?: string[];
}

export class SearchEngine {
  /**
   * Full search pipeline:
   * 1. PostgreSQL full-text search (fast initial filter)
   * 2. TF-IDF re-ranking on top results
   */
  async search(rawQuery: string, limit = 5): Promise<SearchResult[]> {
    const normalized = normalize(rawQuery);
    const tokens = removeStopWords(tokenize(normalized));
    const stemmed = stemTokens(tokens);
    const expanded = expandWithSynonyms([...tokens, ...stemmed]);
    const tsQuery = expanded.filter(t => t.length > 2).slice(0, 10).join(' | ');

    if (!tsQuery) return [];

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
        [tsQuery]
      );
    } catch (e) {
      // Fallback: plain ILIKE search
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
        [tsQuery]
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
    if (allResults.length === 0) return [];

    // 3. TF-IDF re-ranking
    const queryTF = termFrequency([...tokens, ...stemmed]);

    // Build corpus from result contents
    const corpus: TermFreqMap[] = allResults.map(r =>
      termFrequency(removeStopWords(tokenize(normalize(r.title + ' ' + r.content))))
    );

    // Simple IDF: treat query tokens as common (weight 1)
    const idf = new Map<string, number>();
    for (const t of tokens) idf.set(t, 1.5);

    const queryVec = tfidfVector(queryTF, idf);

    const scored: SearchResult[] = allResults.map((r, i) => {
      const docVec = tfidfVector(corpus[i], idf);
      const tfidfScore = cosineSimilarity(queryVec, docVec);
      const pgBoost = (r.pg_rank ?? 0) * 0.3;
      const faqBoost = r.source_type === 'faq' ? 0.15 : 0;

      return {
        id: r.id,
        source_type: r.source_type,
        title: r.title,
        content: r.content,
        score: tfidfScore + pgBoost + faqBoost,
        keywords: r.keywords,
      };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
