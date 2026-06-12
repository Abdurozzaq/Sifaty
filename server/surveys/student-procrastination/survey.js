const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Disiplin",
    "emoji": "✅",
    "desc": "Kamu jarang menunda — keep it up!"
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Menunda",
    "emoji": "🙂",
    "desc": "Sesekali procrastinate — masih wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sering Menunda",
    "emoji": "😅",
    "desc": "Procrastination mulai mengganggu produktivitas."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Chronic Procrastinator",
    "emoji": "😰",
    "desc": "Menunda sudah jadi pola — butuh strategi."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Master Procrastinator",
    "emoji": "💀",
    "desc": "Procrastination parah — pertimbangkan time management coaching."
  }
];

const TYPES = {
  "D": {
    "code": "D",
    "name": "Delay",
    "nameId": "Penundaan",
    "emoji": "🐢",
    "color": "#F59E0B",
    "description": "Menunda tugas meski tahu konsekuensinya.",
    "style": "Deadline besok, mulai malam ini."
  },
  "A": {
    "code": "A",
    "name": "Avoidance",
    "nameId": "Penghindaran",
    "emoji": "🙈",
    "color": "#EF4444",
    "description": "Menghindari tugas yang sulit atau membosankan.",
    "style": "Buka HP dulu daripada buka modul."
  },
  "P": {
    "code": "P",
    "name": "Poor Planning",
    "nameId": "Perencanaan Buruk",
    "emoji": "📋",
    "color": "#8B5CF6",
    "description": "Kurang merencanakan waktu & prioritas.",
    "style": "Tidak punya timeline — semua dikerjakan last minute."
  }
};

const QUESTIONS = [
  {
    "id": "d1",
    "type": "D",
    "text": "Aku menunda mengerjakan tugas meski deadline sudah dekat"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku bilang \"besok aja\" padahal bisa dikerjakan hari ini"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku baru mulai skripsi/tugas besar saat waktu sudah sempit"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku sering submit tepat deadline karena menunda"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku menghindari tugas yang sulit atau membosankan"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku cari aktivitas lain saat ada tugas penting"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku merasa anxious tapi tetap tidak mulai mengerjakan"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku menunda karena takut hasilnya tidak sempurna"
  },
  {
    "id": "p1",
    "type": "P",
    "text": "Aku jarang buat jadwal atau to-do list untuk kuliah"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku tidak perkirakan berapa lama tugas akan selesai"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku campur aduk prioritas — yang urgent vs penting"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku kewalahan karena tidak merencanakan dari awal"
  }
];

const DIMENSION_ORDER = ["D","A","P"];

const SURVEY_META = {
  "id": "student-procrastination",
  "slug": "student-procrastination",
  "title": "Seberapa Suka Menunda?",
  "subtitle": "Ukur kebiasaan menunda tugas & deadline kuliah",
  "description": "Survey berbasis General Procrastination Scale (Lay, 1986) — delay, avoidance, poor planning.",
  "icon": "⏰",
  "color": "from-amber-500 via-orange-500 to-red-500",
  "audience": "mahasiswa",
  "tags": [
    "Procrastination",
    "GPS",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Lay (1986). At Last, My Research Article on Procrastination",
    "Steel (2007). The Nature of Procrastination",
    "Tuckman (1991). The Development and Concurrent Validity of the Procrastination Scale",
    "Solomon (1984). Academic Procrastination",
    "Svrcek (2016). Procrastination in College Students"
  ],
  "detail": {
    "about": "Survey berbasis General Procrastination Scale (Lay, 1986) — delay, avoidance, poor planning.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis General Procrastination Scale (Lay, 1986) — delay, avoidance, poor planning."
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
        "desc": "Indeks Procrastination + kode dimensi."
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
  return "Indeks procrastination {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Lay, 1986; Steel, 2007)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-procrastination",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "proc",
  indexLabel: "Indeks Procrastination",
  indexLabelShort: "Procrastination",
  invertDimensions: [],
  getProfile,
  getSummary,
};
