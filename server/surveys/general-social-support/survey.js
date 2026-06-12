const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Kurang Dukungan",
    "emoji": "😔",
    "desc": "Perceived social support rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Didukung",
    "emoji": "🙂",
    "desc": "Dukungan sosial sedang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Didukung",
    "emoji": "🫶",
    "desc": "Cukup punya jaringan dukungan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Sangat Didukung",
    "emoji": "💕",
    "desc": "Social support kuat — protective factor."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Jaringan Kuat",
    "emoji": "🌟",
    "desc": "Dukungan sosial sangat tinggi."
  }
];

const TYPES = {
  "Fa": {
    "code": "Fa",
    "name": "Family",
    "nameId": "Keluarga",
    "emoji": "👨‍👩‍👧",
    "color": "#EC4899",
    "description": "Dukungan dari keluarga.",
    "style": "Keluarga ada saat butuh — emotionally & praktis."
  },
  "Fr": {
    "code": "Fr",
    "name": "Friends",
    "nameId": "Teman",
    "emoji": "👯",
    "color": "#F43F5E",
    "description": "Dukungan dari teman & circle sosial.",
    "style": "Teman bisa diajak curhat & dia mendengarkan."
  },
  "Sp": {
    "code": "Sp",
    "name": "Significant Other",
    "nameId": "Pasangan",
    "emoji": "💕",
    "color": "#FB7185",
    "description": "Dukungan dari pasangan atau orang spesial.",
    "style": "Ada orang yang benar-benar peduli & mendukung."
  }
};

const QUESTIONS = [
  {
    "id": "fa1",
    "type": "Fa",
    "text": "Aku punya keluarga yang bisa diajak bicara saat butuh"
  },
  {
    "id": "fa2",
    "type": "Fa",
    "text": "Keluargaku mendukungku dalam keputusan hidup"
  },
  {
    "id": "fa3",
    "type": "Fa",
    "text": "Aku bisa mengandalkan keluarga saat ada masalah"
  },
  {
    "id": "fa4",
    "type": "Fa",
    "text": "Aku merasa diterima & dicintai oleh keluargaku"
  },
  {
    "id": "fr1",
    "type": "Fr",
    "text": "Aku punya teman yang benar-benar peduli denganku"
  },
  {
    "id": "fr2",
    "type": "Fr",
    "text": "Teman-temanku mendengarkan saat aku butuh curhat"
  },
  {
    "id": "fr3",
    "type": "Fr",
    "text": "Aku bisa mengandalkan teman saat ada kesulitan"
  },
  {
    "id": "fr4",
    "type": "Fr",
    "text": "Aku merasa punya circle teman yang supportive"
  },
  {
    "id": "sp1",
    "type": "Sp",
    "text": "Aku punya pasangan atau orang spesial yang mendukungku"
  },
  {
    "id": "sp2",
    "type": "Sp",
    "text": "Orang terdekatku ada untukku saat aku butuh"
  },
  {
    "id": "sp3",
    "type": "Sp",
    "text": "Aku merasa dicintai & dihargai oleh orang yang aku sayangi"
  },
  {
    "id": "sp4",
    "type": "Sp",
    "text": "Aku punya seseorang yang bisa diajak sharing perasaan intim"
  }
];

const DIMENSION_ORDER = ["Fa","Fr","Sp"];

const SURVEY_META = {
  "id": "general-social-support",
  "slug": "general-social-support",
  "title": "Seberapa Didukung Sosialmu?",
  "subtitle": "Ukur dukungan keluarga, teman, & pasangan dalam hidupmu",
  "description": "Survey berbasis Multidimensional Scale of Perceived Social Support (Zimet et al., 1988) — family, friends, & significant other.",
  "icon": "🫶",
  "color": "from-pink-500 via-rose-500 to-red-400",
  "audience": "umum",
  "tags": [
    "Social Support",
    "MSPSS",
    "Relasi"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Zimet (1988). The Multidimensional Scale of Perceived Social Support",
    "Zimet (1990). Psychometric Characteristics of the MSPSS",
    "Cohen (1985). Stress, Social Support, and the Buffering Hypothesis",
    "Lakey (2011). Relational Regulation Theory",
    "Chou (2014). Perceived Social Support and Depression Among College Students"
  ],
  "detail": {
    "about": "Survey berbasis Multidimensional Scale of Perceived Social Support (Zimet et al., 1988) — family, friends, & significant other.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Multidimensional Scale of Perceived Social Support (Zimet et al., 1988) — family, friends, & significant other."
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
        "desc": "Indeks Dukungan Sosial + kode dimensi."
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
  return "Indeks social support {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Zimet et al., 1988)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "general-social-support",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "mspss",
  indexLabel: "Indeks Dukungan Sosial",
  indexLabelShort: "Dukungan Sosial",
  invertDimensions: [],
  getProfile,
  getSummary,
};
