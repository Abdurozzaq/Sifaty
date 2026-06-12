export function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

export const LIKERT = [
  { value: 1, label: '1', desc: 'Tidak' },
  { value: 2, label: '2', desc: 'Kurang' },
  { value: 3, label: '3', desc: 'Netral' },
  { value: 4, label: '4', desc: 'Setuju' },
  { value: 5, label: '5', desc: 'Sangat' },
];

export function getSurveyDimTitle(slug, count) {
  const labels = {
    'dark-triad-annoying': 'Dark Triad',
    'gullibility-exploitability': 'Kerentanan',
    'mischief-usil': 'Keusilan',
    'subjective-age': 'Usia & Mindset',
    'riasec-career': 'RIASEC',
    'student-burnout': 'Burnout Kuliah',
    'student-fomo': 'FOMO',
    'student-procrastination': 'Procrastination',
    'student-imposter': 'Imposter Syndrome',
    'student-financial-stress': 'Stres Finansial',
    'worker-burnout': 'Burnout Kerja',
    'worker-job-insecurity': 'Job Insecurity',
    'worker-worklife-conflict': 'Work-Life',
    'worker-disengagement': 'Quiet Quitting',
    'worker-job-stress': 'Stres Kerja',
    'student-anxiety': 'Kecemasan',
    'student-sleep': 'Kualitas Tidur',
    'student-loneliness': 'Kesepian',
    'student-resilience': 'Resiliensi',
    'student-self-efficacy': 'Self-Efficacy',
    'worker-perceived-stress': 'Stres Persepsi',
    'worker-engagement': 'Work Engagement',
    'worker-autonomy': 'Otonomi Kerja',
    'worker-technostress': 'Technostress',
    'worker-compassion-fatigue': 'Compassion Fatigue',
    'general-life-satisfaction': 'Kepuasan Hidup',
    'general-mindfulness': 'Mindfulness',
    'general-emotional-intelligence': 'Kecerdasan Emosional',
    'general-gratitude': 'Gratitude',
    'general-social-support': 'Dukungan Sosial',
    'student-depression': 'Depresi',
    'student-test-anxiety': 'Test Anxiety',
    'student-social-anxiety': 'Kecemasan Sosial',
    'student-academic-stress': 'Stres Akademik',
    'student-digital-overuse': 'Overuse Digital',
    'worker-hostile-climate': 'Iklim Hostil',
    'worker-role-overload': 'Role Overload',
    'worker-emotional-labor': 'Emotional Labor',
    'worker-boreout': 'Boreout',
    'worker-psych-unsafety': 'Psych Safety',
    'student-flourishing': 'Flourishing',
    'student-hope': 'Hope',
    'student-grit': 'Grit',
    'student-belonging': 'Belonging',
    'student-curiosity': 'Curiosity',
    'worker-job-satisfaction': 'Job Satisfaction',
    'worker-psych-capital': 'PsyCap',
    'worker-team-cohesion': 'Team Cohesion',
    'worker-flow': 'Flow Kerja',
    'worker-feeling-valued': 'Feeling Valued',
  };
  return `${count} Dimensi ${labels[slug] || 'Survey'}`;
}

export function getDimBadge(survey, type) {
  const info = survey?.types?.[type];
  if (!info) return type;
  return `${info.emoji || ''} ${info.name || type}`.trim();
}

export function audienceBadge(audience) {
  if (audience === 'mahasiswa') return '<span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">Mahasiswa</span>';
  if (audience === 'pekerja') return '<span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">Pekerja</span>';
  return '';
}

/** Strip tahun dari teks label (mis. subtitle lama/cache) */
export function stripYearLabel(text) {
  return String(text || '')
    .replace(/\s*2026\b/g, '')
    .replace(/\b2026\s*/g, '')
    .trim();
}

export function filterSurveyTags(survey) {
  return (survey.tags || []).filter((t) => {
    if (/\b2026\b/.test(t)) return false;
    if (survey.audience === 'mahasiswa' && /^mahasiswa$/i.test(t.trim())) return false;
    if (survey.audience === 'pekerja' && /^pekerja$/i.test(t.trim())) return false;
    return true;
  });
}
