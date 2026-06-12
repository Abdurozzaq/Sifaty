/**
 * Subjective / Cognitive Age Survey
 * Berbasis: Barak & Schiffman (1981) Cognitive Age Scale,
 * Rubin & Berntsen (2006) Subjective Age, Loevinger (1976) Ego Development,
 * dimensi fungsi eksekutif & regulasi emosi (self-report)
 *
 * 12 item Likert + 5 input usia (kronologis + 4 dimensi Barak)
 */

const AGE_FIELDS = [
  { id: '_chrono', label: 'Usia kronologis', hint: 'Usia asli kamu saat ini (tahun)' },
  { id: '_feel', label: 'Feel-age', hint: 'Berapa usia yang kamu rasakan?' },
  { id: '_look', label: 'Look-age', hint: 'Berapa usia penampilanmu?' },
  { id: '_do', label: 'Do-age', hint: 'Berapa usia aktivitasmu sehari-hari?' },
  { id: '_interest', label: 'Interest-age', hint: 'Berapa usia minat & hobimu?' },
];

const SAGE_TYPES = {
  F: {
    code: 'F',
    name: 'Feel-age',
    nameId: 'Usia yang Dirasakan',
    emoji: '💭',
    color: '#6366F1',
    description: 'Seberapa muda/tua perasaan subjektifmu terhadap diri sendiri.',
    traits: ['Self-perception', 'Emotional age', 'Inner felt age'],
    behaviors: [
      'Perasaan "aku masih seperti usia X"',
      'Energi mental yang dirasakan',
      'Identitas usia dari dalam',
    ],
    ageStyle: 'Dimensi feel-age dari Cognitive Age Scale (Barak & Schiffman, 1981).',
  },
  L: {
    code: 'L',
    name: 'Look-age',
    nameId: 'Usia Penampilan',
    emoji: '🪞',
    color: '#8B5CF6',
    description: 'Usia yang kamu tampilkan secara fisik & penampilan luar.',
    traits: ['Physical self', 'Appearance age', 'Look-age'],
    behaviors: [
      'Penampilan vs usia asli',
      'Perawatan diri & gaya hidup',
      'Citra fisik yang diproyeksikan',
    ],
    ageStyle: 'Look-age — seberapa tua/muda kamu terlihat di mata sendiri.',
  },
  D: {
    code: 'D',
    name: 'Do-age',
    nameId: 'Usia Aktivitas',
    emoji: '🏃',
    color: '#0EA5E9',
    description: 'Usia dari pola aktivitas, keterlibatan sosial, dan gaya hidupmu.',
    traits: ['Activity level', 'Social engagement', 'Do-age'],
    behaviors: [
      'Kecepatan & ritme hidup',
      'Keterlibatan sosial & produktivitas',
      'Pola aktivitas harian',
    ],
    ageStyle: 'Do-age — usia perilaku & partisipasi sosial (Barak, 1981).',
  },
  I: {
    code: 'I',
    name: 'Interest-age',
    nameId: 'Usia Minat',
    emoji: '🎯',
    color: '#14B8A6',
    description: 'Usia dari minat, hobi, dan ketertarikan yang kamu jalani.',
    traits: ['Hobbies', 'Curiosity', 'Interest-age'],
    behaviors: [
      'Minat rekreasi & hiburan',
      'Ketertarikan intelektual',
      'Gaya konsumsi media & travel',
    ],
    ageStyle: 'Interest-age — seberapa muda/dewasa minatmu (Barak, 1981).',
  },
  E: {
    code: 'E',
    name: 'Executive Function',
    nameId: 'Fungsi Eksekutif',
    emoji: '🧩',
    color: '#2563EB',
    description: 'Perencanaan, fokus, working memory, dan kontrol impuls dalam keputusan.',
    traits: ['Planning', 'Focus', 'Impulse control'],
    behaviors: [
      'Merencanakan sebelum bertindak',
      'Menyaring distraksi',
      'Menahan impuls jangka pendek',
    ],
    ageStyle: 'Fungsi eksekutif — indikator kematangan kognitif (Miyake et al., 2000).',
  },
  M: {
    code: 'M',
    name: 'Mindset Maturity',
    nameId: 'Kematangan Mindset',
    emoji: '🌳',
    color: '#059669',
    description: 'Kedewasaan cara berpikir, perspektif, dan menghadapi kompleksitas hidup.',
    traits: ['Perspective-taking', 'Wisdom', 'Complexity tolerance'],
    behaviors: [
      'Melihat masalah dari banyak sudut',
      'Tidak reaktif pada konflik',
      'Menerima nuansa abu-abu',
    ],
    ageStyle: 'Kematangan ego/mindset — terinspirasi Loevinger (1976) & WUSCT.',
  },
  R: {
    code: 'R',
    name: 'Emotional Regulation',
    nameId: 'Regulasi Emosi',
    emoji: '🧘',
    color: '#EC4899',
    description: 'Kemampuan mengelola emosi, impuls, dan reaksi dalam pengambilan keputusan.',
    traits: ['Self-control', 'Emotion management', 'Calm under stress'],
    behaviors: [
      'Menenangkan diri saat stres',
      'Tidak mudah dipancing emosi',
      'Keputusan tidak murni impuls',
    ],
    ageStyle: 'Regulasi emosi — komponen kematangan psikologis (Gross, 1998).',
  },
  T: {
    code: 'T',
    name: 'Think-age',
    nameId: 'Usia Berpikir',
    emoji: '💡',
    color: '#F59E0B',
    description: 'Kedewasaan pola berpikir, minat intelektual, dan cara memproses informasi.',
    traits: ['Cognitive engagement', 'Intellectual curiosity', 'Think-age'],
    behaviors: [
      'Minat belajar & refleksi',
      'Kedalaman analisis masalah',
      'Keinginan memahami sistem',
    ],
    ageStyle: 'Think-age — dimensi perluasan Cognitive Age (Clark et al., 1999).',
  },
};

