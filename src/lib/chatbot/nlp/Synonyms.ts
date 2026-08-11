/**
 * Synonyms — maps terms to canonical concepts
 * Allows chatbot to understand multiple ways users express the same idea
 */

// Map: word/phrase → canonical concept key
export const SYNONYM_MAP: Record<string, string> = {
  // PRICING
  'price': 'pricing', 'prices': 'pricing', 'pricing': 'pricing',
  'cost': 'pricing', 'costs': 'pricing', 'costing': 'pricing',
  'charge': 'pricing', 'charges': 'pricing', 'fee': 'pricing',
  'fees': 'pricing', 'rate': 'pricing', 'rates': 'pricing',
  'kitna': 'pricing', 'kitne': 'pricing', 'kitni': 'pricing',
  'kharcha': 'pricing', 'budget': 'pricing', 'investment': 'pricing',
  'amount': 'pricing', 'quote': 'pricing', 'quotation': 'pricing',
  'estimate': 'pricing', 'package': 'pricing', 'packages': 'pricing',
  'plan': 'pricing', 'plans': 'pricing',

  // WEBSITE
  'website': 'website', 'site': 'website', 'web': 'website',
  'webpage': 'website', 'webpages': 'website', 'portal': 'website',
  'landing page': 'website', 'landing': 'website',

  // ECOMMERCE
  'ecommerce': 'ecommerce', 'e-commerce': 'ecommerce',
  'online store': 'ecommerce', 'online shop': 'ecommerce',
  'shopping website': 'ecommerce', 'shopping site': 'ecommerce',
  'product website': 'ecommerce', 'sell online': 'ecommerce',

  // CRM
  'crm': 'crm', 'customer management': 'crm',
  'lead management': 'crm', 'sales software': 'crm',
  'customer relation': 'crm', 'client management': 'crm',

  // ERP / HRMS
  'hrms': 'hrms', 'erp': 'hrms', 'hris': 'hrms',
  'hr software': 'hrms', 'payroll': 'hrms', 'attendance': 'hrms',
  'employee management': 'hrms', 'staff management': 'hrms',

  // WHATSAPP AUTOMATION
  'whatsapp': 'whatsapp', 'whatsapp automation': 'whatsapp',
  'whatsapp bot': 'whatsapp', 'whatsapp api': 'whatsapp',
  'whatsapp marketing': 'whatsapp', 'bulk whatsapp': 'whatsapp',
  'whatsapp business': 'whatsapp', 'wa automation': 'whatsapp',

  // MOBILE APP
  'app': 'mobile_app', 'mobile app': 'mobile_app', 'application': 'mobile_app',
  'android': 'mobile_app', 'ios': 'mobile_app', 'flutter': 'mobile_app',
  'react native': 'mobile_app', 'mobile application': 'mobile_app',

  // BUSINESS AUTOMATION
  'automation': 'automation', 'automate': 'automation',
  'business automation': 'automation', 'workflow': 'automation',
  'process automation': 'automation', 'rpa': 'automation',
  'bot': 'automation', 'chatbot': 'automation',

  // CUSTOM SOFTWARE
  'software': 'custom_software', 'custom software': 'custom_software',
  'custom development': 'custom_software', 'bespoke': 'custom_software',
  'enterprise software': 'custom_software', 'saas': 'custom_software',

  // CONTACT
  'contact': 'contact', 'call': 'contact', 'phone': 'contact',
  'email': 'contact', 'reach': 'contact', 'connect': 'contact',
  'sampark': 'contact', 'address': 'contact', 'location': 'contact',
  'office': 'contact', 'visit': 'contact', 'meet': 'contact',

  // ABOUT
  'about': 'about', 'company': 'about', 'team': 'about',
  'kvantum': 'about', 'who': 'about', 'experience': 'about',
  'founded': 'about', 'established': 'about', 'history': 'about',
  'background': 'about', 'profile': 'about', 'kaun': 'about',

  // PORTFOLIO / PROJECTS
  'portfolio': 'portfolio', 'projects': 'portfolio', 'work': 'portfolio',
  'clients': 'portfolio', 'examples': 'portfolio', 'case study': 'portfolio',
  'previous work': 'portfolio', 'past work': 'portfolio',
  'purane': 'portfolio', 'kaam': 'portfolio',

  // SUPPORT
  'support': 'support', 'help': 'support', 'issue': 'support',
  'problem': 'support', 'bug': 'support', 'fix': 'support',
  'maintenance': 'support', 'maintain': 'support', 'update': 'support',
  'upgrade': 'support', 'samasyaa': 'support', 'dikkat': 'support',

  // TECHNOLOGY
  'react': 'react', 'nextjs': 'nextjs', 'next.js': 'nextjs',
  'node': 'nodejs', 'nodejs': 'nodejs', 'node.js': 'nodejs',
  'python': 'python', 'django': 'python', 'flask': 'python',
  'php': 'php', 'laravel': 'php', 'wordpress': 'wordpress',
  'mongodb': 'mongodb', 'postgresql': 'postgresql', 'mysql': 'mysql',
  'aws': 'aws', 'azure': 'azure', 'gcp': 'gcp',
};

/**
 * Resolve a token to its canonical concept if a synonym mapping exists
 */
export function resolveSynonym(token: string): string {
  return SYNONYM_MAP[token.toLowerCase()] ?? token;
}

/**
 * Expand query tokens with synonym mappings
 */
export function expandWithSynonyms(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);
  for (const token of tokens) {
    const canonical = resolveSynonym(token);
    if (canonical !== token) expanded.add(canonical);

    // Add all tokens that map to the same canonical
    for (const [term, concept] of Object.entries(SYNONYM_MAP)) {
      if (concept === canonical && term !== token) {
        expanded.add(term);
      }
    }
  }
  return Array.from(expanded);
}
