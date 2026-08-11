import { FusedContext } from './ContextBuilder';
import { pickTemplate, QUICK_REPLIES } from '../config/responses';

export interface ConfidenceResult {
  level: 'high' | 'medium' | 'low' | 'fallback';
  confidence: number;
}

export function assessConfidence(intentConfidence: number, searchScore: number): ConfidenceResult {
  // Take maximum of intent confidence or RAG search score
  const combined = Math.max(intentConfidence, Math.min(searchScore * 1.5, 1));

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

const CORE_INTENTS = new Set([
  'greeting', 'goodbye', 'about', 'services', 'pricing',
  'portfolio', 'contact', 'location', 'working_hours',
  'booking', 'quotation', 'support', 'human_agent', 'blog', 'faq'
]);

export class ResponseEngine {
  /**
   * Generates a context-fused natural response combining Structured DB data + Hybrid RAG chunks.
   */
  generate(fused: FusedContext, confidenceRes: ConfidenceResult): GeneratedResponse {
    const { intent, dbResult, ragChunks, routePlan } = fused;
    let text = '';
    const quickReplies = QUICK_REPLIES[intent] ?? QUICK_REPLIES['fallback'];

    // 1. STRUCTURED DB / HYBRID ROUTE WITH LIVE DB RESULT
    if (dbResult && (routePlan.destination === 'STRUCTURED_DB' || routePlan.destination === 'HYBRID')) {
      if (dbResult.entityType === 'service' && dbResult.data) {
        const s = dbResult.data;
        const name = s.name || s.title || 'Service';
        const priceStr = s.price ? `₹${s.price.toLocaleString('en-IN')}` : '₹25,000';
        const desc = s.shortDesc || s.desc || s.description || s.longDesc || '';
        const tech = s.techStack ? `\n\n💻 **Tech Stack:** ${s.techStack}` : '';

        text = `**${name}** ki pricing **${priceStr}** se shuru hoti hai.\n\n${desc}${tech}\n\nExact quotation aur free consultation ke liye call ya WhatsApp karein: **+91 98116 61828** 📞`;

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

    // 3. CORE INTENT DIRECT TEMPLATES (Guarantees fast, accurate answers for Services, Portfolio, Pricing, Contact, etc.)
    if (CORE_INTENTS.has(intent)) {
      text = pickTemplate(intent).template;
      return {
        text,
        quickReplies: quickReplies.slice(0, 4),
        intent,
        confidence: Math.max(confidenceRes.confidence, 0.85),
      };
    }

    // 4. FALLBACK & CLARIFICATION
    if (confidenceRes.level === 'medium') {
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
