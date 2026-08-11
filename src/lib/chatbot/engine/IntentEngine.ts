import { normalize } from '../nlp/Normalizer';
import { tokenize, phrases as makePhrs } from '../nlp/Tokenizer';
import { removeStopWords } from '../nlp/StopWords';
import { INTENTS, IntentDef } from '../config/intents';

export interface IntentResult {
  intent: string;
  confidence: number;
  scores: Record<string, number>;
  tokens: string[];
}

export class IntentEngine {
  /**
   * Detect intent and return confidence score (0–1)
   */
  detect(rawText: string, prevIntent?: string): IntentResult {
    const normalized = normalize(rawText);
    const tokens = removeStopWords(tokenize(normalized));
    const tokenSet = new Set(tokens);
    const phrsList = makePhrs(tokenize(normalized));
    const phraseSet = new Set(phrsList);

    const scores: Record<string, number> = {};

    for (const intent of INTENTS) {
      if (intent.name === 'unknown') continue;

      let score = 0;

      // Keyword match: +5 each
      for (const kw of intent.keywords) {
        if (tokenSet.has(kw)) score += 5;
        // partial contains
        else if (normalized.includes(kw)) score += 3;
      }

      // Phrase match: +10 each
      for (const ph of intent.phrases) {
        if (normalized.includes(ph)) score += 10;
        else if (phraseSet.has(ph)) score += 8;
      }

      // Exact phrase match: +20 each
      for (const ep of intent.exactPhrases) {
        if (normalized === ep || normalized.startsWith(ep + ' ') || normalized.endsWith(' ' + ep)) {
          score += 20;
        }
      }

      // Context bonus: +5 if same intent as previous
      if (prevIntent && intent.name === prevIntent) score += 5;

      scores[intent.name] = score;
    }

    // Find top scoring intent
    let topIntent = 'unknown';
    let topScore = 0;
    for (const [intent, score] of Object.entries(scores)) {
      if (score > topScore) {
        topScore = score;
        topIntent = intent;
      }
    }

    // Normalize confidence (max possible score ~100 for very strong signals)
    const confidence = Math.min(1, topScore / 50);

    return {
      intent: topIntent,
      confidence,
      scores,
      tokens,
    };
  }
}
