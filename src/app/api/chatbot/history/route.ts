import { NextRequest, NextResponse } from 'next/server';
import { chatbotQuery } from '@/lib/chatbot/database/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionKey = searchParams.get('sessionKey');
  if (!sessionKey) return NextResponse.json([]);

  try {
    const rows = await chatbotQuery<any>(
      `SELECT m.role, m.content, m.intent, m.confidence, m.created_at
       FROM chat_messages m
       JOIN chat_sessions s ON s.id = m.session_id
       WHERE s.session_key = $1
       ORDER BY m.created_at ASC
       LIMIT 50`,
      [sessionKey]
    );
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json([]);
  }
}
