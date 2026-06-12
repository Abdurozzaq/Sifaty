const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Tenang Digital",
    "emoji": "🧘",
    "desc": "Relatif bebas dari FOMO."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang FOMO",
    "emoji": "🙂",
    "desc": "Sesekali merasa ketinggalan."
  },
  {
    "min": 46,
    "max": 60,
    "name": "FOMO Sedang",
    "emoji": "😬",
    "desc": "FOMO mulai memengaruhi fokus."
  },
  {
    "min": 61,
    "max": 75,
    "name": "FOMO Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan ketinggalan dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "FOMO Ekstrem",
    "emoji": "🌪️",
    "desc": "FOMO sangat tinggi — pertimbangkan digital detox."
  }
];

const TYPES = {
  "F": {
    "code": "F",
    "name": "FoMO Core",
    "nameId": "Takut Ketinggalan",
    "emoji": "😰",
    "color": "#EC4899",
    "description": "Kecemasan ketinggalan event sosial.",
    "style": "Takut tidak diajak atau ketinggalan momen."
  },
  "S": {
    "code": "S",
    "name": "Social Comparison",
    "nameId": "Perbandingan Sosial",
    "emoji": "👀",
    "color": "#8B5CF6",
    "description": "Membandingkan hidup dengan highlight media sosial.",
    "style": "Scroll feed bikin insecure."
  },
  "D": {
    "code": "D",
    "name": "Digital Distraction",
    "nameId": "Distraksi Digital",
    "emoji": "📲",
    "color": "#6366F1",
    "description": "Kesulitan fokus karena HP & notifikasi.",
    "style": "Sulit lepas dari TikTok/Reels saat belajar."
  }
};

const QUESTIONS = [
  {
    "id": "f1",
    "type": "F",
    "text": "Aku cemas kalau tidak cek HP takut ketinggalan info penting"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku sedih kalau lihat teman hangout tanpa aku di story"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku takut ketinggalan trend atau event yang lagi rame"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku sering overcommit ke acara karena takut FOMO"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku membandingkan prestasi kuliahku dengan teman seangkatan"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Lihat LinkedIn/portfolio orang seumurku bikin aku merasa tertinggal"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku merasa harus punya life yang instagrammable"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku sering merasa tidak cukup baik setelah scroll media sosial"
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku sulit fokus belajar tanpa cek notifikasi HP"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku buka TikTok/Reels sebentar tapi berjam-jam"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku gelisah kalau HP tidak ada di dekatku"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku belajar sambil scroll — multitasking digital jadi kebiasaan"
  }
];

const DIMENSION_ORDER = ["F","S","D"];

const SURVEY_META = {
  "id": "student-fomo",
  "slug": "student-fomo",
  "title": "Seberapa FOMO Kamu?",
  "subtitle": "Fear of missing out & distraksi digital di kampus",
  "description": "Survey berbasis FoMO Scale (Przybylski et al., 2013).",
  "icon": "📱",
  "color": "from-pink-500 via-purple-500 to-indigo-500",
  "audience": "mahasiswa",
  "tags": [
    "FOMO",
    "Media Sosial",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Przybylski (2013). Motivational, Emotional, and Behavioral Correlates of Fear of Missing Out",
    "Oberst (2017). Negative Consequences from Heavy Social Networking Use",
    "Elhai (2020). Fear of Missing Out, Anxiety and Depression",
    "Alt (2018). Students Wellbeing, FoMO, and Social Media",
    "Gupta (2021). Fear of Missing Out in the Social Media Context"
  ],
  "detail": {
    "about": "Survey berbasis FoMO Scale (Przybylski et al., 2013).",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis FoMO Scale (Przybylski et al., 2013)."
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
        "desc": "Indeks FOMO + kode dimensi."
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
  return "Indeks FOMO {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Przybylski et al., 2013)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-fomo",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "fomo",
  indexLabel: "Indeks FOMO",
  indexLabelShort: "FOMO",
  invertDimensions: [],
  getProfile,
  getSummary,
};
