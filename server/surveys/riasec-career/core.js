/**
 * Data RIASEC berdasarkan:
 * - Holland (1997) RIASEC Theory
 * - Zainudin et al. (2024) - Application of Holland's RIASEC in Educational Settings
 * - Wistarini & Syarifah (2023) - Holland's RIASEC Model (Bisma Jurnal Manajemen)
 * - Wei (2024) - RIASEC questionnaire structure (3 pertanyaan per tipe, skor 0-1)
 *
 * Metodologi: 5 pertanyaan per dimensi (Likert 1-5), skor dinormalisasi 0-100%.
 * Holland Code = 3 tipe tertinggi. Kekuatan tipe jika skor > 60% (adaptasi threshold 0.67 dari Wei et al.)
 */

const RIASEC_TYPES = {
  R: {
    code: 'R',
    name: 'Realistic',
    nameId: 'Praktis / Fisik',
    emoji: '🔧',
    color: '#FF6B6B',
    gradient: 'from-rose-400 to-orange-400',
    description:
      'Suka bekerja dengan alat, mesin, hewan, atau tugas hands-on di lapangan.',
    traits: ['Praktis', 'Mekanis', 'Outdoor', 'Hands-on'],
    skills: [
      'Mengoperasikan alat & mesin',
      'Merancang & membangun',
      'Bekerja secara manual & detail',
      'Memperbaiki & merawat',
    ],
    careers: [
      { title: 'Engineer', match: 95 },
      { title: 'IT Support / SRE', match: 88 },
      { title: 'Teknisi', match: 92 },
      { title: 'Arsitek', match: 85 },
      { title: 'Mekanik', match: 90 },
      { title: 'Pilot / Operator', match: 82 },
    ],
    mascot: '🦊',
    worldOfWork: 'Things',
  },
  I: {
    code: 'I',
    name: 'Investigative',
    nameId: 'Pemikir / Analitis',
    emoji: '🔬',
    color: '#4ECDC4',
    gradient: 'from-teal-400 to-cyan-400',
    description:
      'Suka mengamati, belajar, mengevaluasi, dan memecahkan masalah matematika atau sains.',
    traits: ['Analitis', 'Logis', 'Peneliti', 'Kuriositas'],
    skills: [
      'Berpikir analitis & logis',
      'Menghitung & merumuskan',
      'Bereksperimen & menyelidiki',
      'Mendiagnosis masalah',
    ],
    careers: [
      { title: 'Software Developer', match: 94 },
      { title: 'Data Scientist', match: 96 },
      { title: 'Peneliti', match: 93 },
      { title: 'Analis Sistem', match: 90 },
      { title: 'Dokter / Ahli Medis', match: 88 },
      { title: 'Ilmuwan', match: 95 },
    ],
    mascot: '🦉',
    worldOfWork: 'Ideas',
  },
  A: {
    code: 'A',
    name: 'Artistic',
    nameId: 'Kreatif / Ekspresif',
    emoji: '🎨',
    color: '#A78BFA',
    gradient: 'from-violet-400 to-purple-400',
    description:
      'Suka bekerja dalam situasi tidak terstruktur menggunakan imajinasi dan kreativitas.',
    traits: ['Kreatif', 'Ekspresif', 'Imajinatif', 'Bebas'],
    skills: [
      'Mengekspresikan secara artistik',
      'Merancang & menyajikan',
      'Menulis, menyanyi, menari',
      'Berpikir out-of-the-box',
    ],
    careers: [
      { title: 'UI/UX Designer', match: 95 },
      { title: 'Content Creator', match: 92 },
      { title: 'Graphic Designer', match: 94 },
      { title: 'Produser Musik / Musisi', match: 88 },
      { title: 'Ilustrator / Animator', match: 91 },
      { title: 'Penulis / Editor', match: 86 },
    ],
    mascot: '🐱',
    worldOfWork: 'Ideas',
  },
  S: {
    code: 'S',
    name: 'Social',
    nameId: 'Penolong / Edukator',
    emoji: '💚',
    color: '#34D399',
    gradient: 'from-emerald-400 to-green-400',
    description:
      'Suka mengajar, membantu, menyembuhkan, atau mengembangkan orang lain.',
    traits: ['Empati', 'Mengajar', 'Membantu', 'Komunikatif'],
    skills: [
      'Berkomunikasi secara lisan/tertulis',
      'Mendukung & melatih',
      'Mengajar & memberi informasi',
      'Peduli terhadap kesejahteraan orang',
    ],
    careers: [
      { title: 'Guru / Dosen', match: 94 },
      { title: 'HRD / People Ops', match: 90 },
      { title: 'Customer Success', match: 88 },
      { title: 'Konsultan', match: 87 },
      { title: 'Perawat / Psikolog', match: 92 },
      { title: 'Social Worker', match: 89 },
    ],
    mascot: '🐰',
    worldOfWork: 'People',
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    nameId: 'Persuasif / Pemimpin',
    emoji: '🚀',
    color: '#FBBF24',
    gradient: 'from-amber-400 to-yellow-400',
    description:
      'Suka memengaruhi, memimpin, atau mengelola orang untuk tujuan organisasi.',
    traits: ['Pemimpin', 'Persuasif', 'Ambisius', 'Visioner'],
    skills: [
      'Menjual & mempromosikan',
      'Berbicara di depan umum',
      'Mengelola & memimpin',
      'Mengembangkan ide bisnis',
    ],
    careers: [
      { title: 'Entrepreneur', match: 96 },
      { title: 'Project Manager', match: 91 },
      { title: 'Sales / Marketing', match: 93 },
      { title: 'Product Manager', match: 90 },
      { title: 'Business Development', match: 88 },
      { title: 'CEO / Founder', match: 85 },
    ],
    mascot: '🦁',
    worldOfWork: 'People',
  },
  C: {
    code: 'C',
    name: 'Conventional',
    nameId: 'Terstruktur / Pengorganisasi',
    emoji: '📊',
    color: '#60A5FA',
    gradient: 'from-blue-400 to-indigo-400',
    description:
      'Suka bekerja dengan data, berkas, keteraturan, dan instruksi yang jelas.',
    traits: ['Terorganisir', 'Detail', 'Sistematis', 'Akurat'],
    skills: [
      'Komputasi & pencatatan data',
      'Memperhatikan detail',
      'Mengatur & merencanakan',
      'Mengikuti prosedur & standar',
    ],
    careers: [
      { title: 'Administrator', match: 90 },
      { title: 'Akuntan', match: 94 },
      { title: 'Database Administrator', match: 92 },
      { title: 'Quality Assurance (QA)', match: 91 },
      { title: 'Sekretaris / Office Manager', match: 87 },
      { title: 'Auditor', match: 89 },
    ],
    mascot: '🐻',
    worldOfWork: 'Data',
  },
};

