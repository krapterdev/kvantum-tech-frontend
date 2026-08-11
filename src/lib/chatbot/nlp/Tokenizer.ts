/**
 * Tokenizer — split text into tokens
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[\s,!?;:()\[\]{}"'/\\]+/)
    .map(t => t.replace(/^[-_]+|[-_]+$/g, ''))
    .filter(t => t.length > 0);
}

/**
 * Split text into n-grams (bigrams, trigrams)
 */
export function ngrams(tokens: string[], n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    result.push(tokens.slice(i, i + n).join(' '));
  }
  return result;
}

/**
 * Get bigrams + trigrams from token list
 */
export function phrases(tokens: string[]): string[] {
  return [...ngrams(tokens, 2), ...ngrams(tokens, 3)];
}
