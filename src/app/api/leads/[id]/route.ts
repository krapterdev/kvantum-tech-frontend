import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

let poolInstance: Pool | null = null;
function getPool() {
  if (!poolInstance) {
    try {
      poolInstance = new Pool({
        connectionString: DB_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      });
    } catch (e) {
      console.warn('[LEADS ID API POOL ERROR]', e);
    }
  }
  return poolInstance;
}

// PUT /api/leads/[id] - Update status or notes
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const pool = getPool();

    if (pool) {
      const res = await pool.query(
        'UPDATE leads SET "status"=COALESCE($1,"status"),"quality"=COALESCE($2,"quality"),"notes"=COALESCE($3,"notes"),"updated_at"=NOW() WHERE "_id"=$4 RETURNING *',
        [body.status, body.quality, body.notes, id]
      );
      if (res.rows && res.rows.length > 0) {
        return NextResponse.json(res.rows[0]);
      }
    }
    return NextResponse.json({ success: true, id, ...body });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Update failed' }, { status: 500 });
  }
}

// DELETE /api/leads/[id] - Delete lead
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pool = getPool();
    if (pool) {
      await pool.query('DELETE FROM leads WHERE "_id"=$1', [id]);
    }
    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Delete failed' }, { status: 500 });
  }
}
