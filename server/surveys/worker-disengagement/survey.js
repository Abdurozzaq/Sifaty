const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Highly Engaged",
    "emoji": "🌟",
    "desc": "Engagement tinggi — antitesis quiet quitting."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Cukup Engaged",
    "emoji": "🙂",
    "desc": "Masih engaged dengan pekerjaan."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Mulai Disengage",
    "emoji": "😐",
    "desc": "Tanda-tanda quiet quitting muncul."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Quiet Quitting",
    "emoji": "😶",
    "desc": "Disengagement signifikan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Full Quiet Quitting",
    "emoji": "💤",
    "desc": "Quiet quitting parah — evaluasi karir."
  }
];

const TYPES = {
  "V": {
    "code": "V",
    "name": "Low Vigor",
    "nameId": "Energi Rendah",
    "emoji": "😴",
    "color": "#64748B",
    "description": "Kurang semangat & energi di pekerjaan.",
    "style": "Datang, duduk, pulang — tanpa drive."
  },
  "D": {
    "code": "D",
    "name": "Low Dedication",
    "nameId": "Dedikasi Rendah",
    "emoji": "😐",
    "color": "#78716C",
    "description": "Tidak merasa involved atau bangga dengan pekerjaan.",
    "style": "Kerja cuma untuk gaji — bukan passion."
  },
  "A": {
    "code": "A",
    "name": "Low Absorption",
    "nameId": "Absorpsi Rendah",
    "emoji": "📱",
    "color": "#57534E",
    "description": "Mudah distracted & tidak flow saat kerja.",
    "style": "Sulit fokus — mind wandering terus."
  }
};

const QUESTIONS = [
  {
    "id": "v1",
    "type": "V",
    "text": "Aku datang kerja tanpa semangat — cuma menunggu pulang"
  },
  {
    "id": "v2",
    "type": "V",
    "text": "Aku merasa drained meski belum banyak kerja"
  },
  {
    "id": "v3",
    "type": "V",
    "text": "Aku tidak punya energy untuk tugas extra"
  },
  {
    "id": "v4",
    "type": "V",
    "text": "Aku merasa \"ngerjain\" bukan \"mengerjakan\""
  },
  {
    "id": "d1",
    "type": "D",
    "text": "Aku tidak bangga dengan pekerjaanku"
  },
  {
    "id": "d2",
    "type": "D",
    "text": "Aku tidak merasa pekerjaanku meaningful"
  },
  {
    "id": "d3",
    "type": "D",
    "text": "Aku tidak mau effort lebih dari job description"
  },
  {
    "id": "d4",
    "type": "D",
    "text": "Aku tidak peduli perkembangan perusahaan"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku mudah distracted saat kerja (HP, chat, dll)"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku sulit masuk \"flow\" saat mengerjakan tugas"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku sering mind-wandering saat jam kerja"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku tidak enjoy proses kerja — cuma tunggu selesai"
  }
];

const DIMENSION_ORDER = ["V","D","A"];

const SURVEY_META = {
  "id": "worker-disengagement",
  "slug": "worker-disengagement",
  "title": "Seberapa Quiet Quitting Kamu?",
  "subtitle": "Ukur disengagement & rendahnya commitment di kantor",
  "description": "Survey berbasis UWES inverse (Schaufeli et al., 2002) — low vigor, dedication, absorption.",
  "icon": "😶",
  "color": "from-slate-500 via-gray-500 to-zinc-500",
  "audience": "pekerja",
  "tags": [
    "Quiet Quitting",
    "Engagement",
    "Gratis"
  ],
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Schaufeli (2002). The Measurement of Engagement and Burnout",
    "Saks (2006). Antecedents and Consequences of Employee Engagement",
    "Schaufeli (2004). Job Demands, Job Resources, and Their Relationship with Burnout and Engagement",
    "Gallup (2023). State of the Global Workplace Report",
    "Macey (2008). The Meaning of Employee Engagement"
  ],
  "detail": {
    "about": "Survey berbasis UWES inverse (Schaufeli et al., 2002) — low vigor, dedication, absorption.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis UWES inverse (Schaufeli et al., 2002) — low vigor, dedication, absorption."
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
        "desc": "Indeks Quiet Quitting + kode dimensi."
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
  return "Indeks quiet quitting {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Schaufeli et al., 2002)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-disengagement",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "diseng",
  indexLabel: "Indeks Quiet Quitting",
  indexLabelShort: "Quiet Quitting",
  invertDimensions: [],
  getProfile,
  getSummary,
};