const QUESTIONS = [
  // Realistic (R) - Wistarini 2023 + Holland SDS
  { id: 'r1', type: 'R', text: 'Aku suka bekerja dengan tangan, membuat atau memperbaiki sesuatu 🔨', icon: '🔨' },
  { id: 'r2', type: 'R', text: 'Aku nyaman bekerja di luar ruangan dengan alat dan mesin 🌿', icon: '🌿' },
  { id: 'r3', type: 'R', text: 'Aku senang merakit, membangun, atau mengoperasikan peralatan ⚙️', icon: '⚙️' },
  { id: 'r4', type: 'R', text: 'Aku lebih suka tugas praktis daripada teori panjang 🛠️', icon: '🛠️' },
  { id: 'r5', type: 'R', text: 'Aku tertarik pada pekerjaan teknis seperti engineering atau teknisi 🔩', icon: '🔩' },

  // Investigative (I)
  { id: 'i1', type: 'I', text: 'Aku suka menemukan dan meneliti ide-ide baru 💡', icon: '💡' },
  { id: 'i2', type: 'I', text: 'Aku senang mengamati, bereksperimen, dan memecahkan masalah 🧪', icon: '🧪' },
  { id: 'i3', type: 'I', text: 'Aku tertarik pada sains, matematika, atau analisis data 📐', icon: '📐' },
  { id: 'i4', type: 'I', text: 'Aku suka menyelidiki dan mengajukan pertanyaan mendalam 🔍', icon: '🔍' },
  { id: 'i5', type: 'I', text: 'Aku menikmati belajar hal-hal kompleks dan rumit 📚', icon: '📚' },

  // Artistic (A)
  { id: 'a1', type: 'A', text: 'Aku suka mengekspresikan diri lewat seni, musik, atau drama 🎭', icon: '🎭' },
  { id: 'a2', type: 'A', text: 'Aku kreatif dan suka merancang sesuatu yang orisinal ✨', icon: '✨' },
  { id: 'a3', type: 'A', text: 'Aku nyaman bekerja tanpa aturan kaku — bebas berimajinasi 🌈', icon: '🌈' },
  { id: 'a4', type: 'A', text: 'Aku senang menulis, menggambar, atau membuat konten 🖌️', icon: '🖌️' },
  { id: 'a5', type: 'A', text: 'Aku lebih suka pekerjaan yang membutuhkan kreativitas & estetika 🎵', icon: '🎵' },

  // Social (S)
  { id: 's1', type: 'S', text: 'Aku suka mengajar, melatih, dan membantu orang lain 👥', icon: '👥' },
  { id: 's2', type: 'S', text: 'Aku peduli pada kesejahteraan dan perasaan orang di sekitarku 💝', icon: '💝' },
  { id: 's3', type: 'S', text: 'Aku senang berkomunikasi dan memberi informasi yang berguna 📢', icon: '📢' },
  { id: 's4', type: 'S', text: 'Aku merasa puas saat bisa menyembuhkan atau mendukung orang 🏥', icon: '🏥' },
  { id: 's5', type: 'S', text: 'Aku lebih suka bekerja dalam tim daripada sendirian 🤝', icon: '🤝' },

  // Enterprising (E)
  { id: 'e1', type: 'E', text: 'Aku suka memimpin, memengaruhi, dan meyakinkan orang lain 👑', icon: '👑' },
  { id: 'e2', type: 'E', text: 'Aku tertarik pada bisnis, penjualan, dan keuntungan ekonomi 💰', icon: '💰' },
  { id: 'e3', type: 'E', text: 'Aku senang berbicara di depan umum dan mempromosikan ide 📣', icon: '📣' },
  { id: 'e4', type: 'E', text: 'Aku suka mengambil risiko dan membangun sesuatu dari nol 🌟', icon: '🌟' },
  { id: 'e5', type: 'E', text: 'Aku ingin mengelola orang dan proyek untuk mencapai tujuan 🎯', icon: '🎯' },

  // Conventional (C)
  { id: 'c1', type: 'C', text: 'Aku suka bekerja dengan data, angka, dan berkas terorganisir 📁', icon: '📁' },
  { id: 'c2', type: 'C', text: 'Aku nyaman mengikuti prosedur dan instruksi yang jelas 📋', icon: '📋' },
  { id: 'c3', type: 'C', text: 'Aku teliti dalam pencatatan dan memperhatikan detail kecil 🔎', icon: '🔎' },
  { id: 'c4', type: 'C', text: 'Aku senang merencanakan acara dan mengatur jadwal 📅', icon: '📅' },
  { id: 'c5', type: 'C', text: 'Aku lebih suka pekerjaan kantor yang terstruktur dan stabil 🏢', icon: '🏢' },
];

