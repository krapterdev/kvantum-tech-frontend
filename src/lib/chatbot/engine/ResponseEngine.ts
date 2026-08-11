import { FusedContext } from './ContextBuilder';
import { pickTemplate, QUICK_REPLIES } from '../config/responses';

export interface ConfidenceResult {
  level: 'high' | 'medium' | 'low' | 'fallback';
  confidence: number;
}

export function assessConfidence(intentConfidence: number, searchScore: number): ConfidenceResult {
  const combined = intentConfidence * 0.6 + Math.min(searchScore, 1) * 0.4;

  if (combined >= 0.70) return { level: 'high', confidence: combined };
  if (combined >= 0.45) return { level: 'medium', confidence: combined };
  if (combined >= 0.25) return { level: 'low', confidence: combined };
  return { level: 'fallback', confidence: combined };
}

export interface GeneratedResponse {
  text: string;
  quickReplies: string[];
  intent: string;
  confidence: number;
}

export class ResponseEngine {
  /**
   * Generates a context-fused natural response combining Structured DB data + Hybrid RAG chunks.
   */
  generate(fused: FusedContext, confidenceRes: ConfidenceResult): GeneratedResponse {
    const { intent, entities, dbResult, ragChunks, routePlan } = fused;
    let text = '';
    const quickReplies = QUICK_REPLIES[intent] ?? QUICK_REPLIES['fallback'];

    // 1. STRUCTURED DB / HYBRID ROUTE WITH LIVE DB RESULT
    if (dbResult && (routePlan.destination === 'STRUCTURED_DB' || routePlan.destination === 'HYBRID')) {
      if (dbResult.entityType === 'service' && dbResult.data) {
        const s = dbResult.data;
        const name = s.name || s.title || 'Service';
        const priceStr = s.price ? `₹${s.price.toLocaleString('en-IN')}` : '₹25,000';
        const desc = s.shortDesc || s.desc || s.description || '';
        const features = Array.isArray(s.features) && s.features.length > 0
          ? `\n\n✨ **Key Features:**\n${s.features.slice(0, 4).map((f: string) => `• ${f}`).join('\n')}`
          : '';

        text = `**${name}** ki pricing **${priceStr}** se shuru hoti hai.\n\n${desc}${features}\n\nExact quotation aur free consultation ke liye call ya WhatsApp karein: **+91 98116 61828** 📞`;

        // If Hybrid mode has additional RAG chunks (e.g. payment gateway details)
        if (ragChunks.length > 0 && ragChunks[0].score > 0.35) {
          const topRag = ragChunks[0];
          text += `\n\n💡 **Additional Info** (${topRag.title}): ${topRag.content.slice(0, 180)}...`;
        }

        return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
      }

      if (dbResult.entityType === 'contact') {
        text = dbResult.summary;
        return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
      }
    }

    // 2. HYBRID RAG ROUTE (UNSTRUCTURED KNOWLEDGE)
    if (ragChunks.length > 0 && ragChunks[0].score > 0.30) {
      const top = ragChunks[0];

      if (top.source_type === 'faq') {
        text = top.content;
      } else if (top.source_type === 'service' || top.source_type === 'website') {
        const tpl = pickTemplate(intent);
        text = `${tpl.template}\n\n📎 **${top.title}**:\n${top.content.slice(0, 280)}...`;
      } else {
        text = `**${top.title}**\n${top.content.slice(0, 320)}`;
      }

      return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
    }

    // 3. INTENT TEMPLATE FALLBACKS
    if (confidenceRes.level === 'high' || confidenceRes.level === 'medium') {
      text = pickTemplate(intent).template;
    } else if (confidenceRes.level === 'low') {
      text = pickTemplate('clarification').template;
    } else {
      text = pickTemplate('fallback').template;
    }

    return {
      text,
      quickReplies: quickReplies.slice(0, 4),
      intent,
      confidence: confidenceRes.confidence,
    };
  }
}