const QUESTIONS = [
  // Executive Function (E)
  { id: 'e1', type: 'E', text: 'Aku cenderung merencanakan langkah sebelum mengambil keputusan penting' },
  { id: 'e2', type: 'E', text: 'Aku bisa fokus pada tugas meski ada banyak gangguan di sekitar' },
  { id: 'e3', type: 'E', text: 'Aku mampu menahan impuls untuk bertindak lebih dewasa' },

  // Mindset Maturity (M)
  { id: 'm1', type: 'M', text: 'Aku bisa melihat masalah dari berbagai sudut pandang, bukan hitam-putih' },
  { id: 'm2', type: 'M', text: 'Aku tidak mudah terjebak dalam konflik kecil yang tidak perlu' },
  { id: 'm3', type: 'M', text: 'Aku menerima bahwa hidup punya kompleksitas dan nuansa' },

  // Emotional Regulation (R)
  { id: 'r1', type: 'R', text: 'Aku bisa menenangkan diri saat emosi mulai memuncak' },
  { id: 'r2', type: 'R', text: 'Aku jarang mengambil keputusan besar saat sedang emosional' },
  { id: 'r3', type: 'R', text: 'Aku mampu mengendalikan reaksi impulsif dalam situasi tekanan' },

  // Think-age / Cognitive (T)
  { id: 't1', type: 'T', text: 'Aku masih penasaran belajar hal baru dan mengembangkan cara berpikir' },
  { id: 't2', type: 'T', text: 'Aku cenderung menganalisis masalah secara mendalam sebelum menyimpulkan' },
  { id: 't3', type: 'T', text: 'Minat intelektualku terasa lebih dewasa daripada sekadar hiburan dangkal' },
];

