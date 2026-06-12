const core = require('./core');
const PUSTAKA = require('./pustaka');

module.exports = {
  slug: 'riasec-career',
  meta: { ...core.SURVEYS[0], audience: 'umum' },
  questions: core.QUESTIONS,
  types: core.RIASEC_TYPES,
  pustaka: PUSTAKA,
  validateAnswer: (v) => v >= 1 && v <= 5,
  calculateScores: core.calculateScores,
  buildResultData: (scoring) => ({
    renderType: 'riasec',
    surveyType: 'riasec',
    hollandCode: scoring.hollandCode,
    primary: scoring.primary,
    secondary: scoring.secondary,
    tertiary: scoring.tertiary,
    scores: scoring.scores,
    sorted: scoring.sorted,
    strongTraits: scoring.strongTraits,
    dominantTypes: scoring.dominantTypes,
    recommendedCareers: scoring.recommendedCareers,
    congruenceDescription: core.getCongruenceDescription(scoring.hollandCode),
    types: Object.fromEntries(scoring.sorted.map(({ type }) => [type, core.RIASEC_TYPES[type]])),
  }),
  summaryCode: (scoring) => scoring.hollandCode,
  og: (result) => {
    const typeInfo = result.resultData.types[result.resultData.primary.type];
    return {
      code: result.hollandCode,
      label: `${typeInfo.emoji} ${typeInfo.name}`,
      subtitle: 'Holland RIASEC Career Survey',
      color: typeInfo?.color,
    };
  },
  renderType: 'riasec',
};
