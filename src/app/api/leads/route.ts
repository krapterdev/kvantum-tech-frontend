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
      console.warn('[LEADS API POOL ERROR]', e);
    }
  }
  return poolInstance;
}

// In-memory fallback for immediate zero-loss resiliency
let inMemoryLeads: any[] = [];

// Initialize table
async function ensureTable() {
  const pool = getPool();
  if (pool) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          "_id" TEXT PRIMARY KEY,
          "name" TEXT,
          "email" TEXT,
          "phone" TEXT,
          "service" TEXT,
          "message" TEXT,
          "notes" TEXT,
          "status" TEXT DEFAULT 'New Lead',
          "quality" TEXT DEFAULT 'Hot',
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `);
    } catch (e) {
      console.warn('[LEADS ENSURE TABLE]', e);
    }
  }
}

// GET /api/leads - Fetch all leads
export async function GET() {
  await ensureTable();
  const pool = getPool();

  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM leads ORDER BY "created_at" DESC');
      const rows = result.rows.map((r: any) => ({
        id: r._id,
        _id: r._id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        service: r.service,
        message: r.message,
        notes: r.notes || r.message,
        status: r.status || 'New Lead',
        quality: r.quality || 'Hot',
        createdAt: r.created_at,
        created_at: r.created_at,
      }));

      // Merge memory leads if any
      const map = new Map();
      [...inMemoryLeads, ...rows].forEach(l => map.set(l.id || l._id, l));
      return NextResponse.json(Array.from(map.values()));
    } catch (err: any) {
      console.warn('[GET LEADS DB ERROR]', err?.message);
    }
  }

  return NextResponse.json(inMemoryLeads);
}

// POST /api/leads - Submit new lead
export async function POST(req: Request) {
  await ensureTable();
  try {
    const body = await req.json();
    const id = 'lead_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    const newLead = {
      id,
      _id: id,
      name: body.name || 'Anonymous Client',
      email: body.email || 'direct@kvantumtechsolutions.com',
      phone: body.phone || 'N/A',
      service: body.service || 'General Software Consultation',
      message: body.notes || body.message || '',
      notes: body.notes || body.message || '',
      status: 'New Lead',
      quality: 'Hot',
      createdAt: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    inMemoryLeads.unshift(newLead);

    const pool = getPool();
    if (pool) {
      try {
        await pool.query(
          'INSERT INTO leads ("_id","name","email","phone","service","message","notes","status","quality") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
          [id, newLead.name, newLead.email, newLead.phone, newLead.service, newLead.message, newLead.notes, 'New Lead', 'Hot']
        );
      } catch (dbErr: any) {
        console.warn('[INSERT LEAD DB ERROR]', dbErr?.message);
      }
    }

    return NextResponse.json(newLead, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to submit lead' }, { status: 500 });
  }
}
