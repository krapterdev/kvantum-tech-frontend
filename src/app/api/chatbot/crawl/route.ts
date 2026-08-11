import { NextRequest, NextResponse } from 'next/server';
import { Indexer } from '@/lib/chatbot/crawler/Indexer';

export async function POST(req: NextRequest) {
  try {
    const indexer = new Indexer();
    const results = await indexer.crawlWebsite();
    const successful = results.filter(r => r.success);
    const totalChunks = successful.reduce((s, r) => s + r.chunksIndexed, 0);

    return NextResponse.json({
      success: true,
      pagesProcessed: results.length,
      pagesSuccessful: successful.length,
      totalChunksIndexed: totalChunks,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
