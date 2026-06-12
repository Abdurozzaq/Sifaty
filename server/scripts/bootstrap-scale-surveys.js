/**
 * Bootstrap 10 scale survey folders.
 * Run: node server/scripts/bootstrap-scale-surveys.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'surveys');

const INDEX_SRC = `const { createScaleSurveyModule } = require('../_shared/likert-helper');
const config = require('./survey');
const PUSTAKA = require('./pustaka');

module.exports = createScaleSurveyModule({ ...config, pustaka: PUSTAKA });
`;

function buildSurvey(cfg) {
  const refs = cfg.pustaka.map((p) => {
    const short = p.authors.split(',')[0];
    const title = p.title.split(':')[0];
    return `${short} (${p.year}). ${title}`;
  });

  const meta = {
    id: cfg.slug,
    slug: cfg.slug,
    ...cfg.meta,
    questionCount: cfg.questions.length,
    estimatedMinutes: 3,
    active: true,
    references: refs,
    detail: {
      about: cfg.meta.description,
      theory: { title: 'Dasar Teori', content: cfg.meta.description },
      howItWorks: [
        { step: '01', title: 'Jawab 12 Pertanyaan', desc: 'Skala Likert 1–5 tentang pengalamanmu.' },
        { step: '02', title: 'Analisis Dimensi', desc: 'Skor per dimensi dinormalisasi 0–100%.' },
        { step: '03', title: 'Indeks & Profil', desc: `${cfg.indexLabel} + kode dimensi.` },
        { step: '04', title: 'Share Hasil', desc: 'Bagikan lewat link, QR, atau kode SF-XXXXXX.' },
      ],
      methodology: {
        title: 'Cara Penilaian',
        items: ['Likert 1–5', '4 item per dimensi', 'Indeks = rata-rata dimensi', 'Kode = 3 dimensi tertinggi'],
      },
      results: {
        title: 'Apa yang Kamu Dapatkan?',
        items: ['Indeks + level profil', 'Peta dimensi', 'Penjelasan dominan', 'Share link & QR'],
      },
    },
  };

  return `const LEVELS = ${JSON.stringify(cfg.levels, null, 2)};

const TYPES = ${JSON.stringify(cfg.types, null, 2)};

const QUESTIONS = ${JSON.stringify(cfg.questions, null, 2)};

const DIMENSION_ORDER = ${JSON.stringify(cfg.dimensionOrder)};

const SURVEY_META = ${JSON.stringify(meta, null, 2)};

function getProfile(scoring) {
  return scoring.level;
}

function getSummary(scoring, typeInfo) {
  return ${JSON.stringify(cfg.summaryText)};
}

module.exports = {
  slug: ${JSON.stringify(cfg.slug)},
  meta: SURVEY_META,
  questions: QUESTIONS,
  types: TYPES,
  dimensionOrder: DIMENSION_ORDER,
  levels: LEVELS,
  surveyType: ${JSON.stringify(cfg.surveyType)},
  indexLabel: ${JSON.stringify(cfg.indexLabel)},
  indexLabelShort: ${JSON.stringify(cfg.indexLabelShort || cfg.indexLabel)},
  invertDimensions: ${JSON.stringify(cfg.invertDimensions || [])},
  getProfile,
  getSummary,
};
`;
}

const SURVEYS = [
  {
    slug: 'student-burnout',
    surveyType: 'burnm',
    indexLabel: 'Indeks Burnout Kuliah',
    indexLabelShort: 'Burnout Kuliah',
    invertDimensions: ['A'],
    dimensionOrder: ['E', 'C', 'A'],
    summaryText: 'Indeks burnout kuliah {indexScore}% ({levelName}). Dimensi dominan: {typeName} — {typeStyle} (Schaufeli et al., 2002).',
    meta: {
      title: 'Seberapa Burnout Kuliahmu?',
      subtitle: 'Ukur kelelahan akademik, sinisme, & efikasi di era kuliah',
      description: 'Survey berbasis MBI-Student Survey (Schaufeli et al., 2002) — memetakan burnout kuliah: exhaustion, cynicism, & academic efficacy.',
      icon: '📚',
      color: 'from-orange-500 via-red-500 to-rose-500',
      audience: 'mahasiswa',
      tags: ['Burnout', 'MBI-SS', 'Gratis'],
      featured: false,
    },
    types: {
      E: { code: 'E', name: 'Exhaustion', nameId: 'Kelelahan', emoji: '😩', color: '#EF4444', description: 'Kelelahan fisik & emosional akibat beban akademik.', style: 'Rasa lelah kronis meski sudah istirahat.' },
      C: { code: 'C', name: 'Cynicism', nameId: 'Sinisme', emoji: '😒', color: '#F97316', description: 'Sikap apatis terhadap perkuliahan.', style: 'Meragukan makna kuliah — motivasi menurun.' },
      A: { code: 'A', name: 'Efficacy', nameId: 'Efikasi Akademik', emoji: '💪', color: '#10B981', description: 'Keyakinan diri akademik (skor rendah = burnout tinggi).', style: 'Merasa tidak kompeten menyelesaikan tugas.' },
    },
    questions: [
      { id: 'e1', type: 'E', text: 'Aku merasa lelah meski cuma duduk di kelas atau buka laptop' },
      { id: 'e2', type: 'E', text: 'Beban SKS, tugas, & deadline bikin tubuhku terasa drained' },
      { id: 'e3', type: 'E', text: 'Aku sulit bangun semangat untuk kuliah atau mengerjakan PR' },
      { id: 'e4', type: 'E', text: 'Setiap hari kuliah terasa melelahkan secara emosional' },
      { id: 'c1', type: 'C', text: 'Aku merasa apatis terhadap materi kuliah yang diajarkan' },
      { id: 'c2', type: 'C', text: 'Aku sering meragukan apakah kuliahku berguna untuk masa depan' },
      { id: 'c3', type: 'C', text: 'Aku merasa sinis terhadap sistem perkuliahan di kampus' },
      { id: 'c4', type: 'C', text: 'Motivasiku untuk belajar menurun drastis dibanding semester lalu' },
      { id: 'a1', type: 'A', text: 'Aku yakin bisa menyelesaikan tugas kuliah dengan baik' },
      { id: 'a2', type: 'A', text: 'Aku merasa kompeten menghadapi ujian & presentasi' },
      { id: 'a3', type: 'A', text: 'Aku percaya bisa capai target IPK yang aku inginkan' },
      { id: 'a4', type: 'A', text: 'Aku merasa mampu mengelola beban akademikku' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Sehat Akademik', emoji: '🌿', desc: 'Beban kuliah masih manageable.' },
      { min: 31, max: 45, name: 'Mulai Terasa', emoji: '😐', desc: 'Ada tanda kelelahan — perhatikan istirahat.' },
      { min: 46, max: 60, name: 'Burnout Sedang', emoji: '😓', desc: 'Burnout mulai signifikan.' },
      { min: 61, max: 75, name: 'Burnout Tinggi', emoji: '🔥', desc: 'Kelelahan & sinisme dominan.' },
      { min: 76, max: 100, name: 'Burnout Parah', emoji: '💀', desc: 'Level burnout sangat tinggi — cari bantuan.' },
    ],
    pustaka: [
      { id: 'schaufeli-2002-mbiss', authors: 'Schaufeli, W. B., et al.', year: 2002, title: 'Burnout and Engagement in University Students', journal: 'Journal of Cross-Cultural Psychology', volume: '33(5)', doi: '10.1177/0022022102033005003', type: 'Jurnal', relevance: 'MBI-Student Survey — exhaustion, cynicism, academic efficacy.' },
      { id: 'maslach-1981', authors: 'Maslach, C., & Jackson, S. E.', year: 1981, title: 'The Measurement of Experienced Burnout', journal: 'Journal of Occupational Behaviour', volume: '2(2)', type: 'Jurnal', relevance: 'Teori dasar burnout tiga dimensi.' },
      { id: 'salmela-2009', authors: 'Salmela-Aro, K., & Read, S.', year: 2009, title: 'School Burnout Inventory (SBI)', journal: 'European Journal of Psychological Assessment', volume: '25(2)', type: 'Jurnal', relevance: 'Burnout di setting pendidikan formal.' },
      { id: 'reis-2015', authors: 'Reis, D., et al.', year: 2015, title: 'Measuring Job and Academic Burnout', journal: 'Burnout Research', volume: '2(1)', type: 'Jurnal', relevance: 'Validitas instrumen burnout akademik.' },
      { id: 'walburg-2015', authors: 'Walburg, V., & Rohmer, O.', year: 2015, title: 'Burnout among High School Students', journal: 'School Psychology International', volume: '36(6)', type: 'Jurnal', relevance: 'Burnout multidimensi di kalangan pelajar.' },
    ],
  },
  {
    slug: 'student-fomo',
    surveyType: 'fomo',
    indexLabel: 'Indeks FOMO',
    indexLabelShort: 'FOMO',
    dimensionOrder: ['F', 'S', 'D'],
    summaryText: 'Indeks FOMO {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Przybylski et al., 2013).',
    meta: {
      title: 'Seberapa FOMO Kamu?',
      subtitle: 'Fear of missing out & distraksi digital di kampus',
      description: 'Survey berbasis FoMO Scale (Przybylski et al., 2013).',
      icon: '📱',
      color: 'from-pink-500 via-purple-500 to-indigo-500',
      audience: 'mahasiswa',
      tags: ['FOMO', 'Media Sosial', 'Gratis'],
    },
    types: {
      F: { code: 'F', name: 'FoMO Core', nameId: 'Takut Ketinggalan', emoji: '😰', color: '#EC4899', description: 'Kecemasan ketinggalan event sosial.', style: 'Takut tidak diajak atau ketinggalan momen.' },
      S: { code: 'S', name: 'Social Comparison', nameId: 'Perbandingan Sosial', emoji: '👀', color: '#8B5CF6', description: 'Membandingkan hidup dengan highlight media sosial.', style: 'Scroll feed bikin insecure.' },
      D: { code: 'D', name: 'Digital Distraction', nameId: 'Distraksi Digital', emoji: '📲', color: '#6366F1', description: 'Kesulitan fokus karena HP & notifikasi.', style: 'Sulit lepas dari TikTok/Reels saat belajar.' },
    },
    questions: [
      { id: 'f1', type: 'F', text: 'Aku cemas kalau tidak cek HP takut ketinggalan info penting' },
      { id: 'f2', type: 'F', text: 'Aku sedih kalau lihat teman hangout tanpa aku di story' },
      { id: 'f3', type: 'F', text: 'Aku takut ketinggalan trend atau event yang lagi rame' },
      { id: 'f4', type: 'F', text: 'Aku sering overcommit ke acara karena takut FOMO' },
      { id: 's1', type: 'S', text: 'Aku membandingkan prestasi kuliahku dengan teman seangkatan' },
      { id: 's2', type: 'S', text: 'Lihat LinkedIn/portfolio orang seumurku bikin aku merasa tertinggal' },
      { id: 's3', type: 'S', text: 'Aku merasa harus punya life yang instagrammable' },
      { id: 's4', type: 'S', text: 'Aku sering merasa tidak cukup baik setelah scroll media sosial' },
      { id: 'd1', type: 'D', text: 'Aku sulit fokus belajar tanpa cek notifikasi HP' },
      { id: 'd2', type: 'D', text: 'Aku buka TikTok/Reels sebentar tapi berjam-jam' },
      { id: 'd3', type: 'D', text: 'Aku gelisah kalau HP tidak ada di dekatku' },
      { id: 'd4', type: 'D', text: 'Aku belajar sambil scroll — multitasking digital jadi kebiasaan' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Tenang Digital', emoji: '🧘', desc: 'Relatif bebas dari FOMO.' },
      { min: 31, max: 45, name: 'Kadang FOMO', emoji: '🙂', desc: 'Sesekali merasa ketinggalan.' },
      { min: 46, max: 60, name: 'FOMO Sedang', emoji: '😬', desc: 'FOMO mulai memengaruhi fokus.' },
      { min: 61, max: 75, name: 'FOMO Tinggi', emoji: '😰', desc: 'Kecemasan ketinggalan dominan.' },
      { min: 76, max: 100, name: 'FOMO Ekstrem', emoji: '🌪️', desc: 'FOMO sangat tinggi — pertimbangkan digital detox.' },
    ],
    pustaka: [
      { id: 'przybylski-2013', authors: 'Przybylski, A. K., et al.', year: 2013, title: 'Motivational, Emotional, and Behavioral Correlates of Fear of Missing Out', journal: 'Computers in Human Behavior', volume: '29(4)', doi: '10.1016/j.chb.2013.02.014', type: 'Jurnal', relevance: 'FoMO Scale asli — validasi psikometrik.' },
      { id: 'oberst-2017', authors: 'Oberst, U., et al.', year: 2017, title: 'Negative Consequences from Heavy Social Networking Use', journal: 'Cyberpsychology, Behavior, and Social Networking', volume: '20(6)', type: 'Jurnal', relevance: 'FoMO & problematic social media use.' },
      { id: 'elhai-2020', authors: 'Elhai, J. D., et al.', year: 2020, title: 'Fear of Missing Out, Anxiety and Depression', journal: 'Journal of Social and Clinical Psychology', volume: '39(5)', type: 'Jurnal', relevance: 'FoMO prediktor anxiety & depression.' },
      { id: 'alt-2018', authors: 'Alt, D.', year: 2018, title: 'Students Wellbeing, FoMO, and Social Media', journal: 'Journal of Further and Higher Education', volume: '42(4)', type: 'Jurnal', relevance: 'FoMO & wellbeing mahasiswa.' },
      { id: 'gupta-2021', authors: 'Gupta, M., & Sharma, A.', year: 2021, title: 'Fear of Missing Out in the Social Media Context', journal: 'International Journal of Human-Computer Interaction', volume: '37(4)', type: 'Jurnal', relevance: 'Review FoMO di era social media.' },
    ],
  },
  {
    slug: 'student-procrastination',
    surveyType: 'proc',
    indexLabel: 'Indeks Procrastination',
    indexLabelShort: 'Procrastination',
    dimensionOrder: ['D', 'A', 'P'],
    summaryText: 'Indeks procrastination {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Lay, 1986; Steel, 2007).',
    meta: {
      title: 'Seberapa Suka Menunda?',
      subtitle: 'Ukur kebiasaan menunda tugas & deadline kuliah',
      description: 'Survey berbasis General Procrastination Scale (Lay, 1986) — delay, avoidance, poor planning.',
      icon: '⏰',
      color: 'from-amber-500 via-orange-500 to-red-500',
      audience: 'mahasiswa',
      tags: ['Procrastination', 'GPS', 'Gratis'],
    },
    types: {
      D: { code: 'D', name: 'Delay', nameId: 'Penundaan', emoji: '🐢', color: '#F59E0B', description: 'Menunda tugas meski tahu konsekuensinya.', style: 'Deadline besok, mulai malam ini.' },
      A: { code: 'A', name: 'Avoidance', nameId: 'Penghindaran', emoji: '🙈', color: '#EF4444', description: 'Menghindari tugas yang sulit atau membosankan.', style: 'Buka HP dulu daripada buka modul.' },
      P: { code: 'P', name: 'Poor Planning', nameId: 'Perencanaan Buruk', emoji: '📋', color: '#8B5CF6', description: 'Kurang merencanakan waktu & prioritas.', style: 'Tidak punya timeline — semua dikerjakan last minute.' },
    },
    questions: [
      { id: 'd1', type: 'D', text: 'Aku menunda mengerjakan tugas meski deadline sudah dekat' },
      { id: 'd2', type: 'D', text: 'Aku bilang "besok aja" padahal bisa dikerjakan hari ini' },
      { id: 'd3', type: 'D', text: 'Aku baru mulai skripsi/tugas besar saat waktu sudah sempit' },
      { id: 'd4', type: 'D', text: 'Aku sering submit tepat deadline karena menunda' },
      { id: 'a1', type: 'A', text: 'Aku menghindari tugas yang sulit atau membosankan' },
      { id: 'a2', type: 'A', text: 'Aku cari aktivitas lain saat ada tugas penting' },
      { id: 'a3', type: 'A', text: 'Aku merasa anxious tapi tetap tidak mulai mengerjakan' },
      { id: 'a4', type: 'A', text: 'Aku menunda karena takut hasilnya tidak sempurna' },
      { id: 'p1', type: 'P', text: 'Aku jarang buat jadwal atau to-do list untuk kuliah' },
      { id: 'p2', type: 'P', text: 'Aku tidak perkirakan berapa lama tugas akan selesai' },
      { id: 'p3', type: 'P', text: 'Aku campur aduk prioritas — yang urgent vs penting' },
      { id: 'p4', type: 'P', text: 'Aku kewalahan karena tidak merencanakan dari awal' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Disiplin', emoji: '✅', desc: 'Kamu jarang menunda — keep it up!' },
      { min: 31, max: 45, name: 'Kadang Menunda', emoji: '🙂', desc: 'Sesekali procrastinate — masih wajar.' },
      { min: 46, max: 60, name: 'Sering Menunda', emoji: '😅', desc: 'Procrastination mulai mengganggu produktivitas.' },
      { min: 61, max: 75, name: 'Chronic Procrastinator', emoji: '😰', desc: 'Menunda sudah jadi pola — butuh strategi.' },
      { min: 76, max: 100, name: 'Master Procrastinator', emoji: '💀', desc: 'Procrastination parah — pertimbangkan time management coaching.' },
    ],
    pustaka: [
      { id: 'lay-1986', authors: 'Lay, C. H.', year: 1986, title: 'At Last, My Research Article on Procrastination', journal: 'Journal of Research in Personality', volume: '20(4)', type: 'Jurnal', relevance: 'General Procrastination Scale (GPS) — instrumen klasik.' },
      { id: 'steel-2007', authors: 'Steel, P.', year: 2007, title: 'The Nature of Procrastination: A Meta-Analytic and Theoretical Review', journal: 'Psychological Bulletin', volume: '133(1)', doi: '10.1037/0033-2909.133.1.65', type: 'Jurnal', relevance: 'Meta-analysis procrastination — prediktor & intervensi.' },
      { id: 'tuckman-1991', authors: 'Tuckman, B. W.', year: 1991, title: 'The Development and Concurrent Validity of the Procrastination Scale', journal: 'Educational and Psychological Measurement', volume: '51(2)', type: 'Jurnal', relevance: 'Procrastination Scale untuk setting akademik.' },
      { id: 'solomon-1984', authors: 'Solomon, L. J., & Rothblum, E. D.', year: 1984, title: 'Academic Procrastination: Frequency and Cognitive-Behavioral Correlates', journal: 'Journal of Counseling Psychology', volume: '31(4)', type: 'Jurnal', relevance: 'Academic procrastination — frekuensi & korelasi kognitif.' },
      { id: 'svrcek-2016', authors: 'Svrcek, I., & Brkic, M.', year: 2016, title: 'Procrastination in College Students', journal: 'Review of Psychology', volume: '23(1-2)', type: 'Jurnal', relevance: 'Procrastination di kalangan mahasiswa perguruan tinggi.' },
    ],
  },
  {
    slug: 'student-imposter',
    surveyType: 'imps',
    indexLabel: 'Indeks Imposter',
    indexLabelShort: 'Imposter',
    dimensionOrder: ['S', 'L', 'E'],
    summaryText: 'Indeks imposter {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Clance, 1985).',
    meta: {
      title: 'Seberapa Imposter Kamu?',
      subtitle: 'Ukur imposter syndrome di kampus & kompetisi',
      description: 'Survey berbasis Clance Imposter Phenomenon Scale (1985) — self-doubt, luck attribution, fear of exposure.',
      icon: '🎭',
      color: 'from-violet-500 via-purple-500 to-fuchsia-500',
      audience: 'mahasiswa',
      tags: ['Imposter Syndrome', 'Clance IP', 'Gratis'],
    },
    types: {
      S: { code: 'S', name: 'Self-Doubt', nameId: 'Keraguan Diri', emoji: '🤔', color: '#8B5CF6', description: 'Merasa tidak sekompeten yang orang kira.', style: 'Meragukan kemampuan sendiri meski dapat nilai bagus.' },
      L: { code: 'L', name: 'Luck Attribution', nameId: 'Atribusi Keberuntungan', emoji: '🍀', color: '#10B981', description: 'Menganggap sukses karena keberuntungan, bukan skill.', style: 'IPK bagus? Mustahil kebetulan atau dosen baik.' },
      E: { code: 'E', name: 'Fear of Exposure', nameId: 'Takut Ketahuan', emoji: '😨', color: '#EF4444', description: 'Takut orang tahu kamu sebenarnya tidak pintar.', style: 'Takut "ketauan" saat presentasi atau wawancara magang.' },
    },
    questions: [
      { id: 's1', type: 'S', text: 'Aku merasa tidak sepintar teman seangkatanku' },
      { id: 's2', type: 'S', text: 'Aku meragukan apakah pantas diterima di jurusan/kampus ini' },
      { id: 's3', type: 'S', text: 'Aku merasa harus kerja extra hard agar terlihat kompeten' },
      { id: 's4', type: 'S', text: 'Aku sering merasa seperti penipu di lingkungan akademik' },
      { id: 'l1', type: 'L', text: 'Prestasi akademikku lebih karena keberuntungan daripada ability' },
      { id: 'l2', type: 'L', text: 'Kalau dapat nilai A, aku pikir soalnya kebetulan mudah' },
      { id: 'l3', type: 'L', text: 'Aku merasa dosen/teman terlalu overestimate kemampuanku' },
      { id: 'l4', type: 'L', text: 'Sukses lomba/beasiswa aku atribusikan ke faktor eksternal' },
      { id: 'e1', type: 'E', text: 'Aku takut suatu hari ketahuan tidak sekompeten yang dipikir orang' },
      { id: 'e2', type: 'E', text: 'Aku khawatir gagal saat presentasi atau sidang' },
      { id: 'e3', type: 'E', text: 'Aku takut ditanya pertanyaan yang tidak bisa aku jawab' },
      { id: 'e4', type: 'E', text: 'Aku merasa harus menyembunyikan keraguan diri dari orang lain' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Confident', emoji: '💪', desc: 'Kamu percaya diri dengan kompetensimu.' },
      { min: 31, max: 45, name: 'Kadang Ragukan', emoji: '🙂', desc: 'Sesekali imposter feelings — normal.' },
      { min: 46, max: 60, name: 'Imposter Sedang', emoji: '😬', desc: 'Self-doubt mulai memengaruhi kepercayaan diri.' },
      { min: 61, max: 75, name: 'Imposter Tinggi', emoji: '😰', desc: 'Imposter syndrome signifikan.' },
      { min: 76, max: 100, name: 'Imposter Parah', emoji: '🎭', desc: 'Imposter feelings sangat dominan — cari support.' },
    ],
    pustaka: [
      { id: 'clance-1978', authors: 'Clance, P. R., & Imes, S. A.', year: 1978, title: 'The Imposter Phenomenon in High Achieving Women', journal: 'Psychotherapy: Theory, Research & Practice', volume: '15(3)', type: 'Jurnal', relevance: 'Teori pionir imposter phenomenon.' },
      { id: 'clance-1985', authors: 'Clance, P. R.', year: 1985, title: 'The Impostor Phenomenon: Overcoming the Fear That Haunts Your Success', journal: 'Peachtree Publishers', type: 'Buku', relevance: 'Clance IP Scale — instrumen pengukuran imposter.' },
      { id: 'sakulku-2011', authors: 'Sakulku, M., & Alexander, J.', year: 2011, title: 'The Imposter Phenomenon', journal: 'International Journal of Behavioral Science', volume: '6(1)', type: 'Jurnal', relevance: 'Review imposter phenomenon — prevalensi & intervensi.' },
      { id: 'bravata-2020', authors: 'Bravata, D. M., et al.', year: 2020, title: 'Prevalence, Predictors, and Treatment of Impostor Syndrome', journal: 'Journal of General Internal Medicine', volume: '35(4)', type: 'Jurnal', relevance: 'Systematic review imposter syndrome.' },
      { id: 'verma-2022', authors: 'Verma, S., & Jain, P.', year: 2022, title: 'Imposter Syndrome among Medical and Dental Students', journal: 'Journal of Education and Health Promotion', volume: '11', type: 'Jurnal', relevance: 'Imposter syndrome di kalangan mahasiswa profesional.' },
    ],
  },
  {
    slug: 'student-financial-stress',
    surveyType: 'finm',
    indexLabel: 'Indeks Stres Finansial',
    indexLabelShort: 'Stres Finansial',
    dimensionOrder: ['M', 'A', 'F'],
    summaryText: 'Indeks stres finansial {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Archuleta et al., 2011).',
    meta: {
      title: 'Seberapa Stres Finansialmu?',
      subtitle: 'Ukur kecemasan uang, UKT, & biaya hidup mahasiswa',
      description: 'Survey berbasis College Student Financial Stress Index (Archuleta et al., 2011).',
      icon: '💸',
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      audience: 'mahasiswa',
      tags: ['Finansial', 'UKT', 'Gratis'],
    },
    types: {
      M: { code: 'M', name: 'Money Anxiety', nameId: 'Kecemasan Uang', emoji: '😰', color: '#EF4444', description: 'Kecemasan terkait uang & keuangan.', style: 'Cemas saat cek saldo atau bayar UKT.' },
      A: { code: 'A', name: 'Academic Impact', nameId: 'Dampak Akademik', emoji: '📉', color: '#F97316', description: 'Stres finansial memengaruhi prestasi kuliah.', style: 'Sulit fokus belajar karena masalah uang.' },
      F: { code: 'F', name: 'Future Worry', nameId: 'Kekhawatiran Masa Depan', emoji: '🔮', color: '#6366F1', description: 'Khawatir tentang masa depan finansial.', style: 'Takut tidak sanggup biaya hidup atau lunas UKT.' },
    },
    questions: [
      { id: 'm1', type: 'M', text: 'Aku cemas saat harus bayar UKT atau biaya kuliah' },
      { id: 'm2', type: 'M', text: 'Aku sering khawatir uang habis sebelum akhir bulan' },
      { id: 'm3', type: 'M', text: 'Aku stres memikirkan tagihan & cicilan' },
      { id: 'm4', type: 'M', text: 'Aku merasa tekanan finansial dari keluarga' },
      { id: 'a1', type: 'A', text: 'Masalah uang membuat sulit fokus belajar' },
      { id: 'a2', type: 'A', text: 'Aku harus kerja part-time dan itu mengganggu kuliah' },
      { id: 'a3', type: 'A', text: 'Aku skip kegiatan kampus karena alasan finansial' },
      { id: 'a4', type: 'A', text: 'Stres uang memengaruhi tidur & konsentrasi saat ujian' },
      { id: 'f1', type: 'F', text: 'Aku khawatir tidak sanggup menyelesaikan kuliah karena biaya' },
      { id: 'f2', type: 'F', text: 'Aku cemas tentang prospek kerja & gaji setelah lulus' },
      { id: 'f3', type: 'F', text: 'Aku merasa tertinggal karena teman punya dukungan finansial lebih' },
      { id: 'f4', type: 'F', text: 'Aku khawatir tidak bisa punya tabungan atau investasi' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Stabil Finansial', emoji: '💚', desc: 'Stres finansial rendah.' },
      { min: 31, max: 45, name: 'Kadang Cemas', emoji: '🙂', desc: 'Sesekali khawatir uang — wajar.' },
      { min: 46, max: 60, name: 'Stres Sedang', emoji: '😓', desc: 'Stres finansial mulai signifikan.' },
      { min: 61, max: 75, name: 'Stres Tinggi', emoji: '😰', desc: 'Kecemasan uang dominan.' },
      { min: 76, max: 100, name: 'Stres Parah', emoji: '💸', desc: 'Stres finansial sangat tinggi — cari bantuan kampus.' },
    ],
    pustaka: [
      { id: 'archuleta-2011', authors: 'Archuleta, K. L., et al.', year: 2011, title: 'College Students and Financial Distress', journal: 'Journal of Financial Counseling and Planning', volume: '22(2)', type: 'Jurnal', relevance: 'College Student Financial Stress Index.' },
      { id: 'norvilitis-2010', authors: 'Norvilitis, J. M., & MacLean, M. G.', year: 2010, title: 'The Role of Student Loans and Credit Card Debt', journal: 'Journal of Economic Psychology', volume: '31(3)', type: 'Jurnal', relevance: 'Utang & stres finansial mahasiswa.' },
      { id: 'britton-1991', authors: 'Britton, B. K., & Tesser, A.', year: 1991, title: 'Effects of Time-Management Practices on College Grades', journal: 'Journal of Educational Psychology', volume: '83(3)', type: 'Jurnal', relevance: 'Faktor non-akademik memengaruhi prestasi.' },
      { id: 'xiao-2015', authors: 'Xiao, J. J., et al.', year: 2015, title: 'Financial Capability and Financial Stress', journal: 'Journal of Financial Counseling and Planning', volume: '26(2)', type: 'Jurnal', relevance: 'Financial capability vs financial stress.' },
      { id: 'council-2023', authors: 'Council for Economic Education', year: 2023, title: 'Survey of the States: Economic and Personal Finance Education', journal: 'CEE Report', type: 'Laporan', relevance: 'Literasi finansial generasi muda & stres ekonomi.' },
    ],
  },
  {
    slug: 'worker-burnout',
    surveyType: 'burnw',
    indexLabel: 'Indeks Burnout Kerja',
    indexLabelShort: 'Burnout Kerja',
    invertDimensions: ['F'],
    dimensionOrder: ['E', 'C', 'F'],
    summaryText: 'Indeks burnout kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Maslach & Jackson, 1981).',
    meta: {
      title: 'Seberapa Burnout Kerjamu?',
      subtitle: 'Ukur kelelahan, sinisme, & efikasi di tempat kerja',
      description: 'Survey berbasis MBI-General Survey (Maslach & Jackson, 1981; Schaufeli et al.).',
      icon: '💼',
      color: 'from-red-500 via-orange-500 to-amber-500',
      audience: 'pekerja',
      tags: ['Burnout', 'MBI-GS', 'Gratis'],
    },
    types: {
      E: { code: 'E', name: 'Exhaustion', nameId: 'Kelelahan', emoji: '😩', color: '#EF4444', description: 'Kelelahan emosional akibat pekerjaan.', style: 'Bangun pagi sudah lelah memikirkan kantor.' },
      C: { code: 'C', name: 'Cynicism', nameId: 'Sinisme', emoji: '😒', color: '#F97316', description: 'Sikap apatis terhadap pekerjaan & rekan.', style: 'Meragukan makna pekerjaan — motivasi drop.' },
      F: { code: 'F', name: 'Efficacy', nameId: 'Efikasi Profesional', emoji: '💪', color: '#10B981', description: 'Keyakinan diri di pekerjaan (skor rendah = burnout tinggi).', style: 'Merasa tidak kompeten di tempat kerja.' },
    },
    questions: [
      { id: 'e1', type: 'E', text: 'Aku merasa drained setelah seharian bekerja' },
      { id: 'e2', type: 'E', text: 'Aku merasa lelah bahkan sebelum mulai kerja' },
      { id: 'e3', type: 'E', text: 'Overtime & tekanan KPI bikin tubuhku collapse' },
      { id: 'e4', type: 'E', text: 'Aku sulit recovery energy di weekend' },
      { id: 'c1', type: 'C', text: 'Aku merasa apatis terhadap pekerjaanku' },
      { id: 'c2', type: 'C', text: 'Aku sinis terhadap atasan atau perusahaan' },
      { id: 'c3', type: 'C', text: 'Aku meragukan apakah pekerjaanku berarti' },
      { id: 'c4', type: 'C', text: 'Motivasiku kerja menurun drastis' },
      { id: 'f1', type: 'F', text: 'Aku yakin bisa menyelesaikan tugas kerja dengan baik' },
      { id: 'f2', type: 'F', text: 'Aku merasa kompeten di bidang pekerjaanku' },
      { id: 'f3', type: 'F', text: 'Aku percaya kontribusiku di tempat kerja berarti' },
      { id: 'f4', type: 'F', text: 'Aku mampu handle tekanan di kantor' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Engaged', emoji: '🌟', desc: 'Burnout rendah — engagement sehat.' },
      { min: 31, max: 45, name: 'Mulai Lelah', emoji: '😐', desc: 'Ada tanda kelelahan.' },
      { min: 46, max: 60, name: 'Burnout Sedang', emoji: '😓', desc: 'Burnout mulai signifikan.' },
      { min: 61, max: 75, name: 'Burnout Tinggi', emoji: '🔥', desc: 'Pertimbangkan istirahat atau perubahan.' },
      { min: 76, max: 100, name: 'Burnout Parah', emoji: '💀', desc: 'Burnout sangat tinggi — cari bantuan profesional.' },
    ],
    pustaka: [
      { id: 'maslach-1981-w', authors: 'Maslach, C., & Jackson, S. E.', year: 1981, title: 'The Measurement of Experienced Burnout', journal: 'Journal of Occupational Behaviour', volume: '2(2)', type: 'Jurnal', relevance: 'MBI — instrumen burnout occupational.' },
      { id: 'schaufeli-1996', authors: 'Schaufeli, W. B., et al.', year: 1996, title: 'MBI-General Survey', journal: 'Manual MBI-GS', type: 'Manual', relevance: 'MBI-GS untuk pekerja non-human services.' },
      { id: 'bakker-2014', authors: 'Bakker, A. B., & Demerouti, E.', year: 2014, title: 'Job Demands-Resources Theory', journal: 'Career Development International', volume: '19(5)', type: 'Jurnal', relevance: 'JD-R model — demand vs resources burnout.' },
      { id: 'ahola-2007', authors: 'Ahola, K., & Hakanen, J.', year: 2007, title: 'Job Strain, Burnout, and Depressive Symptoms', journal: 'Journal of Occupational Health Psychology', volume: '12(4)', type: 'Jurnal', relevance: 'Burnout & kesehatan mental pekerja.' },
      { id: 'pranke-2022', authors: 'Pranke, A. P., et al.', year: 2022, title: 'Burnout in the Workplace', journal: 'Frontiers in Psychology', volume: '13', type: 'Jurnal', relevance: 'Review burnout di era post-pandemic & hybrid work.' },
    ],
  },
  {
    slug: 'worker-job-insecurity',
    surveyType: 'insc',
    indexLabel: 'Indeks Ketidakamanan Kerja',
    indexLabelShort: 'Job Insecurity',
    dimensionOrder: ['Q', 'L', 'W'],
    summaryText: 'Indeks job insecurity {indexScore}% ({levelName}). Dimensi dominan: {typeName} (De Witte, 1999).',
    meta: {
      title: 'Seberapa Aman Pekerjaanmu?',
      subtitle: 'Ukur ketidakpastian PHK, kontrak, & gig economy',
      description: 'Survey berbasis Job Insecurity Scale (De Witte, 1999; Ashford et al., 1989).',
      icon: '⚠️',
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      audience: 'pekerja',
      tags: ['Job Insecurity', 'PHK', 'Gratis'],
    },
    types: {
      Q: { code: 'Q', name: 'Quantitative', nameId: 'Ketidakpastian Jumlah', emoji: '📉', color: '#EF4444', description: 'Ketakutan kehilangan pekerjaan (PHK, kontrak habis).', style: 'Takut di-PHK atau tidak diperpanjang kontrak.' },
      L: { code: 'L', name: 'Qualitative', nameId: 'Ketidakpastian Kualitas', emoji: '🔄', color: '#F97316', description: 'Ketakutan perubahan drastis role atau kondisi kerja.', style: 'Takut role berubah total atau office di-restruktur.' },
      W: { code: 'W', name: 'Worry', nameId: 'Kekhawatiran', emoji: '😰', color: '#8B5CF6', description: 'Kecemasan kronis tentang masa depan pekerjaan.', style: 'Sering overthinking tentang stabilitas karir.' },
    },
    questions: [
      { id: 'q1', type: 'Q', text: 'Aku khawatir kehilangan pekerjaanku dalam waktu dekat' },
      { id: 'q2', type: 'Q', text: 'Aku cemas kontrak kerjaku tidak diperpanjang' },
      { id: 'q3', type: 'Q', text: 'Aku merasa posisiku di perusahaan tidak aman' },
      { id: 'q4', type: 'Q', text: 'Aku takut PHK massal atau efisiensi perusahaan' },
      { id: 'l1', type: 'L', text: 'Aku khawatir role pekerjaanku berubah drastis' },
      { id: 'l2', type: 'L', text: 'Aku cemas teknologi/AI menggantikan pekerjaanku' },
      { id: 'l3', type: 'L', text: 'Aku tidak yakin kondisi kerja akan tetap sama' },
      { id: 'l4', type: 'L', text: 'Aku merasa karirku tidak pasti arahnya' },
      { id: 'w1', type: 'W', text: 'Aku sering overthinking tentang masa depan pekerjaan' },
      { id: 'w2', type: 'W', text: 'Aku cemas tidak bisa menemukan pekerjaan baru jika di-PHK' },
      { id: 'w3', type: 'W', text: 'Ketidakpastian kerja membuat sulit tidur' },
      { id: 'w4', type: 'W', text: 'Aku merasa tidak punya kontrol atas stabilitas karir' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Aman & Stabil', emoji: '💚', desc: 'Perasaan aman di pekerjaan.' },
      { min: 31, max: 45, name: 'Kadang Cemas', emoji: '🙂', desc: 'Sesekali khawatir — wajar di era incertain.' },
      { min: 46, max: 60, name: 'Insecure Sedang', emoji: '😓', desc: 'Ketidakamanan mulai signifikan.' },
      { min: 61, max: 75, name: 'Insecure Tinggi', emoji: '😰', desc: 'Kecemasan pekerjaan dominan.' },
      { min: 76, max: 100, name: 'Insecure Parah', emoji: '⚠️', desc: 'Ketidakamanan sangat tinggi.' },
    ],
    pustaka: [
      { id: 'ashford-1989', authors: 'Ashford, S. J., et al.', year: 1989, title: 'Quantitative and Qualitative Job Insecurity', journal: 'Journal of Applied Psychology', volume: '74(5)', type: 'Jurnal', relevance: 'Distinguish quantitative vs qualitative job insecurity.' },
      { id: 'dewitte-1999', authors: 'De Witte, H.', year: 1999, title: 'Job Insecurity and Psychological Distress', journal: 'Journal of Occupational Health Psychology', volume: '4(2)', type: 'Jurnal', relevance: 'Job Insecurity Scale — validasi & korelasi distress.' },
      { id: 'sverke-2002', authors: 'Sverke, M., & Hellgren, J.', year: 2002, title: 'The Nature of Job Insecurity', journal: 'Economic and Industrial Democracy', volume: '23(2)', type: 'Jurnal', relevance: 'Review job insecurity — causes & consequences.' },
      { id: 'shoss-2011', authors: 'Shoss, J.', year: 2011, title: 'In the Eye of the Storm: How Job Insecurity Shapes Employees', journal: 'Journal of Leadership & Organizational Studies', volume: '18(4)', type: 'Jurnal', relevance: 'Job insecurity memengaruhi behavior & wellbeing.' },
      { id: 'keim-2014', authors: 'Keim, A. C., et al.', year: 2014, title: 'Coping with Job Insecurity', journal: 'Journal of Occupational Health Psychology', volume: '19(3)', type: 'Jurnal', relevance: 'Coping strategies untuk job insecurity.' },
    ],
  },
  {
    slug: 'worker-worklife-conflict',
    surveyType: 'wfc',
    indexLabel: 'Indeks Konflik Kerja-Hidup',
    indexLabelShort: 'Work-Life Conflict',
    dimensionOrder: ['T', 'S', 'B'],
    summaryText: 'Indeks work-life conflict {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Carlson et al., 2000).',
    meta: {
      title: 'Seberapa Bentrok Kerja & Hidup?',
      subtitle: 'Ukur konflik WFH, keluarga, & work-life balance',
      description: 'Survey berbasis Work-Family Conflict Scale (Carlson et al., 2000).',
      icon: '⚖️',
      color: 'from-blue-500 via-indigo-500 to-violet-500',
      audience: 'pekerja',
      tags: ['Work-Life', 'WFH', 'Gratis'],
    },
    types: {
      T: { code: 'T', name: 'Time-based', nameId: 'Konflik Waktu', emoji: '⏰', color: '#3B82F6', description: 'Pekerjaan mengambil waktu untuk keluarga/pribadi.', style: 'Kerja lembur — tidak ada waktu untuk keluarga.' },
      S: { code: 'S', name: 'Strain-based', nameId: 'Konflik Beban', emoji: '😓', color: '#8B5CF6', description: 'Stres kerja memengaruhi kehidupan pribadi.', style: 'Stres kantor dibawa pulang — mood jelek ke keluarga.' },
      B: { code: 'B', name: 'Behavior-based', nameId: 'Konflik Perilaku', emoji: '🔄', color: '#EC4899', description: 'Perilaku kerja tidak cocok di rumah.', style: 'Masih mode "kantor" saat di rumah.' },
    },
    questions: [
      { id: 't1', type: 'T', text: 'Aku sering lembur sehingga tidak ada waktu untuk keluarga' },
      { id: 't2', type: 'T', text: 'Pekerjaanku mengambil waktu yang seharusnya untuk istirahat' },
      { id: 't3', type: 'T', text: 'Aku harus cancel rencana pribadi karena kerja' },
      { id: 't4', type: 'T', text: 'WFH/hybrid bikin batas kerja-rumah kabur' },
      { id: 's1', type: 'S', text: 'Stres kerja membuat aku lelah untuk urus keluarga' },
      { id: 's2', type: 'S', text: 'Aku irritable di rumah karena pekerjaan' },
      { id: 's3', type: 'S', text: 'Tekanan kantor memengaruhi kesehatan mental di rumah' },
      { id: 's4', type: 'S', text: 'Aku sulit "switch off" dari mode kerja' },
      { id: 'b1', type: 'B', text: 'Aku masih cek email/Slack saat waktu keluarga' },
      { id: 'b2', type: 'B', text: 'Aku terbawa suasana kantor saat di rumah' },
      { id: 'b3', type: 'B', text: 'Anak/keluarga merasa aku tidak present karena kerja' },
      { id: 'b4', type: 'B', text: 'Aku kesulitan pisahkan role pekerja & role di rumah' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Seimbang', emoji: '⚖️', desc: 'Work-life balance relatif sehat.' },
      { min: 31, max: 45, name: 'Kadang Bentrok', emoji: '🙂', desc: 'Sesekali konflik — wajar.' },
      { min: 46, max: 60, name: 'Konflik Sedang', emoji: '😓', desc: 'Work-life conflict mulai signifikan.' },
      { min: 61, max: 75, name: 'Konflik Tinggi', emoji: '😰', desc: 'Kerja dominasi kehidupan pribadi.' },
      { min: 76, max: 100, name: 'Konflik Parah', emoji: '💔', desc: 'Work-life conflict sangat tinggi.' },
    ],
    pustaka: [
      { id: 'greenhaus-1985', authors: 'Greenhaus, J. H., & Beutell, N. J.', year: 1985, title: 'Sources of Conflict Between Work and Family Roles', journal: 'Academy of Management Review', volume: '10(1)', type: 'Jurnal', relevance: 'Teori dasar work-family conflict tiga sumber.' },
      { id: 'carlson-2000', authors: 'Carlson, D. S., et al.', year: 2000, title: 'Construction and Validation of a Multidimensional Measure of Work-Family Conflict', journal: 'Journal of Vocational Behavior', volume: '56(2)', type: 'Jurnal', relevance: 'WFC Scale — time, strain, behavior based.' },
      { id: 'allen-2000', authors: 'Allen, T. D., et al.', year: 2000, title: 'Consequences Associated with Work-to-Family Conflict', journal: 'Journal of Applied Psychology', volume: '85(1)', type: 'Jurnal', relevance: 'Konsekuensi work-family conflict.' },
      { id: 'byron-2005', authors: 'Byron, K.', year: 2005, title: 'A Meta-Analytic Review of Work-Family Conflict', journal: 'Journal of Vocational Behavior', volume: '67(2)', type: 'Jurnal', relevance: 'Meta-analysis WFC — prediktor & outcomes.' },
      { id: 'mesmer-1999', authors: 'Mesmer-Magnus, J. R., & Viswesvaran, C.', year: 2005, title: 'Convergence Between Measures of Work-to-Family and Family-to-Work Conflict', journal: 'Journal of Vocational Behavior', volume: '67(2)', type: 'Jurnal', relevance: 'Validasi instrumen WFC bidirectional.' },
    ],
  },
  {
    slug: 'worker-disengagement',
    surveyType: 'diseng',
    indexLabel: 'Indeks Quiet Quitting',
    indexLabelShort: 'Quiet Quitting',
    invertDimensions: [],
    dimensionOrder: ['V', 'D', 'A'],
    summaryText: 'Indeks quiet quitting {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Schaufeli et al., 2002).',
    meta: {
      title: 'Seberapa Quiet Quitting Kamu?',
      subtitle: 'Ukur disengagement & rendahnya commitment di kantor',
      description: 'Survey berbasis UWES inverse (Schaufeli et al., 2002) — low vigor, dedication, absorption.',
      icon: '😶',
      color: 'from-slate-500 via-gray-500 to-zinc-500',
      audience: 'pekerja',
      tags: ['Quiet Quitting', 'Engagement', 'Gratis'],
    },
    types: {
      V: { code: 'V', name: 'Low Vigor', nameId: 'Energi Rendah', emoji: '😴', color: '#64748B', description: 'Kurang semangat & energi di pekerjaan.', style: 'Datang, duduk, pulang — tanpa drive.' },
      D: { code: 'D', name: 'Low Dedication', nameId: 'Dedikasi Rendah', emoji: '😐', color: '#78716C', description: 'Tidak merasa involved atau bangga dengan pekerjaan.', style: 'Kerja cuma untuk gaji — bukan passion.' },
      A: { code: 'A', name: 'Low Absorption', nameId: 'Absorpsi Rendah', emoji: '📱', color: '#57534E', description: 'Mudah distracted & tidak flow saat kerja.', style: 'Sulit fokus — mind wandering terus.' },
    },
    questions: [
      { id: 'v1', type: 'V', text: 'Aku datang kerja tanpa semangat — cuma menunggu pulang' },
      { id: 'v2', type: 'V', text: 'Aku merasa drained meski belum banyak kerja' },
      { id: 'v3', type: 'V', text: 'Aku tidak punya energy untuk tugas extra' },
      { id: 'v4', type: 'V', text: 'Aku merasa "ngerjain" bukan "mengerjakan"' },
      { id: 'd1', type: 'D', text: 'Aku tidak bangga dengan pekerjaanku' },
      { id: 'd2', type: 'D', text: 'Aku tidak merasa pekerjaanku meaningful' },
      { id: 'd3', type: 'D', text: 'Aku tidak mau effort lebih dari job description' },
      { id: 'd4', type: 'D', text: 'Aku tidak peduli perkembangan perusahaan' },
      { id: 'a1', type: 'A', text: 'Aku mudah distracted saat kerja (HP, chat, dll)' },
      { id: 'a2', type: 'A', text: 'Aku sulit masuk "flow" saat mengerjakan tugas' },
      { id: 'a3', type: 'A', text: 'Aku sering mind-wandering saat jam kerja' },
      { id: 'a4', type: 'A', text: 'Aku tidak enjoy proses kerja — cuma tunggu selesai' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Highly Engaged', emoji: '🌟', desc: 'Engagement tinggi — antitesis quiet quitting.' },
      { min: 31, max: 45, name: 'Cukup Engaged', emoji: '🙂', desc: 'Masih engaged dengan pekerjaan.' },
      { min: 46, max: 60, name: 'Mulai Disengage', emoji: '😐', desc: 'Tanda-tanda quiet quitting muncul.' },
      { min: 61, max: 75, name: 'Quiet Quitting', emoji: '😶', desc: 'Disengagement signifikan.' },
      { min: 76, max: 100, name: 'Full Quiet Quitting', emoji: '💤', desc: 'Quiet quitting parah — evaluasi karir.' },
    ],
    pustaka: [
      { id: 'schaufeli-2002-uwe', authors: 'Schaufeli, W. B., et al.', year: 2002, title: 'The Measurement of Engagement and Burnout', journal: 'Journal of Happiness Studies', volume: '3(1)', type: 'Jurnal', relevance: 'UWES — vigor, dedication, absorption (inverse = disengagement).' },
      { id: 'saks-2006', authors: 'Saks, A. M.', year: 2006, title: 'Antecedents and Consequences of Employee Engagement', journal: 'Journal of Managerial Psychology', volume: '21(7)', type: 'Jurnal', relevance: 'Employee engagement antecedents & outcomes.' },
      { id: 'schaufeli-2004', authors: 'Schaufeli, W. B., & Bakker, A. B.', year: 2004, title: 'Job Demands, Job Resources, and Their Relationship with Burnout and Engagement', journal: 'Journal of Organizational Behavior', volume: '25(3)', type: 'Jurnal', relevance: 'JD-R model — engagement vs burnout.' },
      { id: 'gallup-2023', authors: 'Gallup, Inc.', year: 2023, title: 'State of the Global Workplace Report', journal: 'Gallup Report', type: 'Laporan', relevance: 'Global employee engagement & quiet quitting trends.' },
      { id: 'macey-2009', authors: 'Macey, W. H., & Schneider, B.', year: 2008, title: 'The Meaning of Employee Engagement', journal: 'Industrial and Organizational Psychology', volume: '1(1)', type: 'Jurnal', relevance: 'Definisi & konstruk employee engagement.' },
    ],
  },
  {
    slug: 'worker-job-stress',
    surveyType: 'jstr',
    indexLabel: 'Indeks Stres Kerja',
    indexLabelShort: 'Stres Kerja',
    invertDimensions: ['C'],
    dimensionOrder: ['D', 'C', 'S'],
    summaryText: 'Indeks stres kerja {indexScore}% ({levelName}). Dimensi dominan: {typeName} (Karasek, 1979).',
    meta: {
      title: 'Seberapa Stres di Tempat Kerja?',
      subtitle: 'Ukur demand, control, & strain di kantor Indonesia',
      description: 'Survey berbasis Job Demand-Control model (Karasek, 1979) + strain symptoms.',
      icon: '🔥',
      color: 'from-red-600 via-rose-500 to-pink-500',
      audience: 'pekerja',
      tags: ['Job Stress', 'Karasek JDC', 'Gratis'],
    },
    types: {
      D: { code: 'D', name: 'Demand', nameId: 'Beban Kerja', emoji: '📈', color: '#EF4444', description: 'Tekanan & beban kerja tinggi.', style: 'Deadline menumpuk, KPI gila, multitasking extreme.' },
      C: { code: 'C', name: 'Control', nameId: 'Kontrol Rendah', emoji: '🎛️', color: '#F97316', description: 'Kurang kontrol atas cara & waktu kerja (skor rendah = stres tinggi).', style: 'Tidak bisa atur sendiri — semua dari atasan.' },
      S: { code: 'S', name: 'Strain', nameId: 'Gejala Strain', emoji: '😵', color: '#DC2626', description: 'Gejala fisik & psikologis akibat stres kerja.', style: 'Sakit kepala, insomnia, anxiety karena kerja.' },
    },
    questions: [
      { id: 'd1', type: 'D', text: 'Aku punya terlalu banyak tugas untuk waktu yang ada' },
      { id: 'd2', type: 'D', text: 'Tekanan deadline & KPI sangat tinggi' },
      { id: 'd3', type: 'D', text: 'Aku harus multitasking extreme setiap hari' },
      { id: 'd4', type: 'D', text: 'Beban kerja meningkat tapi resources tidak' },
      { id: 'c1', type: 'C', text: 'Aku punya kontrol atas cara mengerjakan tugasku' },
      { id: 'c2', type: 'C', text: 'Aku bisa atur sendiri prioritas pekerjaan' },
      { id: 'c3', type: 'C', text: 'Aku punya autonomy dalam keputusan kerja' },
      { id: 'c4', type: 'C', text: 'Atasan memberi kebebasan menentukan metode kerja' },
      { id: 's1', type: 'S', text: 'Aku sakit kepala atau tension karena pekerjaan' },
      { id: 's2', type: 'S', text: 'Aku sulit tidur karena memikirkan kerja' },
      { id: 's3', type: 'S', text: 'Aku merasa anxious sebelum masuk kantor' },
      { id: 's4', type: 'S', text: 'Stres kerja memengaruhi kesehatan fisikku' },
    ],
    levels: [
      { min: 0, max: 30, name: 'Low Stress', emoji: '💚', desc: 'Stres kerja rendah.' },
      { min: 31, max: 45, name: 'Moderate', emoji: '🙂', desc: 'Stres wajar — masih manageable.' },
      { min: 46, max: 60, name: 'Stres Sedang', emoji: '😓', desc: 'Stres mulai signifikan.' },
      { min: 61, max: 75, name: 'Stres Tinggi', emoji: '😰', desc: 'Job strain dominan.' },
      { min: 76, max: 100, name: 'Stres Parah', emoji: '🔥', desc: 'Stres sangat tinggi — cari bantuan.' },
    ],
    pustaka: [
      { id: 'karasek-1979', authors: 'Karasek, R. A.', year: 1979, title: 'Job Demands, Job Decision Latitude, and Mental Strain', journal: 'Administrative Science Quarterly', volume: '24(2)', type: 'Jurnal', relevance: 'Job Demand-Control model — fondasi stres kerja.' },
      { id: 'karasek-1990', authors: 'Karasek, R., & Theorell, T.', year: 1990, title: 'Healthy Work: Stress, Productivity, and the Reconstruction of Working Life', journal: 'Basic Books', type: 'Buku', relevance: 'Buku komprehensif JDC model.' },
      { id: 'cohen-1983', authors: 'Cohen, S., Kamarck, T., & Mermelstein, R.', year: 1983, title: 'A Global Measure of Perceived Stress', journal: 'Journal of Health and Social Behavior', volume: '24(4)', type: 'Jurnal', relevance: 'Perceived Stress Scale — adaptasi stres kerja.' },
      { id: 'nixon-2011', authors: 'Nixon, A. E., et al.', year: 2011, title: 'The Relation Between Work and Home Stress', journal: 'Journal of Applied Psychology', volume: '96(1)', type: 'Jurnal', relevance: 'Work stress & spillover ke kehidupan pribadi.' },
      { id: 'luchman-2010', authors: 'Luchman, J. G., & Gonzalez-Morales, T.', year: 2013, title: 'Demands, Control, and Support', journal: 'Journal of Occupational Health Psychology', volume: '18(1)', type: 'Jurnal', relevance: 'Demand-control-support model extension.' },
    ],
  },
];

for (const cfg of SURVEYS) {
  const dir = path.join(ROOT, cfg.slug);
  fs.mkdirSync(dir, { recursive: true });

  let surveySrc = buildSurvey(cfg);
  surveySrc = surveySrc.replace(
    'function getSummary(scoring, typeInfo) {\n  return ' + JSON.stringify(cfg.summaryText) + ';\n}',
    `function getSummary(scoring, typeInfo) {
  return ${JSON.stringify(cfg.summaryText)}
    .replace('{indexScore}', scoring.indexScore)
    .replace('{levelName}', scoring.level.name)
    .replace('{typeName}', typeInfo.nameId || typeInfo.name)
    .replace('{typeStyle}', typeInfo.style || typeInfo.description || '');
}`
  );

  fs.writeFileSync(path.join(dir, 'survey.js'), surveySrc);
  fs.writeFileSync(
    path.join(dir, 'pustaka.js'),
    `module.exports = ${JSON.stringify(cfg.pustaka.map((p) => ({ ...p, usedIn: [cfg.slug] })), null, 2)};\n`
  );
  fs.writeFileSync(path.join(dir, 'index.js'), INDEX_SRC);
  console.log('Created', cfg.slug);
}

console.log(`Done — ${SURVEYS.length} surveys.`);
