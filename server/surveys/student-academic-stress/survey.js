const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Stres akademik rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Tekanan ringan — masih manageable."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Stres sedang — mulai ganggu produktivitas."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Stres tinggi — burnout risk meningkat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Stres akademik sangat parah — evaluasi beban & dukungan."
  }
];

const TYPES = {
  "P": {
    "code": "P",
    "name": "Pressure",
    "nameId": "Tekanan Akademik",
    "emoji": "⚡",
    "color": "#DC2626",
    "description": "Tekanan dari deadline, SKS, & ekspektasi performa.",
    "style": "Deadline numpuk — tekanan dari dosen, orang tua, & diri sendiri."
  },
  "O": {
    "code": "O",
    "name": "Overwhelm",
    "nameId": "Overwhelm",
    "emoji": "🌊",
    "color": "#EA580C",
    "description": "Rasa kewalahan dengan beban akademik.",
    "style": "Terlalu banyak tugas — tidak tahu mulai dari mana."
  },
  "C": {
    "code": "C",
    "name": "Coping Failure",
    "nameId": "Coping Gagal",
    "emoji": "😵",
    "color": "#D97706",
    "description": "Kesulitan mengelola & mengatasi stres kuliah.",
    "style": "Strategi belajar tidak efektif — stres makin menumpuk."
  }
};

const QUESTIONS = [
  {
    "id": "p1",
    "type": "P",
    "text": "Aku merasa tekanan akademik dari dosen & orang tua terlalu berat"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku stress karena harus memenuhi ekspektasi IPK tinggi"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku merasa tertekan dengan jumlah SKS & mata kuliah wajib"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku cemas soal masa depan karir yang bergantung pada nilai"
  },
  {
    "id": "o1",
    "type": "O",
    "text": "Aku kewalahan dengan jumlah tugas, ujian, & proyek bersamaan"
  },
  {
    "id": "o2",
    "type": "O",
    "text": "Aku merasa tidak sanggup menyelesaikan semua deadline"
  },
  {
    "id": "o3",
    "type": "O",
    "text": "Aku overwhelmed saat melihat jadwal kuliah & kegiatan"
  },
  {
    "id": "o4",
    "type": "O",
    "text": "Aku merasa tenggelam dalam beban akademik tanpa jalan keluar"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku tidak tahu cara efektif mengelola stres kuliah"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku gagal menyeimbangkan belajar, organisasi, & istirahat"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa strategi belajarku tidak cukup handle tekanan"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku semakin stress meski sudah berusaha cope"
  }
];

const DIMENSION_ORDER = ["P","O","C"];

const SURVEY_META = {
  "id": "student-academic-stress",
  "slug": "student-academic-stress",
  "title": "Seberapa Buruk Stres Akademikmu?",
  "subtitle": "Ukur tekanan, overwhelm, & kegagalan coping di perkuliahan",
  "description": "Survey berbasis Academic Stress Scale — pressure, overwhelm, & coping failure pada beban kuliah mahasiswa.",
  "icon": "📚",
  "color": "from-red-600 via-orange-600 to-amber-600",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Negatif",
    "Stres Akademik",
    "Kuliah"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Kohn (1986). An Academic Stress Scale",
    "Misra (2000). College Students' Academic Stress and Its Relation to Their Anxiety, Time Management, and Leisure Satisfaction",
    "Busari (2017). Evaluating the Relationship Between Academic Stress and Academic Performance",
    "Pascoe (2020). Prevalence of Stress in Academic Settings",
    "Lazarus (1984). Stress, Appraisal, and Coping"
  ],
  "detail": {
    "about": "Survey berbasis Academic Stress Scale — pressure, overwhelm, & coping failure pada beban kuliah mahasiswa.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Academic Stress Scale — pressure, overwhelm, & coping failure pada beban kuliah mahasiswa."
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
        "desc": "Indeks Stres Akademik + kode dimensi."
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
  return "Indeks stres akademik {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Kohn & Frazer, 1986; Misra & McKean, 2000)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-academic-stress",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "acsm",
  indexLabel: "Indeks Stres Akademik",
  indexLabelShort: "Stres Akademik",
  invertDimensions: [],
  getProfile,
  getSummary,
};
