const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Iklim kerja relatif sehat."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Incivility ringan — sesekali terjadi."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Iklim toxic sedang — stres kerja meningkat."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Iklim toxic tinggi — wellbeing & performa terdampak."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Iklim sangat toxic — pertimbangkan eskalasi HR atau pindah."
  }
];

const TYPES = {
  "H": {
    "code": "H",
    "name": "Hostility",
    "nameId": "Hostility",
    "emoji": "😤",
    "color": "#B91C1C",
    "description": "Lingkungan kerja agresif & antagonistik.",
    "style": "Konflik terbuka, blame culture, & tensi tinggi antar rekan."
  },
  "I": {
    "code": "I",
    "name": "Incivility",
    "nameId": "Incivility",
    "emoji": "🗯️",
    "color": "#E11D48",
    "description": "Perilaku tidak sopan & disrespectful di kantor.",
    "style": "Interrupt, dismissive, atau rude tanpa alasan jelas."
  },
  "E": {
    "code": "E",
    "name": "Exclusion",
    "nameId": "Eksklusi Sosial",
    "emoji": "🚫",
    "color": "#BE123C",
    "description": "Dikecualikan dari informasi, meeting, atau circle kerja.",
    "style": "Tidak diajak diskusi penting — merasa outsider di tim."
  }
};

const QUESTIONS = [
  {
    "id": "h1",
    "type": "H",
    "text": "Aku merasa ada konflik terbuka & tensi tinggi di kantor"
  },
  {
    "id": "h2",
    "type": "H",
    "text": "Aku sering jadi target kritik kasar atau blame culture"
  },
  {
    "id": "h3",
    "type": "H",
    "text": "Aku merasa ada rekan atau atasan yang deliberately hostile"
  },
  {
    "id": "h4",
    "type": "H",
    "text": "Aku merasa tidak aman secara emosional di tempat kerja"
  },
  {
    "id": "i1",
    "type": "I",
    "text": "Aku di-interrupt atau diabaikan saat meeting"
  },
  {
    "id": "i2",
    "type": "I",
    "text": "Aku merasa diperlakukan tidak sopan oleh rekan kerja"
  },
  {
    "id": "i3",
    "type": "I",
    "text": "Aku mendengar komentar dismissive atau condescending"
  },
  {
    "id": "i4",
    "type": "I",
    "text": "Aku merasa tidak dihormati meski sudah berkontribusi"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku tidak diajak ke meeting penting yang relevan dengan pekerjaanku"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku merasa di-out dari circle atau gosip kantor"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku tidak dapat informasi yang dibagikan ke rekan lain"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku merasa tidak belong di tim atau departemenku"
  }
];

const DIMENSION_ORDER = ["H","I","E"];

const SURVEY_META = {
  "id": "worker-hostile-climate",
  "slug": "worker-hostile-climate",
  "title": "Seberapa Buruk Iklim Kerja di Kantormu?",
  "subtitle": "Ukur hostility, incivility, & exclusion di tempat kerja",
  "description": "Survey berbasis Workplace Incivility Scale & hostile climate research — hostility, incivility, & social exclusion di organisasi.",
  "icon": "⚔️",
  "color": "from-red-700 via-rose-700 to-pink-700",
  "audience": "pekerja",
  "tags": [
    "Analisis Negatif",
    "Toxic Workplace",
    "Incivility"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Neuman (1998). Workplace Violence and Workplace Aggression",
    "Cortina (2001). Incivility in the Workplace",
    "Andersson (1999). Tit for Tat? The Spiraling Effect of Incivility in the Workplace",
    "Hitlan (2005). The Influence of Workplace Exclusion and Personality on Counterproductive Work Behaviors",
    "Pearson (2000). Assessing and Attacking Workplace Incivility"
  ],
  "detail": {
    "about": "Survey berbasis Workplace Incivility Scale & hostile climate research — hostility, incivility, & social exclusion di organisasi.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Workplace Incivility Scale & hostile climate research — hostility, incivility, & social exclusion di organisasi."
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
        "desc": "Indeks Iklim Kerja Toxic + kode dimensi."
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
  return "Indeks iklim kerja toxic {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Neuman & Baron, 1998; Cortina et al., 2001)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "worker-hostile-climate",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "hclw",
  indexLabel: "Indeks Iklim Kerja Toxic",
  indexLabelShort: "Iklim Toxic",
  invertDimensions: [],
  getProfile,
  getSummary,
};
