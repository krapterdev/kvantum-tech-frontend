/**
 * TF-IDF implementation — pure TypeScript, no external dependencies
 */

export type TermFreqMap = Map<string, number>;

/**
 * Compute term frequency for a document (normalized by doc length)
 */
export function termFrequency(tokens: string[]): TermFreqMap {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }
  // Normalize by document length
  for (const [term, count] of tf) {
    tf.set(term, count / tokens.length);
  }
  return tf;
}

/**
 * Compute IDF from a corpus of term-frequency maps
 */
export function inverseDocumentFrequency(corpus: TermFreqMap[]): Map<string, number> {
  const docCount = corpus.length;
  const idf = new Map<string, number>();
  const docFreq = new Map<string, number>();

  for (const docTf of corpus) {
    for (const term of docTf.keys()) {
      docFreq.set(term, (docFreq.get(term) ?? 0) + 1);
    }
  }

  for (const [term, df] of docFreq) {
    idf.set(term, Math.log((docCount + 1) / (df + 1)) + 1);
  }

  return idf;
}

/**
 * Compute TF-IDF vector for a document
 */
export function tfidfVector(tf: TermFreqMap, idf: Map<string, number>): Map<string, number> {
  const vec = new Map<string, number>();
  for (const [term, tfVal] of tf) {
    vec.set(term, tfVal * (idf.get(term) ?? 1));
  }
  return vec;
}

/**
 * Cosine similarity between two TF-IDF vectors
 */
export function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const [term, valA] of a) {
    const valB = b.get(term) ?? 0;
    dotProduct += valA * valB;
    normA += valA * valA;
  }

  for (const [, valB] of b) {
    normB += valB * valB;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}
