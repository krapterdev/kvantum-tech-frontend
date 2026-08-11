/**
 * Response Templates — multi-variant template-based NLG
 * {service}, {price}, {name} etc. are filled dynamically from DB data
 */

export interface ResponseTemplate {
  template: string;
  hasData: boolean; // needs DB data to fill variables
}

export const RESPONSE_TEMPLATES: Record<string, ResponseTemplate[]> = {

  greeting: [
    { template: "Namaste! 🙏 Main Kvantum Tech Solutions ka virtual assistant hoon. Aap website development, CRM, HRMS, WhatsApp automation ya kisi bhi service ke baare mein pooch sakte hain!", hasData: false },
    { template: "Hi! 👋 Main aapki help karne ke liye available hoon. Aap hmare services, pricing, portfolio ya contact ke baare mein kuch bhi pooch sakte hain.", hasData: false },
    { template: "Hello! Kvantum Tech Solutions mein aapka swagat hai. Main aapko apni services, pricing aur solutions ke baare mein sab kuch bata sakta hoon — kya jaanna chahte ho?", hasData: false },
  ],

  goodbye: [
    { template: "Shukriya aapse baat karke! Koi bhi project ya service ke liye, hum hamesha available hain. Shubhkamnayein! 🙏", hasData: false },
    { template: "Alvida! Agar future mein koi requirement ho, to zaroor sampark karein. Dhanyawad! 👋", hasData: false },
  ],

  about: [
    { template: "Kvantum Tech Solutions ek leading IT company hai jo Delhi NCR mein operate karti hai. Hum custom software, web development, CRM, HRMS, WhatsApp automation aur business automation solutions provide karte hain. Humara team experienced professionals se bana hai jo aapke business goals ko technology se achieve karne mein madad karta hai. 💡", hasData: false },
    { template: "Hum Kvantum Tech Solutions hain — ek full-stack IT solutions company based in Delhi NCR. Hamare services mein custom software development, web & mobile apps, CRM/ERP systems, WhatsApp automation aur digital transformation shamil hain. Clients ki success hamaari priority hai! 🚀", hasData: false },
  ],

  services: [
    { template: "Kvantum Tech Solutions yeh services provide karta hai:\n\n🌐 **Website Development** — Corporate, landing pages, ecommerce\n🤖 **WhatsApp Automation** — Bulk messaging, chatbots, API integration\n📊 **CRM Software** — Lead management, sales tracking\n👥 **HRMS/ERP** — HR, payroll, attendance systems\n💻 **Custom Software** — Bespoke business solutions\n📱 **Mobile Apps** — Android & iOS\n⚡ **Business Automation** — Workflow & process automation\n\nKis service ke baare mein aur detail chahiye?", hasData: false },
    { template: "Hamare main services hain:\n• Custom Software Development\n• Web & Mobile App Development\n• WhatsApp Automation & API\n• CRM Software Development\n• HRMS & Payroll Systems\n• Business Process Automation\n• eCommerce Solutions\n\nKoi specific service ke baare mein batao — main detail deta hoon! 😊", hasData: false },
  ],

  pricing: [
    { template: "Hamare pricing generally project ki complexity aur requirements par depend karti hai:\n\n🌐 **Website** — ₹25,000 se shuru\n🛒 **eCommerce** — ₹40,000 se shuru\n🤖 **WhatsApp Automation** — ₹15,000 se shuru\n📊 **CRM Software** — ₹50,000 se shuru\n👥 **HRMS System** — ₹60,000 se shuru\n💻 **Custom Software** — ₹75,000 se shuru\n\nExact quote ke liye apni requirement share karo — hum free consultation dete hain! 📞", hasData: false },
    { template: "Pricing aapki specific requirements par depend karti hai. Generally:\n• Simple website: ₹25,000 – ₹75,000\n• eCommerce platform: ₹40,000 – ₹2,00,000\n• WhatsApp automation: ₹15,000 – ₹80,000\n• CRM system: ₹50,000 – ₹3,00,000\n• Custom software: ₹75,000 se upar\n\nFree consultation ke liye contact karo ya neeche form bharo! 💬", hasData: false },
  ],

  contact: [
    { template: "Hum se contact karne ke tarike:\n\n📞 **Phone/WhatsApp**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com\n📍 **Office**: Delhi NCR\n🌐 **Website**: kvantumtechsolutions.com\n\nYa neeche quick callback form fill karo — team 24 ghante mein contact karegi! ✅", hasData: false },
    { template: "Kvantum Tech team se baat karne ke liye:\n• 📱 WhatsApp/Call: +91 98116 61828\n• 📧 Email: info@kvantumtechsolutions.com\n• 🌐 Website contact form: kvantumtechsolutions.com/contact\n\nYa mujhe batao aapki requirement — main abhi note kar leta hoon! 📝", hasData: false },
  ],

  location: [
    { template: "Kvantum Tech Solutions Delhi NCR mein based hai. Hamare clients ke saath mostly online/virtual meetings hoti hain, isliye poore India mein serve karte hain. 📍\n\nMeeting ya site visit ke liye pehle call ya WhatsApp par sampark karo: **+91 98116 61828**", hasData: false },
  ],

  working_hours: [
    { template: "Kvantum Tech Solutions team **Monday se Saturday, 9 AM – 7 PM** available rehti hai. Emergency support ke liye WhatsApp kar sakte hain. 🕐\n\n📞 +91 98116 61828", hasData: false },
  ],

  booking: [
    { template: "Bilkul! Main aapka consultation schedule kar deta hoon. Kya aap apna **naam, phone number aur requirement** share karenge? Team 24 ghante mein aapse sampark karegi. 📅", hasData: false },
    { template: "Free consultation book karne ke liye:\n1. Neeche form fill karo (naam, phone, requirement)\n2. Ya seedha call/WhatsApp karo: **+91 98116 61828**\n3. Ya email karo: info@kvantumtechsolutions.com\n\nKaunsa tarika prefer karenge? 😊", hasData: false },
  ],

  quotation: [
    { template: "Bilkul! Free quotation ke liye apni requirement share karo:\n• Kya banana hai? (website, app, software, etc.)\n• Features kya chahiye?\n• Budget range?\n• Timeline?\n\nYa neeche form bharo — team detail quote bhejegi! 📋", hasData: false },
  ],

  portfolio: [
    { template: "Hamare portfolio mein diverse projects hain:\n• Corporate websites & landing pages\n• eCommerce platforms\n• WhatsApp automation systems\n• CRM & HRMS implementations\n• Custom business software\n\nDetailed portfolio dekhne ke liye: **kvantumtechsolutions.com/projects** 🎯\n\nYa specific industry/type ka example chahiye?", hasData: false },
  ],

  support: [
    { template: "Samajh gaya — support chahiye! Kya issue aa raha hai? Batao:\n• Kya website/software kaam nahi kar raha?\n• Koi error message dikh raha hai?\n• Kya feature add/change karna hai?\n\nYa seedha call karo: **+91 98116 61828** 🛠️", hasData: false },
  ],

  human_agent: [
    { template: "Bilkul! Main aapko team se connect karta hoon. Apna **naam aur phone number** share karo — ek team member 30 minutes mein call karega. 📞\n\nYa seedha call/WhatsApp karo: **+91 98116 61828**", hasData: false },
  ],

  lead_collected: [
    { template: "✅ Aapki requirement note kar li gayi hai! Hamare team member jald hi aapse sampark karenge.\n\nMeanwhile, aap website check kar sakte hain: **kvantumtechsolutions.com**\n\nKoi aur sawaal? 😊", hasData: false },
  ],

  clarification: [
    { template: "Interesting! Thoda aur detail de sakte hain? Specifically:\n• Kya banana/chahiye?\n• Kisi particular service ke baare mein pooch rahe hain?\n\nIsse main aapko better help kar sakta hoon! 🤔", hasData: false },
    { template: "Mujhe thoda aur samajhna hoga. Kya aap specify kar sakte hain kis topic ke baare mein pooch rahe hain? Service, pricing, portfolio, ya kuch aur? 😊", hasData: false },
  ],

  fallback: [
    { template: "Hmm, is sawaal ka exact answer mujhe website information se nahi mil raha. Kya aap thoda aur detail mein bata sakte hain? Ya seedha team se poochhna chahenge:\n📞 **+91 98116 61828** | 📧 **info@kvantumtechsolutions.com** 🙏", hasData: false },
    { template: "Maafi chahta hoon — is specific sawaal ka jawab mujhse abhi possible nahi. Lekin aap directly team se sampark kar sakte hain:\n• 📱 WhatsApp: +91 98116 61828\n• 📧 info@kvantumtechsolutions.com\n\nKoi aur cheez mein help karoon? 😊", hasData: false },
  ],

  blog: [
    { template: "Hamare blog mein technical insights aur business automation guides available hain! Dekhne ke liye: **kvantumtechsolutions.com/blog** 📚\n\nKisi specific topic par article chahiye?", hasData: false },
  ],

  unknown: [
    { template: "Maafi chahta hoon, lekin is sawaal ka jawab mujhe nahi pata. Main sirf Kvantum Tech Solutions ki services, pricing, portfolio aur contact information ke baare mein help kar sakta hoon. Kya aur kuch poochhna chahte hain? 🙏", hasData: false },
  ],

  // Quick reply suggestions per intent
};

export const QUICK_REPLIES: Record<string, string[]> = {
  greeting:        ['Services kya hain?', 'Pricing batao', 'Contact details'],
  about:           ['Services kya hain?', 'Portfolio dikhao', 'Contact karo'],
  services:        ['Pricing kya hai?', 'Portfolio dikhao', 'Quote chahiye'],
  pricing:         ['Website pricing', 'CRM pricing', 'Quote chahiye', 'Contact karo'],
  portfolio:       ['Website examples', 'CRM examples', 'Quote le lo'],
  contact:         ['Call karo', 'WhatsApp karo', 'Quote chahiye'],
  booking:         ['Call me back', 'Quote chahiye', 'WhatsApp karo'],
  support:         ['Call karo', 'Email karo', 'WhatsApp karo'],
  fallback:        ['Services batao', 'Contact karo', 'Quote chahiye'],
  unknown:         ['Services kya hain?', 'Contact karo', 'Pricing batao'],
};

/**
 * Pick a random template variant for the given intent
 */
export function pickTemplate(intent: string): ResponseTemplate {
  const templates = RESPONSE_TEMPLATES[intent] ?? RESPONSE_TEMPLATES['fallback'];
  return templates[Math.floor(Math.random() * templates.length)];
}
