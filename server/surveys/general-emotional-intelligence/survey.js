const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "EQ Rendah",
    "emoji": "😶",
    "desc": "Emotional intelligence rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "EQ Cukup",
    "emoji": "🙂",
    "desc": "EQ sedang — masih berkembang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "EQ Sedang",
    "emoji": "😊",
    "desc": "Cukup aware & regulasi emosi."
  },
  {
    "min": 61,
    "max": 75,
    "name": "EQ Tinggi",
    "emoji": "💡",
    "desc": "Emotional intelligence kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "EQ Sangat Tinggi",
    "emoji": "🌟",
    "desc": "EQ sangat tinggi — emotionally intelligent."
  }
];

const TYPES = {
  "Se": {
    "code": "Se",
    "name": "Self Emotion",
    "nameId": "Emosi Diri",
    "emoji": "🪞",
    "color": "#8B5CF6",
    "description": "Kesadaran & pemahaman emosi sendiri.",
    "style": "Tahu kapan sedih, marah, atau cemas — dan kenapa."
  },
  "Ot": {
    "code": "Ot",
    "name": "Others Emotion",
    "nameId": "Emosi Orang Lain",
    "emoji": "👥",
    "color": "#7C3AED",
    "description": "Kemampuan memahami emosi orang lain.",
    "style": "Bisa baca mood teman atau rekan kerja."
  },
  "Re": {
    "code": "Re",
    "name": "Regulation",
    "nameId": "Regulasi Emosi",
    "emoji": "⚖️",
    "color": "#6366F1",
    "description": "Kemampuan mengelola & mengekspresikan emosi.",
    "style": "Tidak mudah meledak — bisa calm down sendiri."
  }
};

const QUESTIONS = [
  {
    "id": "se1",
    "type": "Se",
    "text": "Aku sadar kapan sedang marah, sedih, atau cemas"
  },
  {
    "id": "se2",
    "type": "Se",
    "text": "Aku paham penyebab emosi yang sedang aku rasakan"
  },
  {
    "id": "se3",
    "type": "Se",
    "text": "Aku bisa mendeskripsikan perasaanku dengan jelas"
  },
  {
    "id": "se4",
    "type": "Se",
    "text": "Aku aware dengan perubahan mood diri sendiri"
  },
  {
    "id": "ot1",
    "type": "Ot",
    "text": "Aku bisa merasakan emosi orang lain meski tidak diungkapkan"
  },
  {
    "id": "ot2",
    "type": "Ot",
    "text": "Aku paham perasaan teman atau keluarga dari ekspresi mereka"
  },
  {
    "id": "ot3",
    "type": "Ot",
    "text": "Aku sensitif terhadap suasana emosional di lingkunganku"
  },
  {
    "id": "ot4",
    "type": "Ot",
    "text": "Aku bisa empathize dengan perasaan orang lain"
  },
  {
    "id": "re1",
    "type": "Re",
    "text": "Aku bisa mengendalikan emosi agar tidak meledak"
  },
  {
    "id": "re2",
    "type": "Re",
    "text": "Aku bisa tenang diri saat marah atau frustrasi"
  },
  {
    "id": "re3",
    "type": "Re",
    "text": "Aku bisa mengekspresikan emosi dengan cara yang tepat"
  },
  {
    "id": "re4",
    "type": "Re",
    "text": "Aku bisa mengalihkan perasaan negatif ke hal produktif"
  }
];

const DIMENSION_ORDER = ["Se","Ot","Re"];

const SURVEY_META = {
  "id": "general-emotional-intelligence",
  "slug": "general-emotional-intelligence",
  "title": "Seberapa Cerdas Emosimu?",
  "subtitle": "Ukur kesadaran emosi diri, orang lain, & regulasi emosi",
  "description": "Survey berbasis Wong and Law Emotional Intelligence Scale (WLEIS) — self emotion, others emotion, & regulation.",
  "icon": "💡",
  "color": "from-purple-500 via-violet-500 to-indigo-500",
  "audience": "umum",
  "tags": [
    "EQ",
    "WLEIS",
    "Emosi"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Wong (2002). The Effects of Leader and Follower Emotional Intelligence on Performance and Attitude",
    "Salovey (1990). Emotional Intelligence",
    "Goleman (1995). Emotional Intelligence",
    "Law (2008). Construct and Criterion Validities of the WLEIS",
    "Mayer (2008). Emotional Intelligence"
  ],
  "detail": {
    "about": "Survey berbasis Wong and Law Emotional Intelligence Scale (WLEIS) — self emotion, others emotion, & regulation.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Wong and Law Emotional Intelligence Scale (WLEIS) — self emotion, others emotion, & regulation."
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
        "desc": "Indeks Kecerdasan Emosional + kode dimensi."
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
  return "Indeks emotional intelligence {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Wong & Law, 2002)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "general-emotional-intelligence",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "wlei",
  indexLabel: "Indeks Kecerdasan Emosional",
  indexLabelShort: "EQ",
  invertDimensions: [],
  getProfile,
  getSummary,
};
