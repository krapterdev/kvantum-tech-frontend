/**
 * Stemmer — basic English suffix stemming
 * Reduces words to approximate roots for better matching
 */
export function stem(word: string): string {
  if (word.length <= 3) return word;

  // Order matters — longer suffixes first
  const rules: [RegExp, string][] = [
    [/ational$/, 'ate'],
    [/tional$/, 'tion'],
    [/enci$/, 'ence'],
    [/anci$/, 'ance'],
    [/izer$/, 'ize'],
    [/ising$/, 'ise'],
    [/izing$/, 'ize'],
    [/isation$/, 'ise'],
    [/ization$/, 'ize'],
    [/ations$/, 'ate'],
    [/nesses$/, ''],
    [/ments$/, ''],
    [/nesses$/, ''],
    [/ments$/, ''],
    [/ings$/, ''],
    [/ness$/, ''],
    [/ment$/, ''],
    [/tion$/, 'te'],
    [/ing$/, ''],
    [/ies$/, 'y'],
    [/ied$/, 'y'],
    [/ers$/, 'er'],
    [/er$/, ''],
    [/ed$/, ''],
    [/es$/, ''],
    [/s$/, ''],
    [/ly$/, ''],
    [/al$/, ''],
    [/ic$/, ''],
    [/ful$/, ''],
    [/ous$/, ''],
    [/ive$/, ''],
    [/ize$/, ''],
    [/ise$/, ''],
  ];

  for (const [pattern, replacement] of rules) {
    if (pattern.test(word)) {
      const stemmed = word.replace(pattern, replacement);
      if (stemmed.length >= 3) return stemmed;
    }
  }

  return word;
}

export function stemTokens(tokens: string[]): string[] {
  return tokens.map(stem);
}
