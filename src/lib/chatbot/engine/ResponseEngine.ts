import { FusedContext } from './ContextBuilder';
import { pickTemplate, getQuickReplies, Language } from '../config/responses';

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

// Multi-language high-detail service responses
const DEDICATED_SERVICE_RESPONSES_BY_LANG: Record<Language, Record<string, string>> = {
  en: {
    website_development: `🌐 **Website Development Services**\n\nWe build high-speed, SEO-friendly, and mobile-responsive websites.\n\n✨ **Includes:**\n• Custom UI/UX Design\n• Next.js & React High Speed Engine\n• Mobile & Tablet Responsive\n• SEO Meta Optimization\n• Admin CMS Control\n\n💰 **Pricing**: ₹25,000 – ₹75,000 (starting ₹25k)\n⏱️ **Timeline**: 2–4 Weeks\n\nContact us for a free consultation & demo! 📞`,
    ecommerce_website: `🛒 **eCommerce Website Solutions**\n\nComplete online shopping store with payment gateway, product management, and order tracking.\n\n✨ **Includes:**\n• Payment Gateway (Razorpay, Paytm, Stripe)\n• Product Inventory & Stock Sync\n• Order Management Dashboard\n• Discount Coupons & Offers\n• WhatsApp Order Alert Integration\n\n💰 **Pricing**: ₹40,000 – ₹2,00,000 (starting ₹40k)\n⏱️ **Timeline**: 4–8 Weeks`,
    whatsapp_automation: `🤖 **WhatsApp Automation & API Integration**\n\nAutomate your business messaging, customer support, and lead generation on WhatsApp!\n\n✨ **Includes:**\n• Official WhatsApp Business API\n• Automated Lead Capture Bot\n• Bulk Notification & Broadcasts\n• Interactive Button Menus\n• CRM & Website Integration\n\n💰 **Pricing**: ₹15,000 – ₹80,000 (starting ₹15k)\n⚡ **Setup**: 3–7 Days`,
    crm_software: `📊 **Custom CRM Software**\n\nManage leads, sales pipelines, team performance, and follow-ups in one portal.\n\n✨ **Includes:**\n• Lead Capture & Pipeline Board\n• Automated Follow-up Reminders\n• Team Productivity Log\n• Invoice & Quotation Generator\n• WhatsApp & Email Alert System\n\n💰 **Pricing**: ₹50,000 – ₹3,00,000 (starting ₹50k)\n⏱️ **Timeline**: 6–12 Weeks`,
    hrms_software: `👥 **HRMS & Payroll System**\n\nComplete HR, employee attendance, payroll calculation, and leave management.\n\n✨ **Includes:**\n• Employee Self-Service Portal\n• Automated Attendance & Biometric Sync\n• Monthly Salary & Payslip Generator\n• Leave Approval Workflow\n• Performance Evaluation Reports\n\n💰 **Pricing**: ₹60,000 – ₹2,50,000 (starting ₹60k)`,
    mobile_app: `📱 **Mobile App Development (Android & iOS)**\n\nHigh-performance native and cross-platform mobile applications.\n\n✨ **Includes:**\n• Flutter & React Native Cross-Platform\n• Play Store & App Store Publishing\n• Push Notifications Engine\n• Admin Control Panel\n• Offline Data Caching\n\n💰 **Pricing**: ₹75,000 – ₹4,00,000 (starting ₹75k)\n⏱️ **Timeline**: 8–16 Weeks`,
    business_automation: `⚡ **Business Workflow & Process Automation**\n\nEliminate repetitive tasks, approval delays, and human errors in daily operations.\n\n✨ **Includes:**\n• Workflow & Approval Engines\n• Automated PDF Report Generation\n• Database & API Integrations\n• Task Scheduling & Reminders\n\n💰 **Pricing**: ₹30,000 – ₹2,00,000 (starting ₹30k)`,
    custom_software: `💻 **Enterprise Custom Software Development**\n\nBespoke software architecture tailored specifically to your unique business workflow.\n\n✨ **Includes:**\n• Tailored Database & Architecture\n• Multi-role Admin & User Management\n• Cloud Infrastructure (AWS / Vercel)\n• REST & GraphQL API Integration\n• 6 Months Support & Maintenance\n\n💰 **Pricing**: ₹75,000 onwards`,
  },

  hinglish: {
    website_development: `🌐 **Website Development Services**\n\nHum high-speed, SEO-friendly aur mobile-responsive websites build karte hain.\n\n✨ **Includes:**\n• Custom UI/UX Design\n• Next.js & React High Speed Engine\n• Mobile & Tablet Responsive\n• SEO Meta Optimization\n• Admin CMS Control\n\n💰 **Pricing**: ₹25,000 – ₹75,000 (starting ₹25k)\n⏱️ **Timeline**: 2–4 Weeks\n\nFree consultation & demo ke liye contact karein! 📞`,
    ecommerce_website: `🛒 **eCommerce Website Solutions**\n\nComplete online shopping store with payment gateway, product management, and order tracking.\n\n✨ **Includes:**\n• Payment Gateway (Razorpay, Paytm, Stripe)\n• Product Inventory & Stock Sync\n• Order Management Dashboard\n• Discount Coupons & Offers\n• WhatsApp Order Alert Integration\n\n💰 **Pricing**: ₹40,000 – ₹2,00,000 (starting ₹40k)\n⏱️ **Timeline**: 4–8 Weeks`,
    whatsapp_automation: `🤖 **WhatsApp Automation & API Integration**\n\nApne business messaging aur lead support ko WhatsApp par fully automate karein!\n\n✨ **Includes:**\n• Official WhatsApp Business API\n• Automated Lead Capture Bot\n• Bulk Notification & Broadcasts\n• Interactive Button Menus\n• CRM & Website Integration\n\n💰 **Pricing**: ₹15,000 – ₹80,000 (starting ₹15k)\n⚡ **Setup**: 3–7 Days`,
    crm_software: `📊 **Custom CRM Software**\n\nManage leads, sales pipelines, team performance, and follow-ups in one portal.\n\n✨ **Includes:**\n• Lead Capture & Pipeline Board\n• Automated Follow-up Reminders\n• Team Productivity Log\n• Invoice & Quotation Generator\n• WhatsApp & Email Alert System\n\n💰 **Pricing**: ₹50,000 – ₹3,00,000 (starting ₹50k)\n⏱️ **Timeline**: 6–12 Weeks`,
    hrms_software: `👥 **HRMS & Payroll System**\n\nComplete HR, employee attendance, payroll calculation, and leave management.\n\n✨ **Includes:**\n• Employee Self-Service Portal\n• Automated Attendance & Biometric Sync\n• Monthly Salary & Payslip Generator\n• Leave Approval Workflow\n• Performance Evaluation Reports\n\n💰 **Pricing**: ₹60,000 – ₹2,50,000 (starting ₹60k)`,
    mobile_app: `📱 **Mobile App Development (Android & iOS)**\n\nHigh-performance native and cross-platform mobile applications.\n\n✨ **Includes:**\n• Flutter & React Native Cross-Platform\n• Play Store & App Store Publishing\n• Push Notifications Engine\n• Admin Control Panel\n• Offline Data Caching\n\n💰 **Pricing**: ₹75,000 – ₹4,00,000 (starting ₹75k)\n⏱️ **Timeline**: 8–16 Weeks`,
    business_automation: `⚡ **Business Workflow & Process Automation**\n\nEliminate repetitive tasks, approval delays, and human errors in daily operations.\n\n✨ **Includes:**\n• Workflow & Approval Engines\n• Automated PDF Report Generation\n• Database & API Integrations\n• Task Scheduling & Reminders\n\n💰 **Pricing**: ₹30,000 – ₹2,00,000 (starting ₹30k)`,
    custom_software: `💻 **Enterprise Custom Software Development**\n\nBespoke software architecture tailored specifically to your unique business workflow.\n\n✨ **Includes:**\n• Tailored Database & Architecture\n• Multi-role Admin & User Management\n• Cloud Infrastructure (AWS / Vercel)\n• REST & GraphQL API Integration\n• 6 Months Support & Maintenance\n\n💰 **Pricing**: ₹75,000 onwards`,
  },

  hi: {
    website_development: `🌐 **वेबसाइट विकास सेवाएं**\n\nहम हाई-स्पीड, एसईओ-अनुकूल और मोबाइल-अनुकूल वेबसाइटों का निर्माण करते हैं।\n\n✨ **विशेषताएं:**\n• कस्टम यूआई/यूएक्स डिज़ाइन\n• नेक्स्ट.जेएस और रिएक्ट हाई स्पीड इंजन\n• मोबाइल और टैबलेट अनुकूल\n• एसईओ मेटा ऑप्टिमाइजेशन\n• व्यवस्थापक सीएमएस नियंत्रण\n\n💰 **कीमत**: ₹25,000 – ₹75,000 (शुरुआती ₹25k)\n⏱️ **समय सीमा**: 2-4 सप्ताह\n\nनिःशुल्क परामर्श के लिए संपर्क करें! 📞`,
    ecommerce_website: `🛒 **ई-कॉमर्स वेबसाइट समाधान**\n\nपेमेंट गेटवे, उत्पाद प्रबंधन और ऑर्डर ट्रैकिंग के साथ पूरा ऑनलाइन शॉपिंग स्टोर।\n\n✨ **विशेषताएं:**\n• पेमेंट गेटवे (रेज़रपे, पेटीएम, स्ट्राइप)\n• उत्पाद सूची और स्टॉक सिंक\n• ऑर्डर प्रबंधन डैशबोर्ड\n• डिस्काउंट कूपन और ऑफ़र\n\n💰 **कीमत**: ₹40,000 – ₹2,00,000 (शुरुआती ₹40k)\n⏱️ **समय सीमा**: 4-8 सप्ताह`,
    whatsapp_automation: `🤖 **व्हाट्सएप ऑटोमेशन और एपीआई इंटीग्रेशन**\n\nव्हाट्सएप पर अपने संदेशों और ग्राहक सहायता को पूरी तरह से ऑटोमेट करें!\n\n✨ **विशेषताएं:**\n• आधिकारिक व्हाट्सएप बिजनेस एपीआई\n• ऑटोमेटेड लीड कैप्चर बॉट\n• बल्क नोटिफिकेशन और प्रसारण\n\n💰 **कीमत**: ₹15,000 – ₹80,000 (शुरुआती ₹15k)\n⚡ **सेटअप**: 3-7 दिन`,
    crm_software: `📊 **कस्टम CRM सॉफ्टवेयर**\n\nएक ही पोर्टल में लीड्स, बिक्री पाइपलाइन, टीम प्रदर्शन और फॉलो-अप प्रबंधित करें।\n\n✨ **विशेषताएं:**\n• लीड कैप्चर और पाइपलाइन बोर्ड\n• ऑटोमेटेड फॉलो-अप रिमाइंडर\n• कोटेशन जनरेटर\n\n💰 **कीमत**: ₹50,000 – ₹3,00,000 (शुरुआती ₹50k)`,
    hrms_software: `👥 **HRMS और पेरोल सिस्टम**\n\nकर्मचारी उपस्थिति, पेरोल गणना और छुट्टी प्रबंधन का संपूर्ण समाधान।\n\n💰 **कीमत**: ₹60,000 – ₹2,50,000 (शुरुआती ₹60k)`,
    mobile_app: `📱 **मोबाइल ऐप डेवलपमेंट (एंड्रॉइड और iOS)**\n\nउच्च प्रदर्शन वाले मोबाइल एप्लिकेशन।\n\n💰 **कीमत**: ₹75,000 – ₹4,00,000 (शुरुआती ₹75k)`,
    business_automation: `⚡ **बिजनेस ऑटोमेशन**\n\nदैनिक कार्यों में दोहराव और मानवीय त्रुटियों को समाप्त करें।\n\n💰 **कीमत**: ₹30,000 – ₹2,00,000 (शुरुआती ₹30k)`,
    custom_software: `💻 **कस्टम सॉफ्टवेयर डेवलपमेंट**\n\nआपकी विशिष्ट व्यावसायिक आवश्यकताओं के लिए तैयार सॉफ्टवेयर स्थापत्य।\n\n💰 **कीमत**: ₹75,000 से आगे`,
  },
};

