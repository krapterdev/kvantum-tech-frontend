/**
 * Multi-Language Response Templates & Quick Replies Configuration
 * Supports: 'en' (English), 'hinglish' (Hinglish), 'hi' (Hindi)
 */

export type Language = 'en' | 'hinglish' | 'hi';

export interface ResponseTemplate {
  template: string;
}

export const RESPONSE_TEMPLATES_BY_LANG: Record<Language, Record<string, ResponseTemplate[]>> = {
  en: {
    greeting: [
      { template: "Hello! 👋 Welcome to Kvantum Tech Solutions. I am your AI assistant.\n\nYou can ask me about **Website Development**, **WhatsApp Automation**, **CRM Systems**, **HRMS**, or any **Custom Software** solution!" },
      { template: "Hi there! 🙏 How can I assist your business today? Feel free to inquire about our IT services, pricing, portfolio, or schedule a free consultation." },
    ],
    goodbye: [
      { template: "Thank you for reaching out! 🙏 Whenever you're ready to start your project, we are here to assist.\n\n📞 Call/WhatsApp: **+91 98116 61828**\n📧 Email: **info@kvantumtechsolutions.com**\n\nHave a great day! 👋" },
    ],
    about: [
      { template: "Kvantum Tech Solutions is a premier IT solutions & software development firm based in Delhi NCR, India 📍.\n\nWe specialize in **Custom Software**, **Responsive Web Applications**, **eCommerce Platforms**, **CRM Systems**, **HRMS/Payroll**, and **WhatsApp Automation**.\n\nOur mission: Empowering growing businesses with modern, scalable, and automated digital solutions! 💡" },
    ],
    services: [
      { template: "Here are the core IT services provided by Kvantum Tech Solutions:\n\n🌐 **Web & eCommerce Development** — Starting ₹25,000\n🤖 **WhatsApp Automation & Bots** — Starting ₹15,000\n📊 **Custom CRM Software** — Starting ₹50,000\n👥 **HRMS & Payroll Systems** — Starting ₹60,000\n💻 **Enterprise Custom Software** — Starting ₹75,000\n📱 **Android & iOS Mobile Apps** — Starting ₹75,000\n⚡ **Business Process Automation** — Starting ₹30,000\n\nSelect a suggestion below or ask about any service! 👇" },
    ],
    pricing: [
      { template: "Kvantum Tech Solutions Pricing Overview:\n\n🌐 **Corporate Website**: ₹25,000 – ₹75,000\n🛒 **eCommerce Platform**: ₹40,000 – ₹2,00,000\n🤖 **WhatsApp Bot/API**: ₹15,000 – ₹80,000\n📊 **Custom CRM System**: ₹50,000 – ₹3,00,000\n👥 **HRMS Software**: ₹60,000 – ₹2,50,000\n💻 **Custom Software**: ₹75,000 onwards\n\nContact us for an exact quotation & free technical proposal! 📞" },
    ],
    contact: [
      { template: "Ways to get in touch with our team:\n\n📱 **WhatsApp / Phone**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com\n📍 **Location**: Delhi NCR, India\n🌐 **Website**: kvantumtechsolutions.com\n⏰ **Hours**: Mon – Sat (9:00 AM – 7:00 PM)\n\nOr click **'Book Demo/Quote'** below to request an instant callback! ✅" },
    ],
    location: [
      { template: "Kvantum Tech Solutions operates its primary office in Delhi NCR, India 📍. We serve clients across India & globally via virtual meetings and remote collaboration.\n\nContact: **+91 98116 61828**" },
    ],
    working_hours: [
      { template: "Our business hours are **Monday through Saturday, 9:00 AM to 7:00 PM IST**. Emergency WhatsApp support is monitored 24/7! 🕐\n\n📞 +91 98116 61828" },
    ],
    booking: [
      { template: "We would be glad to schedule a free consultation & live project demo for you! 📅\n\nPlease fill out the **Quick Callback Form** below or reach us directly at **+91 98116 61828**." },
    ],
    quotation: [
      { template: "To receive a detailed project quotation, please share:\n1. Project Scope (Website, App, CRM, WhatsApp Bot)\n2. Key Features Needed\n3. Estimated Timeline\n\nOr submit the form below for a custom proposal within 24 hours! 📋" },
    ],
    portfolio: [
      { template: "Kvantum Tech Solutions Project Portfolio Highlights:\n\n🌐 **Corporate Websites**: High-speed Next.js & React platforms\n🛒 **eCommerce**: Custom stores with payment gateway & inventory sync\n🤖 **WhatsApp Bots**: Automated lead generation & support systems\n📊 **CRM & HRMS**: Enterprise management & payroll platforms\n\nView full portfolio: **kvantumtechsolutions.com/projects** 🎯" },
    ],
    support: [
      { template: "Need technical support for your project? We are ready to help! 🛠️\n\n• Phone/WhatsApp: **+91 98116 61828**\n• Email: **info@kvantumtechsolutions.com**\n\nAll our custom projects include 3–6 months of complimentary post-delivery support." },
    ],
    human_agent: [
      { template: "Connecting you with our technical specialist! 📞\n\nPlease submit your **Name and Phone Number** using the form below, and an expert will call you back within 30 minutes." },
    ],
    clarification: [
      { template: "Could you please specify your requirement? You can ask about:\n• Website / eCommerce\n• WhatsApp Automation\n• CRM / HRMS Software\n• Mobile App / Custom Software\n\nClick a suggestion below! 👇" },
    ],
    fallback: [
      { template: "I couldn't find an exact match for your query in our knowledge base. Please rephrase or contact our team directly:\n\n📱 **WhatsApp**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com 🙏" },
    ],
    blog: [
      { template: "Explore our latest technical insights and software automation guides at **kvantumtechsolutions.com/blog** 📚" },
    ],
    unknown: [
      { template: "I apologize, I am trained specifically on Kvantum Tech Solutions services, software development, pricing, and portfolio. How may I help you with your project? 🙏" },
    ],
  },

  hinglish: {
    greeting: [
      { template: "Namaste! 🙏 Main Kvantum Tech Solutions ka AI-powered assistant hoon.\n\nAap **Website**, **WhatsApp Automation**, **CRM**, **HRMS** ya kisi bhi custom software ke baare mein pooch sakte hain! Kaise help karoon?" },
      { template: "Hi! 👋 Welcome to Kvantum Tech Solutions. Main aapko hamari **Services**, **Pricing**, **Portfolio** aur **Solutions** ke baare mein complete details de sakta hoon. Kya jaanna chahte hain?" },
    ],
    goodbye: [
      { template: "Shukriya aapse baat karke! 🙏 Aap jab bhi ready hon, hum aapka project build karne ke liye available hain.\n\n📞 Direct Call/WhatsApp: **+91 98116 61828**\n📧 Email: **info@kvantumtechsolutions.com**\n\nShubhkamnayein! 👋" },
    ],
    about: [
      { template: "Kvantum Tech Solutions ek leading IT Company hai based in Delhi NCR 📍.\n\nHum businesses ke liye **Custom Software**, **Responsive Websites**, **eCommerce Platforms**, **CRM Systems**, **HRMS/Payroll** aur **WhatsApp Automation** build karte hain.\n\nHamara goal: Technology se aapke business operations ko simplified aur 10x faster banana! 💡" },
    ],
    services: [
      { template: "Kvantum Tech Solutions yeh primary services offer karta hai:\n\n🌐 **Website & eCommerce Development** — Starting ₹25,000\n🤖 **WhatsApp Automation & Bots** — Starting ₹15,000\n📊 **Custom CRM Software** — Starting ₹50,000\n👥 **HRMS & Payroll Systems** — Starting ₹60,000\n💻 **Enterprise Custom Software** — Starting ₹75,000\n📱 **Android & iOS Mobile Apps** — Starting ₹75,000\n⚡ **Workflow & Business Automation** — Starting ₹30,000\n\nKisi specific service ke baare mein detail chahiye? Click a suggestion below! 👇" },
    ],
    pricing: [
      { template: "Kvantum Tech Solutions Pricing Overview:\n\n🌐 **Corporate Website**: ₹25,000 – ₹75,000\n🛒 **eCommerce Store**: ₹40,000 – ₹2,00,000\n🤖 **WhatsApp Bot/API**: ₹15,000 – ₹80,000\n📊 **Custom CRM System**: ₹50,000 – ₹3,00,000\n👥 **HRMS/Payroll Software**: ₹60,000 – ₹2,50,000\n💻 **Custom Software**: ₹75,000 onwards\n\nExact quote ke liye apni requirements share karein — free consultation available hai! 📞" },
    ],
    contact: [
      { template: "Humse contact karne ke options:\n\n📱 **WhatsApp / Call**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com\n📍 **Location**: Delhi NCR, India\n🌐 **Website**: kvantumtechsolutions.com\n⏰ **Hours**: Mon – Sat (9 AM – 7 PM)\n\nNeeche **'Demo/Quote'** button press karke callback request bhi bhej sakte hain! ✅" },
    ],
    location: [
      { template: "Kvantum Tech Solutions Delhi NCR mein main office operate karti hai. Hum virtual meetings & remote collaboration ke through poore India & Global clients ko serve karte hain. 📍\n\nContact: **+91 98116 61828**" },
    ],
    working_hours: [
      { template: "Hamari team **Monday se Saturday, 9:00 AM se 7:00 PM** tak available rehti hai. Urgent WhatsApp messages par 24x7 response milta hai! 🕐\n\n📞 +91 98116 61828" },
    ],
    booking: [
      { template: "Bilkul! Main aapka free consultation & demo schedule kar deta hoon. 📅\n\nNeeche **Quick Callback Form** fill karein ya seedha call/WhatsApp karein: **+91 98116 61828**" },
    ],
    quotation: [
      { template: "Free Project Quotation ke liye details share karein:\n1. Project type (Website, App, CRM, WhatsApp Bot)\n2. Required key features\n3. Preferred timeline\n\nYa neeche form submit karein — 24 ghante mein custom proposal milega! 📋" },
    ],
    portfolio: [
      { template: "Kvantum Tech Solutions Case Studies & Portfolio Highlights:\n\n🌐 **Corporate Websites**: High-conversion Next.js & React sites\n🛒 **eCommerce**: Custom shopping platforms with payment gateway & inventory sync\n🤖 **WhatsApp Bots**: Automated lead capturing & customer support bots\n📊 **CRM & HRMS**: Enterprise lead management & payroll tools\n\nDetailed portfolio URL: **kvantumtechsolutions.com/projects** 🎯" },
    ],
    support: [
      { template: "Technical Support chahiye? Hum help karne ke liye tayyar hain! 🛠️\n\n• Call/WhatsApp: **+91 98116 61828**\n• Email: **info@kvantumtechsolutions.com**\n\nSath hi 3–6 months ka free post-delivery maintenance har project par milta hai!" },
    ],
    human_agent: [
      { template: "Sure! Main aapko executive team se connect kar raha hoon. 📞\n\nApna **naam aur phone number** enter karein — hamara expert 30 mins me contact karega:\nWhatsApp/Call: **+91 98116 61828**" },
    ],
    clarification: [
      { template: "Thoda aur specify kar sakte hain? Aap inme se kiske baare mein jaanna chahte hain?\n\n• Website / eCommerce\n• WhatsApp Automation\n• CRM / HRMS Software\n• Mobile App / Custom Software\n\nNeeche suggestion click karein! 👇" },
    ],
    fallback: [
      { template: "Is specific question ki detail website guide se match nahi hui. Kya aap thoda detail bata sakte hain? Ya seedha team se poochhiye:\n\n📱 **WhatsApp**: +91 98116 61828\n📧 **Email**: info@kvantumtechsolutions.com 🙏" },
    ],
    blog: [
      { template: "Hamare latest blogs aur technical guides yahan available hain: **kvantumtechsolutions.com/blog** 📚" },
    ],
    unknown: [
      { template: "Maafi chahta hoon, main sirf Kvantum Tech Solutions ke software, websites, CRM, WhatsApp automation aur pricing ke baare mein answer kar sakta hoon. Kya seekhna chahte hain? 🙏" },
    ],
  },

  hi: {
    greeting: [
      { template: "नमस्ते! 🙏 मैं क्वैंटम टेक सॉल्यूशंस का AI सहायक हूँ।\n\nआप **वेबसाइट**, **व्हाट्सएप ऑटोमेशन**, **CRM**, **HRMS** या किसी भी कस्टम सॉफ्टवेयर के बारे में पूछ सकते हैं! मैं आपकी क्या सहायता कर सकता हूँ?" },
      { template: "नमस्ते! 👋 क्वैंटम टेक सॉल्यूशंस में आपका स्वागत है। मैं आपको हमारी **सेवाओं**, **कीमतों**, **पोर्टफोलियो** और **समाधानों** की पूरी जानकारी दे सकता हूँ।" },
    ],
    goodbye: [
      { template: "बात करने के लिए धन्यवाद! 🙏 जब भी आप अपना प्रोजेक्ट शुरू करने के लिए तैयार हों, हम आपकी सेवा में उपलब्ध हैं।\n\n📞 कॉल/व्हाट्सएप: **+91 98116 61828**\n📧 ईमेल: **info@kvantumtechsolutions.com**\n\nआपका दिन शुभ हो! 👋" },
    ],
    about: [
      { template: "क्वैंटम टेक सॉल्यूशंस दिल्ली एनसीआर आधारित एक अग्रणी आईटी कंपनी है 📍।\n\nहम व्यवसायों के लिए **कस्टम सॉफ्टवेयर**, **रेस्पॉन्सिव वेबसाइट**, **ई-कॉमर्स प्लेटफॉर्म**, **CRM सिस्टम**, **HRMS/पेरोल** और **व्हाट्सएप ऑटोमेशन** बनाते हैं।\n\nहमारा उद्देश्य: तकनीक के माध्यम से आपके व्यावसायिक कार्यों को सरल और 10 गुना तेज बनाना! 💡" },
    ],
    services: [
      { template: "क्वैंटम टेक सॉल्यूशंस द्वारा प्रदान की जाने वाली मुख्य सेवाएं:\n\n🌐 **वेबसाइट और ई-कॉमर्स विकास** — शुरुआती ₹25,000\n🤖 **व्हाट्सएप ऑटोमेशन और बॉट्स** — शुरुआती ₹15,000\n📊 **कस्टम CRM सॉफ्टवेयर** — शुरुआती ₹50,000\n👥 **HRMS और पेरोल सिस्टम** — शुरुआती ₹60,000\n💻 **एंटरप्राइज कस्टम सॉफ्टवेयर** — शुरुआती ₹75,000\n📱 **एंड्रॉइड और iOS मोबाइल ऐप्स** — शुरुआती ₹75,000\n⚡ **बिजनेस ऑटोमेशन** — शुरुआती ₹30,000\n\nकिसी विशिष्ट सेवा के बारे में जानने के लिए नीचे सुझाव पर क्लिक करें! 👇" },
    ],
    pricing: [
      { template: "क्वैंटम टेक सॉल्यूशंस मूल्य निर्धारण:\n\n🌐 **कॉर्पोरेट वेबसाइट**: ₹25,000 – ₹75,000\n🛒 **ई-कॉमर्स स्टोर**: ₹40,000 – ₹2,00,000\n🤖 **व्हाट्सएप बॉट/एपीआई**: ₹15,000 – ₹80,000\n📊 **कस्टम CRM सिस्टम**: ₹50,000 – ₹3,00,000\n👥 **HRMS सॉफ्टवेयर**: ₹60,000 – ₹2,50,000\n💻 **कस्टम सॉफ्टवेयर**: ₹75,000 से आगे\n\nसटीक कोटेशन और मुफ्त परामर्श के लिए हमसे संपर्क करें! 📞" },
    ],
    contact: [
      { template: "हमारी टीम से संपर्क करने के तरीके:\n\n📱 **व्हाट्सएप / कॉल**: +91 98116 61828\n📧 **ईमेल**: info@kvantumtechsolutions.com\n📍 **स्थान**: दिल्ली एनसीआर, भारत\n🌐 **वेबसाइट**: kvantumtechsolutions.com\n⏰ **समय**: सोमवार – शनिवार (सुबह 9 - शाम 7 बजे)\n\nतुरंत कॉलबैक के लिए नीचे फॉर्म भरें! ✅" },
    ],
    location: [
      { template: "क्वैंटम टेक सॉल्यूशंस का मुख्य कार्यालय दिल्ली एनसीआर, भारत में है 📍। हम पूरे भारत और वैश्विक ग्राहकों को वर्चुअल मीटिंग के माध्यम से सेवाएं प्रदान करते हैं।\n\nसंपर्क: **+91 98116 61828**" },
    ],
    working_hours: [
      { template: "हमारा कार्य समय **सोमवार से शनिवार, सुबह 9:00 बजे से शाम 7:00 बजे** तक है। आपातकालीन व्हाट्सएप संदेशों का उत्तर 24x7 दिया जाता है! 🕐\n\n📞 +91 98116 61828" },
    ],
    booking: [
      { template: "बिल्कुल! मैं आपके लिए मुफ्त परामर्श और लाइव डेमो शेड्यूल कर देता हूँ। 📅\n\nकृपया नीचे **क्विक कॉलबैक फॉर्म** भरें या सीधे **+91 98116 61828** पर कॉल/व्हाट्सएप करें।" },
    ],
    quotation: [
      { template: "मुफ्त प्रोजेक्ट कोटेशन प्राप्त करने के लिए कृपया जानकारी साझा करें:\n1. प्रोजेक्ट का प्रकार (वेबसाइट, ऐप, CRM, व्हाट्सएप बॉट)\n2. आवश्यक मुख्य विशेषताएं\n3. अनुमानित समय सीमा\n\nया 24 घंटे के भीतर प्रस्ताव प्राप्त करने के लिए नीचे फॉर्म जमा करें! 📋" },
    ],
    portfolio: [
      { template: "क्वैंटम टेक सॉल्यूशंस पोर्टफोलियो की मुख्य बातें:\n\n🌐 **कॉर्पोरेट वेबसाइटें**: हाई-स्पीड नेक्स्ट.जेएस और रिएक्ट प्लेटफॉर्म\n🛒 **ई-कॉमर्स**: पेमेंट गेटवे और इन्वेंट्री सिंक के साथ कस्टम स्टोर\n🤖 **व्हाट्सएप बॉट्स**: ऑटोमेटेड लीड जनरेशन और सपोर्ट बॉट्स\n📊 **CRM और HRMS**: एंटरप्राइज प्रबंधन और पेरोल प्लेटफॉर्म\n\nपूरा पोर्टफोलियो देखें: **kvantumtechsolutions.com/projects** 🎯" },
    ],
    support: [
      { template: "तकनीकी सहायता चाहिए? हम मदद के लिए तैयार हैं! 🛠️\n\n• फोन/व्हाट्सएप: **+91 98116 61828**\n• ईमेल: **info@kvantumtechsolutions.com**\n\nहमारे सभी कस्टम प्रोजेक्ट्स में 3-6 महीने का मुफ्त डिलीवरी सहायता शामिल है।" },
    ],
    human_agent: [
      { template: "हम आपको अपने विशेषज्ञ से जोड़ रहे हैं! 📞\n\nकृपया नीचे दिए गए फॉर्म का उपयोग करके अपना नाम और फोन नंबर जमा करें, 30 मिनट के भीतर हमारा विशेषज्ञ आपको कॉल करेगा:" },
    ],
    clarification: [
      { template: "क्या आप अपनी आवश्यकता स्पष्ट कर सकते हैं? आप इनके बारे में पूछ सकते हैं:\n• वेबसाइट / ई-कॉमर्स\n• व्हाट्सएप ऑटोमेशन\n• CRM / HRMS सॉफ्टवेयर\n• मोबाइल ऐप / कस्टम सॉफ्टवेयर\n\nनीचे दिए गए सुझावों पर क्लिक करें! 👇" },
    ],
    fallback: [
      { template: "मुझे आपके प्रश्न का सटीक उत्तर नहीं मिला। कृपया पुनः स्पष्ट करें या हमारी टीम से संपर्क करें:\n\n📱 **व्हाट्सएप**: +91 98116 61828\n📧 **ईमेल**: info@kvantumtechsolutions.com 🙏" },
    ],
    blog: [
      { template: "हमारे नवीनतम तकनीकी लेख देखें: **kvantumtechsolutions.com/blog** 📚" },
    ],
    unknown: [
      { template: "क्षमा करें, मैं केवल क्वैंटम टेक सॉल्यूशंस की सेवाओं, सॉफ्टवेयर विकास, कीमतों और पोर्टफोलियो के बारे में उत्तर दे सकता हूँ। 🙏" },
    ],
  },
};

