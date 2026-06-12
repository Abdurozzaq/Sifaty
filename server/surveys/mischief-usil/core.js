/**
 * Mischief / Keusilan Survey
 * Berbasis: Benign Violation Theory (McGraw & Warren, 2010),
 * Comic Style Markers (Ruch et al., 2018), Everyday Sadism (Buckels et al., 2013),
 * Social Proximity & Teasing (Keltner et al., 1998, 2001), Mischief Audit
 *
 * 18 item, 6 dimensi (3 per dimensi), Likert 1–5
 */

const USIL_TYPES = {
  V: {
    code: 'V',
    name: 'Pelanggaran Jinak',
    nameId: 'Benign Violation',
    emoji: '💥',
    color: '#8B5CF6',
    description:
      'Kecenderungan melanggar norma sosial ringan — mengagetkan, menyembunyikan barang, bikin situasi sedikit tidak nyaman — demi efek lucu.',
    traits: ['Norm-breaker', 'Surprise prank', 'Playful deviance'],
    behaviors: [
      'Suka mengagetkan orang dengan cara tidak terduga',
      'Mindahin/menyembunyikan barang demi candaan',
      'Membuat situasi sedikit awkward untuk efek komedi',
    ],
    usilStyle: 'Usil lewat pelanggaran norma yang (harusnya) tetap terasa aman & lucu.',
  },
  F: {
    code: 'F',
    name: 'Playfulness',
    nameId: 'Fun & Main-main',
    emoji: '🎉',
    color: '#F59E0B',
    description:
      'Keusilan murni untuk mencairkan suasana, bonding, dan kesenangan bersama — gaya Fun dari Comic Style Markers.',
    traits: ['Playful', 'Affiliative', 'Ice-breaker'],
    behaviors: [
      'Usil untuk bonding dengan circle dekat',
      'Main-main fisik ringan dengan teman akrab',
      'Mencari kesenangan bersama lewat candaan',
    ],
    usilStyle: 'Usil sebagai social glue — perekat keakraban, bukan senjata.',
  },
  I: {
    code: 'I',
    name: 'Ironi & Satire',
    nameId: 'Sindiran Halus',
    emoji: '🗡️',
    color: '#06B6D4',
    description:
      'Keusilan lewat kata-kata: sindiran, ironi, atau satire untuk memancing reaksi — gaya dark-light dari Ruch.',
    traits: ['Ironis', 'Satirical', 'Verbal mischief'],
    behaviors: [
      'Nyindir halus buat memancing reaksi',
      'Humor usil lebih sering verbal daripada fisik',
      'Bikin orang bingung dulu baru kasih tahu candaan',
    ],
    usilStyle: 'Otak usil aktif — senjata utama adalah kata & timing.',
  },
  R: {
    code: 'R',
    name: 'Senang Lihat Reaksi',
    nameId: 'Everyday Sadism Ringan',
    emoji: '😏',
    color: '#EF4444',
    description:
      'Kepuasan saat melihat ekspresi kaget, bingung, atau frustrasi sesaat orang lain — ujung sub-klinis everyday sadism.',
    traits: ['Vicarious thrill', 'Reaction-seeking', 'Mild schadenfreude'],
    behaviors: [
      'Terhibur saat orang kaget karena usilan',
      'Reaksi orang kecolongan bikin suasana lebih seru',
      'Ada kepuasan kecil saat orang kesal sebentar',
    ],
    usilStyle: 'Motif tersembunyi: senang lihat orang lain "kena" — waspadai batas hostile.',
  },
  N: {
    code: 'N',
    name: 'Konteks & Proksimitas',
    nameId: 'Tanpa Filter Sosial',
    emoji: '🎯',
    color: '#F97316',
    description:
      'Keusilan tanpa mempertimbangkan kedekatan hubungan — usil ke orang yang belum akrab, sensitif, atau formal.',
    traits: ['Low proximity filter', 'Boundary crossing', 'Omnibus teasing'],
    behaviors: [
      'Usil ke kenalan/rekan yang belum akrab',
      'Tidak membedakan target yang sensitif',
      'Hantam rata tanpa sensor sosial',
    ],
    usilStyle: 'Tidak tahu tempat — usil di zona yang seharusnya tabu.',
  },
  A: {
    code: 'A',
    name: 'Audit Keusilan',
    nameId: 'Impuls & Dampak',
    emoji: '⚡',
    color: '#EC4899',
    description:
      'Pola impulsif, dampak pasca-usil, dan kemampuan menerima balasan — metrik Mischief Audit.',
    traits: ['Impulsif', 'Awkward aftermath', 'Thin-skinned receiver'],
    behaviors: [
      'Ide usil spontan sulit ditahan',
      'Usil berakhir canggung & harus minta maaf',
      'Mudah tersinggung kalau dijahili balik',
    ],
    usilStyle: 'Usil impulsif tanpa rem — sering meleset dari playful ke hostile.',
  },
};

