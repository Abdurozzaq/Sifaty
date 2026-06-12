const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Feeling valued sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Feeling valued rendah — recognition & support kurang."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Feeling valued cukup — ada apresiasi dasar."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Feeling valued baik — merasa dihargai & didukung."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Feeling valued sangat baik — strong perceived organizational support."
  }
];

const TYPES = {
  "R": {
    "code": "R",
    "name": "Recognition",
    "nameId": "Recognition",
    "emoji": "🏆",
    "color": "#EAB308",
    "description": "Kontribusi diakui & diapresiasi secara formal.",
    "style": "Dapat praise, award, atau promotion yang deserved."
  },
  "A": {
    "code": "A",
    "name": "Appreciation",
    "nameId": "Appreciation",
    "emoji": "💛",
    "color": "#F59E0B",
    "description": "Rasa dihargai & respected sehari-hari.",
    "style": "Atasan bilang thank you — feel seen & valued."
  },
  "G": {
    "code": "G",
    "name": "Growth Support",
    "nameId": "Growth Support",
    "emoji": "🌱",
    "color": "#F97316",
    "description": "Organisasi investasi pada perkembangan karyawan.",
    "style": "Training, mentoring, & career development didukung."
  }
};

const QUESTIONS = [
  {
    "id": "r1",
    "type": "R",
    "text": "Aku merasa kontribusiku diakui & diapresiasi"
  },
  {
    "id": "r2",
    "type": "R",
    "text": "Aku dapat recognition yang fair untuk kerja keras"
  },
  {
    "id": "r3",
    "type": "R",
    "text": "Aku merasa achievement-ku diperhatikan atasan"
  },
  {
    "id": "r4",
    "type": "R",
    "text": "Aku merasa rewarded sesuai dengan effort yang aku berikan"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku merasa dihargai sebagai individu di kantor"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku merasa respected oleh rekan & atasan"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku merasa orang di kantor peduli dengan wellbeing & inputku"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku merasa valued meski bukan top performer"
  },
  {
    "id": "g1",
    "type": "G",
    "text": "Aku merasa perusahaan investasi pada growth-ku"
  },
  {
    "id": "g2",
    "type": "G",
    "text": "Aku dapat support untuk develop skill & karir"
  },
  {
    "id": "g3",
    "type": "G",
    "text": "Aku merasa atasan care tentang perkembanganku"
  },
  {
    "id": "g4",
    "type": "G",
    "text": "Aku punya akses mentoring atau coaching di kantor"
  }
];

const DIMENSION_ORDER = ["R","A","G"];

const SURVEY_META = {
  "id": "worker-feeling-valued",
  "slug": "worker-feeling-valued",
  "title": "Seberapa Kuat Rasa Dihargaimu di Kerja?",
  "subtitle": "Ukur recognition, appreciation, & growth support dari organisasi",
  "description": "Survey berbasis perceived organizational support & employee recognition — recognition, appreciation, & growth support at work.",
  "icon": "⭐",
  "color": "from-yellow-500 via-amber-500 to-orange-500",
  "audience": "pekerja",
  "tags": [
    "Analisis Positif",
    "Recognition",
    "Appreciation"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Eisenberger (1986). Perceived Organizational Support",
    "Saks (2006). Antecedents and Consequences of Employee Engagement",
    "Rhoades (2002). Perceived Organizational Support",
    "Stajkovic (2003). Behavioral Management and Performance Enhancement",
    "Shuck (2011). Employee Engagement and HRD"
  ],
  "detail": {
    "about": "Survey berbasis perceived organizational support & employee recognition — recognition, appreciation, & growth support at work.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis perceived organizational support & employee recognition — recognition, appreciation, & growth support at work."
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
        "desc": "Indeks Feeling Valued + kode dimensi."
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
  return "Indeks feeling valued {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Saks, 2006; Eisenberger et al., 1986)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-feeling-valued",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "valw",
  indexLabel: "Indeks Feeling Valued",
  indexLabelShort: "Feeling Valued",
  invertDimensions: [],
  getProfile,
  getSummary,
};
