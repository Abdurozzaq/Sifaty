const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Belonging sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Belonging rendah — perlu cari koneksi kampus."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Belonging cukup — ada circle tapi bisa diperdalam."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Belonging baik — feel at home di kampus."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Belonging sangat baik — koneksi kampus kuat & meaningful."
  }
];

const TYPES = {
  "A": {
    "code": "A",
    "name": "Acceptance",
    "nameId": "Acceptance",
    "emoji": "🤗",
    "color": "#14B8A6",
    "description": "Merasa diterima & valued di komunitas kampus.",
    "style": "Terasa welcome di kelas, organisasi, & lingkungan kampus."
  },
  "I": {
    "code": "I",
    "name": "Identity",
    "nameId": "Identity",
    "emoji": "🪪",
    "color": "#10B981",
    "description": "Identitas sebagai bagian dari komunitas kampus.",
    "style": "Bangga jadi mahasiswa kampus ini — feel like home."
  },
  "C": {
    "code": "C",
    "name": "Connection Campus",
    "nameId": "Connection Kampus",
    "emoji": "🔗",
    "color": "#059669",
    "description": "Koneksi emosional & sosial dengan kampus.",
    "style": "Punya teman, dosen favorit, & tempat favorit di kampus."
  }
};

const QUESTIONS = [
  {
    "id": "a1",
    "type": "A",
    "text": "Aku merasa diterima & valued di komunitas kampus"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku merasa belong di kelas & organisasi kampus"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku merasa orang-orang di kampus peduli denganku"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku merasa welcome meski berbeda background dengan teman"
  },
  {
    "id": "i1",
    "type": "I",
    "text": "Aku bangga menjadi mahasiswa kampus ini"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku merasa identitasku terhubung dengan kampus"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku merasa kampus ini represent who I am"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku merasa jadi bagian penting dari komunitas kampus"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku punya teman dekat & circle supportive di kampus"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku merasa connected dengan dosen atau mentor"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku punya tempat favorit di kampus yang terasa nyaman"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku aktif terlibat dalam kehidupan sosial kampus"
  }
];

const DIMENSION_ORDER = ["A","I","C"];

const SURVEY_META = {
  "id": "student-belonging",
  "slug": "student-belonging",
  "title": "Seberapa Kuat Rasa Belonging-mu di Kampus?",
  "subtitle": "Ukur acceptance, identity, & connection di lingkungan kampus",
  "description": "Survey berbasis Psychological Sense of School Membership (Goodenow, 1993) — acceptance, identity, & campus connection.",
  "icon": "🏫",
  "color": "from-teal-500 via-emerald-500 to-green-500",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Positif",
    "Belonging",
    "Kampus"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Goodenow (1993). The Psychological Sense of School Membership Among Adolescents",
    "Strayhorn (2012). College Students' Sense of Belonging",
    "Hausmann (2007). Sense of Belonging and Adjustment in College Students",
    "Walton (2011). A Brief Social-Belonging Intervention Improves Academic and Health Outcomes of Minority Students",
    "Allen (2016). What Is Your Sense of Belonging? A Review of the Concept and Measurement"
  ],
  "detail": {
    "about": "Survey berbasis Psychological Sense of School Membership (Goodenow, 1993) — acceptance, identity, & campus connection.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Psychological Sense of School Membership (Goodenow, 1993) — acceptance, identity, & campus connection."
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
        "desc": "Indeks Sense of Belonging + kode dimensi."
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
  return "Indeks sense of belonging {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Goodenow, 1993; Strayhorn, 2012)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-belonging",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "blgm",
  indexLabel: "Indeks Sense of Belonging",
  indexLabelShort: "Belonging",
  invertDimensions: [],
  getProfile,
  getSummary,
};
