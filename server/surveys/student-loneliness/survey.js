const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Terhubung",
    "emoji": "💚",
    "desc": "Kesepian rendah — koneksi sosial sehat."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Sendiri",
    "emoji": "🙂",
    "desc": "Sesekali merasa sendiri — wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Kesepian Sedang",
    "emoji": "😔",
    "desc": "Kesepian mulai memengaruhi mood."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Kesepian Tinggi",
    "emoji": "🫤",
    "desc": "Isolasi sosial signifikan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Kesepian Parah",
    "emoji": "💔",
    "desc": "Kesepian sangat tinggi — cari koneksi & support."
  }
];

const TYPES = {
  "I": {
    "code": "I",
    "name": "Isolation",
    "nameId": "Isolasi Sosial",
    "emoji": "🏝️",
    "color": "#64748B",
    "description": "Kurangnya interaksi & jaringan sosial.",
    "style": "Jarang diajak hangout atau tidak punya circle dekat."
  },
  "E": {
    "code": "E",
    "name": "Emotional",
    "nameId": "Kesepian Emosional",
    "emoji": "💔",
    "color": "#78716C",
    "description": "Merasa tidak dekat dengan siapa pun.",
    "style": "Tidak punya orang yang benar-benar mengerti."
  },
  "C": {
    "code": "C",
    "name": "Connectedness",
    "nameId": "Keterhubungan",
    "emoji": "🤝",
    "color": "#10B981",
    "description": "Rasa terhubung dengan orang lain (skor rendah = kesepian tinggi).",
    "style": "Merasa tidak belong di kampus atau komunitas."
  }
};

const QUESTIONS = [
  {
    "id": "i1",
    "type": "I",
    "text": "Aku jarang punya teman untuk hangout di luar kuliah"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku merasa sendirian meski di tengah keramaian kampus"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku tidak punya circle dekat yang bisa diajak curhat"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku merasa terisolasi dari kehidupan sosial mahasiswa"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku merasa tidak ada yang benar-benar mengerti perasaanku"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku merasa kesepian meski punya banyak kenalan"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku merindukan hubungan yang lebih dalam & meaningful"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku merasa tidak dekat dengan siapa pun di kampus"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku merasa punya teman yang bisa diandalkan saat butuh"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku merasa belong di komunitas atau organisasi kampus"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa terhubung dengan teman seangkatan"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku punya orang yang peduli dengan kesejahteraanku"
  }
];

const DIMENSION_ORDER = ["I","E","C"];

const SURVEY_META = {
  "id": "student-loneliness",
  "slug": "student-loneliness",
  "title": "Seberapa Kesepian di Kampus?",
  "subtitle": "Ukur isolasi sosial, kesepian emosional, & koneksi teman",
  "description": "Survey berbasis UCLA Loneliness Scale (Russell, 1996) — isolation, emotional loneliness, & connectedness.",
  "icon": "🫂",
  "color": "from-slate-500 via-gray-500 to-zinc-600",
  "audience": "mahasiswa",
  "tags": [
    "Kesepian",
    "UCLA",
    "Sosial"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Russell (1996). UCLA Loneliness Scale (Version 3)",
    "Cacioppo (2008). Loneliness",
    "Diehl (2018). Loneliness at Universities",
    "Beutel (2017). Loneliness in the General Population",
    "Hawkley (2010). Loneliness Matters"
  ],
  "detail": {
    "about": "Survey berbasis UCLA Loneliness Scale (Russell, 1996) — isolation, emotional loneliness, & connectedness.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis UCLA Loneliness Scale (Russell, 1996) — isolation, emotional loneliness, & connectedness."
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
        "desc": "Indeks Kesepian + kode dimensi."
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
  return "Indeks kesepian {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Russell, 1996)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-loneliness",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "lonm",
  indexLabel: "Indeks Kesepian",
  indexLabelShort: "Kesepian",
  invertDimensions: ["C"],
  getProfile,
  getSummary,
};