const SURVEYS = [
  {
    id: 'riasec-career',
    slug: 'riasec-career',
    title: 'Pekerjaan Apa yang Cocok untuk Kamu?',
    subtitle: 'Temukan karier impian berdasarkan kepribadian RIASEC',
    description:
      'Survey berbasis Holland Codes (RIASEC Theory) yang memetakan minat, sifat, dan kebiasaanmu ke 6 tipe kepribadian kerja. Hasilnya berupa kode Holland unik + rekomendasi pekerjaan!',
    icon: '🎯',
    color: 'from-pink-400 via-purple-400 to-indigo-400',
    questionCount: QUESTIONS.length,
    estimatedMinutes: 5,
    tags: ['Karier', 'RIASEC', 'Holland Code', 'Gratis'],
    active: true,
    featured: true,
    references: [
      'Holland, J.L. (1997). Making Vocational Choices',
      'Zainudin et al. (2024). RIASEC in Educational Settings',
      'Wistarini & Syarifah (2023). Holland RIASEC Model',
      'Wei (2024). RIASEC Theory in Higher Education',
    ],
    detail: {
      about:
        'Survey ini membantu kamu menemukan pekerjaan yang selaras dengan kepribadian, minat, kebiasaan, dan keinginanmu — berdasarkan Holland Codes (RIASEC Theory).',
      theory: {
        title: 'Apa itu RIASEC?',
        content:
          'RIASEC adalah model teori karier dari John L. Holland (1997) yang membagi kepribadian dan lingkungan kerja ke dalam 6 tipe: Realistic, Investigative, Artistic, Social, Enterprising, dan Conventional. Semakin tinggi kesesuaian (congruence) antara minatmu dan lingkungan kerja, semakin besar kepuasan dan prestasi karirmu.',
      },
      howItWorks: [
        { step: '01', title: 'Jawab 30 Pertanyaan', desc: 'Pertanyaan tentang sifat, kebiasaan, minat, dan preferensi kerjamu.' },
        { step: '02', title: 'Analisis 6 Dimensi', desc: 'Jawabanmu dipetakan ke 6 tipe RIASEC dan dinilai per dimensi.' },
        { step: '03', title: 'Dapat Holland Code', desc: 'Kode 3 huruf dari tipe dominanmu, misalnya ISA atau REC.' },
        { step: '04', title: 'Rekomendasi Karier', desc: 'Daftar pekerjaan yang cocok berdasarkan kombinasi tipologimu.' },
      ],
      methodology: {
        title: 'Cara Penilaian',
        items: [
          'Skala Likert 1–5 per pertanyaan (5 pertanyaan per tipe RIASEC)',
          'Skor dinormalisasi 0–100% per dimensi',
          'Holland Code = 3 tipe dengan skor tertinggi',
          'Tipe dominan jika skor ≥ 67% (adaptasi dari Wei et al., 2024)',
        ],
      },
      results: {
        title: 'Apa yang Kamu Dapatkan?',
        items: [
          'Kode Holland unik (misal: SF-A3K9P2)',
          'QR code & link shareable dengan thumbnail',
          'Peta skor 6 dimensi RIASEC',
          'Rekomendasi 8 pekerjaan teratas',
        ],
      },
    },
  },
];

