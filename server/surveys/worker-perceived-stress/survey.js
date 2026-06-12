const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah Stres",
    "emoji": "💚",
    "desc": "Perceived stress rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Stres Wajar",
    "emoji": "🙂",
    "desc": "Stres moderat — masih manageable."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Stres Sedang",
    "emoji": "😓",
    "desc": "Stres mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Stres Tinggi",
    "emoji": "😰",
    "desc": "Perceived stress dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Stres Parah",
    "emoji": "🔥",
    "desc": "Stres sangat tinggi — evaluasi coping & bantuan."
  }
];

const TYPES = {
  "O": {
    "code": "O",
    "name": "Overload",
    "nameId": "Overload",
    "emoji": "📈",
    "color": "#EF4444",
    "description": "Beban kerja terasa berlebihan.",
    "style": "Terlalu banyak tugas untuk waktu & energi yang ada."
  },
  "U": {
    "code": "U",
    "name": "Unpredictability",
    "nameId": "Ketidakpastian",
    "emoji": "🎲",
    "color": "#F97316",
    "description": "Situasi kerja tidak terduga & tidak terkontrol.",
    "style": "Perubahan mendadak, kebijakan flip-flop, atau chaos kantor."
  },
  "C": {
    "code": "C",
    "name": "Coping Deficit",
    "nameId": "Defisit Coping",
    "emoji": "😵",
    "color": "#DC2626",
    "description": "Merasa tidak mampu mengatasi tekanan kerja.",
    "style": "Tidak tahu harus mulai dari mana — overwhelmed terus."
  }
};

const QUESTIONS = [
  {
    "id": "o1",
    "type": "O",
    "text": "Aku merasa overwhelmed dengan beban kerjaku"
  },
  {
    "id": "o2",
    "type": "O",
    "text": "Aku punya terlalu banyak hal yang harus diselesaikan"
  },
  {
    "id": "o3",
    "type": "O",
    "text": "Aku merasa tidak sanggup handle semua tanggung jawab"
  },
  {
    "id": "o4",
    "type": "O",
    "text": "Tekanan KPI & deadline membuatku stress berat"
  },
  {
    "id": "u1",
    "type": "U",
    "text": "Aku tidak bisa prediksi apa yang akan terjadi di kantor"
  },
  {
    "id": "u2",
    "type": "U",
    "text": "Aku merasa tidak punya kontrol atas situasi kerja"
  },
  {
    "id": "u3",
    "type": "U",
    "text": "Perubahan mendadak di kantor bikin aku cemas"
  },
  {
    "id": "u4",
    "type": "U",
    "text": "Aku merasa hidup kerjaku tidak teratur & chaotic"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku merasa tidak mampu mengatasi masalah di tempat kerja"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku kesulitan handle hal-hal penting di kantor"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa tidak bisa mengontrol hal yang mengganggu kerjaku"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku sering merasa tidak sanggup menghadapi tekanan harian"
  }
];

const DIMENSION_ORDER = ["O","U","C"];

const SURVEY_META = {
  "id": "worker-perceived-stress",
  "slug": "worker-perceived-stress",
  "title": "Seberapa Stres Pekerjaanmu?",
  "subtitle": "Ukur overload, ketidakpastian, & defisit coping di kantor",
  "description": "Survey berbasis Perceived Stress Scale (Cohen et al., 1983) — overload, unpredictability, & coping deficit.",
  "icon": "😤",
  "color": "from-red-500 via-rose-500 to-pink-500",
  "audience": "pekerja",
  "tags": [
    "Stres",
    "PSS",
    "Coping"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Cohen (1983). A Global Measure of Perceived Stress",
    "Cohen (1988). Perceived Stress in a Probability Sample of the United States",
    "Roberti (2006). Further Psychometric Support for the 10-Item Version of the Perceived Stress Scale",
    "Lesage (2012). Psychometric Properties of the PSS in Belgian Workers",
    "Waghachavare (2013). A Study of Stress Among Employees Working in IT Sector"
  ],
  "detail": {
    "about": "Survey berbasis Perceived Stress Scale (Cohen et al., 1983) — overload, unpredictability, & coping deficit.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Perceived Stress Scale (Cohen et al., 1983) — overload, unpredictability, & coping deficit."
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
        "desc": "Indeks Stres Persepsi + kode dimensi."
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
  return "Indeks perceived stress {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Cohen et al., 1983)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-perceived-stress",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "pssw",
  indexLabel: "Indeks Stres Persepsi",
  indexLabelShort: "Stres Persepsi",
  invertDimensions: [],
  getProfile,
  getSummary,
};
