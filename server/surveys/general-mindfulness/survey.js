const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Autopilot",
    "emoji": "🌀",
    "desc": "Mindfulness rendah — banyak distraksi."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Sadar",
    "emoji": "🙂",
    "desc": "Sesekali mindful — masih berkembang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Mindful Sedang",
    "emoji": "🧘",
    "desc": "Cukup aware dalam keseharian."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Mindful Tinggi",
    "emoji": "✨",
    "desc": "Kesadaran & penerimaan kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Mindful",
    "emoji": "🌟",
    "desc": "Mindfulness sangat tinggi — present moment master."
  }
];

const TYPES = {
  "Aw": {
    "code": "Aw",
    "name": "Awareness",
    "nameId": "Kesadaran",
    "emoji": "👁️",
    "color": "#14B8A6",
    "description": "Kesadaran penuh terhadap momen saat ini.",
    "style": "Sadar dengan apa yang sedang terjadi di sini & sekarang."
  },
  "Dr": {
    "code": "Dr",
    "name": "Distraction",
    "nameId": "Distraksi",
    "emoji": "🌀",
    "color": "#06B6D4",
    "description": "Kecenderungan mind-wandering & autopilot (skor rendah = mindfulness tinggi).",
    "style": "Sering lupa apa yang sedang dilakukan — jalan autopilot."
  },
  "Ac": {
    "code": "Ac",
    "name": "Acceptance",
    "nameId": "Penerimaan",
    "emoji": "🕊️",
    "color": "#0EA5E9",
    "description": "Menerima pengalaman tanpa menghakimi.",
    "style": "Bisa observe perasaan tanpa langsung bereaksi."
  }
};

const QUESTIONS = [
  {
    "id": "aw1",
    "type": "Aw",
    "text": "Aku sadar dengan apa yang sedang aku rasakan di momen ini"
  },
  {
    "id": "aw2",
    "type": "Aw",
    "text": "Aku perhatian penuh terhadap aktivitas yang sedang aku lakukan"
  },
  {
    "id": "aw3",
    "type": "Aw",
    "text": "Aku aware dengan sensasi tubuh & lingkungan sekitarku"
  },
  {
    "id": "aw4",
    "type": "Aw",
    "text": "Aku hadir sepenuhnya saat ngobrol atau makan"
  },
  {
    "id": "dr1",
    "type": "Dr",
    "text": "Aku sering lupa apa yang baru saja aku lakukan"
  },
  {
    "id": "dr2",
    "type": "Dr",
    "text": "Aku jalan autopilot — tidak sadar aktivitas harian"
  },
  {
    "id": "dr3",
    "type": "Dr",
    "text": "Aku sulit fokus pada satu hal karena mind wandering"
  },
  {
    "id": "dr4",
    "type": "Dr",
    "text": "Aku tidak sadar emosi yang sedang aku rasakan"
  },
  {
    "id": "ac1",
    "type": "Ac",
    "text": "Aku bisa observe perasaanku tanpa langsung bereaksi"
  },
  {
    "id": "ac2",
    "type": "Ac",
    "text": "Aku menerima pengalaman sulit tanpa terlalu menghakimi"
  },
  {
    "id": "ac3",
    "type": "Ac",
    "text": "Aku tidak terlalu attached pada pikiran negatif"
  },
  {
    "id": "ac4",
    "type": "Ac",
    "text": "Aku bisa duduk dengan ketidaknyamanan tanpa panik"
  }
];

const DIMENSION_ORDER = ["Aw","Dr","Ac"];

const SURVEY_META = {
  "id": "general-mindfulness",
  "slug": "general-mindfulness",
  "title": "Seberapa Mindful Kamu?",
  "subtitle": "Ukur awareness, distraksi, & penerimaan di kehidupan sehari-hari",
  "description": "Survey berbasis Mindful Attention Awareness Scale (Brown & Ryan, 2003) — awareness, distraction, & acceptance.",
  "icon": "🧘",
  "color": "from-teal-500 via-cyan-500 to-sky-500",
  "audience": "umum",
  "tags": [
    "Mindfulness",
    "MAAS",
    "Awareness"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Brown (2003). The Benefits of Being Present",
    "Kabat-Zinn (1994). Wherever You Go, There You Are",
    "Bishop (2004). Mindfulness",
    "Creswell (2007). Mindfulness Meditation Training Effects on CD4+ T Lymphocytes",
    "Keng (2011). Effects of Mindfulness on Psychological Health"
  ],
  "detail": {
    "about": "Survey berbasis Mindful Attention Awareness Scale (Brown & Ryan, 2003) — awareness, distraction, & acceptance.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Mindful Attention Awareness Scale (Brown & Ryan, 2003) — awareness, distraction, & acceptance."
    },
    "howItWorks": [
      {
        "step": "01",
        "title": "Jawab 12 Pertanyaan",
        "desc": "Skala Likert 1–5 tentang pengalamanmu."
      },
      {
        "step": "02",
        "title": "Analisis Dimensi",
        "desc": "Skor per dimensi dinormalisasi 0–100%."
      },
      {
        "step": "03",
        "title": "Indeks & Profil",
        "desc": "Indeks Mindfulness + kode dimensi."
      },
      {
        "step": "04",
        "title": "Share Hasil",
        "desc": "Bagikan lewat link, QR, atau kode SF-XXXXXX."
      }
    ],
    "methodology": {
      "title": "Cara Penilaian",
      "items": [
        "Likert 1–5",
        "4 item per dimensi",
        "Indeks = rata-rata dimensi",
        "Kode = 3 dimensi tertinggi"
      ]
    },
    "results": {
      "title": "Apa yang Kamu Dapatkan?",
      "items": [
        "Indeks + level profil",
        "Peta dimensi",
        "Penjelasan dominan",
        "Share link & QR"
      ]
    }
  }
};

function getProfile(scoring) {
  return scoring.level;
}

function getSummary(scoring, typeInfo) {
  return "Indeks mindfulness {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Brown & Ryan, 2003)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "general-mindfulness",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "maas",
  indexLabel: "Indeks Mindfulness",
  indexLabelShort: "Mindfulness",
  invertDimensions: ["Dr"],
  getProfile,
  getSummary,
};