const LIKERT_DIMS = ['E', 'M', 'R', 'T'];
const BARAK_DIMS = ['F', 'L', 'D', 'I'];
const DIMENSION_ORDER = ['F', 'L', 'D', 'I', 'E', 'M', 'R', 'T'];

const MINDSET_LEVELS = [
  { min: 0, max: 35, name: 'Berkembang', emoji: '🌱', desc: 'Pola pikir masih dalam tahap eksplorasi — wajar untuk usia muda atau fase transisi.' },
  { min: 36, max: 50, name: 'Menuju Dewasa', emoji: '🌿', desc: 'Kematangan kognitif sedang berkembang — ada ruang tumbuh di regulasi emosi & perspektif.' },
  { min: 51, max: 65, name: 'Cukup Dewasa', emoji: '🌳', desc: 'Mindset relatif matang — mampu merencanakan, mengatur emosi, dan melihat konteks.' },
  { min: 66, max: 80, name: 'Dewasa', emoji: '🏔️', desc: 'Pola pikir dewasa — fungsi eksekutif & regulasi emosi kuat, perspektif luas.' },
  { min: 81, max: 100, name: 'Sangat Dewasa', emoji: '🦉', desc: 'Kematangan mindset tinggi — reflektif, stabil, dan toleran terhadap kompleksitas.' },
];

const SURVEY_META = {
  id: 'subjective-age',
  slug: 'subjective-age',
  title: 'Berapa Usia Pikiranmu?',
  subtitle: 'Ukur usia kognitif & kematangan mindset dibanding usia aslimu',
  description:
    'Survey memetakan Subjective Age / Cognitive Age (Barak, 1981) + kematangan mindset, fungsi eksekutif, dan regulasi emosi.',
  icon: '🧠',
  color: 'from-indigo-500 via-teal-500 to-amber-500',
  questionCount: QUESTIONS.length,
  estimatedMinutes: 5,
  tags: ['Usia Kognitif', 'Subjective Age', 'Mindset', 'Gratis'],
  active: true,
  featured: false,
  requiresAgeInput: true,
  ageFields: AGE_FIELDS,
  references: [
    'Barak & Schiffman (1981). Cognitive Age Scale',
    'Rubin & Berntsen (2006). Subjective Age',
    'Loevinger (1976). Ego Development',
  ],
  detail: {
    about:
      'Survey ini mengukur seberapa dewasa pola pikir & usia mentalmu dibanding usia kronologis. Menggabungkan 4 dimensi Cognitive Age (feel, look, do, interest) dengan indikator kematangan kognitif & emosional.',
    theory: {
      title: 'Subjective Age & Cognitive Age',
      content:
        'Subjective Age (usia subjektif) adalah usia yang kamu rasakan, bukan usia di KTP. Barak & Schiffman (1981) mengukurnya lewat 4 dimensi yang dirata-rata menjadi Cognitive Age. Rubin & Berntsen (2006) menemukan fenomena "feel younger" setelah usia 25. Kematangan mindset diukur lewat indikator fungsi eksekutif, regulasi emosi, dan perspektif (Loevinger, 1976).',
    },
    howItWorks: [
      { step: '01', title: 'Jawab 12 Pertanyaan', desc: 'Fungsi eksekutif, kematangan mindset, regulasi emosi, think-age.' },
      { step: '02', title: 'Input 5 Usia', desc: 'Usia kronologis + feel, look, do, interest age.' },
      { step: '03', title: 'Hitung Cognitive Age', desc: 'Rata-rata 4 dimensi Barak vs usia asli.' },
      { step: '04', title: 'Profil Mindset', desc: 'Selaras, lebih muda, atau lebih dewasa dari usia asli.' },
    ],
    methodology: {
      title: 'Cara Penilaian',
      items: [
        'Skala Likert 1–5 untuk 12 item kematangan kognitif-emosional',
        'Input numerik usia 10–99 tahun',
        'Cognitive Age = rata-rata (feel + look + do + interest)',
        'Age Gap = Cognitive Age − Usia Kronologis',
        'Maturity Index = rata-rata skor E, M, R, T (0–100%)',
        'Profil: Mindset Lebih Muda / Selaras / Lebih Dewasa',
      ],
    },
    results: {
      title: 'Apa yang Kamu Dapatkan?',
      items: [
        'Usia kognitif (Cognitive Age) vs usia kronologis',
        'Selisih usia (gap) & persentase',
        'Peta 4 dimensi Barak + 4 dimensi kematangan',
        'Indeks kematangan mindset & level',
      ],
    },
  },
};

