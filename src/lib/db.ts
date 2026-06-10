import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS email_subscribers (
      id        SERIAL PRIMARY KEY,
      email     VARCHAR(255) UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export { sql };