const QUESTIONS = [
  // V — Benign Violation
  { id: 'v1', type: 'V', text: 'Aku suka mengagetkan orang dengan cara yang tidak terduga demi candaan' },
  { id: 'v2', type: 'V', text: 'Aku pernah menyembunyikan atau mindahin barang orang demi usilan' },
  { id: 'v3', type: 'V', text: 'Aku sengaja membuat situasi sedikit tidak nyaman untuk efek lucu' },

  // F — Playfulness
  { id: 'f1', type: 'F', text: 'Usilanku biasanya untuk mencairkan suasana dan having fun bersama' },
  { id: 'f2', type: 'F', text: 'Aku suka main-main fisik ringan (menyenggol, mengejutkan) dengan teman dekat' },
  { id: 'f3', type: 'F', text: 'Keusilan adalah cara favoritku untuk bonding dengan circle pertemanan' },

  // I — Ironi & Satire
  { id: 'i1', type: 'I', text: 'Aku suka nyindir atau pakai ironi halus untuk memancing reaksi orang' },
  { id: 'i2', type: 'I', text: 'Humor usilku lebih sering lewat kata-kata daripada aksi fisik' },
  { id: 'i3', type: 'I', text: 'Aku senang bikin orang bingung dulu baru kasih tahu kalau itu candaan' },

  // R — Reaction enjoyment
  { id: 'r1', type: 'R', text: 'Aku merasa terhibur saat melihat ekspresi kaget/kesal sesaat karena usilanku' },
  { id: 'r2', type: 'R', text: 'Reaksi orang yang kecolongan bikin suasana jadi lebih seru buatku' },
  { id: 'r3', type: 'R', text: 'Ada kepuasan kecil saat orang frustrasi sebentar karena jahilanku' },

  // N — Proximity / context
  { id: 'n1', type: 'N', text: 'Aku pernah usil ke rekan kerja atau kenalan yang belum akrab' },
  { id: 'n2', type: 'N', text: 'Aku usil ke orang yang kaku/sensitif tanpa mikir batas mereka' },
  { id: 'n3', type: 'N', text: 'Aku menghantam rata semua orang dengan keusilan tanpa bedain target' },

  // A — Mischief audit
  { id: 'a1', type: 'A', text: 'Setelah usil, aku sering harus minta maaf karena suasana jadi canggung' },
  { id: 'a2', type: 'A', text: 'Ide usil spontan langsung muncul saat aku lihat situasi yang bisa dimanipulasi' },
  { id: 'a3', type: 'A', text: 'Aku mudah tersinggung atau marah kalau dijahili dengan cara yang sama' },
];

const USIL_LEVELS = [
  { min: 0, max: 30, name: 'Sangat Kalem', emoji: '😌', desc: 'Kamu jarang usil — lebih observer daripada prankster.' },
  { min: 31, max: 45, name: 'Kadang Jahil', emoji: '🙂', desc: 'Sesekali usil, tapi masih dalam batas wajar dan konteks yang tepat.' },
  { min: 46, max: 60, name: 'Cukup Usil', emoji: '😜', desc: 'Keusilanmu cukup terasa di lingkaran pertemanan — orang kenal sisi jahilmu.' },
  { min: 61, max: 75, name: 'Master Usil', emoji: '🎭', desc: 'Level usil tinggi! Kamu dikenal sebagai prankster atau tukang sindir andalan.' },
  { min: 76, max: 100, name: 'Legenda Usil', emoji: '👹', desc: 'Keusilanmu legendaris — hati-hati jangan melewati garis playful ke hostile.' },
];