function getMaturityLevel(score) {
  return MINDSET_LEVELS.find((l) => score >= l.min && score <= l.max) || MINDSET_LEVELS[0];
}

function getMindsetProfile(ageGap, chronologicalAge, maturityIndex) {
  const absGap = Math.abs(ageGap);
  if (chronologicalAge < 25 && ageGap > 5) {
    return {
      type: 'older_young',
      name: 'Merasa Lebih Tua',
      emoji: '🎓',
      desc: 'Kamu merasa lebih tua dari usia kronologis — umum di usia muda (Rubin & Berntsen, 2006: attractor age ~25).',
    };
  }
  if (ageGap <= -8) {
    return {
      type: 'younger',
      name: 'Mindset Lebih Muda',
      emoji: '🌟',
      desc: `Usia pikiranmu ~${absGap} tahun lebih muda dari usia asli — energi & identitas terasa lebih fresh.`,
    };
  }
  if (ageGap >= 8) {
    return {
      type: 'older',
      name: 'Mindset Lebih Dewasa',
      emoji: '🦉',
      desc: `Usia pikiranmu ~${absGap} tahun lebih dewasa dari usia asli — pola berpikir & gaya hidup lebih matang.`,
    };
  }
  if (maturityIndex >= 65) {
    return {
      type: 'aligned_mature',
      name: 'Selaras & Matang',
      emoji: '⚖️',
      desc: 'Usia subjektif selaras dengan usia asli, dengan indeks kematangan mindset yang solid.',
    };
  }
  return {
    type: 'aligned',
    name: 'Selaras dengan Usia',
    emoji: '🙂',
    desc: 'Usia pikiranmu relatif selaras dengan usia kronologis — gap dalam batas wajar.',
  };
}

function parseAge(answers, key) {
  const v = parseInt(answers[key], 10);
  return Number.isFinite(v) && v >= 10 && v <= 99 ? v : null;
}

