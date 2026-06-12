const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Kepuasan kerja sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Kepuasan rendah — ada aspek yang perlu diperbaiki."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Kepuasan cukup — balance content, growth, & relasi."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Kepuasan baik — pekerjaan fulfilling."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Kepuasan sangat baik — high job satisfaction."
  }
];

const TYPES = {
  "C": {
    "code": "C",
    "name": "Content",
    "nameId": "Content Pekerjaan",
    "emoji": "📋",
    "color": "#84CC16",
    "description": "Kepuasan dengan tugas & nature pekerjaan.",
    "style": "Tugas sesuai minat — tidak bosan dengan scope kerja."
  },
  "G": {
    "code": "G",
    "name": "Growth",
    "nameId": "Growth",
    "emoji": "📈",
    "color": "#22C55E",
    "description": "Kesempatan berkembang & naik karir.",
    "style": "Ada ruang learning & promotion — career path jelas."
  },
  "R": {
    "code": "R",
    "name": "Relationships Work",
    "nameId": "Relasi Kerja",
    "emoji": "🤝",
    "color": "#10B981",
    "description": "Kualitas relasi dengan rekan & atasan.",
    "style": "Tim supportive — komunikasi baik dengan boss."
  }
};

const QUESTIONS = [
  {
    "id": "c1",
    "type": "C",
    "text": "Aku puas dengan tugas & tanggung jawab pekerjaanku"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku merasa pekerjaanku meaningful & berkontribusi"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku enjoy aktivitas sehari-hari di kantor"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku merasa pekerjaanku sesuai dengan skill & minatku"
  },
  {
    "id": "g1",
    "type": "G",
    "text": "Aku punya kesempatan berkembang & belajar skill baru"
  },
  {
    "id": "g2",
    "type": "G",
    "text": "Aku melihat career path yang jelas di perusahaan ini"
  },
  {
    "id": "g3",
    "type": "G",
    "text": "Aku merasa challenged & grow dari pekerjaanku"
  },
  {
    "id": "g4",
    "type": "G",
    "text": "Aku optimis tentang prospek karir di tempat ini"
  },
  {
    "id": "r1",
    "type": "R",
    "text": "Aku punya hubungan baik dengan rekan kerja"
  },
  {
    "id": "r2",
    "type": "R",
    "text": "Aku merasa didukung oleh atasan langsung"
  },
  {
    "id": "r3",
    "type": "R",
    "text": "Aku enjoy bekerja sama dengan tim"
  },
  {
    "id": "r4",
    "type": "R",
    "text": "Aku merasa dihargai & respected di kantor"
  }
];

const DIMENSION_ORDER = ["C","G","R"];

const SURVEY_META = {
  "id": "worker-job-satisfaction",
  "slug": "worker-job-satisfaction",
  "title": "Seberapa Baik Kepuasan Kerjamu?",
  "subtitle": "Ukur content, growth, & relationships di tempat kerja",
  "description": "Survey berbasis Job Satisfaction Survey (Spector, 1985) — job content, growth opportunities, & work relationships.",
  "icon": "💼",
  "color": "from-lime-500 via-green-500 to-emerald-500",
  "audience": "pekerja",
  "tags": [
    "Analisis Positif",
    "Job Satisfaction",
    "Karir"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Spector (1985). Measurement of Human Service Staff Satisfaction",
    "Brayfield (1951). An Index of Job Satisfaction",
    "Locke (1976). The Nature and Causes of Job Satisfaction",
    "Judge (2001). The Job Satisfaction-Job Performance Relationship",
    "Saari (2004). Employee Attitudes and Job Satisfaction"
  ],
  "detail": {
    "about": "Survey berbasis Job Satisfaction Survey (Spector, 1985) — job content, growth opportunities, & work relationships.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Job Satisfaction Survey (Spector, 1985) — job content, growth opportunities, & work relationships."
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
        "desc": "Indeks Kepuasan Kerja + kode dimensi."
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
  return "Indeks kepuasan kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Spector, 1985; Brayfield & Rothe, 1951)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-job-satisfaction",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "jbsw",
  indexLabel: "Indeks Kepuasan Kerja",
  indexLabelShort: "Kepuasan Kerja",
  invertDimensions: [],
  getProfile,
  getSummary,
};
