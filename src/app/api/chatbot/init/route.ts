import { NextRequest, NextResponse } from 'next/server';
import { getChatbotPool } from '@/lib/chatbot/database/db';
import * as fs from 'fs';
import * as path from 'path';

// Initialize all chatbot DB tables
export async function POST(req: NextRequest) {
  try {
    const schemaPath = path.join(process.cwd(), 'src/lib/chatbot/database/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf-8');

    const pool = getChatbotPool();
    const client = await pool.connect();
    try {
      await client.query(sql);
      return NextResponse.json({ success: true, message: 'Chatbot schema initialized ✅' });
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error('[INIT] Schema init failed:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
