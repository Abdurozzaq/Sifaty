const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Digital Sehat",
    "emoji": "💚",
    "desc": "Technostress rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Overwhelm",
    "emoji": "🙂",
    "desc": "Sesekali kewalahan teknologi."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Technostress Sedang",
    "emoji": "😓",
    "desc": "Tekanan digital mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Technostress Tinggi",
    "emoji": "😰",
    "desc": "Overload & invasion dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Technostress Parah",
    "emoji": "💻",
    "desc": "Technostress sangat tinggi — evaluasi digital boundaries."
  }
];

const TYPES = {
  "To": {
    "code": "To",
    "name": "Techno-overload",
    "nameId": "Techno-overload",
    "emoji": "📧",
    "color": "#3B82F6",
    "description": "Kewalahan dengan volume teknologi & informasi.",
    "style": "Email, Slack, tools menumpuk — tidak sanggup follow up."
  },
  "Ti": {
    "code": "Ti",
    "name": "Techno-invasion",
    "nameId": "Techno-invasion",
    "emoji": "📱",
    "color": "#6366F1",
    "description": "Teknologi menginvasi batas kerja-pribadi.",
    "style": "Notifikasi kerja 24/7 — tidak bisa disconnect."
  },
  "Tc": {
    "code": "Tc",
    "name": "Techno-complexity",
    "nameId": "Techno-complexity",
    "emoji": "🔧",
    "color": "#8B5CF6",
    "description": "Kesulitan memahami & menggunakan teknologi kerja.",
    "style": "Tools baru terus muncul — sulit adaptasi & training."
  }
};

const QUESTIONS = [
  {
    "id": "to1",
    "type": "To",
    "text": "Aku kewalahan dengan jumlah email, chat, & notifikasi kerja"
  },
  {
    "id": "to2",
    "type": "To",
    "text": "Aku merasa tidak sanggup mengikuti semua tools & platform kerja"
  },
  {
    "id": "to3",
    "type": "To",
    "text": "Informasi digital di kantor terlalu banyak untuk diproses"
  },
  {
    "id": "to4",
    "type": "To",
    "text": "Aku stress karena harus multitasking di banyak aplikasi"
  },
  {
    "id": "ti1",
    "type": "Ti",
    "text": "Aku harus selalu online & responsif meski di luar jam kerja"
  },
  {
    "id": "ti2",
    "type": "Ti",
    "text": "Teknologi kerja mengganggu waktu istirahat & keluarga"
  },
  {
    "id": "ti3",
    "type": "Ti",
    "text": "Aku tidak bisa disconnect dari pekerjaan karena notifikasi"
  },
  {
    "id": "ti4",
    "type": "Ti",
    "text": "WFH bikin batas digital kerja-rumah semakin kabur"
  },
  {
    "id": "tc1",
    "type": "Tc",
    "text": "Aku kesulitan memahami tools & software baru di kantor"
  },
  {
    "id": "tc2",
    "type": "Tc",
    "text": "Aku merasa tidak cukup terlatih untuk teknologi yang dipakai"
  },
  {
    "id": "tc3",
    "type": "Tc",
    "text": "Perubahan sistem IT di kantor bikin aku frustrasi"
  },
  {
    "id": "tc4",
    "type": "Tc",
    "text": "Aku butuh waktu lama untuk adaptasi ke platform kerja baru"
  }
];

const DIMENSION_ORDER = ["To","Ti","Tc"];

const SURVEY_META = {
  "id": "worker-technostress",
  "slug": "worker-technostress",
  "title": "Seberapa Technostress di Kerja?",
  "subtitle": "Ukur techno-overload, invasion, & complexity di kantor digital",
  "description": "Survey berbasis Technostress model (Tarafdar et al., 2007) — techno-overload, invasion, & complexity.",
  "icon": "💻",
  "color": "from-blue-600 via-indigo-600 to-violet-600",
  "audience": "pekerja",
  "tags": [
    "Technostress",
    "Digital",
    "IT Kerja"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Tarafdar (2007). The Impact of Technostress on Role Stress and Productivity",
    "Tarafdar (2015). Explaining the Link Between Technostress and Productivity",
    "Ragu-Nathan (2008). The Good, the Bad, and the Ugly of Information Systems Use",
    "Salanova (2013). Technostress",
    "Brod (1984). Technostress"
  ],
  "detail": {
    "about": "Survey berbasis Technostress model (Tarafdar et al., 2007) — techno-overload, invasion, & complexity.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Technostress model (Tarafdar et al., 2007) — techno-overload, invasion, & complexity."
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
        "desc": "Indeks Technostress + kode dimensi."
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
  return "Indeks technostress {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Tarafdar et al., 2007)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-technostress",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "techw",
  indexLabel: "Indeks Technostress",
  indexLabelShort: "Technostress",
  invertDimensions: [],
  getProfile,
  getSummary,
};
