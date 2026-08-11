import { NextRequest, NextResponse } from 'next/server';
import { chatbotQuery } from '@/lib/chatbot/database/db';

export async function POST(req: NextRequest) {
  try {
    const { messageId, helpful } = await req.json();
    if (!messageId || helpful === undefined) {
      return NextResponse.json({ error: 'messageId and helpful required' }, { status: 400 });
    }
    await chatbotQuery(
      `INSERT INTO chat_feedback (message_id, helpful) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [messageId, helpful]
    );
    await chatbotQuery(
      `UPDATE chat_messages SET helpful = $1 WHERE id = $2`,
      [helpful, messageId]
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
