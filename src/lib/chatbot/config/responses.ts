/**
 * Response Templates — multi-variant template-based NLG with dynamic suggestions
 */

export interface ResponseTemplate {
  template: string;
  hasData: boolean;
}

export const RESPONSE_TEMPLATES: Record<string, ResponseTemplate[]> = {

  greeting: [
    { template: "Namaste! 🙏 Main Kvantum Tech Solutions ka AI-powered assistant hoon.\n\nAap **Website**, **WhatsApp Automation**, **CRM**, **HRMS** ya kisi bhi custom software ke baare mein pooch sakte hain! Kaise help karoon?", hasData: false },
    { template: "Hi! 👋 Welcome to Kvantum Tech Solutions. Main aapko hamari **Services**, **Pricing**, **Portfolio** aur **Solutions** ke baare mein complete details de sakta hoon. Kya jaanna chahte hain?", hasData: false },
    { template: "Hello! Kvantum Tech team mein aapka swagat hai. Main aapka virtual assistant hoon — website, app, CRM ya WhatsApp bot ke baare mein kuch bhi poochiye! 🚀", hasData: false },
  ],

  goodbye: [
    { template: "Shukriya aapse baat karke! 🙏 AAP jab bhi ready hon, hum aapka project build karne ke liye available hain.\n\n📞 Direct Call/WhatsApp: **+91 98116 61828**\n📧 Email: **info@kvantumtechsolutions.com**\n\nShubhkamnayein! 👋", hasData: false },
    { template: "Alvida! Future mein kisi bhi IT solution ya automation ke liye zaroor contact karein. Have a great day! 👋", hasData: false },
  ],

  about: [
    { template: "Kvantum Tech Solutions ek leading IT Company hai based in Delhi NCR 📍.\n\nHum businesses ke liye **Custom Software**, **Responsive Websites**, **eCommerce Platforms**, **CRM Systems**, **HRMS/Payroll** aur **WhatsApp Automation** build karte hain.\n\nHamara goal: Technology se aapke business operations ko simplified aur 10x faster banana! 💡", hasData: false },
    { template: "Hum Kvantum Tech Solutions hain — full-stack software & automation company from Delhi NCR 🏢.\n\nHamare core expertise:\n• Custom Software & Web Applications\n• eCommerce & Mobile Apps (Android/iOS)\n• WhatsApp Business Automation & Bots\n• Custom CRM & HRMS Platforms\n\n100+ projects successfully delivered across India! 🚀", hasData: false },
  ],

  services: [
    { template: "Kvantum Tech Solutions yeh primary services offer karta hai:\n\n🌐 **Website & eCommerce Development** — Starting ₹25,000\n🤖 **WhatsApp Automation & Bots** — Starting ₹15,000\n📊 **Custom CRM Software** — Starting ₹50,000\n👥 **HRMS & Payroll Systems** — Starting ₹60,000\n💻 **Enterprise Custom Software** — Starting ₹75,000\n📱 **Android & iOS Mobile Apps** — Starting ₹75,000\n⚡ **Workflow & Business Automation** — Starting ₹30,000\n\nKisi specific service ke baare mein detail chahiye? Click a suggestion below! 👇", hasData: false },
  ],

  pricing: [
    { template: "Kvantum Tech Solutions Pricing Overview:\n\n🌐 **Corporate Website**: ₹25,000 – ₹75,000\n🛒 **eCommerce Store**: ₹40,000 – ₹2,00,000\n🤖 **WhatsApp Bot/API**: ₹15,000 – ₹80,000\n📊 **Custom CRM System**: ₹50,000 – ₹3,00,000\n👥 **HRMS/Payroll Software**: ₹60,000 – ₹2,50,000\n💻 **Custom Software**: ₹75,000 onwards\n\nExact quote ke liye apni requirements share karein — free consultation available hai! 📞", hasData: false },
  ],

  contact: [
    { template: "Humse contact karne ke options:\n\n📱 **WhatsApp / Call**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com\n📍 **Location**: Delhi NCR, India\n🌐 **Website**: kvantumtechsolutions.com\n⏰ **Hours**: Mon – Sat (9 AM – 7 PM)\n\nNeeche **'Demo/Quote'** button press karke callback request bhi bhej sakte hain! ✅", hasData: false },
  ],

  location: [
    { template: "Kvantum Tech Solutions Delhi NCR mein main office operate karti hai. Hum virtual meetings & remote collaboration ke through poore India & Global clients ko serve karte hain. 📍\n\nContact: **+91 98116 61828**", hasData: false },
  ],

  working_hours: [
    { template: "Hamari team **Monday se Saturday, 9:00 AM se 7:00 PM** tak available rehti hai. Urgent WhatsApp messages par 24x7 response milta hai! 🕐\n\n📞 +91 98116 61828", hasData: false },
  ],

  booking: [
    { template: "Bilkul! Main aapka free consultation & demo schedule kar deta hoon. 📅\n\nNeeche **Quick Callback Form** fill karein ya seedha call/WhatsApp karein: **+91 98116 61828**", hasData: false },
  ],

  quotation: [
    { template: "Free Project Quotation ke liye details share karein:\n1. Project type (Website, App, CRM, WhatsApp Bot)\n2. Required key features\n3. Preferred timeline\n\nYa neeche form submit karein — 24 ghante mein custom proposal milega! 📋", hasData: false },
  ],

  portfolio: [
    { template: "Kvantum Tech Solutions Case Studies & Portfolio Highlights:\n\n🌐 **Corporate Websites**: High-conversion Next.js & React sites\n🛒 **eCommerce**: Custom shopping platforms with payment gateway & inventory sync\n🤖 **WhatsApp Bots**: Automated lead capturing & customer support bots\n📊 **CRM & HRMS**: Enterprise lead management & payroll tools\n\nDetailed portfolio URL: **kvantumtechsolutions.com/projects** 🎯", hasData: false },
  ],

  support: [
    { template: "Technical Support chahiye? Hum help karne ke liye tayyar hain! 🛠️\n\n• Call/WhatsApp: **+91 98116 61828**\n• Email: **info@kvantumtechsolutions.com**\n\nSath hi 3–6 months ka free post-delivery maintenance har project par milta hai!", hasData: false },
  ],

  human_agent: [
    { template: "Sure! Main aapko executive team se connect kar raha hoon. 📞\n\nApna **naam aur phone number** enter karein — hamara expert 30 mins me contact karega:\nWhatsApp/Call: **+91 98116 61828**", hasData: false },
  ],

  clarification: [
    { template: "Thoda aur specify kar sakte hain? Aap inme se kiske baare mein jaanna chahte hain?\n\n• Website / eCommerce\n• WhatsApp Automation\n• CRM / HRMS Software\n• Mobile App / Custom Software\n\nNeeche suggestion click karein! 👇", hasData: false },
  ],

  fallback: [
    { template: "Is specific question ki detail website guide se match nahi hui. Kya aap thoda detail bata sakte hain? Ya seedha team se poochhiye:\n\n📱 **WhatsApp**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com 🙏", hasData: false },
  ],

  blog: [
    { template: "Hamare latest blogs aur technical guides yahan available hain: **kvantumtechsolutions.com/blog** 📚\n\nTopics: AI Automation, Web Tech, WhatsApp API, Business Growth.", hasData: false },
  ],

  unknown: [
    { template: "Maafi chahta hoon, main sirf Kvantum Tech Solutions ke software, websites, CRM, WhatsApp automation aur pricing ke baare mein answer kar sakta hoon. Kya seekhna chahte hain? 🙏", hasData: false },
  ],
};

