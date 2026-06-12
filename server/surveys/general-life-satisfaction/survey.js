const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Tidak Puas",
    "emoji": "😔",
    "desc": "Life satisfaction rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Puas",
    "emoji": "🙂",
    "desc": "Kepuasan hidup sedang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Puas",
    "emoji": "😊",
    "desc": "Cukup puas dengan hidup saat ini."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Sangat Puas",
    "emoji": "☀️",
    "desc": "Life satisfaction tinggi."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Bahagia",
    "emoji": "🌟",
    "desc": "Kepuasan hidup sangat tinggi."
  }
];

const TYPES = {
  "L": {
    "code": "L",
    "name": "Life Overall",
    "nameId": "Hidup Secara Umum",
    "emoji": "🌍",
    "color": "#F59E0B",
    "description": "Kepuasan terhadap hidup secara keseluruhan.",
    "style": "Secara big picture — hidup ini sudah cukup baik."
  },
  "C": {
    "code": "C",
    "name": "Conditions",
    "nameId": "Kondisi Hidup",
    "emoji": "🏠",
    "color": "#F97316",
    "description": "Kepuasan dengan kondisi & keadaan hidup saat ini.",
    "style": "Lingkungan, pekerjaan, relasi — kondisi eksternal."
  },
  "F": {
    "code": "F",
    "name": "Fulfillment",
    "nameId": "Pemenuhan",
    "emoji": "✨",
    "color": "#EAB308",
    "description": "Rasa terpenuhi & meaningful dalam hidup.",
    "style": "Merasa hidup punya arah & makna."
  }
};

const QUESTIONS = [
  {
    "id": "l1",
    "type": "L",
    "text": "Aku puas dengan hidupku secara keseluruhan"
  },
  {
    "id": "l2",
    "type": "L",
    "text": "Aku merasa hidupku mendekati ideal yang aku inginkan"
  },
  {
    "id": "l3",
    "type": "L",
    "text": "Aku merasa hidupku berjalan dengan baik"
  },
  {
    "id": "l4",
    "type": "L",
    "text": "Aku tidak ingin mengubah banyak hal dalam hidupku"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku puas dengan kondisi pekerjaan atau kuliahku saat ini"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku puas dengan relasi & lingkungan sosialku"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku puas dengan keadaan finansial & materialku"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku puas dengan kesehatan & energi tubuhku"
  },
  {
    "id": "f1",
    "type": "F",
    "text": "Aku merasa hidupku meaningful & punya tujuan"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku merasa terpenuhi dengan apa yang sudah aku capai"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku merasa hidupku berjalan sesuai nilai yang aku anut"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku optimis tentang masa depan hidupku"
  }
];

const DIMENSION_ORDER = ["L","C","F"];

const SURVEY_META = {
  "id": "general-life-satisfaction",
  "slug": "general-life-satisfaction",
  "title": "Seberapa Puas dengan Hidupmu?",
  "subtitle": "Ukur kepuasan hidup, kondisi, & rasa pemenuhan secara keseluruhan",
  "description": "Survey berbasis Satisfaction with Life Scale (Diener et al., 1985) — life overall, conditions, & fulfillment.",
  "icon": "☀️",
  "color": "from-yellow-400 via-amber-400 to-orange-400",
  "audience": "umum",
  "tags": [
    "Life Satisfaction",
    "SWLS",
    "Wellbeing"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Diener (1985). The Satisfaction With Life Scale",
    "Pavot (1993). Review of the Satisfaction With Life Scale",
    "Diener (1999). Subjective Well-Being",
    "Shin (1978). Avowed Happiness as an Overall Assessment of the Quality of Life",
    "Kesebir (2018). A Virtuous Cycle"
  ],
  "detail": {
    "about": "Survey berbasis Satisfaction with Life Scale (Diener et al., 1985) — life overall, conditions, & fulfillment.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Satisfaction with Life Scale (Diener et al., 1985) — life overall, conditions, & fulfillment."
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
        "desc": "Indeks Kepuasan Hidup + kode dimensi."
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
  return "Indeks life satisfaction {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Diener et al., 1985)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "general-life-satisfaction",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "swls",
  indexLabel: "Indeks Kepuasan Hidup",
  indexLabelShort: "Kepuasan Hidup",
  invertDimensions: [],
  getProfile,
  getSummary,
};
