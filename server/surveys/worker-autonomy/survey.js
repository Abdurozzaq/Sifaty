const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Terbatas",
    "emoji": "🔒",
    "desc": "Otonomi kerja rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Bebas",
    "emoji": "🙂",
    "desc": "Autonomy sedang — ada ruang improvement."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Otonom Sedang",
    "emoji": "🎛️",
    "desc": "Cukup punya kontrol & dukungan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Otonom Tinggi",
    "emoji": "✨",
    "desc": "Autonomy & resources kerja kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Otonom",
    "emoji": "🌟",
    "desc": "Work autonomy sangat tinggi — engagement driver."
  }
];

const TYPES = {
  "Au": {
    "code": "Au",
    "name": "Autonomy",
    "nameId": "Otonomi",
    "emoji": "🆓",
    "color": "#14B8A6",
    "description": "Kebebasan menentukan cara & waktu kerja.",
    "style": "Bisa atur sendiri metode & prioritas tanpa micromanage."
  },
  "Sk": {
    "code": "Sk",
    "name": "Skill Utilization",
    "nameId": "Pemanfaatan Skill",
    "emoji": "🧠",
    "color": "#10B981",
    "description": "Kesempatan menggunakan & mengembangkan keahlian.",
    "style": "Tugas sesuai kompetensi — ada ruang growth."
  },
  "So": {
    "code": "So",
    "name": "Social Support",
    "nameId": "Dukungan Sosial",
    "emoji": "🤝",
    "color": "#059669",
    "description": "Dukungan rekan & atasan di tempat kerja.",
    "style": "Bisa minta bantuan & merasa didukung tim."
  }
};

const QUESTIONS = [
  {
    "id": "au1",
    "type": "Au",
    "text": "Aku punya kebebasan menentukan cara mengerjakan tugasku"
  },
  {
    "id": "au2",
    "type": "Au",
    "text": "Aku bisa atur sendiri prioritas pekerjaan harian"
  },
  {
    "id": "au3",
    "type": "Au",
    "text": "Aku punya autonomy dalam keputusan terkait pekerjaanku"
  },
  {
    "id": "au4",
    "type": "Au",
    "text": "Atasan memberi ruang untuk menentukan metode kerja"
  },
  {
    "id": "sk1",
    "type": "Sk",
    "text": "Aku bisa menggunakan keahlian & skill yang aku punya"
  },
  {
    "id": "sk2",
    "type": "Sk",
    "text": "Pekerjaanku menantang & memungkinkan aku berkembang"
  },
  {
    "id": "sk3",
    "type": "Sk",
    "text": "Aku punya kesempatan belajar skill baru di kantor"
  },
  {
    "id": "sk4",
    "type": "Sk",
    "text": "Tugasku sesuai dengan kompetensi & minatku"
  },
  {
    "id": "so1",
    "type": "So",
    "text": "Aku bisa mengandalkan rekan kerja saat butuh bantuan"
  },
  {
    "id": "so2",
    "type": "So",
    "text": "Atasan mendukung & menghargai kontribusiku"
  },
  {
    "id": "so3",
    "type": "So",
    "text": "Aku merasa diterima & didukung di tim"
  },
  {
    "id": "so4",
    "type": "So",
    "text": "Aku punya orang di kantor yang bisa diajak diskusi masalah kerja"
  }
];

const DIMENSION_ORDER = ["Au","Sk","So"];

const SURVEY_META = {
  "id": "worker-autonomy",
  "slug": "worker-autonomy",
  "title": "Seberapa Otonom di Kerja?",
  "subtitle": "Ukur autonomy, skill utilization, & dukungan sosial di kantor",
  "description": "Survey berbasis JD-R & Self-Determination Theory — autonomy, skill utilization, & social support at work.",
  "icon": "🎛️",
  "color": "from-cyan-500 via-teal-500 to-emerald-500",
  "audience": "pekerja",
  "tags": [
    "Autonomy",
    "JD-R",
    "SDT"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Deci (2000). The \"What\" and \"Why\" of Goal Pursuits",
    "Bakker (2014). Job Demands-Resources Theory",
    "Morgeson (2006). The Work Design Questionnaire (WDQ)",
    "Gagné (2005). Self-Determination Theory and Work Motivation",
    "Van den Broeck (2016). A Review of Self-Determination Theory's Basic Psychological Needs at Work"
  ],
  "detail": {
    "about": "Survey berbasis JD-R & Self-Determination Theory — autonomy, skill utilization, & social support at work.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis JD-R & Self-Determination Theory — autonomy, skill utilization, & social support at work."
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
        "desc": "Indeks Otonomi Kerja + kode dimensi."
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
  return "Indeks work autonomy {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Deci & Ryan, 2000; Bakker & Demerouti, 2014)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-autonomy",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "autw",
  indexLabel: "Indeks Otonomi Kerja",
  indexLabelShort: "Otonomi Kerja",
  invertDimensions: [],
  getProfile,
  getSummary,
};
