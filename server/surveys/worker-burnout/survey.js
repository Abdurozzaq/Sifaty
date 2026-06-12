const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Engaged",
    "emoji": "🌟",
    "desc": "Burnout rendah — engagement sehat."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Mulai Lelah",
    "emoji": "😐",
    "desc": "Ada tanda kelelahan."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Burnout Sedang",
    "emoji": "😓",
    "desc": "Burnout mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Burnout Tinggi",
    "emoji": "🔥",
    "desc": "Pertimbangkan istirahat atau perubahan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Burnout Parah",
    "emoji": "💀",
    "desc": "Burnout sangat tinggi — cari bantuan profesional."
  }
];

const TYPES = {
  "E": {
    "code": "E",
    "name": "Exhaustion",
    "nameId": "Kelelahan",
    "emoji": "😩",
    "color": "#EF4444",
    "description": "Kelelahan emosional akibat pekerjaan.",
    "style": "Bangun pagi sudah lelah memikirkan kantor."
  },
  "C": {
    "code": "C",
    "name": "Cynicism",
    "nameId": "Sinisme",
    "emoji": "😒",
    "color": "#F97316",
    "description": "Sikap apatis terhadap pekerjaan & rekan.",
    "style": "Meragukan makna pekerjaan — motivasi drop."
  },
  "F": {
    "code": "F",
    "name": "Efficacy",
    "nameId": "Efikasi Profesional",
    "emoji": "💪",
    "color": "#10B981",
    "description": "Keyakinan diri di pekerjaan (skor rendah = burnout tinggi).",
    "style": "Merasa tidak kompeten di tempat kerja."
  }
};

const QUESTIONS = [
  {
    "id": "e1",
    "type": "E",
    "text": "Aku merasa drained setelah seharian bekerja"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku merasa lelah bahkan sebelum mulai kerja"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Overtime & tekanan KPI bikin tubuhku collapse"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku sulit recovery energy di weekend"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku merasa apatis terhadap pekerjaanku"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku sinis terhadap atasan atau perusahaan"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku meragukan apakah pekerjaanku berarti"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Motivasiku kerja menurun drastis"
  },
  {
    "id": "f1",
    "type": "F",
    "text": "Aku yakin bisa menyelesaikan tugas kerja dengan baik"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku merasa kompeten di bidang pekerjaanku"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku percaya kontribusiku di tempat kerja berarti"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku mampu handle tekanan di kantor"
  }
];

const DIMENSION_ORDER = ["E","C","F"];

const SURVEY_META = {
  "id": "worker-burnout",
  "slug": "worker-burnout",
  "title": "Seberapa Burnout Kerjamu?",
  "subtitle": "Ukur kelelahan, sinisme, & efikasi di tempat kerja",
  "description": "Survey berbasis MBI-General Survey (Maslach & Jackson, 1981; Schaufeli et al.).",
  "icon": "💼",
  "color": "from-red-500 via-orange-500 to-amber-500",
  "audience": "pekerja",
  "tags": [
    "Burnout",
    "MBI-GS",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Maslach (1981). The Measurement of Experienced Burnout",
    "Schaufeli (1996). MBI-General Survey",
    "Bakker (2014). Job Demands-Resources Theory",
    "Ahola (2007). Job Strain, Burnout, and Depressive Symptoms",
    "Pranke (2022). Burnout in the Workplace"
  ],
  "detail": {
    "about": "Survey berbasis MBI-General Survey (Maslach & Jackson, 1981; Schaufeli et al.).",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis MBI-General Survey (Maslach & Jackson, 1981; Schaufeli et al.)."
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
        "desc": "Indeks Burnout Kerja + kode dimensi."
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
  return "Indeks burnout kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Maslach & Jackson, 1981)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-burnout",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "burnw",
  indexLabel: "Indeks Burnout Kerja",
  indexLabelShort: "Burnout Kerja",
  invertDimensions: ["F"],
  getProfile,
  getSummary,
};
