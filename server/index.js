const express = require('express');
const cors = require('cors');
const path = require('path');
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');
const { getAllSurveys, getModule, getCatalogFacets, enrichSurveyMeta } = require('./surveys/_shared/registry');
const { getAllPustaka } = require('./surveys/_shared/pustaka-aggregator');
const { saveResult, getResultById, getResultByCode } = require('./db');
const { connectPostgres } = require('./db/postgres');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

function generateUniqueCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SF-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function getOgInfo(result) {
  const mod = getModule(result.surveyId);
  if (mod?.og) return mod.og(result);
  const typeInfo = result.resultData?.types?.[result.resultData?.primary?.type];
  return {
    code: result.hollandCode,
    label: typeInfo ? `${typeInfo.emoji} ${typeInfo.name}` : 'Hasil Survey',
    subtitle: 'Sifaty Survey',
    color: typeInfo?.color || '#0891B2',
  };
}

// ─── API Routes ───────────────────────────────────────────────

app.get('/api/surveys', (req, res) => {
  res.json(getAllSurveys());
});

app.get('/api/catalog', (req, res) => {
  res.json(getCatalogFacets());
});

app.get('/api/pustaka', (req, res) => {
  const survey = req.query.survey;
  const all = getAllPustaka();
  if (survey) {
    return res.json(all.filter((p) => p.usedIn?.includes(survey)));
  }
  res.json(all);
});

app.get('/api/surveys/:slug', (req, res) => {
  const mod = getModule(req.params.slug);
  if (!mod) return res.status(404).json({ error: 'Survey tidak ditemukan' });

  const meta = enrichSurveyMeta(mod.meta);

  res.json({
    ...meta,
    questions: mod.questions.map((q) => ({
      id: q.id,
      text: q.text,
      icon: q.icon,
      type: q.type,
    })),
    types: mod.types,
    requiresAgeInput: !!mod.meta.requiresAgeInput,
    ageFields: mod.meta.ageFields || [],
    renderType: mod.renderType,
  });
});

app.post('/api/surveys/:slug/submit', async (req, res) => {
  try {
    const mod = getModule(req.params.slug);
    if (!mod) return res.status(404).json({ error: 'Survey tidak ditemukan' });

    const { answers, participantName } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Jawaban tidak valid' });
    }

    const requiredKeys = mod.getRequiredAnswerKeys
      ? mod.getRequiredAnswerKeys()
      : mod.questions.map((q) => q.id);
    const answeredCount = requiredKeys.filter((k) =>
      mod.validateAnswer(answers[k], k)
    ).length;

    if (answeredCount < requiredKeys.length) {
      return res.status(400).json({
        error: `Mohon jawab semua pertanyaan (${answeredCount}/${requiredKeys.length})`,
      });
    }

    const scoring = mod.calculateScores(answers);
    const id = nanoid(12);
    const uniqueCode = generateUniqueCode();
    const resultData = mod.buildResultData(scoring);
    const summaryCode = mod.summaryCode(scoring);

    const result = await saveResult({
      id,
      uniqueCode,
      surveyId: mod.meta.id,
      participantName: participantName?.trim() || null,
      answers,
      scores: scoring.scores,
      hollandCode: summaryCode,
      resultData,
    });

    res.json({
      id: result.id,
      uniqueCode: result.uniqueCode,
      hollandCode: summaryCode,
      resultUrl: `${BASE_URL}/hasil/${result.id}`,
      shareUrl: `${BASE_URL}/share/${result.uniqueCode}`,
    });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Gagal menyimpan hasil survey' });
  }
});

app.get('/api/results/:id', async (req, res) => {
  try {
    const result = await getResultById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Hasil tidak ditemukan' });
    res.json(result);
  } catch (err) {
    console.error('Get result error:', err);
    res.status(500).json({ error: 'Gagal memuat hasil' });
  }
});

