function normalizeDimensionScores(answers, questions, dimensionOrder) {
  const raw = {};
  const counts = {};
  for (const type of dimensionOrder) {
    raw[type] = 0;
    counts[type] = 0;
  }
  for (const q of questions) {
    const val = answers[q.id];
    if (val >= 1 && val <= 5) {
      raw[q.type] += val;
      counts[q.type]++;
    }
  }
  const scores = {};
  for (const type of dimensionOrder) {
    const max = counts[type] * 5;
    scores[type] = max > 0 ? Math.round((raw[type] / max) * 100) : 0;
  }
  return { scores, raw, counts };
}

function buildSorted(scores, dimensionOrder) {
  return dimensionOrder
    .map((type) => ({ type, score: scores[type] }))
    .sort((a, b) => b.score - a.score);
}

function getLevelFromScore(score, levels) {
  return levels.find((l) => score >= l.min && score <= l.max) || levels[0];
}

function applyInversions(scores, invertDimensions = []) {
  const out = { ...scores };
  for (const type of invertDimensions) {
    if (out[type] != null) out[type] = 100 - out[type];
  }
  return out;
}

function createScaleScoring({ questions, types, dimensionOrder, levels, invertDimensions = [] }) {
  return function calculateScores(answers) {
    const { scores: rawScores, raw } = normalizeDimensionScores(answers, questions, dimensionOrder);
    const scores = applyInversions(rawScores, invertDimensions);
    const sorted = buildSorted(scores, dimensionOrder);
    const summaryCode = sorted.map((s) => s.type).join('');
    const indexScore = Math.round(
      dimensionOrder.reduce((sum, t) => sum + scores[t], 0) / dimensionOrder.length
    );
    const level = getLevelFromScore(indexScore, levels);
    return {
      scores,
      raw: rawScores,
      sorted,
      summaryCode,
      indexScore,
      level,
      primary: sorted[0],
      secondary: sorted[1],
      tertiary: sorted[2],
      hollandCode: summaryCode,
    };
  };
}

function createScaleResultBuilder({
  surveyType,
  renderType = 'scale',
  types,
  dimensionOrder,
  indexLabel,
  indexLabelShort,
  getProfile,
  getSummary,
  codePrefix,
}) {
  return function buildResultData(scoring) {
    const profile = getProfile ? getProfile(scoring) : scoring.level;
    const primary = scoring.primary;
    const typeInfo = types[primary.type];
    const code = codePrefix ? `${codePrefix}${scoring.indexScore}` : scoring.summaryCode;
    const shareTitle = `${profile.emoji || ''} ${indexLabelShort || indexLabel} ${scoring.indexScore}% (${scoring.summaryCode})`.trim();
    const shareText = `${indexLabel}: ${scoring.indexScore}% — ${profile.name}. Lihat:`;

    return {
      renderType,
      surveyType,
      indexScore: scoring.indexScore,
      indexLabel,
      summaryCode: scoring.summaryCode,
      hollandCode: code,
      profile,
      level: scoring.level,
      primary: scoring.primary,
      secondary: scoring.secondary,
      tertiary: scoring.tertiary,
      scores: scoring.scores,
      sorted: scoring.sorted,
      types,
      congruenceDescription: getSummary(scoring, typeInfo),
      shareTitle,
      shareText,
      dominantStyle: typeInfo?.style || typeInfo?.description || '',
    };
  };
}

function createScaleSurveyModule(config) {
  const {
    slug,
    meta,
    questions,
    types,
    dimensionOrder,
    levels,
    pustaka,
    surveyType,
    renderType = 'scale',
    invertDimensions = [],
    indexLabel,
    indexLabelShort,
    getProfile,
    getSummary,
    codePrefix,
    validateAnswer = (v) => v >= 1 && v <= 5,
  } = config;

  const calculateScores = createScaleScoring({
    questions,
    types,
    dimensionOrder,
    levels,
    invertDimensions,
  });

  const buildResultData = createScaleResultBuilder({
    surveyType,
    renderType,
    types,
    dimensionOrder,
    indexLabel,
    indexLabelShort,
    getProfile,
    getSummary,
    codePrefix,
  });

  return {
    slug,
    meta,
    questions,
    types,
    pustaka: pustaka || [],
    validateAnswer,
    calculateScores,
    buildResultData,
    summaryCode: (scoring) => (codePrefix ? `${codePrefix}${scoring.indexScore}` : scoring.summaryCode),
    og: (result) => {
      const data = result.resultData;
      const profile = data.profile || data.level;
      return {
        code: data.hollandCode || data.summaryCode,
        label: `${profile?.emoji || ''} ${profile?.name || data.level?.name} (${data.indexScore}%)`.trim(),
        subtitle: `${data.indexLabel} · ${meta.title}`,
        color: data.types?.[data.primary?.type]?.color || '#0891B2',
      };
    },
    renderType,
  };
}

module.exports = {
  normalizeDimensionScores,
  buildSorted,
  getLevelFromScore,
  applyInversions,
  createScaleScoring,
  createScaleResultBuilder,
  createScaleSurveyModule,
};
