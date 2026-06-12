const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Rendah",
    "emoji": "🌿",
    "desc": "Kecemasan sosial rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Ringan",
    "emoji": "🙂",
    "desc": "Sesekali grogi — normal."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Sedang",
    "emoji": "😓",
    "desc": "Kecemasan sedang — mulai batasi interaksi."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Tinggi",
    "emoji": "😰",
    "desc": "Kecemasan tinggi — isolasi sosial meningkat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Parah",
    "emoji": "🆘",
    "desc": "Kecemasan sosial sangat parah — pertimbangkan terapi."
  }
];

const TYPES = {
  "F": {
    "code": "F",
    "name": "Fear Evaluation",
    "nameId": "Takut Dievaluasi",
    "emoji": "👁️",
    "color": "#7C3AED",
    "description": "Ketakutan dinilai atau diperhatikan orang lain.",
    "style": "Takut salah ngomong di depan kelas — semua mata terasa menilai."
  },
  "E": {
    "code": "E",
    "name": "Embarrassment",
    "nameId": "Rasa Malu",
    "emoji": "😳",
    "color": "#A855F7",
    "description": "Malu berlebihan & khawatir dianggap aneh.",
    "style": "Overthinking momen awkward — replay di kepala terus."
  },
  "A": {
    "code": "A",
    "name": "Avoidance Social",
    "nameId": "Penghindaran Sosial",
    "emoji": "🚪",
    "color": "#C026D3",
    "description": "Menghindari situasi sosial di kampus.",
    "style": "Skip presentasi, diskusi kelompok, atau event kampus."
  }
};

const QUESTIONS = [
  {
    "id": "f1",
    "type": "F",
    "text": "Aku takut dinilai buruk saat berbicara di depan kelas"
  },
  {
    "id": "f2",
    "type": "F",
    "text": "Aku cemas orang lain memperhatikan kesalahanku"
  },
  {
    "id": "f3",
    "type": "F",
    "text": "Aku khawatir dianggap bodoh saat bertanya ke dosen"
  },
  {
    "id": "f4",
    "type": "F",
    "text": "Aku merasa semua orang menilai penampilanku di kampus"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku merasa malu berlebihan setelah interaksi sosial"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku khawatir terlihat aneh di depan teman sekelas"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku merah padam atau grogi saat jadi pusat perhatian"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku overthinking omongan atau gestureku setelah ngobrol"
  },
  {
    "id": "a1",
    "type": "A",
    "text": "Aku menghindari presentasi atau tampil di depan kelas"
  },
  {
    "id": "a2",
    "type": "A",
    "text": "Aku menolak undangan hangout karena tak nyaman sosial"
  },
  {
    "id": "a3",
    "type": "A",
    "text": "Aku diam saja di diskusi kelompok meski punya ide"
  },
  {
    "id": "a4",
    "type": "A",
    "text": "Aku menghindari event kampus yang ramai orang"
  }
];

const DIMENSION_ORDER = ["F","E","A"];

const SURVEY_META = {
  "id": "student-social-anxiety",
  "slug": "student-social-anxiety",
  "title": "Seberapa Parah Kecemasan Sosialmu?",
  "subtitle": "Ukur takut dievaluasi, malu, & penghindaran sosial di kampus",
  "description": "Survey berbasis Liebowitz Social Anxiety Scale & model Clark-Wells — fear of evaluation, embarrassment, & social avoidance.",
  "icon": "🙈",
  "color": "from-violet-600 via-purple-600 to-fuchsia-600",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Negatif",
    "Kecemasan Sosial",
    "SAD"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Liebowitz (1987). Social Phobia",
    "Clark (1995). A Cognitive Model of Social Phobia",
    "Ruscio (2008). Social Fear and Social Phobia in the USA",
    "Mattick (1998). Development and Validation of Measures of Social Phobia Scrutiny Fear and Social Interaction Anxiety",
    "Schneier (2006). Clinical Practice"
  ],
  "detail": {
    "about": "Survey berbasis Liebowitz Social Anxiety Scale & model Clark-Wells — fear of evaluation, embarrassment, & social avoidance.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Liebowitz Social Anxiety Scale & model Clark-Wells — fear of evaluation, embarrassment, & social avoidance."
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
        "desc": "Indeks Kecemasan Sosial + kode dimensi."
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
  return "Indeks kecemasan sosial {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Liebowitz, 1987; Clark & Wells, 1995)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-social-anxiety",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "sanm",
  indexLabel: "Indeks Kecemasan Sosial",
  indexLabelShort: "Kecemasan Sosial",
  invertDimensions: [],
  getProfile,
  getSummary,
};