const HEXAGON_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];

const ADJACENCY = {
  R: ['I', 'C'],
  I: ['R', 'A'],
  A: ['I', 'S'],
  S: ['A', 'E'],
  E: ['S', 'C'],
  C: ['E', 'R'],
};

function calculateScores(answers) {
  const raw = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (val >= 1 && val <= 5) {
      raw[q.type] += val;
      counts[q.type]++;
    }
  }

  const scores = {};
  for (const type of HEXAGON_ORDER) {
    const max = counts[type] * 5;
    scores[type] = max > 0 ? Math.round((raw[type] / max) * 100) : 0;
  }

  const sorted = HEXAGON_ORDER
    .map((t) => ({ type: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score);

  const hollandCode = sorted.slice(0, 3).map((s) => s.type).join('');
  const primary = sorted[0];
  const secondary = sorted[1];
  const tertiary = sorted[2];

  const strongTraits = sorted.filter((s) => s.score >= 60).map((s) => s.type);
  const threshold = 0.67;
  const dominantTypes = sorted
    .filter((s) => s.score / 100 >= threshold)
    .map((s) => s.type);

  const recommendedCareers = getRecommendedCareers(sorted);

  return {
    scores,
    raw,
    hollandCode,
    primary,
    secondary,
    tertiary,
    strongTraits,
    dominantTypes,
    recommendedCareers,
    sorted,
  };
}

function getRecommendedCareers(sorted) {
  const careerMap = new Map();

  for (const { type, score } of sorted) {
    const careers = RIASEC_TYPES[type].careers;
    for (const career of careers) {
      const weight = score / 100;
      const adjustedMatch = Math.round(career.match * weight);
      const existing = careerMap.get(career.title);
      if (!existing || existing.match < adjustedMatch) {
        careerMap.set(career.title, {
          ...career,
          match: adjustedMatch,
          primaryType: type,
          typeInfo: RIASEC_TYPES[type],
        });
      }
    }
  }

  return Array.from(careerMap.values())
    .sort((a, b) => b.match - a.match)
    .slice(0, 8);
}

function getCongruenceDescription(hollandCode) {
  const types = hollandCode.split('');
  const names = types.map((t) => RIASEC_TYPES[t]?.nameId).join(' · ');
  return `Kode Holland kamu "${hollandCode}" menunjukkan kombinasi ${names}. Semakin tinggi kesesuaian minat dengan lingkungan kerja, semakin besar kepuasan dan prestasi (Holland, 1997; Wistarini & Syarifah, 2023).`;
}

module.exports = {
  RIASEC_TYPES,
  QUESTIONS,
  SURVEYS,
  HEXAGON_ORDER,
  ADJACENCY,
  calculateScores,
  getCongruenceDescription,
};
