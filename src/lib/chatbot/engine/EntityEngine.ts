import { normalize } from '../nlp/Normalizer';

export interface Entities {
  service?: string;
  technology?: string;
  budget?: number;
  location?: string;
  name?: string;
  phone?: string;
  email?: string;
  timeline?: string;
}

// Service name patterns → canonical service key
const SERVICE_PATTERNS: [RegExp, string][] = [
  [/\b(ecommerce|e-commerce|online store|online shop|shopping site)\b/i, 'ecommerce_website'],
  [/\b(whatsapp automation|whatsapp bot|whatsapp api|wa automation|bulk whatsapp)\b/i, 'whatsapp_automation'],
  [/\b(crm|customer relation|lead management|sales software)\b/i, 'crm_software'],
  [/\b(hrms|erp|payroll|hr software|hris|attendance system)\b/i, 'hrms_software'],
  [/\b(mobile app|android app|ios app|flutter|react native|mobile application)\b/i, 'mobile_app'],
  [/\b(business automation|workflow automation|process automation|rpa)\b/i, 'business_automation'],
  [/\b(custom software|bespoke software|enterprise software|saas)\b/i, 'custom_software'],
  [/\b(website|web development|corporate website|landing page|web app)\b/i, 'website_development'],
];

// Technology patterns
const TECH_PATTERNS: [RegExp, string][] = [
  [/\b(react|reactjs|react\.js)\b/i, 'React'],
  [/\b(next\.?js|nextjs)\b/i, 'Next.js'],
  [/\b(node\.?js|nodejs)\b/i, 'Node.js'],
  [/\b(python|django|flask)\b/i, 'Python'],
  [/\b(php|laravel|codeigniter)\b/i, 'PHP'],
  [/\b(wordpress|wp)\b/i, 'WordPress'],
  [/\b(flutter)\b/i, 'Flutter'],
  [/\b(angular)\b/i, 'Angular'],
  [/\b(vue|vuejs)\b/i, 'Vue.js'],
];

// Budget patterns: ₹50k, 50000, 50 lakh, 50,000 etc.
function extractBudget(text: string): number | undefined {
  // ₹50k or 50k
  const kMatch = text.match(/(?:₹|rs\.?\s*)(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;

  // ₹2 lakh or 2 lakh
  const lakhMatch = text.match(/(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*lakh/i);
  if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000;

  // ₹50,000 or 50000
  const numMatch = text.match(/(?:₹|rs\.?\s*)([\d,]+)/i);
  if (numMatch) return parseInt(numMatch[1].replace(/,/g, ''), 10);

  // "within 50 thousand"
  const thousandMatch = text.match(/(\d+)\s*thousand/i);
  if (thousandMatch) return parseInt(thousandMatch[1]) * 1000;

  return undefined;
}

export class EntityEngine {
  extract(rawText: string): Entities {
    const text = normalize(rawText);
    const entities: Entities = {};

    // Service
    for (const [pattern, service] of SERVICE_PATTERNS) {
      if (pattern.test(rawText)) { entities.service = service; break; }
    }

    // Technology
    for (const [pattern, tech] of TECH_PATTERNS) {
      if (pattern.test(rawText)) { entities.technology = tech; break; }
    }

    // Budget
    const budget = extractBudget(rawText);
    if (budget) entities.budget = budget;

    // Location
    const locationMatch = rawText.match(/\b(delhi|noida|gurgaon|gurugram|faridabad|ghaziabad|ncr|mumbai|bangalore|hyderabad|chennai|pune|india)\b/i);
    if (locationMatch) entities.location = locationMatch[1];

    // Phone number (Indian)
    const phoneMatch = rawText.match(/(?:\+91\s*)?[6-9]\d{9}/);
    if (phoneMatch) entities.phone = phoneMatch[0].replace(/\s/g, '');

    // Email
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) entities.email = emailMatch[0];

    // Timeline
    const timelineMatch = rawText.match(/(\d+\s*(?:day|week|month|din|hafte|mahine)s?)/i);
    if (timelineMatch) entities.timeline = timelineMatch[0];

    return entities;
  }
}