// Dynamic Context-Aware Suggestions per Language & Intent
export const QUICK_REPLIES_BY_LANG: Record<Language, Record<string, string[]>> = {
  en: {
    greeting:        ['Our Services', 'Pricing Info', 'View Portfolio', 'Contact Team'],
    about:           ['Our Services', 'View Portfolio', 'Contact Team'],
    services:        ['Website Pricing', 'WhatsApp Bot Cost', 'CRM Pricing', 'Book Demo'],
    pricing:         ['Website Pricing', 'eCommerce Pricing', 'CRM Pricing', 'Get Quote'],
    portfolio:       ['Web Portfolio', 'CRM Examples', 'WhatsApp Bot Demo', 'Get Quote'],
    contact:         ['Call Us', 'WhatsApp Us', 'Office Address', 'Get Quote'],
    booking:         ['Call Me Back', 'Schedule Demo', 'WhatsApp Link'],
    support:         ['Call Support', 'WhatsApp Support', 'Email Support'],
    fallback:        ['Our Services', 'Pricing Info', 'View Portfolio', 'Contact Team'],
    unknown:         ['Our Services', 'Pricing Info', 'Contact Details'],
  },
  hinglish: {
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
  },
  hi: {
    greeting:        ['हमारी सेवाएं', 'कीमत की जानकारी', 'पोर्टफोलियो देखें', 'संपर्क करें'],
    about:           ['हमारी सेवाएं', 'पोर्टफोलियो देखें', 'संपर्क करें'],
    services:        ['वेबसाइट की कीमत', 'व्हाट्सएप बॉट कीमत', 'CRM कीमत', 'डेमो बुक करें'],
    pricing:         ['वेबसाइट की कीमत', 'ई-कॉमर्स कीमत', 'CRM कीमत', 'कोटेशन चाहिए'],
    portfolio:       ['वेबसाइट उदाहरण', 'CRM उदाहरण', 'व्हाट्सएप बॉट डेमो', 'कोटेशन लें'],
    contact:         ['कॉल करें', 'व्हाट्सएप करें', 'कार्यालय का पता', 'कोटेशन चाहिए'],
    booking:         ['कॉलबैक चाहिए', 'डेमो शेड्यूल करें', 'व्हाट्सएप लिंक'],
    support:         ['कॉल सहायता', 'व्हाट्सएप सहायता', 'ईमेल सहायता'],
    fallback:        ['हमारी सेवाएं', 'कीमत की जानकारी', 'पोर्टफोलियो देखें', 'संपर्क करें'],
    unknown:         ['हमारी सेवाएं', 'कीमत की जानकारी', 'संपर्क विवरण'],
  },
};

