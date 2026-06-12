const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Emotional labor rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Acting ringan — sesekali diperlukan."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Beban emosional sedang — mulai terasa drained."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Emotional labor tinggi — wellbeing terdampak."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Beban emosional sangat parah — risiko burnout & compassion fatigue."
  }
];

const TYPES = {
  "F": {
    "code": "F",
    "name": "Surface Acting",
    "nameId": "Surface Acting",
    "emoji": "😊",
    "color": "#7C3AED",
    "description": "Menyembunyikan emosi asli & tampil sesuai aturan display.",
    "style": "Senyum ke klien padahal sebenarnya frustrasi — acting profesional."
  },
  "S": {
    "code": "S",
    "name": "Suppression",
    "nameId": "Suppression Emosi",
    "emoji": "🤐",
    "color": "#6D28D9",
    "description": "Menekan emosi negatif agar tidak terlihat.",
    "style": "Tahan marah ke atasan — emosi ditelan terus-menerus."
  },
  "E": {
    "code": "E",
    "name": "Exhaustion",
    "nameId": "Kelelahan Emosional",
    "emoji": "😩",
    "color": "#5B21B6",
    "description": "Kelelahan akibat regulasi emosi berulang di kerja.",
    "style": "Pulang kerja drained — tidak ada energi emosional tersisa."
  }
};

const QUESTIONS = [
  {
    "id": "f1",
    "type": "F",
    "text": "Aku harus tampil ramah ke klien/pelanggan meski sedang bad mood"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku pura-pura peduli saat sebenarnya tidak feel it"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku harus senyum & positif meski situasi kerja stressful"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku acting profesional padahal emosi asliku berbeda"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku menahan marah atau frustrasi agar tidak keluar di kantor"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku suppress emosi negatif saat meeting dengan atasan"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku tidak boleh express kecewa meski merasa diperlakukan unfair"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku menelan emosi demi menjaga hubungan profesional"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku merasa drained setelah seharian manage emosi di kerja"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku lelah secara emosional karena harus selalu \"on\""
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku merasa habis energi emosional saat pulang kerja"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku burnout karena terus-menerus regulasi perasaan di kantor"
  }
];

const DIMENSION_ORDER = ["F","S","E"];

const SURVEY_META = {
  "id": "worker-emotional-labor",
  "slug": "worker-emotional-labor",
  "title": "Seberapa Parah Beban Emosional Kerjamu?",
  "subtitle": "Ukur surface acting, suppression, & kelelahan emosional",
  "description": "Survey berbasis Emotional Labor Scale (Grandey, 2000) — surface acting, emotional suppression, & exhaustion dari regulasi emosi di kerja.",
  "icon": "🎭",
  "color": "from-purple-700 via-violet-700 to-indigo-700",
  "audience": "pekerja",
  "tags": [
    "Analisis Negatif",
    "Emotional Labor",
    "Burnout"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Hochschild (1983). The Managed Heart",
    "Grandey (2000). Emotion Regulation in the Workplace",
    "Brotheridge (2003). Development and Validation of the Emotional Labour Scale",
    "Huppertz (2007). The Impact of Emotional Labor on Customer Orientation and Burnout",
    "Huang (2018). Emotional Labor and Emotional Exhaustion"
  ],
  "detail": {
    "about": "Survey berbasis Emotional Labor Scale (Grandey, 2000) — surface acting, emotional suppression, & exhaustion dari regulasi emosi di kerja.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Emotional Labor Scale (Grandey, 2000) — surface acting, emotional suppression, & exhaustion dari regulasi emosi di kerja."
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
        "desc": "Indeks Emotional Labor + kode dimensi."
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
  return "Indeks emotional labor {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Hochschild, 1983; Grandey, 2000)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-emotional-labor",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "ellw",
  indexLabel: "Indeks Emotional Labor",
  indexLabelShort: "Emotional Labor",
  invertDimensions: [],
  getProfile,
  getSummary,
};
