const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Tenang",
    "emoji": "🌿",
    "desc": "Kecemasan kuliah rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Cemas",
    "emoji": "🙂",
    "desc": "Sesekali cemas — masih wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cemas Sedang",
    "emoji": "😓",
    "desc": "Kecemasan mulai memengaruhi fokus."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Cemas Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan signifikan — perhatikan self-care."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Cemas Parah",
    "emoji": "🆘",
    "desc": "Kecemasan sangat tinggi — pertimbangkan bantuan profesional."
  }
];

const TYPES = {
  "W": {
    "code": "W",
    "name": "Worry",
    "nameId": "Kekhawatiran",
    "emoji": "🌀",
    "color": "#F59E0B",
    "description": "Pikiran cemas berulang tentang kuliah & masa depan.",
    "style": "Overthinking tugas, ujian, atau masa depan karir."
  },
  "P": {
    "code": "P",
    "name": "Physical",
    "nameId": "Gejala Fisik",
    "emoji": "💓",
    "color": "#EF4444",
    "description": "Gejala tubuh akibat kecemasan.",
    "style": "Jantung berdebar, napas pendek, atau tension saat kuliah."
  },
  "R": {
    "code": "R",
    "name": "Restlessness",
    "nameId": "Gelisah",
    "emoji": "😬",
    "color": "#F97316",
    "description": "Sulit tenang & sulit fokus karena cemas.",
    "style": "Gelisah duduk di kelas — mind terus wandering."
  }
};

const QUESTIONS = [
  {
    "id": "w1",
    "type": "W",
    "text": "Aku sering overthinking tentang tugas atau ujian yang belum selesai"
  },
  {
    "id": "w2",
    "type": "W",
    "text": "Aku khawatir gagal kuliah atau tidak lulus tepat waktu"
  },
  {
    "id": "w3",
    "type": "W",
    "text": "Aku cemas memikirkan presentasi, sidang, atau wawancara kampus"
  },
  {
    "id": "w4",
    "type": "W",
    "text": "Aku sulit berhenti khawatir meski sudah berusaha tenang"
  },
  {
    "id": "p1",
    "type": "P",
    "text": "Aku merasa jantung berdebar saat deadline atau ujian mendekat"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku mengalami tension otot atau sakit kepala karena stres kuliah"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku merasa napasku pendek atau dada sesak saat cemas"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku mudah lelah secara fisik meski aktivitas kuliah biasa saja"
  },
  {
    "id": "r1",
    "type": "R",
    "text": "Aku gelisah dan sulit duduk tenang saat belajar"
  },
  {
    "id": "r2",
    "type": "R",
    "text": "Aku sulit konsentrasi di kelas karena pikiran cemas"
  },
  {
    "id": "r3",
    "type": "R",
    "text": "Aku merasa on edge — mudah tersinggung atau panik"
  },
  {
    "id": "r4",
    "type": "R",
    "text": "Aku sulit tidur karena kepala penuh kekhawatiran akademik"
  }
];

const DIMENSION_ORDER = ["W","P","R"];

const SURVEY_META = {
  "id": "student-anxiety",
  "slug": "student-anxiety",
  "title": "Seberapa Cemas Saat Kuliah?",
  "subtitle": "Ukur kekhawatiran, gejala fisik, & gelisah di kampus",
  "description": "Survey berbasis GAD-7 & STAI — memetakan kecemasan mahasiswa: worry, physical symptoms, & restlessness.",
  "icon": "😰",
  "color": "from-amber-500 via-orange-500 to-red-500",
  "audience": "mahasiswa",
  "tags": [
    "Kecemasan",
    "GAD-7",
    "STAI"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Spitzer (2006). A Brief Measure for Assessing Generalized Anxiety Disorder",
    "Spielberger (1983). Manual for the State-Trait Anxiety Inventory",
    "Beiter (2015). The Prevalence and Correlates of Depression, Anxiety, and Stress in a Sample of College Students",
    "Kessler (2007). Lifetime Prevalence and Age-of-Onset Distributions of Mental Disorders",
    "Newman (2013). Worry and Generalized Anxiety Disorder"
  ],
  "detail": {
    "about": "Survey berbasis GAD-7 & STAI — memetakan kecemasan mahasiswa: worry, physical symptoms, & restlessness.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis GAD-7 & STAI — memetakan kecemasan mahasiswa: worry, physical symptoms, & restlessness."
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
        "desc": "Indeks Kecemasan Kuliah + kode dimensi."
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
  return "Indeks kecemasan kuliah {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Spitzer et al., 2006; Spielberger, 1983)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-anxiety",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "anxm",
  indexLabel: "Indeks Kecemasan Kuliah",
  indexLabelShort: "Kecemasan Kuliah",
  invertDimensions: [],
  getProfile,
  getSummary,
};
