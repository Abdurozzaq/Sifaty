const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Beban kerja manageable."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Overload ringan — sesekali padat."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Overload sedang — overtime mulai rutin."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Overload tinggi — burnout risk meningkat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Overload sangat parah — eskalasi ke atasan & evaluasi workload."
  }
];

const TYPES = {
  "Q": {
    "code": "Q",
    "name": "Quantity Overload",
    "nameId": "Overload Kuantitas",
    "emoji": "📈",
    "color": "#D97706",
    "description": "Terlalu banyak tugas untuk kapasitas yang ada.",
    "style": "Inbox penuh — to-do list tidak pernah habis."
  },
  "T": {
    "code": "T",
    "name": "Time Pressure",
    "nameId": "Time Pressure",
    "emoji": "⏰",
    "color": "#EA580C",
    "description": "Tekanan waktu & deadline yang tidak realistis.",
    "style": "Deadline numpuk — tidak cukup jam untuk semua deliverable."
  },
  "C": {
    "code": "C",
    "name": "Complexity",
    "nameId": "Kompleksitas Tugas",
    "emoji": "🧩",
    "color": "#DC2626",
    "description": "Tugas yang rumit & menuntut multi-skill.",
    "style": "Project kompleks tanpa resources cukup — cognitive overload."
  }
};

const QUESTIONS = [
  {
    "id": "q1",
    "type": "Q",
    "text": "Aku punya terlalu banyak tugas untuk waktu yang tersedia"
  },
  {
    "id": "q2",
    "type": "Q",
    "text": "Aku merasa beban kerjaku melebihi kapasitasku"
  },
  {
    "id": "q3",
    "type": "Q",
    "text": "Aku tidak sanggup menyelesaikan semua tanggung jawab"
  },
  {
    "id": "q4",
    "type": "Q",
    "text": "Aku kerja overtime rutin tapi pekerjaan tetap menumpuk"
  },
  {
    "id": "t1",
    "type": "T",
    "text": "Aku selalu dikejar deadline yang tidak realistis"
  },
  {
    "id": "t2",
    "type": "T",
    "text": "Aku merasa tidak punya cukup waktu untuk kerja berkualitas"
  },
  {
    "id": "t3",
    "type": "T",
    "text": "Aku stress karena harus multitask banyak project bersamaan"
  },
  {
    "id": "t4",
    "type": "T",
    "text": "Aku merasa terburu-buru sepanjang hari kerja"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku kesulitan handle tugas yang butuh skill berbeda-beda"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku overwhelmed dengan kompleksitas project yang diberikan"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa tidak cukup kompeten untuk semua aspek pekerjaan"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku kehilangan fokus karena tugas terlalu rumit & ambigu"
  }
];

const DIMENSION_ORDER = ["Q","T","C"];

const SURVEY_META = {
  "id": "worker-role-overload",
  "slug": "worker-role-overload",
  "title": "Seberapa Parah Overload Kerjamu?",
  "subtitle": "Ukur beban kuantitas, time pressure, & kompleksitas tugas",
  "description": "Survey berbasis role overload theory (Kahn et al., 1964) — quantity overload, time pressure, & task complexity.",
  "icon": "📊",
  "color": "from-amber-600 via-orange-600 to-red-600",
  "audience": "pekerja",
  "tags": [
    "Analisis Negatif",
    "Overload",
    "Beban Kerja"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Kahn (1964). Organizational Stress",
    "Peterson (1995). Role Conflict, Ambiguity, and Overload",
    "Glazer (2005). Conservation of Resources, Social Support, and Individualism-Collectivism",
    "Jex (1991). Emerging Theoretical and Methodological Issues in the Study of Work-Related Stress",
    "Demerouti (2001). The Job Demands-Resources Model of Burnout"
  ],
  "detail": {
    "about": "Survey berbasis role overload theory (Kahn et al., 1964) — quantity overload, time pressure, & task complexity.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis role overload theory (Kahn et al., 1964) — quantity overload, time pressure, & task complexity."
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
        "desc": "Indeks Role Overload + kode dimensi."
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
  return "Indeks role overload {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Kahn et al., 1964; Peterson et al., 1995)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-role-overload",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "rolw",
  indexLabel: "Indeks Role Overload",
  indexLabelShort: "Role Overload",
  invertDimensions: [],
  getProfile,
  getSummary,
};
