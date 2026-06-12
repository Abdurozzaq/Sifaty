const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Tidur Sehat",
    "emoji": "💤",
    "desc": "Kualitas tidur baik."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Terganggu",
    "emoji": "🙂",
    "desc": "Sesekali tidur kurang optimal."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Tidur Sedang",
    "emoji": "😓",
    "desc": "Gangguan tidur mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tidur Buruk",
    "emoji": "😴",
    "desc": "Kualitas tidur rendah — dampak ke produktivitas."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Insomnia Parah",
    "emoji": "🌑",
    "desc": "Masalah tidur sangat serius — evaluasi kebiasaan & bantuan."
  }
];

const TYPES = {
  "Q": {
    "code": "Q",
    "name": "Quality",
    "nameId": "Kualitas Tidur",
    "emoji": "🌙",
    "color": "#6366F1",
    "description": "Kualitas tidur secara keseluruhan.",
    "style": "Bangun masih lelah — tidur tidak restorative."
  },
  "D": {
    "code": "D",
    "name": "Disturbance",
    "nameId": "Gangguan Tidur",
    "emoji": "⏰",
    "color": "#8B5CF6",
    "description": "Gangguan & fragmentasi tidur.",
    "style": "Sering terbangun, sulit lanjut tidur, atau mimpi buruk."
  },
  "H": {
    "code": "H",
    "name": "Hygiene",
    "nameId": "Kebersihan Tidur",
    "emoji": "📵",
    "color": "#3B82F6",
    "description": "Kebiasaan buruk sebelum tidur.",
    "style": "Scroll HP, kafein malam, atau jadwal tidur tidak konsisten."
  }
};

const QUESTIONS = [
  {
    "id": "q1",
    "type": "Q",
    "text": "Aku bangun pagi masih merasa lelah meski sudah tidur cukup jam"
  },
  {
    "id": "q2",
    "type": "Q",
    "text": "Aku merasa tidurku tidak berkualitas & tidak refreshing"
  },
  {
    "id": "q3",
    "type": "Q",
    "text": "Aku sulit merasa segar di pagi hari sebelum kuliah"
  },
  {
    "id": "q4",
    "type": "Q",
    "text": "Aku merasa kurang tidur nyenyak akhir-akhir ini"
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku sering terbangun di tengah malam & sulit tidur lagi"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku butuh waktu lama untuk tertidur setelah rebahan"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku sering mimpi buruk atau gelisah saat tidur"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Deadline & stres kuliah mengganggu tidurku"
  },
  {
    "id": "h1",
    "type": "H",
    "text": "Aku scroll HP atau main game sebelum tidur"
  },
  {
    "id": "h2",
    "type": "H",
    "text": "Aku minum kopi atau energi drink di sore/malam hari"
  },
  {
    "id": "h3",
    "type": "H",
    "text": "Aku tidur & bangun di jam yang tidak konsisten"
  },
  {
    "id": "h4",
    "type": "H",
    "text": "Aku begadang ngerjain tugas lalu tidur siang berlebihan"
  }
];

const DIMENSION_ORDER = ["Q","D","H"];

const SURVEY_META = {
  "id": "student-sleep",
  "slug": "student-sleep",
  "title": "Seberapa Baik Tidurmu?",
  "subtitle": "Ukur kualitas tidur, gangguan, & kebersihan tidur mahasiswa",
  "description": "Survey berbasis Pittsburgh Sleep Quality Index (PSQI) — quality, disturbance, & sleep hygiene.",
  "icon": "😴",
  "color": "from-indigo-500 via-blue-500 to-cyan-500",
  "audience": "mahasiswa",
  "tags": [
    "Tidur",
    "PSQI",
    "Sleep Hygiene"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Buysse (1989). The Pittsburgh Sleep Quality Index",
    "Lund (2010). Sleep Patterns and Predictors of Disturbed Sleep in a Large Population of College Students",
    "Gaultney (2010). The Prevalence of Sleep Disorders in College Students",
    "Irish (2016). The Role of Sleep Hygiene in Promoting Public Health",
    "Hershner (2014). Causes and Consequences of Sleepiness Among College Students"
  ],
  "detail": {
    "about": "Survey berbasis Pittsburgh Sleep Quality Index (PSQI) — quality, disturbance, & sleep hygiene.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Pittsburgh Sleep Quality Index (PSQI) — quality, disturbance, & sleep hygiene."
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
        "desc": "Indeks Kualitas Tidur + kode dimensi."
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
  return "Indeks kualitas tidur {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Buysse et al., 1989)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-sleep",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "slpm",
  indexLabel: "Indeks Kualitas Tidur",
  indexLabelShort: "Kualitas Tidur",
  invertDimensions: [],
  getProfile,
  getSummary,
};
