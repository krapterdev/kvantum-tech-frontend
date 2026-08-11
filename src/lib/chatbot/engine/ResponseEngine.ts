import { FusedContext } from './ContextBuilder';
import { pickTemplate, getQuickReplies } from '../config/responses';

export interface ConfidenceResult {
  level: 'high' | 'medium' | 'low' | 'fallback';
  confidence: number;
}

export function assessConfidence(intentConfidence: number, searchScore: number): ConfidenceResult {
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

// High-detail service responses when a service entity is detected
const DEDICATED_SERVICE_RESPONSES: Record<string, string> = {
  website_development: `🌐 **Website Development Services**\n\nHum high-speed, SEO-friendly aur mobile-responsive websites build karte hain.\n\n✨ **Includes:**\n• Custom UI/UX Design\n• Next.js & React High Speed Engine\n• Mobile & Tablet Responsive\n• SEO Meta Optimization\n• Admin CMS Control\n\n💰 **Pricing**: ₹25,000 – ₹75,000 (starting ₹25k)\n⏱️ **Timeline**: 2–4 Weeks\n\nFree consultation & demo ke liye contact karein! 📞`,

  ecommerce_website: `🛒 **eCommerce Website Solutions**\n\nComplete online shopping store with payment gateway, product management, and order tracking.\n\n✨ **Includes:**\n• Payment Gateway (Razorpay, Paytm, Stripe)\n• Product Inventory & Stock Sync\n• Order Management Dashboard\n• Discount Coupons & Offers\n• WhatsApp Order Alert Integration\n\n💰 **Pricing**: ₹40,000 – ₹2,00,000 (starting ₹40k)\n⏱️ **Timeline**: 4–8 Weeks`,

  whatsapp_automation: `🤖 **WhatsApp Automation & API Integration**\n\nApne business messaging aur lead support ko WhatsApp par fully automate karein!\n\n✨ **Includes:**\n• Official WhatsApp Business API\n• Automated Lead Capture Bot\n• Bulk Notification & Broadcasts\n• Interactive Button Menus\n• CRM & Website Integration\n\n💰 **Pricing**: ₹15,000 – ₹80,000 (starting ₹15k)\n⚡ **Setup**: 3–7 Days`,

  crm_software: `📊 **Custom CRM Software**\n\nManage leads, sales pipelines, team performance, and follow-ups in one portal.\n\n✨ **Includes:**\n• Lead Capture & Pipeline Board\n• Automated Follow-up Reminders\n• Team Productivity Log\n• Invoice & Quotation Generator\n• WhatsApp & Email Alert System\n\n💰 **Pricing**: ₹50,000 – ₹3,00,000 (starting ₹50k)\n⏱️ **Timeline**: 6–12 Weeks`,

  hrms_software: `👥 **HRMS & Payroll System**\n\nComplete HR, employee attendance, payroll calculation, and leave management.\n\n✨ **Includes:**\n• Employee Self-Service Portal\n• Automated Attendance & Biometric Sync\n• Monthly Salary & Payslip Generator\n• Leave Approval Workflow\n• Performance Evaluation Reports\n\n💰 **Pricing**: ₹60,000 – ₹2,50,000 (starting ₹60k)`,

  mobile_app: `📱 **Mobile App Development (Android & iOS)**\n\nHigh-performance native and cross-platform mobile applications.\n\n✨ **Includes:**\n• Flutter & React Native Cross-Platform\n• Play Store & App Store Publishing\n• Push Notifications Engine\n• Admin Control Panel\n• Offline Data Caching\n\n💰 **Pricing**: ₹75,000 – ₹4,00,000 (starting ₹75k)\n⏱️ **Timeline**: 8–16 Weeks`,

  business_automation: `⚡ **Business Workflow & Process Automation**\n\nEliminate repetitive tasks, approval delays, and human errors in daily operations.\n\n✨ **Includes:**\n• Workflow & Approval Engines\n• Automated PDF Report Generation\n• Database & API Integrations\n• Task Scheduling & Reminders\n\n💰 **Pricing**: ₹30,000 – ₹2,00,000 (starting ₹30k)`,

  custom_software: `💻 **Enterprise Custom Software Development**\n\nBespoke software architecture tailored specifically to your unique business workflow.\n\n✨ **Includes:**\n• Tailored Database & Architecture\n• Multi-role Admin & User Management\n• Cloud Infrastructure (AWS / Vercel)\n• REST & GraphQL API Integration\n• 6 Months Support & Maintenance\n\n💰 **Pricing**: ₹75,000 onwards`,
};

export class ResponseEngine {
  /**
   * Generates a context-fused natural response combining Structured DB data + Hybrid RAG chunks.
   */
  generate(fused: FusedContext, confidenceRes: ConfidenceResult): GeneratedResponse {
    const { intent, entities, dbResult, ragChunks, routePlan } = fused;
    let text = '';

    // Smart context-aware suggestions
    const serviceKey = entities.service;
    const quickReplies = getQuickReplies(intent, serviceKey);

    // 1. DEDICATED SERVICE ENTITY RESPONSE
    if (serviceKey && DEDICATED_SERVICE_RESPONSES[serviceKey]) {
      text = DEDICATED_SERVICE_RESPONSES[serviceKey];
      return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: Math.max(confidenceRes.confidence, 0.90) };
    }

    // 2. STRUCTURED DB / HYBRID ROUTE WITH LIVE DB RESULT
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

    // 3. HYBRID RAG ROUTE (UNSTRUCTURED KNOWLEDGE)
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

    // 4. CORE INTENT DIRECT TEMPLATES
    if (CORE_INTENTS.has(intent)) {
      text = pickTemplate(intent).template;
      return {
        text,
        quickReplies: quickReplies.slice(0, 4),
        intent,
        confidence: Math.max(confidenceRes.confidence, 0.85),
      };
    }

    // 5. FALLBACK & CLARIFICATION
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
