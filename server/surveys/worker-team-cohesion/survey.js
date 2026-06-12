const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Cohesion sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Cohesion rendah — trust & unity perlu dibangun."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Cohesion cukup — kolaborasi dasar ada."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Cohesion baik — tim solid & supportive."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Cohesion sangat baik — high-performing team culture."
  }
];

const TYPES = {
  "T": {
    "code": "T",
    "name": "Trust",
    "nameId": "Trust",
    "emoji": "🤝",
    "color": "#6366F1",
    "description": "Kepercayaan antar anggota tim.",
    "style": "Bisa andalkan rekan — transparan & reliable."
  },
  "U": {
    "code": "U",
    "name": "Unity",
    "nameId": "Unity",
    "emoji": "🔗",
    "color": "#3B82F6",
    "description": "Rasa kesatuan & shared purpose dalam tim.",
    "style": "Satu visi — kita tim, bukan individu bersaing."
  },
  "S": {
    "code": "S",
    "name": "Support Team",
    "nameId": "Support Tim",
    "emoji": "💙",
    "color": "#0EA5E9",
    "description": "Dukungan mutual saat ada kesulitan.",
    "style": "Cover each other — bantu saat overload atau error."
  }
};

const QUESTIONS = [
  {
    "id": "t1",
    "type": "T",
    "text": "Aku percaya rekan tim akan deliver janji mereka"
  },
  {
    "id": "t2",
    "type": "T",
    "text": "Aku bisa transparan dengan tim tanpa takut dihakimi"
  },
  {
    "id": "t3",
    "type": "T",
    "text": "Aku merasa rekan tim reliable & bisa diandalkan"
  },
  {
    "id": "t4",
    "type": "T",
    "text": "Aku trust tim saat handle project penting"
  },
  {
    "id": "u1",
    "type": "U",
    "text": "Aku merasa tim kami united dengan tujuan yang sama"
  },
  {
    "id": "u2",
    "type": "U",
    "text": "Aku merasa bagian dari tim yang solid"
  },
  {
    "id": "u3",
    "type": "U",
    "text": "Aku bangga menjadi anggota tim ini"
  },
  {
    "id": "u4",
    "type": "U",
    "text": "Aku merasa kita satu tim, bukan individu bersaing"
  },
  {
    "id": "s1",
    "type": "S",
    "text": "Aku merasa didukung tim saat ada kesulitan"
  },
  {
    "id": "s2",
    "type": "S",
    "text": "Aku bisa minta bantuan rekan tanpa ragu"
  },
  {
    "id": "s3",
    "type": "S",
    "text": "Aku cover rekan saat mereka butuh & sebaliknya"
  },
  {
    "id": "s4",
    "type": "S",
    "text": "Aku merasa tim celebrate success bersama"
  }
];

const DIMENSION_ORDER = ["T","U","S"];

const SURVEY_META = {
  "id": "worker-team-cohesion",
  "slug": "worker-team-cohesion",
  "title": "Seberapa Kuat Kohesi Timmu?",
  "subtitle": "Ukur trust, unity, & support antar anggota tim",
  "description": "Survey berbasis Group Environment Questionnaire (Carron et al., 1985) — trust, unity, & team support di tempat kerja.",
  "icon": "👥",
  "color": "from-indigo-500 via-blue-500 to-sky-500",
  "audience": "pekerja",
  "tags": [
    "Analisis Positif",
    "Team Cohesion",
    "Kolaborasi"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Carron (1985). The Development of an Instrument to Assess Cohesion in Sport Teams",
    "Seashore (1954). Group Cohesiveness in the Industrial Work Group",
    "Evans (1991). Group Cohesion and Performance",
    "Mullen (1994). The Relation Between Group Cohesiveness and Performance",
    "Costa (2015). Trust in Work Teams"
  ],
  "detail": {
    "about": "Survey berbasis Group Environment Questionnaire (Carron et al., 1985) — trust, unity, & team support di tempat kerja.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Group Environment Questionnaire (Carron et al., 1985) — trust, unity, & team support di tempat kerja."
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
        "desc": "Indeks Team Cohesion + kode dimensi."
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
  return "Indeks team cohesion {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Seashore, 1954; Carron et al., 1985)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-team-cohesion",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "tcow",
  indexLabel: "Indeks Team Cohesion",
  indexLabelShort: "Team Cohesion",
  invertDimensions: [],
  getProfile,
  getSummary,
};
