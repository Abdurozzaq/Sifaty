const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "PsyCap sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "PsyCap rendah — perlu build psychological resources."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "PsyCap cukup — fondasi hope, efficacy, resilience ada."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "PsyCap baik — aset psikologis kerja solid."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "PsyCap sangat baik — competitive advantage di workplace."
  }
];

const TYPES = {
  "H": {
    "code": "H",
    "name": "Hope",
    "nameId": "Hope Kerja",
    "emoji": "🌅",
    "color": "#3B82F6",
    "description": "Optimisme & pathways menuju tujuan karir.",
    "style": "Yakin bisa capai target meski ada hambatan di kantor."
  },
  "E": {
    "code": "E",
    "name": "Efficacy",
    "nameId": "Self-Efficacy Kerja",
    "emoji": "💪",
    "color": "#06B6D4",
    "description": "Keyakinan mampu menyelesaikan tugas & tantangan kerja.",
    "style": "Confident handle project sulit — trust own capability."
  },
  "R": {
    "code": "R",
    "name": "Resilience Work",
    "nameId": "Resilience Kerja",
    "emoji": "🔄",
    "color": "#14B8A6",
    "description": "Kemampuan bounce back dari setback di pekerjaan.",
    "style": "Bangkit setelah gagal project atau kritik atasan."
  }
};

const QUESTIONS = [
  {
    "id": "h1",
    "type": "H",
    "text": "Aku optimis bisa capai tujuan karir di perusahaan ini"
  },
  {
    "id": "h2",
    "type": "H",
    "text": "Aku punya banyak cara untuk solve masalah di kerja"
  },
  {
    "id": "h3",
    "type": "H",
    "text": "Aku yakin masa depan karirku di tempat ini cerah"
  },
  {
    "id": "h4",
    "type": "H",
    "text": "Aku tetap hopeful meski ada setback di kantor"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku confident bisa handle tugas challenging"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku yakin mampu solve masalah kompleks di kerja"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku percaya diri presentasi atau lead project"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku merasa competent di bidang pekerjaanku"
  },
  {
    "id": "r1",
    "type": "R",
    "text": "Aku bisa bounce back setelah kegagalan di kantor"
  },
  {
    "id": "r2",
    "type": "R",
    "text": "Aku adaptif saat ada perubahan besar di organisasi"
  },
  {
    "id": "r3",
    "type": "R",
    "text": "Aku tetap produktif meski tekanan kerja tinggi"
  },
  {
    "id": "r4",
    "type": "R",
    "text": "Aku recover cepat dari stress atau kritik di kerja"
  }
];

const DIMENSION_ORDER = ["H","E","R"];

const SURVEY_META = {
  "id": "worker-psych-capital",
  "slug": "worker-psych-capital",
  "title": "Seberapa Kuat PsyCap Kerjamu?",
  "subtitle": "Ukur hope, efficacy, & resilience di tempat kerja",
  "description": "Survey berbasis Psychological Capital Questionnaire (Luthans et al., 2007) — hope, self-efficacy, & resilience at work.",
  "icon": "🛡️",
  "color": "from-blue-500 via-cyan-500 to-teal-500",
  "audience": "pekerja",
  "tags": [
    "Analisis Positif",
    "PsyCap",
    "Resilience"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Luthans (2007). Positive Psychological Capital",
    "Luthans (2007). Psychological Capital",
    "Avey (2011). Meta-Analysis of the Impact of Positive Psychological Capital on Employee Attitudes, Behaviors, and Performance",
    "Newman (2014). Psychological Capital",
    "Story (2013). The Criterion-Related Validity of the PCQ"
  ],
  "detail": {
    "about": "Survey berbasis Psychological Capital Questionnaire (Luthans et al., 2007) — hope, self-efficacy, & resilience at work.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Psychological Capital Questionnaire (Luthans et al., 2007) — hope, self-efficacy, & resilience at work."
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
        "desc": "Indeks Psychological Capital + kode dimensi."
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
  return "Indeks psychological capital {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Luthans et al., 2007)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-psych-capital",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "pscw",
  indexLabel: "Indeks Psychological Capital",
  indexLabelShort: "PsyCap",
  invertDimensions: [],
  getProfile,
  getSummary,
};