const SURVEY_META = {
  id: 'mischief-usil',
  slug: 'mischief-usil',
  title: 'Seberapa Usil Kamu?',
  subtitle: 'Ukur tingkat keusilan, gaya humor jahil, dan batas playful vs hostile',
  description:
    'Survey 18 pertanyaan memetakan prankishness & mischievousness — dari Benign Violation Theory, Comic Style Markers, hingga Mischief Audit.',
  icon: '😈',
  color: 'from-violet-500 via-amber-500 to-pink-500',
  questionCount: QUESTIONS.length,
  estimatedMinutes: 4,
  tags: ['Humor', 'Keusilan', 'Playfulness', 'Gratis'],
  active: true,
  featured: false,
  references: [
    'McGraw & Warren (2010). Benign Violation Theory',
    'Ruch et al. (2018). Comic Style Markers',
    'Buckels et al. (2013). Everyday Sadism',
    'Keltner et al. (1998, 2001). Teasing & Social Proximity',
  ],
  detail: {
    about:
      'Survey ini mengukur seberapa usil kamu — dari pelanggaran norma yang lucu, playfulness, sindiran, hingga audit dampak usilanmu. Keusilan sehat ada di batas tipis antara humor bonding dan agresi terselubung.',
    theory: {
      title: 'Apa yang Diukur?',
      content:
        'Menggabungkan Benign Violation Theory (pelanggaran + situasi aman = lucu), Comic Style Markers Ruch (Fun & Satire/Ironi), Everyday Sadism sub-klinis (senang lihat reaksi orang), teori proksimitas sosial Keltner (usil sehat = high proximity), dan Mischief Audit (dampak, impuls, reciprocity).',
    },
    howItWorks: [
      { step: '01', title: 'Jawab 18 Pertanyaan', desc: 'Pola usil, gaya humor jahil, dan konteks sosialmu.' },
      { step: '02', title: 'Analisis 6 Dimensi', desc: 'Violation, Fun, Ironi, Reaksi, Konteks, Audit.' },
      { step: '03', title: 'Indeks Usil + Profil', desc: 'Skor 0–100%, kode USIL (misal: VFI), gaya dominan.' },
      { step: '04', title: 'Share Hasil', desc: 'Bagikan lewat link, QR, atau kode unik SF-XXXXXX.' },
    ],
    methodology: {
      title: 'Cara Penilaian',
      items: [
        'Skala Likert 1–5 (1 = Tidak Pernah, 5 = Selalu)',
        '3 pertanyaan per dimensi (6 dimensi)',
        'Skor per dimensi dinormalisasi 0–100%',
        'Indeks Usil = rata-rata 6 dimensi',
        'Indeks Playful = rata-rata V + F | Indeks Gelap = rata-rata I + R + N',
        'Kode USIL = 3 dimensi tertinggi (contoh: VFI)',
      ],
    },
    results: {
      title: 'Apa yang Kamu Dapatkan?',
      items: [
        'Level usil + persentase indeks',
        'Profil gaya (Playful, Sarkastik, Tanpa Filter, Gelap)',
        'Peta 6 dimensi keusilan',
        'Penjelasan celah dominan & tips batas playful vs hostile',
      ],
    },
  },
};

const DIMENSION_ORDER = ['V', 'F', 'I', 'R', 'N', 'A'];
const PLAYFUL_DIMS = ['V', 'F'];
const DARK_DIMS = ['I', 'R', 'N'];

function getUsilLevel(score) {
  return USIL_LEVELS.find((l) => score >= l.min && score <= l.max) || USIL_LEVELS[0];
}

