const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Psych safety cukup baik."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Ketidakamanan ringan — sesekali ragu speak up."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Psych unsafety sedang — inovasi & feedback terhambat."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Psych unsafety tinggi — tim culture toxic."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Psych unsafety sangat parah — eskalasi ke leadership diperlukan."
  }
];

const TYPES = {
  "F": {
    "code": "F",
    "name": "Fear Speaking",
    "nameId": "Takut Bicara",
    "emoji": "🤐",
    "color": "#57534E",
    "description": "Takut mengungkapkan ide, kekhawatiran, atau kesalahan.",
    "style": "Diam di meeting — takut dianggap bodoh atau dihukum."
  },
  "S": {
    "code": "S",
    "name": "Shame",
    "nameId": "Rasa Malu",
    "emoji": "😳",
    "color": "#78716C",
    "description": "Malu & takut dihakimi saat make mistake.",
    "style": "Sembunyikan error — takut jadi bahan kritik publik."
  },
  "I": {
    "code": "I",
    "name": "Insecurity",
    "nameId": "Insecurity",
    "emoji": "😟",
    "color": "#44403C",
    "description": "Tidak merasa aman & diterima di tim.",
    "style": "Meragukan posisi di tim — takut di-out atau dijauhi."
  }
};

const QUESTIONS = [
  {
    "id": "f1",
    "type": "F",
    "text": "Aku takut speak up di meeting karena khawatir dihakimi"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku tidak berani mengungkapkan kekhawatiran ke atasan"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku takut bertanya karena dianggap tidak kompeten"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku diam saja meski punya ide berbeda dari mayoritas"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku malu mengakui kesalahan di depan tim"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku takut dipermalukan saat presentasi gagal"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku merasa dihakimi ketika performance tidak sempurna"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku hide mistake karena takut konsekuensi sosial"
  },
  {
    "id": "i1",
    "type": "I",
    "text": "Aku merasa tidak diterima sepenuhnya di tim"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku tidak yakin posisiku aman di organisasi"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku merasa harus selalu perfect agar dihargai"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku tidak percaya rekan kerja akan support saat aku vulnerable"
  }
];

const DIMENSION_ORDER = ["F","S","I"];

const SURVEY_META = {
  "id": "worker-psych-unsafety",
  "slug": "worker-psych-unsafety",
  "title": "Seberapa Buruk Rasa Aman Psikologismu di Kerja?",
  "subtitle": "Ukur takut bicara, malu, & insecurity di tim",
  "description": "Survey berbasis psychological safety inverse (Edmondson, 1999) — fear of speaking up, shame, & insecurity di tempat kerja.",
  "icon": "🔇",
  "color": "from-stone-600 via-neutral-600 to-gray-700",
  "audience": "pekerja",
  "tags": [
    "Analisis Negatif",
    "Psych Safety",
    "Tim Kerja"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Edmondson (1999). Psychological Safety and Learning Behavior in Work Teams",
    "Newman (2017). Psychological Safety",
    "Frazier (2017). Psychological Safety",
    "Nembhard (2006). Making It Safe",
    "Carmeli (2009). High-Quality Relationships, Psychological Safety, and Learning from Failures"
  ],
  "detail": {
    "about": "Survey berbasis psychological safety inverse (Edmondson, 1999) — fear of speaking up, shame, & insecurity di tempat kerja.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis psychological safety inverse (Edmondson, 1999) — fear of speaking up, shame, & insecurity di tempat kerja."
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
        "desc": "Indeks Psychological Safety + kode dimensi."
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
  return "Indeks psychological unsafety {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Edmondson, 1999; Newman et al., 2017)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-psych-unsafety",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "psuw",
  indexLabel: "Indeks Psychological Safety",
  indexLabelShort: "Psych Safety",
  invertDimensions: [],
  getProfile,
  getSummary,
};
