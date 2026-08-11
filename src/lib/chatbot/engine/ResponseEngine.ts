import { SearchResult } from '../search/SearchEngine';
import { pickTemplate, QUICK_REPLIES, RESPONSE_TEMPLATES } from '../config/responses';
import { Entities } from './EntityEngine';

export interface ConfidenceResult {
  level: 'high' | 'medium' | 'low' | 'fallback';
  confidence: number;
}

export function assessConfidence(intentConfidence: number, searchScore: number): ConfidenceResult {
  // Combine intent confidence + search result quality
  const combined = intentConfidence * 0.7 + Math.min(searchScore, 1) * 0.3;

  if (combined >= 0.75) return { level: 'high', confidence: combined };
  if (combined >= 0.50) return { level: 'medium', confidence: combined };
  if (combined >= 0.30) return { level: 'low', confidence: combined };
  return { level: 'fallback', confidence: combined };
}

export interface GeneratedResponse {
  text: string;
  quickReplies: string[];
  intent: string;
  confidence: number;
  leadCollected?: boolean;
}

export class ResponseEngine {
  generate(
    intent: string,
    confidence: ConfidenceResult,
    searchResults: SearchResult[],
    entities: Entities,
    history: any[],
  ): GeneratedResponse {
    let text: string;
    const quickReplies = QUICK_REPLIES[intent] ?? QUICK_REPLIES['fallback'];

    switch (confidence.level) {
      case 'high': {
        // Try to use search result content for knowledge-based intents
        if (
          searchResults.length > 0 &&
          !['greeting','goodbye','contact','location','working_hours','human_agent'].includes(intent)
        ) {
          const top = searchResults[0];
          if (top.score > 0.3 && top.source_type === 'faq') {
            // FAQ answer directly
            text = top.content;
            break;
          }
          if (top.score > 0.4 && top.source_type === 'service') {
            // Service info + template
            const tpl = pickTemplate(intent);
            text = tpl.template + `\n\n📎 **${top.title}**: ${top.content.slice(0, 200)}...`;
            break;
          }
        }
        // Use template
        text = pickTemplate(intent).template;
        break;
      }

      case 'medium': {
        const tpl = pickTemplate(intent);
        text = tpl.template + '\n\nKya aap thoda aur detail de sakte hain? Main better help kar sakta hoon! 😊';
        break;
      }

      case 'low': {
        text = pickTemplate('clarification').template;
        break;
      }

      default: {
        // Check if there's any useful search result
        if (searchResults.length > 0 && searchResults[0].score > 0.2) {
          const top = searchResults[0];
          text = `Yeh information mili mujhe:\n\n**${top.title}**\n${top.content.slice(0, 300)}\n\nKya yeh helpful tha? Aur kuch jaanna chahte hain?`;
        } else {
          text = pickTemplate('fallback').template;
        }
        break;
      }
    }

    // Entity-specific augmentation
    if (entities.service && intent === 'pricing') {
      const serviceMap: Record<string, string> = {
        'website_development': '₹25,000 – ₹1,50,000',
        'ecommerce_website': '₹40,000 – ₹2,00,000',
        'crm_software': '₹50,000 – ₹3,00,000',
        'hrms_software': '₹60,000 – ₹2,50,000',
        'whatsapp_automation': '₹15,000 – ₹80,000',
        'mobile_app': '₹75,000 – ₹4,00,000',
        'business_automation': '₹30,000 – ₹2,00,000',
        'custom_software': '₹75,000+',
      };
      const price = serviceMap[entities.service];
      if (price) {
        const serviceName = entities.service.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        text = `**${serviceName}** ki pricing generally **${price}** hoti hai.\n\nYeh aapki exact requirements par depend karega. Free consultation ke liye contact karo! 📞\n\n+91 98116 61828 | info@kvantumtechsolutions.com`;
      }
    }

    return {
      text,
      quickReplies: quickReplies.slice(0, 4),
      intent,
      confidence: confidence.confidence,
    };
  }
}
