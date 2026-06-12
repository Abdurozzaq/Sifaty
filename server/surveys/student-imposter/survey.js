const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Confident",
    "emoji": "💪",
    "desc": "Kamu percaya diri dengan kompetensimu."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Ragukan",
    "emoji": "🙂",
    "desc": "Sesekali imposter feelings — normal."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Imposter Sedang",
    "emoji": "😬",
    "desc": "Self-doubt mulai memengaruhi kepercayaan diri."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Imposter Tinggi",
    "emoji": "😰",
    "desc": "Imposter syndrome signifikan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Imposter Parah",
    "emoji": "🎭",
    "desc": "Imposter feelings sangat dominan — cari support."
  }
];

const TYPES = {
  "S": {
    "code": "S",
    "name": "Self-Doubt",
    "nameId": "Keraguan Diri",
    "emoji": "🤔",
    "color": "#8B5CF6",
    "description": "Merasa tidak sekompeten yang orang kira.",
    "style": "Meragukan kemampuan sendiri meski dapat nilai bagus."
  },
  "L": {
    "code": "L",
    "name": "Luck Attribution",
    "nameId": "Atribusi Keberuntungan",
    "emoji": "🍀",
    "color": "#10B981",
    "description": "Menganggap sukses karena keberuntungan, bukan skill.",
    "style": "IPK bagus? Mustahil kebetulan atau dosen baik."
  },
  "E": {
    "code": "E",
    "name": "Fear of Exposure",
    "nameId": "Takut Ketahuan",
    "emoji": "😨",
    "color": "#EF4444",
    "description": "Takut orang tahu kamu sebenarnya tidak pintar.",
    "style": "Takut \"ketauan\" saat presentasi atau wawancara magang."
  }
};

const QUESTIONS = [
  {
    "id": "s1",
    "type": "S",
    "text": "Aku merasa tidak sepintar teman seangkatanku"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku meragukan apakah pantas diterima di jurusan/kampus ini"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku merasa harus kerja extra hard agar terlihat kompeten"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku sering merasa seperti penipu di lingkungan akademik"
  },
  {
    "id": "l1",
    "type": "L",
    "text": "Prestasi akademikku lebih karena keberuntungan daripada ability"
  },
  {
    "id": "l2",
    "type": "L",
    "text": "Kalau dapat nilai A, aku pikir soalnya kebetulan mudah"
  },
  {
    "id": "l3",
    "type": "L",
    "text": "Aku merasa dosen/teman terlalu overestimate kemampuanku"
  },
  {
    "id": "l4",
    "type": "L",
    "text": "Sukses lomba/beasiswa aku atribusikan ke faktor eksternal"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku takut suatu hari ketahuan tidak sekompeten yang dipikir orang"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku khawatir gagal saat presentasi atau sidang"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku takut ditanya pertanyaan yang tidak bisa aku jawab"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku merasa harus menyembunyikan keraguan diri dari orang lain"
  }
];

const DIMENSION_ORDER = ["S","L","E"];

const SURVEY_META = {
  "id": "student-imposter",
  "slug": "student-imposter",
  "title": "Seberapa Imposter Kamu?",
  "subtitle": "Ukur imposter syndrome di kampus & kompetisi",
  "description": "Survey berbasis Clance Imposter Phenomenon Scale (1985) — self-doubt, luck attribution, fear of exposure.",
  "icon": "🎭",
  "color": "from-violet-500 via-purple-500 to-fuchsia-500",
  "audience": "mahasiswa",
  "tags": [
    "Imposter Syndrome",
    "Clance IP",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Clance (1978). The Imposter Phenomenon in High Achieving Women",
    "Clance (1985). The Impostor Phenomenon",
    "Sakulku (2011). The Imposter Phenomenon",
    "Bravata (2020). Prevalence, Predictors, and Treatment of Impostor Syndrome",
    "Verma (2022). Imposter Syndrome among Medical and Dental Students"
  ],
  "detail": {
    "about": "Survey berbasis Clance Imposter Phenomenon Scale (1985) — self-doubt, luck attribution, fear of exposure.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Clance Imposter Phenomenon Scale (1985) — self-doubt, luck attribution, fear of exposure."
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
        "desc": "Indeks Imposter + kode dimensi."
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
  return "Indeks imposter {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Clance, 1985)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-imposter",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "imps",
  indexLabel: "Indeks Imposter",
  indexLabelShort: "Imposter",
  invertDimensions: [],
  getProfile,
  getSummary,
};
