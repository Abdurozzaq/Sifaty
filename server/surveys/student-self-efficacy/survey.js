const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Ragu Diri",
    "emoji": "😟",
    "desc": "Self-efficacy rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Percaya",
    "emoji": "🙂",
    "desc": "Keyakinan diri sedang — masih berkembang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Percaya Diri",
    "emoji": "😊",
    "desc": "Self-efficacy cukup untuk tantangan akademik."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Sangat Percaya",
    "emoji": "💪",
    "desc": "Keyakinan diri kuat dalam belajar."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Efikasi Tinggi",
    "emoji": "🌟",
    "desc": "Self-efficacy sangat tinggi — driver motivasi kuat."
  }
];

const TYPES = {
  "I": {
    "code": "I",
    "name": "Initiative",
    "nameId": "Inisiatif",
    "emoji": "🚀",
    "color": "#8B5CF6",
    "description": "Kemampuan memulai & mengambil langkah.",
    "style": "Berani ambil proyek, organisasi, atau tantangan baru."
  },
  "P": {
    "code": "P",
    "name": "Persistence",
    "nameId": "Ketekunan",
    "emoji": "🔥",
    "color": "#A855F7",
    "description": "Konsistensi usaha meski menghadapi hambatan.",
    "style": "Tetap ngerjain meski bosan, sulit, atau gagal berkali-kali."
  },
  "R": {
    "code": "R",
    "name": "Resilience",
    "nameId": "Resiliensi Efikasi",
    "emoji": "🛡️",
    "color": "#D946EF",
    "description": "Keyakinan bisa mengatasi kesulitan akademik.",
    "style": "Percaya bisa handle ujian sulit atau semester berat."
  }
};

const QUESTIONS = [
  {
    "id": "i1",
    "type": "I",
    "text": "Aku berani mengambil inisiatif dalam proyek atau organisasi kampus"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku percaya diri memulai tugas baru meski belum pernah coba"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku aktif mencari kesempatan belajar di luar kelas"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku tidak ragu mengajukan ide atau bertanya di kelas"
  },
  {
    "id": "p1",
    "type": "P",
    "text": "Aku konsisten mengerjakan tugas meski tidak mood"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku tidak menyerah saat materi kuliah sulit dipahami"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku tetap fokus mengejar target akademik jangka panjang"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku bangun lagi setelah gagal ujian atau lomba"
  },
  {
    "id": "r1",
    "type": "R",
    "text": "Aku yakin bisa mengatasi hambatan akademik yang muncul"
  },
  {
    "id": "r2",
    "type": "R",
    "text": "Aku percaya bisa handle tekanan ujian & sidang"
  },
  {
    "id": "r3",
    "type": "R",
    "text": "Aku optimis bisa capai tujuan kuliah yang aku tetapkan"
  },
  {
    "id": "r4",
    "type": "R",
    "text": "Aku merasa mampu mengelola tantangan perkuliahan"
  }
];

const DIMENSION_ORDER = ["I","P","R"];

const SURVEY_META = {
  "id": "student-self-efficacy",
  "slug": "student-self-efficacy",
  "title": "Seberapa Percaya Diri Akademik?",
  "subtitle": "Ukur inisiatif, ketekunan, & resiliensi dalam belajar",
  "description": "Survey berbasis General Self-Efficacy Scale (Schwarzer & Jerusalem, 1995) — initiative, persistence, & resilience.",
  "icon": "🎯",
  "color": "from-violet-500 via-purple-500 to-fuchsia-500",
  "audience": "mahasiswa",
  "tags": [
    "Self-Efficacy",
    "GSE",
    "Motivasi"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Schwarzer (1995). Generalized Self-Efficacy Scale",
    "Bandura (1997). Self-Efficacy",
    "Zimmerman (2000). Self-Efficacy",
    "Scholz (2002). Is General Self-Efficacy a Universal Construct?",
    "Chemers (2001). Academic Self-Efficacy and First Year College Student Performance"
  ],
  "detail": {
    "about": "Survey berbasis General Self-Efficacy Scale (Schwarzer & Jerusalem, 1995) — initiative, persistence, & resilience.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis General Self-Efficacy Scale (Schwarzer & Jerusalem, 1995) — initiative, persistence, & resilience."
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
        "desc": "Indeks Self-Efficacy + kode dimensi."
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
  return "Indeks self-efficacy {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Schwarzer & Jerusalem, 1995)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-self-efficacy",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "sefm",
  indexLabel: "Indeks Self-Efficacy",
  indexLabelShort: "Self-Efficacy",
  invertDimensions: [],
  getProfile,
  getSummary,
};
