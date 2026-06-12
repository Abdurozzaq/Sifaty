const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sehat Akademik",
    "emoji": "🌿",
    "desc": "Beban kuliah masih manageable."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Mulai Terasa",
    "emoji": "😐",
    "desc": "Ada tanda kelelahan — perhatikan istirahat."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Burnout Sedang",
    "emoji": "😓",
    "desc": "Burnout mulai signifikan."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Burnout Tinggi",
    "emoji": "🔥",
    "desc": "Kelelahan & sinisme dominan."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Burnout Parah",
    "emoji": "💀",
    "desc": "Level burnout sangat tinggi — cari bantuan."
  }
];

const TYPES = {
  "E": {
    "code": "E",
    "name": "Exhaustion",
    "nameId": "Kelelahan",
    "emoji": "😩",
    "color": "#EF4444",
    "description": "Kelelahan fisik & emosional akibat beban akademik.",
    "style": "Rasa lelah kronis meski sudah istirahat."
  },
  "C": {
    "code": "C",
    "name": "Cynicism",
    "nameId": "Sinisme",
    "emoji": "😒",
    "color": "#F97316",
    "description": "Sikap apatis terhadap perkuliahan.",
    "style": "Meragukan makna kuliah — motivasi menurun."
  },
  "A": {
    "code": "A",
    "name": "Efficacy",
    "nameId": "Efikasi Akademik",
    "emoji": "💪",
    "color": "#10B981",
    "description": "Keyakinan diri akademik (skor rendah = burnout tinggi).",
    "style": "Merasa tidak kompeten menyelesaikan tugas."
  }
};

const QUESTIONS = [
  {
    "id": "e1",
    "type": "E",
    "text": "Aku merasa lelah meski cuma duduk di kelas atau buka laptop"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Beban SKS, tugas, & deadline bikin tubuhku terasa drained"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku sulit bangun semangat untuk kuliah atau mengerjakan PR"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Setiap hari kuliah terasa melelahkan secara emosional"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku merasa apatis terhadap materi kuliah yang diajarkan"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku sering meragukan apakah kuliahku berguna untuk masa depan"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku merasa sinis terhadap sistem perkuliahan di kampus"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Motivasiku untuk belajar menurun drastis dibanding semester lalu"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku yakin bisa menyelesaikan tugas kuliah dengan baik"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku merasa kompeten menghadapi ujian & presentasi"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku percaya bisa capai target IPK yang aku inginkan"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku merasa mampu mengelola beban akademikku"
  }
];

const DIMENSION_ORDER = ["E","C","A"];

const SURVEY_META = {
  "id": "student-burnout",
  "slug": "student-burnout",
  "title": "Seberapa Burnout Kuliahmu?",
  "subtitle": "Ukur kelelahan akademik, sinisme, & efikasi di era kuliah",
  "description": "Survey berbasis MBI-Student Survey (Schaufeli et al., 2002) — memetakan burnout kuliah: exhaustion, cynicism, & academic efficacy.",
  "icon": "📚",
  "color": "from-orange-500 via-red-500 to-rose-500",
  "audience": "mahasiswa",
  "tags": [
    "Burnout",
    "MBI-SS",
    "Gratis"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Schaufeli (2002). Burnout and Engagement in University Students",
    "Maslach (1981). The Measurement of Experienced Burnout",
    "Salmela-Aro (2009). School Burnout Inventory (SBI)",
    "Reis (2015). Measuring Job and Academic Burnout",
    "Walburg (2015). Burnout among High School Students"
  ],
  "detail": {
    "about": "Survey berbasis MBI-Student Survey (Schaufeli et al., 2002) — memetakan burnout kuliah: exhaustion, cynicism, & academic efficacy.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis MBI-Student Survey (Schaufeli et al., 2002) — memetakan burnout kuliah: exhaustion, cynicism, & academic efficacy."
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
        "desc": "Indeks Burnout Kuliah + kode dimensi."
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
  return "Indeks burnout kuliah {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Schaufeli et al., 2002)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-burnout",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "burnm",
  indexLabel: "Indeks Burnout Kuliah",
  indexLabelShort: "Burnout Kuliah",
  invertDimensions: ["A"],
  getProfile,
  getSummary,
};
