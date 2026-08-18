import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { fallbackBlogs } from '@/data/blogs';

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

let poolInstance: Pool | null = null;
function getPool() {
  if (!poolInstance) {
    try {
      poolInstance = new Pool({
        connectionString: DB_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 3000,
      });
    } catch (e) {}
  }
  return poolInstance;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const pool = getPool();
    if (pool) {
      const res = await pool.query('SELECT * FROM blogs WHERE slug = $1 OR id = $1', [slug]);
      if (res.rows && res.rows.length > 0) {
        return NextResponse.json(res.rows[0]);
      }
    }
  } catch (err) {
    console.warn('[NEXT API GET BLOG BY SLUG WARN]', err);
  }

  const found = fallbackBlogs.find((b: any) => b.slug === slug || b.id === slug || b._id === slug);
  if (found) {
    return NextResponse.json(found);
  }

  return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
}
