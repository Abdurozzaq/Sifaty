const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Gejala depresi minimal."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Tanda ringan — pantau mood."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Gejala sedang — perhatikan rutinitas."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Gejala signifikan — cari dukungan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Gejala sangat berat — segera cari bantuan profesional."
  }
];

const TYPES = {
  "M": {
    "code": "M",
    "name": "Mood",
    "nameId": "Mood Rendah",
    "emoji": "😔",
    "color": "#64748B",
    "description": "Perasaan sedih, hampa, atau kosong yang persisten.",
    "style": "Bangun pagi sudah berat — mood rendah sepanjang hari."
  },
  "A": {
    "code": "A",
    "name": "Anhedonia",
    "nameId": "Anhedonia",
    "emoji": "😐",
    "color": "#78716C",
    "description": "Kehilangan minat & kesenangan dari aktivitas yang dulu dinikmati.",
    "style": "Tidak excited lagi dengan hobi, teman, atau prestasi kuliah."
  },
  "S": {
    "code": "S",
    "name": "Self-worth",
    "nameId": "Harga Diri Rendah",
    "emoji": "💔",
    "color": "#52525B",
    "description": "Perasaan tidak berharga, gagal, atau mengecewakan orang lain.",
    "style": "Merasa jadi beban — self-criticism terus-menerus."
  }
};

const QUESTIONS = [
  {
    "id": "m1",
    "type": "M",
    "text": "Aku merasa sedih, hampa, atau kosong hampir setiap hari"
  },
  {
    "id": "m2",
    "type": "M",
    "text": "Aku sulit merasa optimis tentang masa depan kuliahku"
  },
  {
    "id": "m3",
    "type": "M",
    "text": "Aku merasa emosiku flat — tidak senang maupun sedih"
  },
  {
    "id": "m4",
    "type": "M",
    "text": "Aku sering menangis atau merasa ingin menangis tanpa alasan jelas"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku kehilangan minat pada hobi atau aktivitas yang dulu aku nikmati"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku tidak excited lagi saat hangout dengan teman kampus"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku merasa tidak ada yang bisa bikin aku senang belakangan ini"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku sulit merasakan kesenangan meski ada hal baik yang terjadi"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku merasa diriku gagal atau mengecewakan keluarga"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku merasa tidak berharga sebagai mahasiswa"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku sering menyalahkan diri sendiri untuk hal-hal buruk"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku merasa jadi beban bagi teman atau orang terdekat"
  }
];

const DIMENSION_ORDER = ["M","A","S"];

const SURVEY_META = {
  "id": "student-depression",
  "slug": "student-depression",
  "title": "Seberapa Parah Gejala Depresimu?",
  "subtitle": "Ukur mood rendah, anhedonia, & harga diri di kampus",
  "description": "Survey berbasis Patient Health Questionnaire-9 (PHQ-9) — mood, anhedonia, & low self-worth pada mahasiswa.",
  "icon": "🌧️",
  "color": "from-slate-600 via-gray-600 to-zinc-700",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Negatif",
    "Depresi",
    "PHQ-9"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Kroenke (2001). The PHQ-9",
    "Spitzer (1999). Validation and Utility of a Self-Report Version of PRIME-MD",
    "Beiter (2015). The Prevalence and Correlates of Depression, Anxiety, and Stress in a Sample of College Students",
    "Ibrahim (2013). A Systematic Review of Studies of Depression Prevalence in University Students",
    "Beck (1961). An Inventory for Measuring Depression"
  ],
  "detail": {
    "about": "Survey berbasis Patient Health Questionnaire-9 (PHQ-9) — mood, anhedonia, & low self-worth pada mahasiswa.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Patient Health Questionnaire-9 (PHQ-9) — mood, anhedonia, & low self-worth pada mahasiswa."
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
        "desc": "Indeks Gejala Depresi + kode dimensi."
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
  return "Indeks gejala depresi {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Kroenke et al., 2001; Beck et al., 1961)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-depression",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "depm",
  indexLabel: "Indeks Gejala Depresi",
  indexLabelShort: "Depresi",
  invertDimensions: [],
  getProfile,
  getSummary,
};