function calculateScores(answers) {
  const raw = {};
  const counts = {};
  for (const t of LIKERT_DIMS) {
    raw[t] = 0;
    counts[t] = 0;
  }

  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (val >= 1 && val <= 5) {
      raw[q.type] += val;
      counts[q.type]++;
    }
  }

  const scores = {};
  for (const type of LIKERT_DIMS) {
    const max = counts[type] * 5;
    scores[type] = max > 0 ? Math.round((raw[type] / max) * 100) : 0;
  }

  const chrono = parseAge(answers, '_chrono');
  const feel = parseAge(answers, '_feel');
  const look = parseAge(answers, '_look');
  const doAge = parseAge(answers, '_do');
  const interest = parseAge(answers, '_interest');

  scores.F = feel != null ? feel : 0;
  scores.L = look != null ? look : 0;
  scores.D = doAge != null ? doAge : 0;
  scores.I = interest != null ? interest : 0;

  const cognitiveAge = Math.round((feel + look + doAge + interest) / 4);
  const ageGap = cognitiveAge - chrono;
  const gapPercent = chrono > 0 ? Math.round((ageGap / chrono) * 100) : 0;

  const maturityIndex = Math.round(
    LIKERT_DIMS.reduce((sum, t) => sum + scores[t], 0) / LIKERT_DIMS.length
  );
  const maturityLevel = getMaturityLevel(maturityIndex);
  const mindsetProfile = getMindsetProfile(ageGap, chrono, maturityIndex);

  const barakSorted = BARAK_DIMS
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);

  const likertSorted = LIKERT_DIMS
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);

  const sorted = [...barakSorted, ...likertSorted].sort((a, b) => {
    if (BARAK_DIMS.includes(a.type) && BARAK_DIMS.includes(b.type)) return b.score - a.score;
    if (LIKERT_DIMS.includes(a.type) && LIKERT_DIMS.includes(b.type)) return b.score - a.score;
    return 0;
  });

  const mindsetCode = `CA${cognitiveAge}`;
  const gapLabel = ageGap > 0 ? `+${ageGap}` : `${ageGap}`;

  return {
    scores,
    raw,
    chronologicalAge: chrono,
    cognitiveAge,
    ageGap,
    gapPercent,
    gapLabel,
    feelAge: feel,
    lookAge: look,
    doAge,
    interestAge: interest,
    maturityIndex,
    maturityLevel,
    mindsetProfile,
    mindsetCode,
    hollandCode: mindsetCode,
    primary: likertSorted[0],
    secondary: likertSorted[1],
    tertiary: likertSorted[2],
    sorted,
    barakSorted,
    likertSorted,
    strongTraits: likertSorted.filter((s) => s.score >= 55).map((s) => SAGE_TYPES[s.type].nameId),
    surveyType: 'sage',
  };
}

function getSummaryDescription(scoring) {
  const primary = SAGE_TYPES[scoring.primary.type];
  return `Usia kognitif ${scoring.cognitiveAge} tahun (kronologis ${scoring.chronologicalAge}, gap ${scoring.gapLabel}). Profil: ${scoring.mindsetProfile.name}. Kematangan mindset ${scoring.maturityIndex}% — dominan ${primary.name} (Barak & Schiffman, 1981; Rubin & Berntsen, 2006).`;
}

function buildResultData(scoring) {
  return {
    surveyType: 'sage',
    mindsetCode: scoring.mindsetCode,
    hollandCode: scoring.mindsetCode,
    chronologicalAge: scoring.chronologicalAge,
    cognitiveAge: scoring.cognitiveAge,
    ageGap: scoring.ageGap,
    gapPercent: scoring.gapPercent,
    gapLabel: scoring.gapLabel,
    feelAge: scoring.feelAge,
    lookAge: scoring.lookAge,
    doAge: scoring.doAge,
    interestAge: scoring.interestAge,
    maturityIndex: scoring.maturityIndex,
    maturityLevel: scoring.maturityLevel,
    mindsetProfile: scoring.mindsetProfile,
    primary: scoring.primary,
    secondary: scoring.secondary,
    tertiary: scoring.tertiary,
    scores: scoring.scores,
    sorted: scoring.sorted,
    barakSorted: scoring.barakSorted,
    likertSorted: scoring.likertSorted,
    strongTraits: scoring.strongTraits,
    congruenceDescription: getSummaryDescription(scoring),
    types: Object.fromEntries(DIMENSION_ORDER.map((t) => [t, SAGE_TYPES[t]])),
  };
}

function getRequiredAnswerKeys() {
  return [...QUESTIONS.map((q) => q.id), ...AGE_FIELDS.map((f) => f.id)];
}

function validateAnswer(v, key) {
  if (AGE_FIELDS.some((f) => f.id === key)) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 10 && n <= 99;
  }
  return v >= 1 && v <= 5;
}

module.exports = {
  SAGE_TYPES,
  QUESTIONS,
  AGE_FIELDS,
  SURVEY_META,
  DIMENSION_ORDER,
  LIKERT_DIMS,
  BARAK_DIMS,
  MINDSET_LEVELS,
  calculateScores,
  getSummaryDescription,
  buildResultData,
  getRequiredAnswerKeys,
  validateAnswer,
};
