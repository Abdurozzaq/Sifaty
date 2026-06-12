const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sehat Empati",
    "emoji": "💚",
    "desc": "Compassion fatigue rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Kadang Lelah",
    "emoji": "🙂",
    "desc": "Sesekali emotionally drained — wajar."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Fatigue Sedang",
    "emoji": "😓",
    "desc": "Tanda compassion fatigue mulai muncul."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Fatigue Tinggi",
    "emoji": "😰",
    "desc": "Burnout empati & trauma sekunder signifikan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Fatigue Parah",
    "emoji": "🆘",
    "desc": "Compassion fatigue sangat tinggi — cari supervisi & self-care."
  }
];

const TYPES = {
  "Bo": {
    "code": "Bo",
    "name": "Burnout",
    "nameId": "Burnout Empati",
    "emoji": "😩",
    "color": "#EF4444",
    "description": "Kelelahan emosional akibat membantu orang lain.",
    "style": "Lelah mendengar masalah klien/pasien terus-menerus."
  },
  "Tr": {
    "code": "Tr",
    "name": "Secondary Trauma",
    "nameId": "Trauma Sekunder",
    "emoji": "😨",
    "color": "#DC2626",
    "description": "Trauma dari paparan kisah penderitaan orang lain.",
    "style": "Kisah klien bikin aku trauma atau nightmares."
  },
  "Ac": {
    "code": "Ac",
    "name": "Compassion Satisfaction",
    "nameId": "Kepuasan Menolong",
    "emoji": "💚",
    "color": "#10B981",
    "description": "Kepuasan dari membantu orang (skor rendah = fatigue tinggi).",
    "style": "Tidak lagi merasa meaningful membantu orang lain."
  }
};

const QUESTIONS = [
  {
    "id": "bo1",
    "type": "Bo",
    "text": "Aku merasa drained setelah mendengar masalah klien/pasien"
  },
  {
    "id": "bo2",
    "type": "Bo",
    "text": "Aku merasa lelah secara emosional karena pekerjaan helping"
  },
  {
    "id": "bo3",
    "type": "Bo",
    "text": "Aku merasa tidak sanggup lagi menghadapi beban emosional kerja"
  },
  {
    "id": "bo4",
    "type": "Bo",
    "text": "Aku merasa hopeless tentang bisa membantu orang yang aku layani"
  },
  {
    "id": "tr1",
    "type": "Tr",
    "text": "Kisah trauma klien/pasien membuat aku cemas atau gelisah"
  },
  {
    "id": "tr2",
    "type": "Tr",
    "text": "Aku terbawa emosi penderitaan orang yang aku bantu"
  },
  {
    "id": "tr3",
    "type": "Tr",
    "text": "Aku mengalami nightmares atau flashback terkait kasus kerja"
  },
  {
    "id": "tr4",
    "type": "Tr",
    "text": "Aku merasa terpapar trauma sekunder dari pekerjaanku"
  },
  {
    "id": "ac1",
    "type": "Ac",
    "text": "Aku merasa puas & meaningful membantu orang di pekerjaanku"
  },
  {
    "id": "ac2",
    "type": "Ac",
    "text": "Aku merasa bangga dengan kontribusiku pada kesejahteraan orang lain"
  },
  {
    "id": "ac3",
    "type": "Ac",
    "text": "Aku merasa pekerjaanku membuat perbedaan positif"
  },
  {
    "id": "ac4",
    "type": "Ac",
    "text": "Aku enjoy membantu & mendampingi orang yang membutuhkan"
  }
];

const DIMENSION_ORDER = ["Bo","Tr","Ac"];

const SURVEY_META = {
  "id": "worker-compassion-fatigue",
  "slug": "worker-compassion-fatigue",
  "title": "Seberapa Compassion Fatigue?",
  "subtitle": "Ukur burnout empati, trauma sekunder, & kepuasan membantu",
  "description": "Survey berbasis Professional Quality of Life (Stamm, 2010) — burnout, secondary trauma, & compassion satisfaction.",
  "icon": "🩺",
  "color": "from-rose-600 via-red-600 to-orange-600",
  "audience": "pekerja",
  "tags": [
    "Compassion Fatigue",
    "ProQOL",
    "Helping Professions"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Stamm (2010). The Concise ProQOL Manual",
    "Figley (1995). Compassion Fatigue",
    "Adams (2006). Compassion Fatigue and Psychological Distress Among Social Workers",
    "Sabo (2011). Reflecting on the Concept of Compassion Fatigue",
    "Cetrano (2017). How Are Compassion Fatigue, Burnout, and Compassion Satisfaction Affected by Quality of Working Life?"
  ],
  "detail": {
    "about": "Survey berbasis Professional Quality of Life (Stamm, 2010) — burnout, secondary trauma, & compassion satisfaction.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Professional Quality of Life (Stamm, 2010) — burnout, secondary trauma, & compassion satisfaction."
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
        "desc": "Indeks Compassion Fatigue + kode dimensi."
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
  return "Indeks compassion fatigue {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Stamm, 2010)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-compassion-fatigue",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "compw",
  indexLabel: "Indeks Compassion Fatigue",
  indexLabelShort: "Compassion Fatigue",
  invertDimensions: ["Ac"],
  getProfile,
  getSummary,
};
