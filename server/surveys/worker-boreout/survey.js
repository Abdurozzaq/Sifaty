const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Engagement kerja cukup baik."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Bosan ringan — sesekali monoton."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Boreout sedang — motivasi menurun."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Boreout tinggi — risiko quiet quitting."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Boreout sangat parah — evaluasi role & karir diperlukan."
  }
];

const TYPES = {
  "B": {
    "code": "B",
    "name": "Boredom",
    "nameId": "Kebosanan",
    "emoji": "🥱",
    "color": "#64748B",
    "description": "Rasa bosan & tidak tertantang di pekerjaan.",
    "style": "Hari kerja terasa lama — tidak ada yang menarik perhatian."
  },
  "M": {
    "code": "M",
    "name": "Monotony",
    "nameId": "Monotoni",
    "emoji": "🔁",
    "color": "#71717A",
    "description": "Tugas repetitif tanpa variasi atau makna.",
    "style": "Kerja yang sama setiap hari — copy-paste rutinitas."
  },
  "D": {
    "code": "D",
    "name": "Disengagement",
    "nameId": "Disengagement",
    "emoji": "😶",
    "color": "#52525B",
    "description": "Putus emosional & mental dari pekerjaan.",
    "style": "Present physically, absent mentally — clock-watching seharian."
  }
};

const QUESTIONS = [
  {
    "id": "b1",
    "type": "B",
    "text": "Aku merasa bosan sepanjang hari kerja"
  },
  {
    "id": "b2",
    "type": "B",
    "text": "Aku tidak menemukan pekerjaanku menarik atau challenging"
  },
  {
    "id": "b3",
    "type": "B",
    "text": "Aku sering menghela napas karena tidak ada yang seru di kantor"
  },
  {
    "id": "b4",
    "type": "B",
    "text": "Aku merasa waktu kerja berjalan sangat lambat"
  },
  {
    "id": "m1",
    "type": "M",
    "text": "Aku melakukan tugas yang sama berulang-ulang tanpa variasi"
  },
  {
    "id": "m2",
    "type": "M",
    "text": "Aku merasa pekerjaanku monoton & tidak berkembang"
  },
  {
    "id": "m3",
    "type": "M",
    "text": "Aku tidak punya project baru yang menantang"
  },
  {
    "id": "m4",
    "type": "M",
    "text": "Aku stuck di rutinitas yang tidak meaningful"
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku hadir di kantor tapi mind-nya tidak engaged"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku tidak peduli dengan outcome pekerjaanku"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku menunggu jam pulang sejak pagi"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku merasa pekerjaanku tidak ada impact atau makna"
  }
];

const DIMENSION_ORDER = ["B","M","D"];

const SURVEY_META = {
  "id": "worker-boreout",
  "slug": "worker-boreout",
  "title": "Seberapa Parah Kebosanan Kerjamu?",
  "subtitle": "Ukur boredom, monotoni, & disengagement di kantor",
  "description": "Survey berbasis boreout syndrome (Rothlin & Werder, 2008) — boredom, monotony, & disengagement akibat underload pekerjaan.",
  "icon": "😑",
  "color": "from-gray-500 via-slate-500 to-zinc-600",
  "audience": "pekerja",
  "tags": [
    "Analisis Negatif",
    "Boreout",
    "Disengagement"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Rothlin (2008). Boreout!",
    "Louw (2013). Measuring Boreout in the Workplace",
    "Van Hooff (2014). Boredom at Work",
    "McCormick (2007). Work Boredom as a Predictor of Employee Cynicism",
    "Cummings (2014). Organization Development and Change"
  ],
  "detail": {
    "about": "Survey berbasis boreout syndrome (Rothlin & Werder, 2008) — boredom, monotony, & disengagement akibat underload pekerjaan.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis boreout syndrome (Rothlin & Werder, 2008) — boredom, monotony, & disengagement akibat underload pekerjaan."
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
        "desc": "Indeks Boreout + kode dimensi."
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
  return "Indeks boreout {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Rothlin & Werder, 2008; Louw et al., 2013)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-boreout",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "borw",
  indexLabel: "Indeks Boreout",
  indexLabelShort: "Boreout",
  invertDimensions: [],
  getProfile,
  getSummary,
};