// Service-Specific Hyper-Relevant Suggestions per Language
export const SERVICE_QUICK_REPLIES_BY_LANG: Record<Language, Record<string, string[]>> = {
  en: {
    website_development: ['Website Pricing?', 'Build eCommerce', 'View Portfolio', 'Get Quote'],
    ecommerce_website:   ['eCommerce Pricing?', 'Payment Gateway?', 'View Portfolio', 'Book Demo'],
    whatsapp_automation: ['WhatsApp Bot Cost', 'Bulk WhatsApp API', 'Schedule Demo', 'Contact Team'],
    crm_software:        ['CRM Pricing?', 'Lead Tracking Feature', 'CRM Demo', 'Get Quote'],
    hrms_software:       ['HRMS Payroll System', 'Attendance Tracking', 'HRMS Pricing', 'Schedule Demo'],
    mobile_app:          ['Android/iOS App Cost', 'Flutter/React Native', 'App Portfolio', 'Get Quote'],
    business_automation: ['Automation Pricing', 'Workflow Automation', 'Schedule Demo', 'Contact Team'],
    custom_software:     ['Custom Software Cost', 'Tech Stack Details', 'Get Quote', 'Contact Team'],
  },
  hinglish: {
    website_development: ['Website pricing?', 'eCommerce banwana hai', 'Portfolio dikhao', 'Quote chahiye'],
    ecommerce_website:   ['eCommerce pricing?', 'Payment gateway feature?', 'Portfolio dikhao', 'Demo schedule karo'],
    whatsapp_automation: ['WhatsApp Bot pricing', 'Bulk WhatsApp API', 'Demo schedule karo', 'Contact team'],
    crm_software:        ['CRM pricing?', 'Lead tracking feature', 'CRM Demo chahiye', 'Quote le lo'],
    hrms_software:       ['HRMS Payroll feature', 'Attendance tracking', 'HRMS pricing', 'Demo schedule karo'],
    mobile_app:          ['Android/iOS app cost', 'Flutter/React Native', 'App portfolio', 'Quote chahiye'],
    business_automation: ['Automation pricing', 'Workflow automation', 'Demo schedule karo', 'Contact team'],
    custom_software:     ['Custom software cost', 'Tech stack kya hai?', 'Quote chahiye', 'Contact team'],
  },
  hi: {
    website_development: ['वेबसाइट कीमत?', 'ई-कॉमर्स बनाएं', 'पोर्टफोलियो देखें', 'कोटेशन चाहिए'],
    ecommerce_website:   ['ई-कॉमर्स कीमत?', 'पेमेंट गेटवे?', 'पोर्टफोलियो देखें', 'डेमो बुक करें'],
    whatsapp_automation: ['व्हाट्सएप बॉट कीमत', 'बल्क व्हाट्सएप एपीआई', 'डेमो शेड्यूल करें', 'टीम से संपर्क करें'],
    crm_software:        ['CRM कीमत?', 'लीड ट्रैकिंग फीचर', 'CRM डेमो', 'कोटेशन लें'],
    hrms_software:       ['HRMS पेरोल सिस्टम', 'उपस्थिति ट्रैकिंग', 'HRMS कीमत', 'डेमो शेड्यूल करें'],
    mobile_app:          ['एंड्रॉइड/iOS ऐप कीमत', 'फ्लटर/रिएक्ट नेटिव', 'ऐप पोर्टफोलियो', 'कोटेशन चाहिए'],
    business_automation: ['ऑटोमेशन कीमत', 'वर्कफ़्लो ऑटोमेशन', 'डेमो शेड्यूल करें', 'टीम से संपर्क करें'],
    custom_software:     ['कस्टम सॉफ्टवेयर कीमत', 'तकनीकी जानकारी', 'कोटेशन चाहिए', 'टीम से संपर्क करें'],
  },
};

/**
 * Get contextually relevant quick reply suggestions per language
 */
export function getQuickReplies(intent: string, serviceKey?: string, lang: Language = 'hinglish'): string[] {
  const langServiceReplies = SERVICE_QUICK_REPLIES_BY_LANG[lang] ?? SERVICE_QUICK_REPLIES_BY_LANG['hinglish'];
  const langReplies = QUICK_REPLIES_BY_LANG[lang] ?? QUICK_REPLIES_BY_LANG['hinglish'];

  if (serviceKey && langServiceReplies[serviceKey]) {
    return langServiceReplies[serviceKey];
  }
  return langReplies[intent] ?? langReplies['fallback'];
}

/**
 * Pick a template variant for the given intent and language
 */
export function pickTemplate(intent: string, lang: Language = 'hinglish'): ResponseTemplate {
  const langTemplates = RESPONSE_TEMPLATES_BY_LANG[lang] ?? RESPONSE_TEMPLATES_BY_LANG['hinglish'];
  const templates = langTemplates[intent] ?? langTemplates['fallback'];
  return templates[Math.floor(Math.random() * templates.length)];
}