export class ResponseEngine {
  /**
   * Generates a context-fused natural response supporting multi-language output.
   */
  generate(fused: FusedContext, confidenceRes: ConfidenceResult, lang: Language = 'hinglish'): GeneratedResponse {
    const { intent, entities, dbResult, ragChunks, routePlan } = fused;
    let text = '';

    const serviceKey = entities.service;
    const quickReplies = getQuickReplies(intent, serviceKey, lang);

    // 1. DEDICATED SERVICE ENTITY RESPONSE PER LANGUAGE
    const dedicatedLangMap = DEDICATED_SERVICE_RESPONSES_BY_LANG[lang] ?? DEDICATED_SERVICE_RESPONSES_BY_LANG['hinglish'];
    if (serviceKey && dedicatedLangMap[serviceKey]) {
      text = dedicatedLangMap[serviceKey];
      return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: Math.max(confidenceRes.confidence, 0.90) };
    }

    // 2. STRUCTURED DB RESULT
    if (dbResult && (routePlan.destination === 'STRUCTURED_DB' || routePlan.destination === 'HYBRID')) {
      if (dbResult.entityType === 'service' && dbResult.data) {
        const s = dbResult.data;
        const name = s.name || s.title || 'Service';
        const priceStr = s.price ? `₹${s.price.toLocaleString('en-IN')}` : '₹25,000';
        const desc = s.shortDesc || s.desc || s.description || s.longDesc || '';

        text = `**${name}**: ${priceStr}\n\n${desc}\n\nCall/WhatsApp: **+91 98116 61828** 📞`;

        return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
      }

      if (dbResult.entityType === 'contact') {
        text = dbResult.summary;
        return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
      }
    }

