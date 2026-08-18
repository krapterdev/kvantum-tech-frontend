import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return new NextResponse('File path missing', { status: 400 });
    }
    const filePath = path.join('/');
    const targetUrl = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/${filePath}`;

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KvantumBot/1.0)',
      },
    });

    if (!res.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const contentType = res.headers.get('content-type') || (filePath.endsWith('.png') ? 'image/png' : filePath.endsWith('.webp') ? 'image/webp' : 'image/jpeg');
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'index, follow, max-image-preview:large',
      },
    });
  } catch (error: any) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
