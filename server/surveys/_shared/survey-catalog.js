/**
 * Metadata katalog marketplace — kategori, metodologi, mood/penggunaan harian.
 * Dipakai enrich meta survey di API.
 */

const CATEGORIES = {
  karier: { id: 'karier', label: 'Karier & Minat', emoji: '🎯', color: '#8B5CF6' },
  kepribadian: { id: 'kepribadian', label: 'Kepribadian', emoji: '🧩', color: '#EC4899' },
  akademik: { id: 'akademik', label: 'Akademik & Kuliah', emoji: '📚', color: '#F97316' },
  kerja: { id: 'kerja', label: 'Kerja & Karier', emoji: '💼', color: '#0EA5E9' },
  mental: { id: 'mental', label: 'Stres & Mental', emoji: '🧠', color: '#EF4444' },
  refleksi: { id: 'refleksi', label: 'Refleksi Diri', emoji: '🪞', color: '#6366F1' },
  hiburan: { id: 'hiburan', label: 'Fun & Hiburan', emoji: '🎉', color: '#14B8A6' },
};

const METHODOLOGIES = {
  riasec: { id: 'riasec', label: 'RIASEC / Holland Code', short: 'RIASEC' },
  likert: { id: 'likert', label: 'Skala Likert Tervalidasi', short: 'Likert' },
  'dark-triad': { id: 'dark-triad', label: 'Dark Triad Dirty Dozen', short: 'DTDD' },
  'cognitive-age': { id: 'cognitive-age', label: 'Cognitive & Subjective Age', short: 'Cognitive Age' },
  mbi: { id: 'mbi', label: 'Maslach Burnout Inventory', short: 'MBI' },
  'job-demand-control': { id: 'job-demand-control', label: 'Job Demand-Control (Karasek)', short: 'JDC' },
  'multi-dimension': { id: 'multi-dimension', label: 'Multi-Dimensi Psikometri', short: 'Multi-dim' },
};

const MOODS = {
  'cari-karier': { id: 'cari-karier', label: 'Cari Arah Karier', emoji: '🧭' },
  'stres-burnout': { id: 'stres-burnout', label: 'Lagi Stres / Burnout', emoji: '😮‍💨' },
  'check-in': { id: 'check-in', label: 'Check-in Harian', emoji: '✅' },
  'kenali-diri': { id: 'kenali-diri', label: 'Kenali Diri', emoji: '🔍' },
  'refleksi': { id: 'refleksi', label: 'Refleksi & Mindset', emoji: '💭' },
  'iseng-fun': { id: 'iseng-fun', label: 'Iseng & Seru', emoji: '😏' },
  'hubungan-sosial': { id: 'hubungan-sosial', label: 'Hubungan & Sosial', emoji: '👥' },
  'finansial': { id: 'finansial', label: 'Stres Uang & Finansial', emoji: '💸' },
  'produktivitas': { id: 'produktivitas', label: 'Produktivitas & Fokus', emoji: '⚡' },
  'kerja-harian': { id: 'kerja-harian', label: 'Rutinitas Kerja', emoji: '🏢' },
  'kuliah-harian': { id: 'kuliah-harian', label: 'Rutinitas Kuliah', emoji: '🎓' },
};