// Dynamic Context-Aware Suggestions per Intent
export const QUICK_REPLIES: Record<string, string[]> = {
  greeting:        ['Services kya hain?', 'Pricing batao', 'Portfolio dikhao', 'Contact details'],
  about:           ['Services kya hain?', 'Portfolio dikhao', 'Client list', 'Contact team'],
  services:        ['Website pricing?', 'WhatsApp Bot pricing', 'CRM pricing', 'Demo schedule karo'],
  pricing:         ['Website pricing', 'eCommerce pricing', 'CRM pricing', 'Quote chahiye'],
  portfolio:       ['Website examples', 'CRM portfolio', 'WhatsApp bot demo', 'Quote le lo'],
  contact:         ['Call karo', 'WhatsApp karo', 'Office location', 'Quote chahiye'],
  booking:         ['Call me back', 'Demo schedule karo', 'WhatsApp link'],
  support:         ['Call support', 'WhatsApp support', 'Email support'],
  fallback:        ['Services batao', 'Pricing batao', 'Portfolio dikhao', 'Contact team'],
  unknown:         ['Services kya hain?', 'Pricing batao', 'Contact details'],
};

// Service-Specific Hyper-Relevant Suggestions
export const SERVICE_QUICK_REPLIES: Record<string, string[]> = {
  website_development: ['Website pricing?', 'eCommerce banwana hai', 'Portfolio dikhao', 'Quote chahiye'],
  ecommerce_website:   ['eCommerce pricing?', 'Payment gateway feature?', 'Portfolio dikhao', 'Demo schedule karo'],
  whatsapp_automation: ['WhatsApp Bot pricing', 'Bulk WhatsApp API', 'Demo schedule karo', 'Contact team'],
  crm_software:        ['CRM pricing?', 'Lead tracking feature', 'CRM Demo chahiye', 'Quote le lo'],
  hrms_software:       ['HRMS Payroll feature', 'Attendance tracking', 'HRMS pricing', 'Demo schedule karo'],
  mobile_app:          ['Android/iOS app cost', 'Flutter/React Native', 'App portfolio', 'Quote chahiye'],
  business_automation: ['Automation pricing', 'Workflow automation', 'Demo schedule karo', 'Contact team'],
  custom_software:     ['Custom software cost', 'Tech stack kya hai?', 'Quote chahiye', 'Contact team'],
};

/**
 * Get contextually relevant quick reply suggestions
 */
export function getQuickReplies(intent: string, serviceKey?: string): string[] {
  if (serviceKey && SERVICE_QUICK_REPLIES[serviceKey]) {
    return SERVICE_QUICK_REPLIES[serviceKey];
  }
  return QUICK_REPLIES[intent] ?? QUICK_REPLIES['fallback'];
}

/**
 * Pick a random template variant for the given intent
 */
export function pickTemplate(intent: string): ResponseTemplate {
  const templates = RESPONSE_TEMPLATES[intent] ?? RESPONSE_TEMPLATES['fallback'];
  return templates[Math.floor(Math.random() * templates.length)];
}
