/**
 * Normalizer — clean and normalize input text
 * Handles English + Hinglish (Roman script Hindi)
 */
export function normalize(text: string): string {
  if (!text || typeof text !== 'string') return '';

  return text
    .toLowerCase()
    .trim()
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove email patterns
    .replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/g, '')
    // Normalize common Hinglish contractions
    .replace(/kya h\b/g, 'kya hai')
    .replace(/\bkb\b/g, 'kab')
    .replace(/\bbtao\b/g, 'batao')
    .replace(/\bkro\b/g, 'karo')
    .replace(/\bkrna\b/g, 'karna')
    .replace(/\bkrta\b/g, 'karta')
    .replace(/\bkrti\b/g, 'karti')
    .replace(/\bbnwana\b/g, 'banwana')
    .replace(/\bbnwao\b/g, 'banwao')
    .replace(/\bkrwa\b/g, 'karwa')
    // Remove punctuation except ? and numbers
    .replace(/[^\w\s?₹]/g, ' ')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Remove diacritics / special chars from Hindi romanizations
 */
export function deaccent(text: string): string {
  return text
    .replace(/[āáàä]/g, 'a')
    .replace(/[ēéèë]/g, 'e')
    .replace(/[īíìï]/g, 'i')
    .replace(/[ōóòö]/g, 'o')
    .replace(/[ūúùü]/g, 'u')
    .replace(/ñ/g, 'n');
}