function getUsilProfile(scores) {
  const playful = Math.round(PLAYFUL_DIMS.reduce((s, t) => s + scores[t], 0) / PLAYFUL_DIMS.length);
  const dark = Math.round(DARK_DIMS.reduce((s, t) => s + scores[t], 0) / DARK_DIMS.length);
  const chaotic = Math.round((scores.N + scores.A) / 2);

  if (scores.R >= 65 && scores.R >= scores.F) {
    return {
      type: 'dark',
      name: 'Usil Gelap',
      emoji: '🖤',
      desc: 'Kamu menikmati reaksi orang yang "kena" — waspadai agar tidak bergeser ke sadisme atau dominasi emosional.',
    };
  }
  if (scores.I >= 65 && scores.I >= playful) {
    return {
      type: 'sarcastic',
      name: 'Usil Sarkastik',
      emoji: '🗡️',
      desc: 'Otak usilmu dominan lewat sindiran & ironi — smart mischief, asal target paham ini candaan.',
    };
  }
  if (chaotic >= 60 || scores.N >= 60) {
    return {
      type: 'chaotic',
      name: 'Usil Tanpa Filter',
      emoji: '🌪️',
      desc: 'Usilmu sering meleset konteks — perkuat sensor sosial: siapa yang bisa diajak bercanda, siapa yang tidak.',
    };
  }
  if (playful >= 55) {
    return {
      type: 'playful',
      name: 'Usil Playful',
      emoji: '😜',
      desc: 'Keusilanmu cenderung sehat — pelanggaran jinak + fun untuk bonding, bukan merendahkan.',
    };
  }
  return {
    type: 'mild',
    name: 'Usil Santai',
    emoji: '🙂',
    desc: 'Keusilanmu moderat dan situasional — tidak dominan tapi ada sisi jahil yang sesekali muncul.',
  };
}

function calculateScores(answers) {
  const raw = {};
  const counts = {};
  for (const t of DIMENSION_ORDER) {
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
  for (const type of DIMENSION_ORDER) {
    const max = counts[type] * 5;
    scores[type] = max > 0 ? Math.round((raw[type] / max) * 100) : 0;
  }

  const sorted = DIMENSION_ORDER
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);

  const usilCode = sorted.slice(0, 3).map((s) => s.type).join('');
  const usilScore = Math.round(
    DIMENSION_ORDER.reduce((sum, t) => sum + scores[t], 0) / DIMENSION_ORDER.length
  );
  const playfulScore = Math.round(
    PLAYFUL_DIMS.reduce((sum, t) => sum + scores[t], 0) / PLAYFUL_DIMS.length
  );
  const darkScore = Math.round(
    DARK_DIMS.reduce((sum, t) => sum + scores[t], 0) / DARK_DIMS.length
  );
  const usilLevel = getUsilLevel(usilScore);
  const usilProfile = getUsilProfile(scores);

  const strongTraits = sorted
    .filter((s) => s.score >= 55)
    .map((s) => USIL_TYPES[s.type].nameId);

  return {
    scores,
    raw,
    usilCode,
    hollandCode: usilCode,
    primary: sorted[0],
    secondary: sorted[1],
    tertiary: sorted[2],
    sorted,
    usilScore,
    playfulScore,
    darkScore,
    usilLevel,
    usilProfile,
    strongTraits,
    surveyType: 'usil',
  };
}

function getSummaryDescription(scoring) {
  const primary = USIL_TYPES[scoring.primary.type];
  return `Profil "${scoring.usilProfile.name}" — indeks usil ${scoring.usilScore}% (playful ${scoring.playfulScore}%, gelap ${scoring.darkScore}%). Dimensi dominan: ${primary.name} — ${primary.usilStyle} (McGraw & Warren, 2010; Ruch et al., 2018).`;
}

function buildResultData(scoring) {
  return {
    surveyType: 'usil',
    usilCode: scoring.usilCode,
    hollandCode: scoring.usilCode,
    primary: scoring.primary,
    secondary: scoring.secondary,
    tertiary: scoring.tertiary,
    scores: scoring.scores,
    sorted: scoring.sorted,
    usilScore: scoring.usilScore,
    playfulScore: scoring.playfulScore,
    darkScore: scoring.darkScore,
    usilLevel: scoring.usilLevel,
    usilProfile: scoring.usilProfile,
    strongTraits: scoring.strongTraits,
    congruenceDescription: getSummaryDescription(scoring),
    types: Object.fromEntries(DIMENSION_ORDER.map((t) => [t, USIL_TYPES[t]])),
  };
}

module.exports = {
  USIL_TYPES,
  QUESTIONS,
  SURVEY_META,
  DIMENSION_ORDER,
  PLAYFUL_DIMS,
  DARK_DIMS,
  USIL_LEVELS,
  calculateScores,
  getSummaryDescription,
  buildResultData,
};
