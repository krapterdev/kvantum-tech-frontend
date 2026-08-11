import { NextRequest, NextResponse } from 'next/server';
import { processChat, saveChatLead } from '@/lib/chatbot/engine/ChatEngine';

// Rate limiting: simple in-memory map (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;      // max messages per window
const RATE_WINDOW = 60000;  // 1 minute window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Bahut zyada messages! Thoda ruko phir try karo. 🙏' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, sessionKey, language, leadData } = body;

    // Handle lead form submission
    if (leadData && body.sessionId) {
      const saved = await saveChatLead(body.sessionId, leadData);

      // Also save to kts_queued_leads via contactService pattern
      const { submitContact } = await import('@/services/contactService').catch(() => ({ submitContact: null }));
      if (submitContact && leadData.phone) {
        await (submitContact as Function)({
          name: leadData.name || 'Chat Lead',
          email: leadData.email || 'chat@kvantumtechsolutions.com',
          phone: leadData.phone,
          service: leadData.service || 'Chat Inquiry',
          notes: `Chat Lead — Requirement: ${leadData.requirement || 'N/A'} | Budget: ${leadData.budget || 'N/A'}`,
        }).catch(() => null);
      }

      return NextResponse.json({ success: saved, message: 'Lead saved!' });
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Sanitize input
    const sanitized = message.slice(0, 500).replace(/<[^>]+>/g, '');
    if (!sanitized.trim()) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 });
    }

    const sessionId = (sessionKey ?? `anon_${ip}_${Date.now()}`).slice(0, 128);

    const response = await processChat({
      message: sanitized,
      sessionKey: sessionId,
      language: language === 'en' || language === 'hi' || language === 'hinglish' ? language : 'en',
      ip,
    });

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('[CHAT API] Error:', err);
    return NextResponse.json(
      {
        reply: 'Maafi chahta hoon, abhi ek technical issue aa raha hai. Seedha contact karein: +91 98116 61828 🙏',
        intent: 'error',
        confidence: 0,
        quickReplies: ['Contact karo', 'WhatsApp karo'],
      },
      { status: 200 }  // Return 200 so frontend shows message gracefully
    );
  }
}
