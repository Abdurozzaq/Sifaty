/**
 * Dark Triad Dirty Dozen (DTDD) — Jonason & Webster (2010)
 * Validasi versi Indonesia: Devi et al. (2024), Nugraha et al. (2025), Asri & Hendriyani (2025)
 *
 * Struktur: 12 item, 4 per dimensi (Machiavellianism, Psychopathy, Narcissism)
 * Skala adaptasi Likert 1–5 (dari skala asli 1–6 / 1–7)
 * Skor dinormalisasi 0–100% per dimensi + indeks "menyebalkan" (rata-rata ketiga dimensi)
 */

const DTDD_TYPES = {
  M: {
    code: 'M',
    name: 'Machiavellianism',
    nameId: 'Manipulatif / Licik',
    emoji: '🦊',
    color: '#7C3AED',
    description:
      'Kecenderungan memanipulasi orang lain lewat pujian, tipu daya, dan kontrol demi kepentingan pribadi.',
    traits: ['Manipulatif', 'Licik', 'Strategis', 'Eksploitatif'],
    behaviors: [
      'Memanipulasi orang untuk mendapatkan yang diinginkan',
      'Menggunakan sanjungan/pujian sebagai taktik',
      'Memanfaatkan orang lain demi tujuan pribadi',
      'Berbohong atau menipu untuk mencapai tujuan',
    ],
    annoyingStyle: 'Cara bicara manis tapi agenda di belakang; pandang orang sebagai pion.',
  },
  P: {
    code: 'P',
    name: 'Psychopathy',
    nameId: 'Dingin / Tidak Peka',
    emoji: '🧊',
    color: '#DC2626',
    description:
      'Kecenderungan kurang empati, tidak peka terhadap perasaan orang lain, dan cuek pada moralitas.',
    traits: ['Tidak peka', 'Antisosial', 'Cynical', 'Kurang empati'],
    behaviors: [
      'Jarang merasa menyesal atas perbuatan sendiri',
      'Tidak berperasaan saat orang lain terluka',
      'Tidak terlalu peduli pada moralitas perilaku',
      'Mencurigai niat orang lain (sinis)',
    ],
    annoyingStyle: 'Cara menangani situasi dingin; bicara tanpa filter empati.',
  },
  N: {
    code: 'N',
    name: 'Narcissism',
    nameId: 'Narsis / Butuh Perhatian',
    emoji: '👑',
    color: '#F59E0B',
    description:
      'Kecenderungan ingin diakui, diperhatikan, dan diperlakukan istimewa; merasa pantas dapat status lebih.',
    traits: ['Butuh admirasi', 'Pusat perhatian', 'Superior', 'Status-oriented'],
    behaviors: [
      'Ingin orang lain mengagumi dirinya',
      'Ingin selalu jadi pusat perhatian',
      'Mengharapkan perlakuan khusus',
      'Mengejar prestise, gengsi, atau status',
    ],
    annoyingStyle: 'Cara bicara dan pandang yang self-centered; situasi harus tentang dia.',
  },
};

const QUESTIONS = [
  // Machiavellianism (M) — item 1-4 (Devi et al., 2024)
  { id: 'm1', type: 'M', text: 'Aku cenderung memanipulasi orang lain untuk mendapatkan apa yang aku inginkan' },
  { id: 'm2', type: 'M', text: 'Aku menggunakan pujian atau sanjungan untuk memenuhi keinginanku' },
  { id: 'm3', type: 'M', text: 'Aku cenderung memanfaatkan orang lain demi kepentingan pribadiku' },
  { id: 'm4', type: 'M', text: 'Aku pernah menipu atau berbohong untuk mendapatkan keinginanku' },

  // Psychopathy (P) — item 5-8
  { id: 'p1', type: 'P', text: 'Aku jarang merasa menyesal atas perbuatanku' },
  { id: 'p2', type: 'P', text: 'Aku cenderung tidak berperasaan atau tidak peka terhadap orang lain' },
  { id: 'p3', type: 'P', text: 'Aku cenderung tidak peduli pada moralitas perilakuku' },
  { id: 'p4', type: 'P', text: 'Aku meragukan orang lain memiliki niat dan tujuan yang tulus' },

  // Narcissism (N) — item 9-12
  { id: 'n1', type: 'N', text: 'Aku cenderung ingin orang lain mengagumiku' },
  { id: 'n2', type: 'N', text: 'Aku cenderung ingin orang lain memperhatikanku' },
  { id: 'n3', type: 'N', text: 'Aku cenderung mengharapkan perlakuan khusus dari orang lain' },
  { id: 'n4', type: 'N', text: 'Aku cenderung mengejar kehormatan, gengsi, atau status' },
];

