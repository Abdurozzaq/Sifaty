const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Disengaged",
    "emoji": "😶",
    "desc": "Engagement rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Engaged",
    "emoji": "🙂",
    "desc": "Engagement sedang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Engaged",
    "emoji": "😊",
    "desc": "Cukup terlibat dengan pekerjaan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Highly Engaged",
    "emoji": "⚡",
    "desc": "Engagement tinggi — vigor & dedication kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Fully Engaged",
    "emoji": "🌟",
    "desc": "Work engagement sangat tinggi."
  }
];

const TYPES = {
  "V": {
    "code": "V",
    "name": "Vigor",
    "nameId": "Vigor",
    "emoji": "🔋",
    "color": "#F59E0B",
    "description": "Energi & semangat tinggi di pekerjaan.",
    "style": "Bangun semangat kerja — punya drive & resilience."
  },
  "D": {
    "code": "D",
    "name": "Dedication",
    "nameId": "Dedikasi",
    "emoji": "❤️",
    "color": "#EF4444",
    "description": "Keterlibatan & kebanggaan terhadap pekerjaan.",
    "style": "Merasa pekerjaan meaningful & bangga dengan kontribusi."
  },
  "A": {
    "code": "A",
    "name": "Absorption",
    "nameId": "Absorpsi",
    "emoji": "🎯",
    "color": "#F97316",
    "description": "Konsentrasi penuh & flow saat bekerja.",
    "style": "Lupa waktu saat kerja — fully immersed."
  }
};

const QUESTIONS = [
  {
    "id": "v1",
    "type": "V",
    "text": "Aku datang kerja dengan semangat & energi penuh"
  },
  {
    "id": "v2",
    "type": "V",
    "text": "Aku merasa resilient saat menghadapi tantangan kerja"
  },
  {
    "id": "v3",
    "type": "V",
    "text": "Aku punya drive untuk bekerja dengan giat"
  },
  {
    "id": "v4",
    "type": "V",
    "text": "Aku tidak mudah lelah meski pekerjaan padat"
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku merasa pekerjaanku meaningful & berarti"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku bangga dengan apa yang aku capai di kantor"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku merasa terinspirasi oleh pekerjaanku"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku passionate dengan bidang yang aku kerjakan"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku mudah masuk flow saat mengerjakan tugas"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku lupa waktu saat fokus bekerja"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku sulit lepas dari pekerjaan karena enjoy prosesnya"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku fully immersed saat menyelesaikan project"
  }
];

const DIMENSION_ORDER = ["V","D","A"];

const SURVEY_META = {
  "id": "worker-engagement",
  "slug": "worker-engagement",
  "title": "Seberapa Engaged di Kerja?",
  "subtitle": "Ukur vigor, dedication, & absorption di tempat kerja",
  "description": "Survey berbasis Utrecht Work Engagement Scale (UWES) — vigor, dedication, & absorption.",
  "icon": "⚡",
  "color": "from-yellow-500 via-amber-500 to-orange-500",
  "audience": "pekerja",
  "tags": [
    "Engagement",
    "UWES",
    "Motivasi Kerja"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Schaufeli (2002). The Measurement of Engagement and Burnout",
    "Schaufeli (2006). The Measurement of Work Engagement With a Short Questionnaire",
    "Bakker (2008). Towards a Model of Work Engagement",
    "Christensen (2012). Validation of the UWES in a Danish Sample",
    "Seppälä (2013). The Construct Validity of the UWES"
  ],
  "detail": {
    "about": "Survey berbasis Utrecht Work Engagement Scale (UWES) — vigor, dedication, & absorption.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Utrecht Work Engagement Scale (UWES) — vigor, dedication, & absorption."
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
        "desc": "Indeks Engagement Kerja + kode dimensi."
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
  return "Indeks work engagement {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Schaufeli et al., 2002)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-engagement",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "engw",
  indexLabel: "Indeks Engagement Kerja",
  indexLabelShort: "Engagement",
  invertDimensions: [],
  getProfile,
  getSummary,
};
