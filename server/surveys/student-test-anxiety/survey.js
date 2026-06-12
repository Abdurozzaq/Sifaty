const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Kecemasan ujian rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Sesekali nervous — wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Kecemasan sedang — mulai ganggu performa."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan tinggi — perlu strategi coping."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Kecemasan ujian sangat parah — cari bantuan akademik & klinis."
  }
];

const TYPES = {
  "W": {
    "code": "W",
    "name": "Worry",
    "nameId": "Kekhawatiran Ujian",
    "emoji": "🌀",
    "color": "#F97316",
    "description": "Pikiran cemas tentang performa & konsekuensi ujian.",
    "style": "Overthinking skenario gagal sebelum & saat ujian."
  },
  "P": {
    "code": "P",
    "name": "Physiological",
    "nameId": "Gejala Fisik",
    "emoji": "💓",
    "color": "#EF4444",
    "description": "Respon tubuh saat ujian atau persiapan ujian.",
    "style": "Jantung berdebar, tangan gemetar, atau mual saat tes."
  },
  "A": {
    "code": "A",
    "name": "Avoidance",
    "nameId": "Penghindaran",
    "emoji": "🚫",
    "color": "#DC2626",
    "description": "Menghindari situasi ujian atau persiapan ujian.",
    "style": "Skip review, bolos ujian, atau procrastinate belajar karena takut."
  }
};

const QUESTIONS = [
  {
    "id": "w1",
    "type": "W",
    "text": "Aku khawatir gagal ujian meski sudah belajar"
  },
  {
    "id": "w2",
    "type": "W",
    "text": "Aku overthinking tentang konsekuensi nilai jelek"
  },
  {
    "id": "w3",
    "type": "W",
    "text": "Aku cemas memikirkan pertanyaan yang mungkin keluar"
  },
  {
    "id": "w4",
    "type": "W",
    "text": "Aku merasa otak blank saat bayangin di ruang ujian"
  },
  {
    "id": "p1",
    "type": "P",
    "text": "Aku merasa jantung berdebar saat ujian dimulai"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku gemetar atau berkeringat saat mengerjakan soal"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku merasa mual atau perut mulas sebelum ujian"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku panik & sulit napas saat waktu ujian hampir habis"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku menghindari belajar karena takut tidak sanggup"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku sering menunda review materi karena cemas"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku ingin bolos ujian karena terlalu takut"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku menghindari tanya jawab atau quiz di kelas"
  }
];

const DIMENSION_ORDER = ["W","P","A"];

const SURVEY_META = {
  "id": "student-test-anxiety",
  "slug": "student-test-anxiety",
  "title": "Seberapa Parah Kecemasan Ujianmu?",
  "subtitle": "Ukur worry, gejala fisik, & avoidance saat ujian",
  "description": "Survey berbasis Test Anxiety Inventory (Sarason, 1984) — worry, physiological arousal, & test avoidance.",
  "icon": "📝",
  "color": "from-orange-500 via-red-500 to-rose-600",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Negatif",
    "Kecemasan Ujian",
    "TAI"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Sarason (1984). Test Anxiety, Worry, and Cognitive Interference",
    "Spielberger (1995). Test Anxiety",
    "von der Embse (2018). Test Anxiety Effects, Predictors, and Correlates",
    "Putwain (2010). Test Anxiety, Stress and Social Support",
    "Lowe (2008). Test Anxiety"
  ],
  "detail": {
    "about": "Survey berbasis Test Anxiety Inventory (Sarason, 1984) — worry, physiological arousal, & test avoidance.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Test Anxiety Inventory (Sarason, 1984) — worry, physiological arousal, & test avoidance."
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
        "desc": "Indeks Kecemasan Ujian + kode dimensi."
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
  return "Indeks kecemasan ujian {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Sarason, 1984; Spielberger & Vagg, 1995)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-test-anxiety",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "tanm",
  indexLabel: "Indeks Kecemasan Ujian",
  indexLabelShort: "Kecemasan Ujian",
  invertDimensions: [],
  getProfile,
  getSummary,
};
