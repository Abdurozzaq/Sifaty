const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Kurang Syukur",
    "emoji": "😔",
    "desc": "Gratitude rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Bersyukur",
    "emoji": "🙂",
    "desc": "Sesekali appreciative — masih berkembang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Bersyukur",
    "emoji": "🙏",
    "desc": "Cukup grateful dalam keseharian."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Sangat Bersyukur",
    "emoji": "💛",
    "desc": "Gratitude tinggi — wellbeing booster."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Grateful Master",
    "emoji": "🌟",
    "desc": "Gratitude sangat tinggi — abundance mindset."
  }
];

const TYPES = {
  "Ap": {
    "code": "Ap",
    "name": "Appreciation",
    "nameId": "Apresiasi",
    "emoji": "💛",
    "color": "#EAB308",
    "description": "Menghargai hal-hal baik dalam hidup.",
    "style": "Bisa notice hal kecil yang bikin senang."
  },
  "Ab": {
    "code": "Ab",
    "name": "Abundance",
    "nameId": "Kekelimpahan",
    "emoji": "🌻",
    "color": "#CA8A04",
    "description": "Merasa hidup penuh berkah & cukup.",
    "style": "Tidak merasa kekurangan — banyak yang sudah dimiliki."
  },
  "So": {
    "code": "So",
    "name": "Social Gratitude",
    "nameId": "Gratitude Sosial",
    "emoji": "🤗",
    "color": "#A16207",
    "description": "Rasa terima kasih kepada orang lain.",
    "style": "Sadari kontribusi orang lain dalam hidupku."
  }
};

const QUESTIONS = [
  {
    "id": "ap1",
    "type": "Ap",
    "text": "Aku menghargai hal-hal kecil yang sering dianggap remeh"
  },
  {
    "id": "ap2",
    "type": "Ap",
    "text": "Aku sadar betapa beruntungnya hidupku saat ini"
  },
  {
    "id": "ap3",
    "type": "Ap",
    "text": "Aku bisa menemukan hal baik meski dalam situasi sulit"
  },
  {
    "id": "ap4",
    "type": "Ap",
    "text": "Aku sering merasa thankful untuk apa yang aku punya"
  },
  {
    "id": "ab1",
    "type": "Ab",
    "text": "Aku merasa hidupku penuh dengan hal-hal baik"
  },
  {
    "id": "ab2",
    "type": "Ab",
    "text": "Aku merasa cukup dengan apa yang sudah aku capai"
  },
  {
    "id": "ab3",
    "type": "Ab",
    "text": "Aku tidak terlalu fokus pada yang belum aku miliki"
  },
  {
    "id": "ab4",
    "type": "Ab",
    "text": "Aku merasa berkelimpahan dalam banyak aspek hidup"
  },
  {
    "id": "so1",
    "type": "So",
    "text": "Aku berterima kasih pada orang yang membantu hidupku"
  },
  {
    "id": "so2",
    "type": "So",
    "text": "Aku sadar kontribusi keluarga & teman dalam hidupku"
  },
  {
    "id": "so3",
    "type": "So",
    "text": "Aku mengungkapkan rasa terima kasih kepada orang lain"
  },
  {
    "id": "so4",
    "type": "So",
    "text": "Aku merasa indebted secara positif pada orang yang peduli"
  }
];

const DIMENSION_ORDER = ["Ap","Ab","So"];

const SURVEY_META = {
  "id": "general-gratitude",
  "slug": "general-gratitude",
  "title": "Seberapa Bersyukur Kamu?",
  "subtitle": "Ukur apresiasi, rasa berkelimpahan, & gratitude sosial",
  "description": "Survey berbasis Gratitude Questionnaire-6 (McCullough et al., 2002) — appreciation, abundance, & social gratitude.",
  "icon": "🙏",
  "color": "from-amber-400 via-yellow-500 to-lime-500",
  "audience": "umum",
  "tags": [
    "Gratitude",
    "GQ-6",
    "Wellbeing"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "McCullough (2002). Is Gratitude a Moral Affect?",
    "Emmons (2003). Counting Blessings Versus Burdens",
    "Wood (2010). Gratitude and Well-Being",
    "Bartlett (2006). Gratitude and Prosocial Behavior",
    "Froh (2011). Gratitude and the Reduced Costs of Materialism in Adolescents"
  ],
  "detail": {
    "about": "Survey berbasis Gratitude Questionnaire-6 (McCullough et al., 2002) — appreciation, abundance, & social gratitude.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Gratitude Questionnaire-6 (McCullough et al., 2002) — appreciation, abundance, & social gratitude."
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
        "desc": "Indeks Gratitude + kode dimensi."
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
  return "Indeks gratitude {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (McCullough et al., 2002)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "general-gratitude",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "gq6",
  indexLabel: "Indeks Gratitude",
  indexLabelShort: "Gratitude",
  invertDimensions: [],
  getProfile,
  getSummary,
};
