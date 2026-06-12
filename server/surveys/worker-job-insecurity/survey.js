const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Aman & Stabil",
    "emoji": "💚",
    "desc": "Perasaan aman di pekerjaan."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Cemas",
    "emoji": "🙂",
    "desc": "Sesekali khawatir — wajar di era incertain."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Insecure Sedang",
    "emoji": "😓",
    "desc": "Ketidakamanan mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Insecure Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan pekerjaan dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Insecure Parah",
    "emoji": "⚠️",
    "desc": "Ketidakamanan sangat tinggi."
  }
];

const TYPES = {
  "Q": {
    "code": "Q",
    "name": "Quantitative",
    "nameId": "Ketidakpastian Jumlah",
    "emoji": "📉",
    "color": "#EF4444",
    "description": "Ketakutan kehilangan pekerjaan (PHK, kontrak habis).",
    "style": "Takut di-PHK atau tidak diperpanjang kontrak."
  },
  "L": {
    "code": "L",
    "name": "Qualitative",
    "nameId": "Ketidakpastian Kualitas",
    "emoji": "🔄",
    "color": "#F97316",
    "description": "Ketakutan perubahan drastis role atau kondisi kerja.",
    "style": "Takut role berubah total atau office di-restruktur."
  },
  "W": {
    "code": "W",
    "name": "Worry",
    "nameId": "Kekhawatiran",
    "emoji": "😰",
    "color": "#8B5CF6",
    "description": "Kecemasan kronis tentang masa depan pekerjaan.",
    "style": "Sering overthinking tentang stabilitas karir."
  }
};

const QUESTIONS = [
  {
    "id": "q1",
    "type": "Q",
    "text": "Aku khawatir kehilangan pekerjaanku dalam waktu dekat"
  },
  {
    "id": "q2",
    "type": "Q",
    "text": "Aku cemas kontrak kerjaku tidak diperpanjang"
  },
  {
    "id": "q3",
    "type": "Q",
    "text": "Aku merasa posisiku di perusahaan tidak aman"
  },
  {
    "id": "q4",
    "type": "Q",
    "text": "Aku takut PHK massal atau efisiensi perusahaan"
  },
  {
    "id": "l1",
    "type": "L",
    "text": "Aku khawatir role pekerjaanku berubah drastis"
  },
  {
    "id": "l2",
    "type": "L",
    "text": "Aku cemas teknologi/AI menggantikan pekerjaanku"
  },
  {
    "id": "l3",
    "type": "L",
    "text": "Aku tidak yakin kondisi kerja akan tetap sama"
  },
  {
    "id": "l4",
    "type": "L",
    "text": "Aku merasa karirku tidak pasti arahnya"
  },
  {
    "id": "w1",
    "type": "W",
    "text": "Aku sering overthinking tentang masa depan pekerjaan"
  },
  {
    "id": "w2",
    "type": "W",
    "text": "Aku cemas tidak bisa menemukan pekerjaan baru jika di-PHK"
  },
  {
    "id": "w3",
    "type": "W",
    "text": "Ketidakpastian kerja membuat sulit tidur"
  },
  {
    "id": "w4",
    "type": "W",
    "text": "Aku merasa tidak punya kontrol atas stabilitas karir"
  }
];

const DIMENSION_ORDER = ["Q","L","W"];

const SURVEY_META = {
  "id": "worker-job-insecurity",
  "slug": "worker-job-insecurity",
  "title": "Seberapa Aman Pekerjaanmu?",
  "subtitle": "Ukur ketidakpastian PHK, kontrak, & gig economy",
  "description": "Survey berbasis Job Insecurity Scale (De Witte, 1999; Ashford et al., 1989).",
  "icon": "⚠️",
  "color": "from-yellow-500 via-amber-500 to-orange-500",
  "audience": "pekerja",
  "tags": [
    "Job Insecurity",
    "PHK",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Ashford (1989). Quantitative and Qualitative Job Insecurity",
    "De Witte (1999). Job Insecurity and Psychological Distress",
    "Sverke (2002). The Nature of Job Insecurity",
    "Shoss (2011). In the Eye of the Storm",
    "Keim (2014). Coping with Job Insecurity"
  ],
  "detail": {
    "about": "Survey berbasis Job Insecurity Scale (De Witte, 1999; Ashford et al., 1989).",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Job Insecurity Scale (De Witte, 1999; Ashford et al., 1989)."
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
        "desc": "Indeks Ketidakamanan Kerja + kode dimensi."
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
  return "Indeks job insecurity {indexScore}% ({levelName}). Dimensi dominan: {typeName} (De Witte, 1999)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-job-insecurity",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "insc",
  indexLabel: "Indeks Ketidakamanan Kerja",
  indexLabelShort: "Job Insecurity",
  invertDimensions: [],
  getProfile,
  getSummary,
};
