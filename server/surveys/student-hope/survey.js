const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Hope sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Hope rendah — perlu clarifying goals."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Hope cukup — pathways & agency berkembang."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Hope baik — motivasi & optimisme solid."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Hope sangat baik — driver resilience akademik kuat."
  }
];

const TYPES = {
  "G": {
    "code": "G",
    "name": "Goals",
    "nameId": "Goals",
    "emoji": "🎯",
    "color": "#0EA5E9",
    "description": "Kejelasan & komitmen terhadap tujuan akademik.",
    "style": "Punya target jelas — lulus, magang, atau karir impian."
  },
  "P": {
    "code": "P",
    "name": "Pathways",
    "nameId": "Pathways",
    "emoji": "🛤️",
    "color": "#3B82F6",
    "description": "Kemampuan menemukan jalan menuju tujuan.",
    "style": "Bisa brainstorm alternatif saat satu jalur tertutup."
  },
  "M": {
    "code": "M",
    "name": "Motivation",
    "nameId": "Agency Motivation",
    "emoji": "🔥",
    "color": "#6366F1",
    "description": "Drive & keyakinan untuk mewujudkan tujuan.",
    "style": "Tetap semangat meski ada hambatan — \"I can do this\"."
  }
};

const QUESTIONS = [
  {
    "id": "g1",
    "type": "G",
    "text": "Aku punya tujuan akademik yang jelas & meaningful"
  },
  {
    "id": "g2",
    "type": "G",
    "text": "Aku tahu apa yang ingin aku capai dari kuliah ini"
  },
  {
    "id": "g3",
    "type": "G",
    "text": "Aku committed pada target lulus & karir yang aku impikan"
  },
  {
    "id": "g4",
    "type": "G",
    "text": "Aku punya visi masa depan yang memotivasi belajar"
  },
  {
    "id": "p1",
    "type": "P",
    "text": "Aku bisa menemukan banyak cara untuk capai tujuan kuliahku"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku punya rencana alternatif saat satu jalur gagal"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku tahu langkah konkret menuju target akademikku"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku bisa problem-solve hambatan di jalan menuju tujuan"
  },
  {
    "id": "m1",
    "type": "M",
    "text": "Aku yakin bisa capai tujuan kuliah yang aku tetapkan"
  },
  {
    "id": "m2",
    "type": "M",
    "text": "Aku tetap semangat meski ada kegagalan atau setback"
  },
  {
    "id": "m3",
    "type": "M",
    "text": "Aku merasa punya kontrol atas masa depan akademikku"
  },
  {
    "id": "m4",
    "type": "M",
    "text": "Aku motivated untuk terus berusaha menuju impianku"
  }
];

const DIMENSION_ORDER = ["G","P","M"];

const SURVEY_META = {
  "id": "student-hope",
  "slug": "student-hope",
  "title": "Seberapa Kuat Harapan Akademikmu?",
  "subtitle": "Ukur goals, pathways, & motivation untuk masa depan kuliah",
  "description": "Survey berbasis Snyder Hope Scale — goals, pathways thinking, & agency motivation pada mahasiswa.",
  "icon": "🌈",
  "color": "from-sky-500 via-blue-500 to-indigo-500",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Positif",
    "Hope",
    "Motivasi"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Snyder (1991). The Will and the Ways",
    "Snyder (2002). Hope Theory",
    "Curry (1997). An Hope-Based Approach to Helping College Students Succeed",
    "Gallagher (2013). Hope as a Change Mechanism in the Treatment of Depression",
    "Marques (2015). Validation of a Portuguese Version of the Children's Hope Scale"
  ],
  "detail": {
    "about": "Survey berbasis Snyder Hope Scale — goals, pathways thinking, & agency motivation pada mahasiswa.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Snyder Hope Scale — goals, pathways thinking, & agency motivation pada mahasiswa."
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
        "desc": "Indeks Hope + kode dimensi."
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
  return "Indeks hope {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Snyder et al., 1991)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-hope",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "hopm",
  indexLabel: "Indeks Hope",
  indexLabelShort: "Hope",
  invertDimensions: [],
  getProfile,
  getSummary,
};