const SURVEY_CATALOG = {
  'riasec-career': {
    category: 'karier',
    methodology: 'riasec',
    moods: ['cari-karier', 'kenali-diri', 'check-in'],
    installLabel: 'Karier',
  },
  'dark-triad-annoying': {
    category: 'kepribadian',
    methodology: 'dark-triad',
    moods: ['kenali-diri', 'iseng-fun', 'hubungan-sosial'],
    installLabel: 'Kepribadian',
  },
  'gullibility-exploitability': {
    category: 'kepribadian',
    methodology: 'multi-dimension',
    moods: ['kenali-diri', 'hubungan-sosial', 'refleksi'],
    installLabel: 'Kerentanan',
  },
  'mischief-usil': {
    category: 'hiburan',
    methodology: 'likert',
    moods: ['iseng-fun', 'hubungan-sosial', 'check-in'],
    installLabel: 'Fun',
  },
  'subjective-age': {
    category: 'refleksi',
    methodology: 'cognitive-age',
    moods: ['refleksi', 'kenali-diri', 'check-in'],
    installLabel: 'Mindset',
  },
  'student-burnout': {
    category: 'akademik',
    methodology: 'mbi',
    moods: ['stres-burnout', 'kuliah-harian', 'check-in'],
    installLabel: 'Burnout Kuliah',
  },
  'student-fomo': {
    category: 'akademik',
    methodology: 'likert',
    moods: ['produktivitas', 'kuliah-harian', 'hubungan-sosial'],
    installLabel: 'FOMO',
  },
  'student-procrastination': {
    category: 'akademik',
    methodology: 'likert',
    moods: ['produktivitas', 'kuliah-harian', 'check-in'],
    installLabel: 'Procrastination',
  },
  'student-imposter': {
    category: 'mental',
    methodology: 'likert',
    moods: ['refleksi', 'kuliah-harian', 'kenali-diri'],
    installLabel: 'Imposter',
  },
  'student-financial-stress': {
    category: 'mental',
    methodology: 'likert',
    moods: ['finansial', 'stres-burnout', 'kuliah-harian'],
    installLabel: 'Finansial',
  },
  'worker-burnout': {
    category: 'kerja',
    methodology: 'mbi',
    moods: ['stres-burnout', 'kerja-harian', 'check-in'],
    installLabel: 'Burnout Kerja',
  },
  'worker-job-insecurity': {
    category: 'kerja',
    methodology: 'likert',
    moods: ['kerja-harian', 'stres-burnout', 'refleksi'],
    installLabel: 'Job Security',
  },
  'worker-worklife-conflict': {
    category: 'kerja',
    methodology: 'likert',
    moods: ['kerja-harian', 'refleksi', 'stres-burnout'],
    installLabel: 'Work-Life',
  },
  'worker-disengagement': {
    category: 'kerja',
    methodology: 'likert',
    moods: ['kerja-harian', 'refleksi', 'check-in'],
    installLabel: 'Engagement',
  },
  'worker-job-stress': {
    category: 'mental',
    methodology: 'job-demand-control',
    moods: ['stres-burnout', 'kerja-harian', 'check-in'],
    installLabel: 'Stres Kerja',
  },
  'student-anxiety': {
    category: 'mental',
    methodology: 'likert',
    moods: ['stres-burnout', 'kuliah-harian', 'check-in'],
    installLabel: 'Kecemasan',
  },
  'student-sleep': {
    category: 'mental',
    methodology: 'likert',
    moods: ['kuliah-harian', 'check-in', 'produktivitas'],
    installLabel: 'Kualitas Tidur',
  },
  'student-loneliness': {
    category: 'mental',
    methodology: 'likert',
    moods: ['hubungan-sosial', 'kuliah-harian', 'refleksi'],
    installLabel: 'Kesepian',
  },
  'student-resilience': {
    category: 'refleksi',
    methodology: 'likert',
    moods: ['refleksi', 'kuliah-harian', 'kenali-diri'],
    installLabel: 'Resiliensi',
  },
  'student-self-efficacy': {
    category: 'akademik',
    methodology: 'likert',
    moods: ['produktivitas', 'kuliah-harian', 'kenali-diri'],
    installLabel: 'Self-Efficacy',
  },
  'worker-perceived-stress': {
    category: 'mental',
    methodology: 'likert',
    moods: ['stres-burnout', 'kerja-harian', 'check-in'],
    installLabel: 'Stres Persepsi',
  },
  'worker-engagement': {
    category: 'kerja',
    methodology: 'likert',
    moods: ['kerja-harian', 'check-in', 'refleksi'],
    installLabel: 'Work Engagement',
  },
  'worker-autonomy': {
    category: 'kerja',
    methodology: 'job-demand-control',
    moods: ['kerja-harian', 'refleksi', 'kenali-diri'],
    installLabel: 'Otonomi Kerja',
  },
  'worker-technostress': {
    category: 'kerja',
    methodology: 'likert',
    moods: ['kerja-harian', 'produktivitas', 'stres-burnout'],
    installLabel: 'Technostress',
  },
  'worker-compassion-fatigue': {
    category: 'mental',
    methodology: 'mbi',
    moods: ['stres-burnout', 'kerja-harian', 'refleksi'],
    installLabel: 'Compassion Fatigue',
  },
  'general-life-satisfaction': {
    category: 'refleksi',
    methodology: 'likert',
    moods: ['refleksi', 'check-in', 'kenali-diri'],
    installLabel: 'Kepuasan Hidup',
  },
  'general-mindfulness': {
    category: 'refleksi',
    methodology: 'likert',
    moods: ['refleksi', 'check-in', 'kenali-diri'],
    installLabel: 'Mindfulness',
  },
  'general-emotional-intelligence': {
    category: 'kepribadian',
    methodology: 'multi-dimension',
    moods: ['kenali-diri', 'hubungan-sosial', 'refleksi'],
    installLabel: 'Kecerdasan Emosional',
  },
  'general-gratitude': {
    category: 'refleksi',
    methodology: 'likert',
    moods: ['refleksi', 'check-in', 'kenali-diri'],
    installLabel: 'Gratitude',
  },
  'general-social-support': {
    category: 'mental',
    methodology: 'likert',
    moods: ['hubungan-sosial', 'check-in', 'refleksi'],
    installLabel: 'Dukungan Sosial',
  },
  'student-depression': { category: 'mental', methodology: 'likert', moods: ['stres-burnout', 'kuliah-harian', 'refleksi'], installLabel: 'Depresi' },
  'student-test-anxiety': { category: 'akademik', methodology: 'likert', moods: ['stres-burnout', 'kuliah-harian', 'produktivitas'], installLabel: 'Test Anxiety' },
  'student-social-anxiety': { category: 'mental', methodology: 'likert', moods: ['hubungan-sosial', 'kuliah-harian', 'stres-burnout'], installLabel: 'Kecemasan Sosial' },
  'student-academic-stress': { category: 'akademik', methodology: 'likert', moods: ['stres-burnout', 'kuliah-harian', 'check-in'], installLabel: 'Stres Akademik' },
  'student-digital-overuse': { category: 'mental', methodology: 'likert', moods: ['produktivitas', 'kuliah-harian', 'check-in'], installLabel: 'Overuse Digital' },
  'worker-hostile-climate': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'stres-burnout', 'hubungan-sosial'], installLabel: 'Iklim Hostil' },
  'worker-role-overload': { category: 'kerja', methodology: 'job-demand-control', moods: ['kerja-harian', 'stres-burnout', 'check-in'], installLabel: 'Role Overload' },
  'worker-emotional-labor': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'stres-burnout', 'refleksi'], installLabel: 'Emotional Labor' },
  'worker-boreout': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'refleksi', 'check-in'], installLabel: 'Boreout' },
  'worker-psych-unsafety': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'hubungan-sosial', 'stres-burnout'], installLabel: 'Psych Safety' },
  'student-flourishing': { category: 'refleksi', methodology: 'likert', moods: ['refleksi', 'kuliah-harian', 'check-in'], installLabel: 'Flourishing' },
  'student-hope': { category: 'refleksi', methodology: 'likert', moods: ['refleksi', 'kuliah-harian', 'kenali-diri'], installLabel: 'Hope' },
  'student-grit': { category: 'akademik', methodology: 'likert', moods: ['produktivitas', 'kuliah-harian', 'kenali-diri'], installLabel: 'Grit' },
  'student-belonging': { category: 'akademik', methodology: 'likert', moods: ['hubungan-sosial', 'kuliah-harian', 'kenali-diri'], installLabel: 'Belonging' },
  'student-curiosity': { category: 'akademik', methodology: 'likert', moods: ['produktivitas', 'kenali-diri', 'kuliah-harian'], installLabel: 'Curiosity' },
  'worker-job-satisfaction': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'check-in', 'refleksi'], installLabel: 'Job Satisfaction' },
  'worker-psych-capital': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'kenali-diri', 'check-in'], installLabel: 'PsyCap' },
  'worker-team-cohesion': { category: 'kerja', methodology: 'likert', moods: ['hubungan-sosial', 'kerja-harian', 'check-in'], installLabel: 'Team Cohesion' },
  'worker-flow': { category: 'kerja', methodology: 'likert', moods: ['produktivitas', 'kerja-harian', 'check-in'], installLabel: 'Flow Kerja' },
  'worker-feeling-valued': { category: 'kerja', methodology: 'likert', moods: ['kerja-harian', 'refleksi', 'check-in'], installLabel: 'Feeling Valued' },
};