    // 3. HYBRID RAG ROUTE
    if (ragChunks.length > 0 && ragChunks[0].score > 0.30) {
      const top = ragChunks[0];

      if (top.source_type === 'faq') {
        text = top.content;
      } else {
        const tpl = pickTemplate(intent, lang);
        text = `${tpl.template}\n\n📎 **${top.title}**:\n${top.content.slice(0, 280)}...`;
      }

      return { text, quickReplies: quickReplies.slice(0, 4), intent, confidence: confidenceRes.confidence };
    }

    // 4. CORE INTENT TEMPLATES
    if (CORE_INTENTS.has(intent)) {
      text = pickTemplate(intent, lang).template;
      return {
        text,
        quickReplies: quickReplies.slice(0, 4),
        intent,
        confidence: Math.max(confidenceRes.confidence, 0.85),
      };
    }

    // 5. FALLBACK & CLARIFICATION
    if (confidenceRes.level === 'medium') {
      text = pickTemplate(intent, lang).template;
    } else if (confidenceRes.level === 'low') {
      text = pickTemplate('clarification', lang).template;
    } else {
      text = pickTemplate('fallback', lang).template;
    }

    return {
      text,
      quickReplies: quickReplies.slice(0, 4),
      intent,
      confidence: confidenceRes.confidence,
    };
  }
}
