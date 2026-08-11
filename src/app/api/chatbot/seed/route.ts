import { NextRequest, NextResponse } from 'next/server';
import { Indexer } from '@/lib/chatbot/crawler/Indexer';
import { fallbackServices } from '@/data/services';
import { fallbackBlogs } from '@/data/blogs';

// Static FAQs for seeding
const STATIC_FAQS = [
  { question: 'Aap kya services provide karte ho?', answer: 'Kvantum Tech Solutions custom software development, web development, ecommerce, WhatsApp automation, CRM, HRMS, mobile apps aur business automation services provide karta hai. Delhi NCR ke ek leading IT company hain hum.', keywords: ['services','kya karte','provide'], category: 'services', priority: 10 },
  { question: 'Website development ka price kya hai?', answer: 'Website development ₹25,000 se shuru hoti hai. Simple corporate website ₹25,000–₹75,000, ecommerce ₹40,000–₹2,00,000 tak hoti hai. Final price requirements par depend karti hai. Free consultation ke liye contact karein.', keywords: ['website','price','cost','kitna'], category: 'pricing', priority: 10 },
  { question: 'WhatsApp automation kya hoti hai?', answer: 'WhatsApp automation mein bulk messaging, chatbot, customer support automation, lead generation aur WhatsApp Business API integration shamil hai. Isse businesses apne customers ke saath automatically communicate kar sakte hain. Starting ₹15,000 se.', keywords: ['whatsapp','automation','bulk'], category: 'services', priority: 9 },
  { question: 'CRM software ki pricing kya hai?', answer: 'CRM software ₹50,000 se shuru hoti hai. Ismein lead management, sales tracking, customer database, reports aur workflow automation shamil hoti hai. Custom features ke saath price vary karta hai.', keywords: ['crm','price','cost'], category: 'pricing', priority: 9 },
  { question: 'HRMS kya hota hai?', answer: 'HRMS (Human Resource Management System) mein employee management, payroll processing, attendance tracking, leave management aur performance appraisal shamil hoti hai. ₹60,000 se shuru. Aapke business ke liye custom build karte hain.', keywords: ['hrms','hr','payroll','employee'], category: 'services', priority: 9 },
  { question: 'Aap Delhi NCR mein ho?', answer: 'Haan, Kvantum Tech Solutions Delhi NCR mein based hai. Hum primarily online/virtual meetings karte hain aur poore India mein clients serve karte hain. Contact ke liye: +91 98116 61828', keywords: ['delhi','ncr','location','kahan'], category: 'contact', priority: 8 },
  { question: 'Contact kaise karein?', answer: 'Kvantum Tech se contact ke liye: Phone/WhatsApp: +91 98116 61828, Email: info@kvantumtechsolutions.com, Website: kvantumtechsolutions.com/contact. Monday–Saturday 9 AM – 7 PM available hain.', keywords: ['contact','phone','email','call'], category: 'contact', priority: 10 },
  { question: 'Mobile app development kitne mein hoti hai?', answer: 'Mobile app development ₹75,000 se shuru hoti hai. Android, iOS ya cross-platform (Flutter/React Native) — sabke liye build karte hain. Features aur complexity ke saath price vary karta hai. Free quote ke liye contact karein.', keywords: ['mobile','app','android','ios','price'], category: 'pricing', priority: 8 },
  { question: 'Custom software development kya hai?', answer: 'Custom software development mein aapki specific business requirements ke liye tailored software banana shaamil hai — jaise inventory system, billing software, ERP, reporting tools, APIs aur integrations. ₹75,000 se shuru.', keywords: ['custom','software','bespoke','business'], category: 'services', priority: 8 },
  { question: 'Kitne time mein project complete hota hai?', answer: 'Timeline project complexity par depend karti hai. Simple website: 2–4 weeks. eCommerce: 4–8 weeks. CRM/HRMS: 8–16 weeks. Custom software: 3–6 months. Exact timeline discussion ke baad confirm hoti hai.', keywords: ['time','timeline','kab','complete','deliver'], category: 'general', priority: 7 },
  { question: 'Kya free demo milta hai?', answer: 'Haan! Hum free consultation aur demo dete hain. Call/WhatsApp karein: +91 98116 61828 ya website par contact form bharo. Team jald hi schedule karegi.', keywords: ['demo','free','consultation'], category: 'general', priority: 8 },
  { question: 'Post-launch support milega?', answer: 'Bilkul! Hum 3–6 months free support dete hain project delivery ke baad. Uske baad affordable annual maintenance packages available hain. Aapka project hamesha smoothly run kare — ye hamaari zimmedari hai.', keywords: ['support','maintenance','after','post'], category: 'support', priority: 7 },
];

export async function POST(req: NextRequest) {
  try {
    const indexer = new Indexer();

    // Seed from local static data
    const count = await indexer.seedFromStaticData(
      fallbackServices as any[],
      fallbackBlogs as any[],
      STATIC_FAQS
    );

    return NextResponse.json({
      success: true,
      message: `✅ Seeded ${count} knowledge items from local data`,
      count,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