const ANNOYANCE_LEVELS = [
  { min: 0, max: 30, name: 'Aman Sentosa', emoji: '😇', desc: 'Kamu relatif easy-going dan tidak terlalu menyebalkan di interaksi sehari-hari.' },
  { min: 31, max: 45, name: 'Kadang Ngeselin', emoji: '🙂', desc: 'Kadang ada sisi yang bikin orang geleng-geleng, tapi masih dalam batas wajar.' },
  { min: 46, max: 60, name: 'Agak Menyebalkan', emoji: '😏', desc: 'Beberapa kebiasaan, cara bicara, atau cara pandangmu bisa bikin orang risih.' },
  { min: 61, max: 75, name: 'Cukup Menyebalkan', emoji: '🙄', desc: 'Kombinasi sifat gelapmu cukup terasa — orang mungkin sering merasa drained setelah interaksi.' },
  { min: 76, max: 100, name: 'Legenda Menyebalkan', emoji: '💀', desc: 'Level menyebalkan tinggi! Machiavellian, psychopathy, atau narcissism-mu sangat dominan.' },
];

const SURVEY_META = {
  id: 'dark-triad-annoying',
  slug: 'dark-triad-annoying',
  title: 'Seberapa Menyebalkan Kamu?',
  subtitle: 'Ukur sisi "gelap" kepribadianmu dari cara bicara, pandang, dan handle situasi',
  description:
    'Survey berbasis Dark Triad Dirty Dozen (DTDD) — 12 pertanyaan yang memetakan Machiavellianism, Psychopathy, dan Narcissism dalam konteks sosial yang menyebalkan.',
  icon: '😈',
  color: 'from-violet-500 via-red-500 to-amber-500',
  questionCount: QUESTIONS.length,
  estimatedMinutes: 3,
  tags: ['Kepribadian', 'Dark Triad', 'DTDD', 'Gratis'],
  active: true,
  featured: true,
  references: [
    'Jonason & Webster (2010). The Dirty Dozen',
    'Devi et al. (2024). Validity of DTDD Indonesian Version',
    'Nugraha et al. (2025). DTDD in Indonesian Population',
    'Asri & Hendriyani (2025). Dark Triad & Cyber-Aggression',
  ],
  detail: {
    about:
      'Survey ini mengukur seberapa "menyebalkan" sisi kepribadianmu dalam interaksi sosial — dari sifat, kebiasaan, cara bicara, cara pandang, hingga cara menangani situasi. Berbasis instrumen DTDD yang sudah divalidasi di populasi Indonesia.',
    theory: {
      title: 'Apa itu Dark Triad Dirty Dozen?',
      content:
        'Dark Triad (Paulhus & Williams, 2002) adalah tiga sisi kepribadian gelap: Machiavellianism (manipulatif & licik), Psychopathy (dingin & kurang empati), dan Narcissism (butuh pengakuan & superior). DTDD (Jonason & Webster, 2010) adalah versi ringkas 12 item yang telah divalidasi dalam Bahasa Indonesia (Devi et al., 2024; Nugraha et al., 2025).',
    },
    howItWorks: [
      { step: '01', title: 'Jawab 12 Pertanyaan', desc: 'Pernyataan tentang sifat, kebiasaan, dan cara interaksimu.' },
      { step: '02', title: 'Analisis 3 Dimensi', desc: 'Skor Machiavellianism, Psychopathy, dan Narcissism.' },
      { step: '03', title: 'Indeks Menyebalkan', desc: 'Skor gabungan + kode DTDD (misal: MPN).' },
      { step: '04', title: 'Share Hasil', desc: 'Bagikan lewat link, QR, atau kode unik SF-XXXXXX.' },
    ],
    methodology: {
      title: 'Cara Penilaian',
      items: [
        'Skala Likert 1–5 (adaptasi dari skala asli 1–6 DTDD)',
        '4 pertanyaan per dimensi (M, P, N)',
        'Skor per dimensi dinormalisasi 0–100%',
        'Indeks Menyebalkan = rata-rata ketiga dimensi',
        'Kode DTDD = 3 dimensi tertinggi (contoh: MPN)',
      ],
    },
    results: {
      title: 'Apa yang Kamu Dapatkan?',
      items: [
        'Level menyebalkan + persentase indeks',
        'Kode DTDD (misal: MPN) & kode unik SF-XXXXXX',
        'Peta skor 3 dimensi Dark Triad',
        'Penjelasan cara bicara & handle situasi yang menyebalkan',
      ],
    },
  },
};

