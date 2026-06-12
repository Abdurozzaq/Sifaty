const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Seimbang",
    "emoji": "⚖️",
    "desc": "Work-life balance relatif sehat."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Bentrok",
    "emoji": "🙂",
    "desc": "Sesekali konflik — wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Konflik Sedang",
    "emoji": "😓",
    "desc": "Work-life conflict mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Konflik Tinggi",
    "emoji": "😰",
    "desc": "Kerja dominasi kehidupan pribadi."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Konflik Parah",
    "emoji": "💔",
    "desc": "Work-life conflict sangat tinggi."
  }
];

const TYPES = {
  "T": {
    "code": "T",
    "name": "Time-based",
    "nameId": "Konflik Waktu",
    "emoji": "⏰",
    "color": "#3B82F6",
    "description": "Pekerjaan mengambil waktu untuk keluarga/pribadi.",
    "style": "Kerja lembur — tidak ada waktu untuk keluarga."
  },
  "S": {
    "code": "S",
    "name": "Strain-based",
    "nameId": "Konflik Beban",
    "emoji": "😓",
    "color": "#8B5CF6",
    "description": "Stres kerja memengaruhi kehidupan pribadi.",
    "style": "Stres kantor dibawa pulang — mood jelek ke keluarga."
  },
  "B": {
    "code": "B",
    "name": "Behavior-based",
    "nameId": "Konflik Perilaku",
    "emoji": "🔄",
    "color": "#EC4899",
    "description": "Perilaku kerja tidak cocok di rumah.",
    "style": "Masih mode \"kantor\" saat di rumah."
  }
};

const QUESTIONS = [
  {
    "id": "t1",
    "type": "T",
    "text": "Aku sering lembur sehingga tidak ada waktu untuk keluarga"
  },
  {
    "id": "t2",
    "type": "T",
    "text": "Pekerjaanku mengambil waktu yang seharusnya untuk istirahat"
  },
  {
    "id": "t3",
    "type": "T",
    "text": "Aku harus cancel rencana pribadi karena kerja"
  },
  {
    "id": "t4",
    "type": "T",
    "text": "WFH/hybrid bikin batas kerja-rumah kabur"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Stres kerja membuat aku lelah untuk urus keluarga"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku irritable di rumah karena pekerjaan"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Tekanan kantor memengaruhi kesehatan mental di rumah"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku sulit \"switch off\" dari mode kerja"
  },
  {
    "id": "b1",
    "type": "B",
    "text": "Aku masih cek email/Slack saat waktu keluarga"
  },
  {
    "id": "b2",
    "type": "B",
    "text": "Aku terbawa suasana kantor saat di rumah"
  },
  {
    "id": "b3",
    "type": "B",
    "text": "Anak/keluarga merasa aku tidak present karena kerja"
  },
  {
    "id": "b4",
    "type": "B",
    "text": "Aku kesulitan pisahkan role pekerja & role di rumah"
  }
];

const DIMENSION_ORDER = ["T","S","B"];

const SURVEY_META = {
  "id": "worker-worklife-conflict",
  "slug": "worker-worklife-conflict",
  "title": "Seberapa Bentrok Kerja & Hidup?",
  "subtitle": "Ukur konflik WFH, keluarga, & work-life balance",
  "description": "Survey berbasis Work-Family Conflict Scale (Carlson et al., 2000).",
  "icon": "⚖️",
  "color": "from-blue-500 via-indigo-500 to-violet-500",
  "audience": "pekerja",
  "tags": [
    "Work-Life",
    "WFH",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Greenhaus (1985). Sources of Conflict Between Work and Family Roles",
    "Carlson (2000). Construction and Validation of a Multidimensional Measure of Work-Family Conflict",
    "Allen (2000). Consequences Associated with Work-to-Family Conflict",
    "Byron (2005). A Meta-Analytic Review of Work-Family Conflict",
    "Mesmer-Magnus (2005). Convergence Between Measures of Work-to-Family and Family-to-Work Conflict"
  ],
  "detail": {
    "about": "Survey berbasis Work-Family Conflict Scale (Carlson et al., 2000).",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Work-Family Conflict Scale (Carlson et al., 2000)."
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
        "desc": "Indeks Konflik Kerja-Hidup + kode dimensi."
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
  return "Indeks work-life conflict {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Carlson et al., 2000)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-worklife-conflict",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "wfc",
  indexLabel: "Indeks Konflik Kerja-Hidup",
  indexLabelShort: "Work-Life Conflict",
  invertDimensions: [],
  getProfile,
  getSummary,
};
