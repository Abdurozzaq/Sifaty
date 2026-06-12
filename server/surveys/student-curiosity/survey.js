const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Curiosity sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Curiosity rendah — belajar mostly driven by grade."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Curiosity cukup — ada minat explore."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Curiosity baik — intrinsic motivation belajar kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Curiosity sangat baik — lifelong learner mindset."
  }
];

const TYPES = {
  "E": {
    "code": "E",
    "name": "Exploration",
    "nameId": "Exploration",
    "emoji": "🧭",
    "color": "#06B6D4",
    "description": "Keinginan explore topik & ide baru.",
    "style": "Sering googling di luar syllabus — penasaran dengan hal baru."
  },
  "D": {
    "code": "D",
    "name": "Depth",
    "nameId": "Depth",
    "emoji": "🔬",
    "color": "#14B8A6",
    "description": "Keinginan memahami materi secara mendalam.",
    "style": "Tidak puas surface level — mau tahu why & how."
  },
  "O": {
    "code": "O",
    "name": "Openness Learning",
    "nameId": "Openness Belajar",
    "emoji": "📖",
    "color": "#10B981",
    "description": "Keterbukaan terhadap perspektif & metode belajar baru.",
    "style": "Terbuka dengan feedback dosen & cara belajar berbeda."
  }
};

const QUESTIONS = [
  {
    "id": "e1",
    "type": "E",
    "text": "Aku penasaran explore topik di luar materi kelas"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku suka mencoba hal baru dalam belajar"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku actively seek informasi tentang bidang yang menarik"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku excited ketemu ide atau konsep yang belum pernah aku tahu"
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku ingin paham materi secara mendalam, bukan hafalan"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku bertanya \"why\" saat belajar konsep baru"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku tidak puas sampai benar-benar understand suatu topik"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku suka diskusi mendalam tentang materi kuliah"
  },
  {
    "id": "o1",
    "type": "O",
    "text": "Aku terbuka dengan cara belajar yang berbeda dari biasanya"
  },
  {
    "id": "o2",
    "type": "O",
    "text": "Aku menerima feedback dosen sebagai peluang belajar"
  },
  {
    "id": "o3",
    "type": "O",
    "text": "Aku tertarik perspektif teman yang berbeda dari aku"
  },
  {
    "id": "o4",
    "type": "O",
    "text": "Aku enjoy proses belajar meski materinya challenging"
  }
];

const DIMENSION_ORDER = ["E","D","O"];

const SURVEY_META = {
  "id": "student-curiosity",
  "slug": "student-curiosity",
  "title": "Seberapa Kuat Rasa Ingin Tahu-mu?",
  "subtitle": "Ukur exploration, depth, & openness terhadap pembelajaran",
  "description": "Survey berbasis Curiosity and Exploration Inventory (Kashdan et al., 2009) — exploration, depth, & openness to learning.",
  "icon": "🔍",
  "color": "from-cyan-500 via-teal-500 to-emerald-500",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Positif",
    "Curiosity",
    "Belajar"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Kashdan (2009). Curiosity and Exploration",
    "Litman (2005). Curiosity and the Pleasures of Learning",
    "Silvia (2012). Curiosity and Motivation",
    "Kashdan (2004). Curiosity and Exploration",
    "Renninger (2016). The Power of Interest for Motivation and Engagement"
  ],
  "detail": {
    "about": "Survey berbasis Curiosity and Exploration Inventory (Kashdan et al., 2009) — exploration, depth, & openness to learning.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Curiosity and Exploration Inventory (Kashdan et al., 2009) — exploration, depth, & openness to learning."
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
        "desc": "Indeks Curiosity Belajar + kode dimensi."
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
  return "Indeks curiosity belajar {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Kashdan et al., 2009; Litman, 2005)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-curiosity",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "curm",
  indexLabel: "Indeks Curiosity Belajar",
  indexLabelShort: "Curiosity",
  invertDimensions: [],
  getProfile,
  getSummary,
};
