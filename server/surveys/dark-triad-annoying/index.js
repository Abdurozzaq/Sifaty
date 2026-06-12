const core = require('./core');
const PUSTAKA = require('./pustaka');

module.exports = {
  slug: 'dark-triad-annoying',
  meta: { ...core.SURVEY_META, audience: 'umum' },
  questions: core.QUESTIONS,
  types: core.DTDD_TYPES,
  pustaka: PUSTAKA,
  validateAnswer: (v) => v >= 1 && v <= 5,
  calculateScores: core.calculateScores,
  buildResultData: (scoring) => ({ ...core.buildResultData(scoring), renderType: 'dtdd' }),
  summaryCode: (scoring) => scoring.dtddCode,
  og: (result) => {
    const data = result.resultData;
    const typeInfo = data.types[data.primary.type];
    return {
      code: data.dtddCode,
      label: `${data.annoyanceLevel.emoji} ${data.annoyanceLevel.name} (${data.annoyanceScore}%)`,
      subtitle: `${typeInfo.name} · Dark Triad Survey`,
      color: typeInfo?.color,
    };
  },
  renderType: 'dtdd',
};
