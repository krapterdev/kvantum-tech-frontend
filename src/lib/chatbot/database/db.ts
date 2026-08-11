import { Pool } from 'pg';

// Singleton pg pool — reused across all chatbot API route invocations
let pool: Pool | null = null;

export function getChatbotPool(): Pool {
  if (!pool) {
    // Use DATABASE_URL if set, otherwise fallback to individual env vars
    if (process.env.DATABASE_URL) {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });
    } else {
      pool = new Pool({
        host:     process.env.DB_HOST     || 'localhost',
        port:     parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME     || 'kvantumtech',
        user:     process.env.DB_USER     || 'postgres',
        password: process.env.DB_PASSWORD || '',
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });
    }

    pool.on('error', (err: Error) => {
      console.error('[CHATBOT DB] Unexpected pg pool error', err);
    });
  }
  return pool;
}

export async function chatbotQuery<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const client = await getChatbotPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function chatbotQueryOne<T = any>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const rows = await chatbotQuery<T>(sql, params);
  return rows[0] ?? null;
}
