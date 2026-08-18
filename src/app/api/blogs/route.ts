import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const pool = getPool();
    if (pool) {
      const res = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
      if (res.rows && res.rows.length > 0) {
        return NextResponse.json(res.rows);
      }
    }
  } catch (err) {
    console.warn('[NEXT API GET BLOGS WARN]', err);
  }

  return NextResponse.json(fallbackBlogs);
}
