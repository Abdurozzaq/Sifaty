const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Flourishing sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Flourishing rendah — fondasi wellbeing perlu dibangun."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Flourishing cukup — ada aspek yang bisa diperkuat."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Flourishing baik — wellbeing mahasiswa solid."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Flourishing sangat baik — thriving di kampus."
  }
];

const TYPES = {
  "P": {
    "code": "P",
    "name": "Positive Emotion",
    "nameId": "Emosi Positif",
    "emoji": "😊",
    "color": "#EC4899",
    "description": "Perasaan senang, grateful, & optimis dalam keseharian.",
    "style": "Sering merasa happy & appreciative meski ada tantangan kuliah."
  },
  "E": {
    "code": "E",
    "name": "Engagement",
    "nameId": "Engagement",
    "emoji": "🎯",
    "color": "#F43F5E",
    "description": "Keterlibatan penuh & flow dalam aktivitas akademik.",
    "style": "Lupa waktu saat belajar atau mengerjakan project yang disukai."
  },
  "M": {
    "code": "M",
    "name": "Meaning",
    "nameId": "Meaning",
    "emoji": "✨",
    "color": "#FB7185",
    "description": "Rasa makna & purpose dalam perjalanan kuliah.",
    "style": "Kuliah terasa meaningful — connected dengan tujuan hidup."
  }
};

const QUESTIONS = [
  {
    "id": "p1",
    "type": "P",
    "text": "Aku sering merasa senang & grateful dalam keseharian kuliah"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku optimis tentang hari-hari di kampus"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku bisa menemukan hal positif meski semester berat"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku merasa hidupku penuh momen-momen menyenangkan"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku sering masuk flow saat belajar atau mengerjakan project"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku fully engaged saat diskusi atau praktikum"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku kehilangan track waktu saat fokus pada hal yang aku sukai"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku merasa energized setelah aktivitas akademik yang challenging"
  },
  {
    "id": "m1",
    "type": "M",
    "text": "Aku merasa kuliahku punya makna & arah hidup"
  },
  {
    "id": "m2",
    "type": "M",
    "text": "Aku connected dengan tujuan jangka panjang lewat perkuliahan"
  },
  {
    "id": "m3",
    "type": "M",
    "text": "Aku merasa kontribusiku di kampus berarti"
  },
  {
    "id": "m4",
    "type": "M",
    "text": "Aku tahu kenapa aku kuliah & itu memberi sense of purpose"
  }
];

const DIMENSION_ORDER = ["P","E","M"];

const SURVEY_META = {
  "id": "student-flourishing",
  "slug": "student-flourishing",
  "title": "Seberapa Baik Kondisi Flourishing-mu?",
  "subtitle": "Ukur positive emotion, engagement, & meaning di kampus",
  "description": "Survey berbasis PERMA model (Seligman, 2011) — positive emotion, engagement, & meaning untuk wellbeing mahasiswa.",
  "icon": "🌸",
  "color": "from-pink-500 via-rose-500 to-orange-400",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Positif",
    "Flourishing",
    "PERMA"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Seligman (2011). Flourish",
    "Butler (2016). The PERMA-Profiler",
    "Diener (2010). New Well-being Measures",
    "Ryff (1989). Happiness Is Everything, or Is It? Explorations on the Meaning of Psychological Well-Being",
    "Schotanus-Dijkstra (2016). Characteristics of Mental Well-being and Their Associations with Flourishing"
  ],
  "detail": {
    "about": "Survey berbasis PERMA model (Seligman, 2011) — positive emotion, engagement, & meaning untuk wellbeing mahasiswa.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis PERMA model (Seligman, 2011) — positive emotion, engagement, & meaning untuk wellbeing mahasiswa."
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
        "desc": "Indeks Flourishing + kode dimensi."
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
  return "Indeks flourishing {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Seligman, 2011; Butler & Kern, 2016)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-flourishing",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "flrm",
  indexLabel: "Indeks Flourishing",
  indexLabelShort: "Flourishing",
  invertDimensions: [],
  getProfile,
  getSummary,
};
