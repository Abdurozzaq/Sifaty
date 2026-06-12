const { getPool } = require('./db/postgres');

function parseRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    uniqueCode: row.unique_code,
    surveyId: row.survey_id,
    participantName: row.participant_name,
    answers: row.answers,
    scores: row.scores,
    hollandCode: row.holland_code,
    resultData: row.result_data,
    createdAt: row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at,
  };
}

async function saveResult(result) {
  await getPool().query(
    `INSERT INTO results (
      id, unique_code, survey_id, participant_name,
      answers, scores, holland_code, result_data, created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
    [
      result.id,
      result.uniqueCode,
      result.surveyId,
      result.participantName || null,
      JSON.stringify(result.answers),
      JSON.stringify(result.scores),
      result.hollandCode,
      JSON.stringify(result.resultData),
    ]
  );
  return result;
}

async function getResultById(id) {
  const { rows } = await getPool().query(
    'SELECT * FROM results WHERE id = $1 LIMIT 1',
    [id]
  );
  return parseRow(rows[0]);
}

async function getResultByCode(code) {
  const normalized = String(code || '').trim().toUpperCase();
  const { rows } = await getPool().query(
    'SELECT * FROM results WHERE unique_code = $1 LIMIT 1',
    [normalized]
  );
  return parseRow(rows[0]);
}

async function countResults() {
  const { rows } = await getPool().query('SELECT COUNT(*)::int AS count FROM results');
  return rows[0]?.count || 0;
}

module.exports = {
  saveResult,
  getResultById,
  getResultByCode,
  countResults,
};
