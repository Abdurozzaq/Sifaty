const LEVELS = [
  {
    "min": 0,
    "max": 30,
    "name": "Sangat Rendah",
    "emoji": "🌱",
    "desc": "Grit sangat rendah."
  },
  {
    "min": 31,
    "max": 45,
    "name": "Rendah",
    "emoji": "🙂",
    "desc": "Grit rendah — mudah menyerah saat sulit."
  },
  {
    "min": 46,
    "max": 60,
    "name": "Cukup",
    "emoji": "😊",
    "desc": "Grit cukup — ada ketekunan dasar."
  },
  {
    "min": 61,
    "max": 75,
    "name": "Baik",
    "emoji": "✨",
    "desc": "Grit baik — perseverance & consistency kuat."
  },
  {
    "min": 76,
    "max": 100,
    "name": "Sangat Baik",
    "emoji": "🌟",
    "desc": "Grit sangat baik — marathon mindset akademik."
  }
];

const TYPES = {
  "P": {
    "code": "P",
    "name": "Perseverance",
    "nameId": "Perseverance",
    "emoji": "🏔️",
    "color": "#F59E0B",
    "description": "Ketekunan menghadapi kesulitan akademik.",
    "style": "Tetap ngerjain skripsi meski stuck berbulan-bulan."
  },
  "C": {
    "code": "C",
    "name": "Consistency",
    "nameId": "Consistency",
    "emoji": "📌",
    "color": "#EAB308",
    "description": "Konsistensi minat & komitmen jangka panjang.",
    "style": "Tetap fokus pada jurusan & tujuan meski ada distraksi."
  },
  "E": {
    "code": "E",
    "name": "Effort Long-term",
    "nameId": "Effort Jangka Panjang",
    "emoji": "⏳",
    "color": "#F97316",
    "description": "Usaha sustained untuk capai tujuan akademik.",
    "style": "Belajar rutin meski tidak ada ujian — marathon bukan sprint."
  }
};

const QUESTIONS = [
  {
    "id": "p1",
    "type": "P",
    "text": "Aku tidak menyerah meski mata kuliah sulit atau dosen killer"
  },
  {
    "id": "p2",
    "type": "P",
    "text": "Aku tetap berusaha meski dapat nilai jelek berkali-kali"
  },
  {
    "id": "p3",
    "type": "P",
    "text": "Aku finish apa yang aku mulai meski butuh waktu lama"
  },
  {
    "id": "p4",
    "type": "P",
    "text": "Aku bangkit setelah kegagalan akademik"
  },
  {
    "id": "c1",
    "type": "C",
    "text": "Aku tetap committed pada jurusan & tujuan kuliahku"
  },
  {
    "id": "c2",
    "type": "C",
    "text": "Aku tidak gampang pindah minat atau ganti arah"
  },
  {
    "id": "c3",
    "type": "C",
    "text": "Aku konsisten dengan passion akademik yang aku pilih"
  },
  {
    "id": "c4",
    "type": "C",
    "text": "Aku tidak tergoda quit meski ada alternatif yang lebih mudah"
  },
  {
    "id": "e1",
    "type": "E",
    "text": "Aku berinvestasi waktu jangka panjang untuk skill akademik"
  },
  {
    "id": "e2",
    "type": "E",
    "text": "Aku belajar rutin meski tidak ada deadline mendesak"
  },
  {
    "id": "e3",
    "type": "E",
    "text": "Aku sabar dengan proses belajar yang lambat tapi steady"
  },
  {
    "id": "e4",
    "type": "E",
    "text": "Aku prioritaskan growth jangka panjang daripada instant result"
  }
];

const DIMENSION_ORDER = ["P","C","E"];

const SURVEY_META = {
  "id": "student-grit",
  "slug": "student-grit",
  "title": "Seberapa Kuat Grit Akademikmu?",
  "subtitle": "Ukur perseverance, consistency, & effort jangka panjang",
  "description": "Survey berbasis Grit Scale (Duckworth et al., 2007) — perseverance of effort, consistency of interest, & long-term effort.",
  "icon": "💎",
  "color": "from-amber-500 via-yellow-500 to-orange-500",
  "audience": "mahasiswa",
  "tags": [
    "Analisis Positif",
    "Grit",
    "Perseverance"
  ],
  "featured": false,
  "questionCount": 12,
  "estimatedMinutes": 3,
  "active": true,
  "references": [
    "Duckworth (2007). Grit",
    "Duckworth (2016). Grit",
    "Credé (2017). Much Ado About Grit",
    "Von Castein (2018). Grit and Academic Performance",
    "Disabato (2019). Understanding Grit in the Context of Higher Education"
  ],
  "detail": {
    "about": "Survey berbasis Grit Scale (Duckworth et al., 2007) — perseverance of effort, consistency of interest, & long-term effort.",
    "theory": {
      "title": "Dasar Teori",
      "content": "Survey berbasis Grit Scale (Duckworth et al., 2007) — perseverance of effort, consistency of interest, & long-term effort."
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
        "desc": "Indeks Grit + kode dimensi."
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
  return "Indeks grit {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Duckworth et al., 2007)."
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}

module.exports = {
  slug: "student-grit",
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: "grtm",
  indexLabel: "Indeks Grit",
  indexLabelShort: "Grit",
  invertDimensions: [],
  getProfile,
  getSummary,
};
