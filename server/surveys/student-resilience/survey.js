const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rentan",
    "emoji": "🍂",
    "desc": "Resiliensi rendah — butuh dukungan."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Tangguh",
    "emoji": "🙂",
    "desc": "Resiliensi sedang — masih ada ruang tumbuh."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Resilien Sedang",
    "emoji": "🌿",
    "desc": "Cukup adaptif menghadapi tekanan kuliah."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Resilien Tinggi",
    "emoji": "💪",
    "desc": "Ketangguhan mental kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Resilien",
    "emoji": "🌟",
    "desc": "Resiliensi sangat tinggi — role model adaptasi."
  }
];

const TYPES = {
  "A": {
    "code": "A",
    "name": "Adaptability",
    "nameId": "Adaptabilitas",
    "emoji": "🔄",
    "color": "#10B981",
    "description": "Kemampuan beradaptasi dengan perubahan & tekanan.",
    "style": "Bisa adjust saat rencana kuliah berubah mendadak."
  },
  "T": {
    "code": "T",
    "name": "Toughness",
    "nameId": "Ketangguhan",
    "emoji": "💪",
    "color": "#059669",
    "description": "Ketahanan mental menghadapi kesulitan.",
    "style": "Tetap bertahan meski semester berat & banyak gagal."
  },
  "G": {
    "code": "G",
    "name": "Growth",
    "nameId": "Growth Mindset",
    "emoji": "📈",
    "color": "#14B8A6",
    "description": "Keyakinan bisa berkembang dari pengalaman sulit.",
    "style": "Melihat kegagalan sebagai pelajaran, bukan akhir."
  }
};

const QUESTIONS = [
  {
    "id": "a1",
    "type": "A",
    "text": "Aku bisa beradaptasi saat rencana kuliahku berubah mendadak"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku mampu handle tekanan deadline & ujian bertumpuk"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku bisa tetap produktif meski situasi tidak ideal"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku fleksibel menghadapi perubahan kurikulum atau dosen"
  },
  {
    "id": "t1",
    "type": "T",
    "text": "Aku tetap kuat meski dapat nilai jelek atau gagal mata kuliah"
  },
  {
    "id": "t2",
    "type": "T",
    "text": "Aku tidak mudah menyerah saat tugas atau skripsi sulit"
  },
  {
    "id": "t3",
    "type": "T",
    "text": "Aku bisa bangkit setelah mengalami kegagalan akademik"
  },
  {
    "id": "t4",
    "type": "T",
    "text": "Aku percaya diri menghadapi tantangan baru di kampus"
  },
  {
    "id": "g1",
    "type": "G",
    "text": "Aku percaya bisa berkembang dari kesalahan & feedback dosen"
  },
  {
    "id": "g2",
    "type": "G",
    "text": "Aku melihat masa sulit kuliah sebagai kesempatan belajar"
  },
  {
    "id": "g3",
    "type": "G",
    "text": "Aku yakin kemampuanku bisa meningkat dengan usaha"
  },
  {
    "id": "g4",
    "type": "G",
    "text": "Aku optimis bisa capai tujuan meski jalannya tidak mulus"
  }
];

const DIMENSION_ORDER = ["A","T","G"];

const SURVEY_META = {
  "id": "student-resilience",
  "slug": "student-resilience",
  "title": "Seberapa Resilien Kamu?",
  "subtitle": "Ukur adaptabilitas, mental toughness, & growth mindset kuliah",
  "description": "Survey berbasis Connor-Davidson Resilience Scale (CD-RISC) — adaptability, toughness, & growth.",
  "icon": "🌱",
  "color": "from-emerald-500 via-green-500 to-teal-500",
  "audience": "mahasiswa",
  "tags": [
    "Resiliensi",
    "CD-RISC",
    "Growth"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Connor (2003). Development of a New Resilience Scale",
    "Campbell-Sills (2007). Psychometric Analysis and Refinement of the Connor-Davidson Resilience Scale",
    "Masten (2001). Ordinary Magic",
    "Southwick (2012). Resilience",
    "Smith (2008). The Brief Resilience Scale"
  ],
  "detail": {
    "about": "Survey berbasis Connor-Davidson Resilience Scale (CD-RISC) — adaptability, toughness, & growth.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Connor-Davidson Resilience Scale (CD-RISC) — adaptability, toughness, & growth."
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
        "desc": "Indeks Resiliensi + kode dimensi."
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
  return "Indeks resiliensi {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Connor & Davidson, 2003)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-resilience",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "resm",
  indexLabel: "Indeks Resiliensi",
  indexLabelShort: "Resiliensi",
  invertDimensions: [],
  getProfile,
  getSummary,
};