app.get('/api/results/code/:code', async (req, res) => {
  try {
    const result = await getResultByCode(req.params.code);
    if (!result) return res.status(404).json({ error: 'Kode tidak ditemukan' });
    res.json(result);
  } catch (err) {
    console.error('Get result by code error:', err);
    res.status(500).json({ error: 'Gagal memuat hasil' });
  }
});

app.get('/api/results/:id/qrcode', async (req, res) => {
  try {
    const result = await getResultById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Hasil tidak ditemukan' });

    const url = `${BASE_URL}/share/${result.uniqueCode}`;
    const png = await QRCode.toBuffer(url, {
      width: 400,
      margin: 2,
      color: { dark: '#0891B2', light: '#FFFFFF' },
    });
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(png);
  } catch (err) {
    console.error('QR error:', err);
    res.status(500).json({ error: 'Gagal membuat QR code' });
  }
});

app.get('/api/og/:code.png', async (req, res) => {
  try {
    const result = await getResultByCode(req.params.code);
    if (!result) return res.status(404).send('Not found');
  const og = getOgInfo(result);
  const name = result.participantName || 'Seseorang';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ECFEFF"/>
      <stop offset="50%" style="stop-color:#E0F2FE"/>
      <stop offset="100%" style="stop-color:#F0F9FF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="150" cy="150" r="80" fill="${og.color}" opacity="0.2"/>
  <circle cx="1050" cy="500" r="120" fill="${og.color}" opacity="0.15"/>
  <text x="600" y="120" text-anchor="middle" font-size="48" font-family="Arial,sans-serif" fill="#0891B2" font-weight="bold">Sifaty Survey</text>
  <text x="600" y="200" text-anchor="middle" font-size="36" font-family="Arial,sans-serif" fill="#374151">${escapeXml(name)}</text>
  <text x="600" y="310" text-anchor="middle" font-size="120" font-family="Arial,sans-serif" fill="${og.color}" font-weight="bold">${og.code}</text>
  <text x="600" y="400" text-anchor="middle" font-size="42" font-family="Arial,sans-serif" fill="#4B5563">${escapeXml(og.label)}</text>
  <text x="600" y="480" text-anchor="middle" font-size="28" font-family="Arial,sans-serif" fill="#9CA3AF">Kode: ${result.uniqueCode} · ${escapeXml(og.subtitle)}</text>
</svg>`;

  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(svg);
  } catch (err) {
    console.error('OG image error:', err);
    res.status(500).send('Error');
  }
});
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.get('/share/:code', async (req, res) => {
  try {
    const result = await getResultByCode(req.params.code);
    if (!result) return res.redirect('/?error=not-found');
  const og = getOgInfo(result);
  const name = result.participantName || 'Seseorang';
  const title = `${name} — ${og.code} ${og.label}`;
  const description = `${og.subtitle}. Kode unik: ${result.uniqueCode}. Lihat hasil lengkap!`;
  const ogImage = `${BASE_URL}/api/og/${result.uniqueCode}.png`;
  const resultUrl = `${BASE_URL}/hasil/${result.id}`;

  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:url" content="${BASE_URL}/share/${result.uniqueCode}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta http-equiv="refresh" content="0;url=${resultUrl}">
  <link rel="canonical" href="${resultUrl}">
</head>
<body>
  <p>Mengalihkan ke hasil survey... <a href="${resultUrl}">Klik di sini</a></p>
</body>
</html>`);
  } catch (err) {
    console.error('Share page error:', err);
    res.redirect('/?error=not-found');
  }
});
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.get('/tentang', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/penggunaan', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/credits', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/survey/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/hasil/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

async function start() {
  await connectPostgres();
  app.listen(PORT, () => {
    console.log(`\n  🌟 Sifaty berjalan di ${BASE_URL}`);
    console.log(`  🐘 PostgreSQL terhubung\n`);
  });
}

start().catch((err) => {
  console.error('\n  ❌ Gagal menghubungkan PostgreSQL:', err.message);
  console.error('  Pastikan PostgreSQL berjalan dan DATABASE_URL benar (.env.example)\n');
  process.exit(1);
});