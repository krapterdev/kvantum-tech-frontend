import { normalize } from '../nlp/Normalizer';
import { tokenize, phrases as makePhrs } from '../nlp/Tokenizer';
import { removeStopWords } from '../nlp/StopWords';
import { INTENTS } from '../config/intents';

export interface IntentResult {
  intent: string;
  confidence: number;
  scores: Record<string, number>;
  tokens: string[];
}

export class IntentEngine {
  /**
   * Detect intent and return normalized confidence score (0–1)
   */
  detect(rawText: string, prevIntent?: string): IntentResult {
    const normalized = normalize(rawText);
    const rawTokens = tokenize(normalized);
    const tokens = removeStopWords(rawTokens);
    const tokenSet = new Set(tokens);
    const rawTokenSet = new Set(rawTokens);
    const phrsList = makePhrs(rawTokens);
    const phraseSet = new Set(phrsList);

    const scores: Record<string, number> = {};

    for (const intent of INTENTS) {
      if (intent.name === 'unknown') continue;

      let score = 0;

      // Exact phrase match: +25
      for (const ep of intent.exactPhrases) {
        const normEp = normalize(ep);
        if (normalized === normEp || normalized.includes(normEp)) {
          score += 25;
        }
      }

      // Phrase match: +12 each
      for (const ph of intent.phrases) {
        const normPh = normalize(ph);
        if (normalized.includes(normPh) || phraseSet.has(normPh)) {
          score += 12;
        }
      }

      // Keyword match: +6 each
      for (const kw of intent.keywords) {
        const normKw = normalize(kw);
        if (tokenSet.has(normKw) || rawTokenSet.has(normKw)) {
          score += 6;
        } else if (normalized.includes(normKw)) {
          score += 3;
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

    // Realistic confidence calibration:
    // score >= 20 -> 0.95 (strong match)
    // score >= 10 -> 0.85 (good match)
    // score >= 5  -> 0.70 (clear keyword match)
    // score > 0   -> 0.50
    let confidence = 0;
    if (topScore >= 20) confidence = 0.95;
    else if (topScore >= 10) confidence = 0.85;
    else if (topScore >= 5) confidence = 0.75;
    else if (topScore > 0) confidence = 0.50;

    return {
      intent: topIntent,
      confidence,
      scores,
      tokens,
    };
  }
}