const DIMENSION_ORDER = ['M', 'P', 'N'];

function getAnnoyanceLevel(score) {
  return ANNOYANCE_LEVELS.find((l) => score >= l.min && score <= l.max) || ANNOYANCE_LEVELS[0];
}

function calculateScores(answers) {
  const raw = { M: 0, P: 0, N: 0 };
  const counts = { M: 0, P: 0, N: 0 };

  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (val >= 1 && val <= 5) {
      raw[q.type] += val;
      counts[q.type]++;
    }
  }

  const scores = {};
  for (const type of DIMENSION_ORDER) {
    const max = counts[type] * 5;
    scores[type] = max > 0 ? Math.round((raw[type] / max) * 100) : 0;
  }

  const sorted = DIMENSION_ORDER
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);

  const dtddCode = sorted.map((s) => s.type).join('');
  const annoyanceScore = Math.round(
    DIMENSION_ORDER.reduce((sum, t) => sum + scores[t], 0) / DIMENSION_ORDER.length
  );
  const annoyanceLevel = getAnnoyanceLevel(annoyanceScore);

  const annoyingTraits = sorted
    .filter((s) => s.score >= 55)
    .map((s) => DTDD_TYPES[s.type].nameId);

  return {
    scores,
    raw,
    dtddCode,
    hollandCode: dtddCode,
    primary: sorted[0],
    secondary: sorted[1],
    tertiary: sorted[2],
    sorted,
    annoyanceScore,
    annoyanceLevel,
    annoyingTraits,
    surveyType: 'dtdd',
  };
}

function getSummaryDescription(scoring) {
  const primary = DTDD_TYPES[scoring.primary.type];
  return `Kode DTDD kamu "${scoring.dtddCode}" dengan indeks menyebalkan ${scoring.annoyanceScore}% (${scoring.annoyanceLevel.name}). Dimensi dominan: ${primary.name} — ${primary.annoyingStyle} (Jonason & Webster, 2010; Devi et al., 2024).`;
}

function buildResultData(scoring) {
  return {
    surveyType: 'dtdd',
    dtddCode: scoring.dtddCode,
    hollandCode: scoring.dtddCode,
    primary: scoring.primary,
    secondary: scoring.secondary,
    tertiary: scoring.tertiary,
    scores: scoring.scores,
    sorted: scoring.sorted,
    annoyanceScore: scoring.annoyanceScore,
    annoyanceLevel: scoring.annoyanceLevel,
    annoyingTraits: scoring.annoyingTraits,
    congruenceDescription: getSummaryDescription(scoring),
    types: Object.fromEntries(DIMENSION_ORDER.map((t) => [t, DTDD_TYPES[t]])),
  };
}

module.exports = {
  DTDD_TYPES,
  QUESTIONS,
  SURVEY_META,
  DIMENSION_ORDER,
  ANNOYANCE_LEVELS,
  calculateScores,
  getSummaryDescription,
  buildResultData,
};
