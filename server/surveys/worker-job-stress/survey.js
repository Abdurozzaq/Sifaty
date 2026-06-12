const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Low Stress",
    "emoji": "💚",
    "desc": "Stres kerja rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Moderate",
    "emoji": "🙂",
    "desc": "Stres wajar — masih manageable."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Stres Sedang",
    "emoji": "😓",
    "desc": "Stres mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Stres Tinggi",
    "emoji": "😰",
    "desc": "Job strain dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Stres Parah",
    "emoji": "🔥",
    "desc": "Stres sangat tinggi — cari bantuan."
  }
];

const TYPES = {
  "D": {
    "code": "D",
    "name": "Demand",
    "nameId": "Beban Kerja",
    "emoji": "📈",
    "color": "#EF4444",
    "description": "Tekanan & beban kerja tinggi.",
    "style": "Deadline menumpuk, KPI gila, multitasking extreme."
  },
  "C": {
    "code": "C",
    "name": "Control",
    "nameId": "Kontrol Rendah",
    "emoji": "🎛️",
    "color": "#F97316",
    "description": "Kurang kontrol atas cara & waktu kerja (skor rendah = stres tinggi).",
    "style": "Tidak bisa atur sendiri — semua dari atasan."
  },
  "S": {
    "code": "S",
    "name": "Strain",
    "nameId": "Gejala Strain",
    "emoji": "😵",
    "color": "#DC2626",
    "description": "Gejala fisik & psikologis akibat stres kerja.",
    "style": "Sakit kepala, insomnia, anxiety karena kerja."
  }
};

const QUESTIONS = [
  {
    "id": "d1",
    "type": "D",
    "text": "Aku punya terlalu banyak tugas untuk waktu yang ada"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Tekanan deadline & KPI sangat tinggi"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku harus multitasking extreme setiap hari"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Beban kerja meningkat tapi resources tidak"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku punya kontrol atas cara mengerjakan tugasku"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku bisa atur sendiri prioritas pekerjaan"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku punya autonomy dalam keputusan kerja"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Atasan memberi kebebasan menentukan metode kerja"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku sakit kepala atau tension karena pekerjaan"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku sulit tidur karena memikirkan kerja"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku merasa anxious sebelum masuk kantor"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Stres kerja memengaruhi kesehatan fisikku"
  }
];

const DIMENSION_ORDER = ["D","C","S"];

const SURVEY_META = {
  "id": "worker-job-stress",
  "slug": "worker-job-stress",
  "title": "Seberapa Stres di Tempat Kerja?",
  "subtitle": "Ukur demand, control, & strain di tempat kerja",
  "description": "Survey berbasis Job Demand-Control model (Karasek, 1979) + strain symptoms.",
  "icon": "🔥",
  "color": "from-red-600 via-rose-500 to-pink-500",
  "audience": "pekerja",
  "tags": [
    "Job Stress",
    "Karasek JDC",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Karasek (1979). Job Demands, Job Decision Latitude, and Mental Strain",
    "Karasek (1990). Healthy Work",
    "Cohen (1983). A Global Measure of Perceived Stress",
    "Nixon (2011). The Relation Between Work and Home Stress",
    "Luchman (2013). Demands, Control, and Support"
  ],
  "detail": {
    "about": "Survey berbasis Job Demand-Control model (Karasek, 1979) + strain symptoms.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Job Demand-Control model (Karasek, 1979) + strain symptoms."
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
        "desc": "Indeks Stres Kerja + kode dimensi."
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
  return "Indeks stres kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Karasek, 1979)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-job-stress",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "jstr",
  indexLabel: "Indeks Stres Kerja",
  indexLabelShort: "Stres Kerja",
  invertDimensions: ["C"],
  getProfile,
  getSummary,
};