function enrichSurveyMeta(meta) {
  const cat = SURVEY_CATALOG[meta.slug] || SURVEY_CATALOG[meta.id] || {};
  const category = CATEGORIES[cat.category] || CATEGORIES.refleksi;
  const methodology = METHODOLOGIES[cat.methodology] || METHODOLOGIES.likert;
  const moods = (cat.moods || ['check-in']).map((id) => MOODS[id]).filter(Boolean);

  return {
    ...meta,
    catalog: {
      category: category.id,
      categoryLabel: category.label,
      categoryEmoji: category.emoji,
      categoryColor: category.color,
      methodology: methodology.id,
      methodologyLabel: methodology.label,
      methodologyShort: methodology.short,
      moods: moods.map((m) => m.id),
      moodLabels: moods.map((m) => m.label),
      installLabel: cat.installLabel || category.label,
    },
  };
}

function getCatalogFacets() {
  return {
    categories: Object.values(CATEGORIES),
    methodologies: Object.values(METHODOLOGIES),
    moods: Object.values(MOODS),
    audiences: [
      { id: 'all', label: 'Semua' },
      { id: 'mahasiswa', label: 'Mahasiswa' },
      { id: 'pekerja', label: 'Pekerja' },
      { id: 'umum', label: 'Umum' },
    ],
  };
}

module.exports = {
  CATEGORIES,
  METHODOLOGIES,
  MOODS,
  SURVEY_CATALOG,
  enrichSurveyMeta,
  getCatalogFacets,
};
