const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Flow sangat jarang."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Flow rendah — pekerjaan mostly routine."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Flow cukup — sesekali masuk zone."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Flow baik — sering experience deep engagement."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Flow sangat baik — optimal experience di kerja."
  }
];

const TYPES = {
  "F": {
    "code": "F",
    "name": "Focus",
    "nameId": "Focus",
    "emoji": "🎯",
    "color": "#8B5CF6",
    "description": "Konsentrasi penuh tanpa distraksi saat bekerja.",
    "style": "Deep work mode — notifikasi diabaikan, fully present."
  },
  "I": {
    "code": "I",
    "name": "Immersion",
    "nameId": "Immersion",
    "emoji": "🌀",
    "color": "#A855F7",
    "description": "Kehilangan sense of time saat engaged dengan tugas.",
    "style": "Lupa makan siang — hours feel like minutes."
  },
  "A": {
    "code": "A",
    "name": "Autotelic Enjoyment",
    "nameId": "Autotelic Enjoyment",
    "emoji": "✨",
    "color": "#D946EF",
    "description": "Menikmati proses kerja itu sendiri, bukan hanya outcome.",
    "style": "Enjoy coding/designing — prosesnya rewarding."
  }
};

const QUESTIONS = [
  {
    "id": "f1",
    "type": "F",
    "text": "Aku bisa fokus penuh tanpa distraksi saat mengerjakan tugas"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku masuk zone saat handle project yang challenging"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku fully present & engaged saat bekerja"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku block out noise & fokus pada satu task"
  },
  {
    "id": "i1",
    "type": "I",
    "text": "Aku lupa waktu saat deeply engaged dengan pekerjaan"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku merasa waktu berlalu cepat saat flow"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku fully absorbed dalam aktivitas kerja"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku kehilangan awareness diri saat fokus bekerja"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku enjoy proses kerja, bukan hanya hasil akhir"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku merasa pekerjaanku intrinsically rewarding"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku senang saat mengerjakan tugas yang aku kuasai"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku merasa energized setelah session flow di kerja"
  }
];

const DIMENSION_ORDER = ["F","I","A"];

const SURVEY_META = {
  "id": "worker-flow",
  "slug": "worker-flow",
  "title": "Seberapa Kuat Flow-mu di Kerja?",
  "subtitle": "Ukur focus, immersion, & autotelic enjoyment saat bekerja",
  "description": "Survey berbasis Flow State Scale (Jackson & Marsh, 1996) — focus, immersion, & autotelic enjoyment dalam pekerjaan.",
  "icon": "🌊",
  "color": "from-violet-500 via-purple-500 to-fuchsia-500",
  "audience": "pekerja",
  "tags": [
    "Analisis Positif",
    "Flow",
    "Produktivitas"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Csikszentmihalyi (1990). Flow",
    "Jackson (1996). Development and Validation of a Scale to Measure Optimal Experience",
    "Engeser (2008). Flow, Performance and Moderators of Challenge-Skill Balance",
    "Demerouti (2012). The Job Demands-Resources Model of Burnout",
    "Fullagar (2009). Flow at Work"
  ],
  "detail": {
    "about": "Survey berbasis Flow State Scale (Jackson & Marsh, 1996) — focus, immersion, & autotelic enjoyment dalam pekerjaan.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Flow State Scale (Jackson & Marsh, 1996) — focus, immersion, & autotelic enjoyment dalam pekerjaan."
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
        "desc": "Indeks Flow Kerja + kode dimensi."
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
  return "Indeks flow kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Csikszentmihalyi, 1990; Jackson & Marsh, 1996)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-flow",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "flww",
  indexLabel: "Indeks Flow Kerja",
  indexLabelShort: "Flow",
  invertDimensions: [],
  getProfile,
  getSummary,
};
