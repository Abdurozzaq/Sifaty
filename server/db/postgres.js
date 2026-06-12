const { Pool } = require('pg');

const DEFAULT_URL = 'postgresql://postgres:postgres@127.0.0.1:5432/sifaty';

let pool = null;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || DEFAULT_URL;
}

async function initSchema(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS results (
      id VARCHAR(32) PRIMARY KEY,
      unique_code VARCHAR(16) UNIQUE NOT NULL,
      survey_id VARCHAR(128) NOT NULL,
      participant_name TEXT,
      answers JSONB NOT NULL,
      scores JSONB NOT NULL,
      holland_code VARCHAR(64),
      result_data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_results_survey_created
    ON results (survey_id, created_at DESC);
  `);
}

async function connectPostgres() {
  if (pool) return pool;

  pool = new Pool({
    connectionString: getDatabaseUrl(),
    max: 10,
    connectionTimeoutMillis: 8000,
  });

  const client = await pool.connect();
  try {
    await initSchema(client);
  } finally {
    client.release();
  }

  return pool;
}

function getPool() {
  if (!pool) {
    throw new Error('PostgreSQL belum terhubung. Panggil connectPostgres() terlebih dahulu.');
  }
  return pool;
}

async function closePostgres() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = {
  connectPostgres,
  getPool,
  closePostgres,
  getDatabaseUrl,
};
