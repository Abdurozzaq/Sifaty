/**
 * Migrasi data dari server/data/results.json ke PostgreSQL.
 * Run: node server/scripts/migrate-results-to-postgres.js
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const { connectPostgres, closePostgres } = require('../db/postgres');
const { getPool } = require('../db/postgres');

const storePath = path.join(__dirname, '..', 'data', 'results.json');

async function main() {
  if (!fs.existsSync(storePath)) {
    console.log('Tidak ada results.json — tidak ada yang dimigrasi.');
    return;
  }

  const raw = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  const rows = Array.isArray(raw) ? raw : [];
  if (!rows.length) {
    console.log('results.json kosong.');
    return;
  }

  await connectPostgres();
  const pool = getPool();

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const res = await pool.query(
        `INSERT INTO results (
          id, unique_code, survey_id, participant_name,
          answers, scores, holland_code, result_data, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO NOTHING`,
        [
          row.id,
          row.unique_code,
          row.survey_id,
          row.participant_name || null,
          JSON.stringify(row.answers),
          JSON.stringify(row.scores),
          row.holland_code,
          JSON.stringify(row.result_data),
          row.created_at ? new Date(row.created_at) : new Date(),
        ]
      );
      if (res.rowCount > 0) inserted++;
      else skipped++;
    } catch (err) {
      if (err.code === '23505') {
        skipped++;
      } else {
        throw err;
      }
    }
  }

  console.log('Migrasi ke PostgreSQL selesai.');
  console.log(`  Diproses: ${rows.length}`);
  console.log(`  Inserted / attempted: ${inserted}`);
  console.log(`  Duplikat dilewati: ${skipped}`);
  await closePostgres();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
