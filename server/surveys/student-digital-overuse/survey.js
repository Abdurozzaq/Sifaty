const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Penggunaan digital sehat."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Overuse ringan — sesekali kelebihan."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Overuse sedang — mulai ganggu rutinitas."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Overuse tinggi — produktivitas & relasi terdampak."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Overuse sangat parah — pertimbangkan digital detox."
  }
];

const TYPES = {
  "C": {
    "code": "C",
    "name": "Compulsion",
    "nameId": "Compulsive Use",
    "emoji": "🔁",
    "color": "#2563EB",
    "description": "Kebutuhan kompulsif untuk cek HP secara berulang.",
    "style": "Reflex buka Instagram/TikTok — tidak bisa tahan 5 menit."
  },
  "W": {
    "code": "W",
    "name": "Withdrawal",
    "nameId": "Withdrawal",
    "emoji": "😣",
    "color": "#4F46E5",
    "description": "Gelisah & irritable saat tidak bisa akses HP.",
    "style": "Panik HP mati — FOMO & anxiety meningkat drastis."
  },
  "I": {
    "code": "I",
    "name": "Interference",
    "nameId": "Gangguan Aktivitas",
    "emoji": "⚠️",
    "color": "#7C3AED",
    "description": "HP mengganggu belajar, tidur, & interaksi sosial.",
    "style": "Scroll saat kelas — produktivitas & relasi terganggu."
  }
};

const QUESTIONS = [
  {
    "id": "c1",
    "type": "C",
    "text": "Aku cek HP secara otomatis meski tidak ada notifikasi"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku sulit berhenti scroll meski sudah berjanji ke diri sendiri"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa kecanduan aplikasi sosial media"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku buka HP pertama kali saat bangun & terakhir sebelum tidur"
  },
  {
    "id": "w1",
    "type": "W",
    "text": "Aku gelisah saat HP lowbat atau tidak ada sinyal"
  },
  {
    "id": "w2",
    "type": "W",
    "text": "Aku merasa cemas kalau tidak cek HP dalam beberapa jam"
  },
  {
    "id": "w3",
    "type": "W",
    "text": "Aku irritable atau moody saat tidak bisa online"
  },
  {
    "id": "w4",
    "type": "W",
    "text": "Aku panik kalau ketinggalan update di media sosial"
  },
  {
    "id": "i1",
    "type": "I",
    "text": "Aku scroll HP saat kelas & sulit fokus belajar"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku begadang karena HP & performa kuliah menurun"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku mengabaikan teman saat hangout karena sibuk HP"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku procrastinate tugas karena terlalu lama di HP"
  }
];

const DIMENSION_ORDER = ["C","W","I"];

const SURVEY_META = {
  "id": "student-digital-overuse",
  "slug": "student-digital-overuse",
  "title": "Seberapa Parah Kecanduan HP-mu?",
  "subtitle": "Ukur compulsive use, withdrawal, & gangguan aktivitas mahasiswa",
  "description": "Survey berbasis Smartphone Addiction Scale (SAS) — compulsion, withdrawal, & interference pada penggunaan smartphone mahasiswa.",
  "icon": "📱",
  "color": "from-blue-600 via-indigo-600 to-violet-700",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Negatif",
    "Smartphone",
    "Digital"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Kwon (2013). Development and Validation of a Smartphone Addiction Scale (SAS)",
    "Billieux (2015). Can Disordered Mobile Phone Use Be Considered a Behavioral Addiction?",
    "Elhai (2017). Problematic Smartphone Use",
    "Samaha (2016). Relationships Among Smartphone Addiction, Stress, Academic Performance, and Satisfaction with Life",
    "King (2013). Nomophobia"
  ],
  "detail": {
    "about": "Survey berbasis Smartphone Addiction Scale (SAS) — compulsion, withdrawal, & interference pada penggunaan smartphone mahasiswa.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Smartphone Addiction Scale (SAS) — compulsion, withdrawal, & interference pada penggunaan smartphone mahasiswa."
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
        "desc": "Indeks Overuse Digital + kode dimensi."
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
  return "Indeks overuse digital {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Kwon et al., 2013; Billieux et al., 2015)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-digital-overuse",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "digm",
  indexLabel: "Indeks Overuse Digital",
  indexLabelShort: "Overuse Digital",
  invertDimensions: [],
  getProfile,
  getSummary,
};
