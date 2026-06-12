const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Stabil Finansial",
    "emoji": "💚",
    "desc": "Stres finansial rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Cemas",
    "emoji": "🙂",
    "desc": "Sesekali khawatir uang — wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Stres Sedang",
    "emoji": "😓",
    "desc": "Stres finansial mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Stres Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan uang dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Stres Parah",
    "emoji": "💸",
    "desc": "Stres finansial sangat tinggi — cari bantuan kampus."
  }
];

const TYPES = {
  "M": {
    "code": "M",
    "name": "Money Anxiety",
    "nameId": "Kecemasan Uang",
    "emoji": "😰",
    "color": "#EF4444",
    "description": "Kecemasan terkait uang & keuangan.",
    "style": "Cemas saat cek saldo atau bayar UKT."
  },
  "A": {
    "code": "A",
    "name": "Academic Impact",
    "nameId": "Dampak Akademik",
    "emoji": "📉",
    "color": "#F97316",
    "description": "Stres finansial memengaruhi prestasi kuliah.",
    "style": "Sulit fokus belajar karena masalah uang."
  },
  "F": {
    "code": "F",
    "name": "Future Worry",
    "nameId": "Kekhawatiran Masa Depan",
    "emoji": "🔮",
    "color": "#6366F1",
    "description": "Khawatir tentang masa depan finansial.",
    "style": "Takut tidak sanggup biaya hidup atau lunas UKT."
  }
};

const QUESTIONS = [
  {
    "id": "m1",
    "type": "M",
    "text": "Aku cemas saat harus bayar UKT atau biaya kuliah"
  },
  {
    "id": "m2",
    "type": "M",
    "text": "Aku sering khawatir uang habis sebelum akhir bulan"
  },
  {
    "id": "m3",
    "type": "M",
    "text": "Aku stres memikirkan tagihan & cicilan"
  },
  {
    "id": "m4",
    "type": "M",
    "text": "Aku merasa tekanan finansial dari keluarga"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Masalah uang membuat sulit fokus belajar"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku harus kerja part-time dan itu mengganggu kuliah"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku skip kegiatan kampus karena alasan finansial"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Stres uang memengaruhi tidur & konsentrasi saat ujian"
  },
  {
    "id": "f1",
    "type": "F",
    "text": "Aku khawatir tidak sanggup menyelesaikan kuliah karena biaya"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku cemas tentang prospek kerja & gaji setelah lulus"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku merasa tertinggal karena teman punya dukungan finansial lebih"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku khawatir tidak bisa punya tabungan atau investasi"
  }
];

const DIMENSION_ORDER = ["M","A","F"];

const SURVEY_META = {
  "id": "student-financial-stress",
  "slug": "student-financial-stress",
  "title": "Seberapa Stres Finansialmu?",
  "subtitle": "Ukur kecemasan uang, UKT, & biaya hidup mahasiswa",
  "description": "Survey berbasis College Student Financial Stress Index (Archuleta et al., 2011).",
  "icon": "💸",
  "color": "from-emerald-500 via-teal-500 to-cyan-500",
  "audience": "mahasiswa",
  "tags": [
    "Finansial",
    "UKT",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Archuleta (2011). College Students and Financial Distress",
    "Norvilitis (2010). The Role of Student Loans and Credit Card Debt",
    "Britton (1991). Effects of Time-Management Practices on College Grades",
    "Xiao (2015). Financial Capability and Financial Stress",
    "Council for Economic Education (2023). Survey of the States"
  ],
  "detail": {
    "about": "Survey berbasis College Student Financial Stress Index (Archuleta et al., 2011).",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis College Student Financial Stress Index (Archuleta et al., 2011)."
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
        "desc": "Indeks Stres Finansial + kode dimensi."
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
  return "Indeks stres finansial {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Archuleta et al., 2011)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-financial-stress",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "finm",
  indexLabel: "Indeks Stres Finansial",
  indexLabelShort: "Stres Finansial",
  invertDimensions: [],
  getProfile,
  getSummary,
};
