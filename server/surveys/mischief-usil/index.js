const core = require('./core');
const PUSTAKA = require('./pustaka');

module.exports = {
  slug: 'mischief-usil',
  meta: { ...core.SURVEY_META, audience: 'umum' },
  questions: core.QUESTIONS,
  types: core.USIL_TYPES,
  pustaka: PUSTAKA,
  validateAnswer: (v) => v >= 1 && v <= 5,
  calculateScores: core.calculateScores,
  buildResultData: (scoring) => ({ ...core.buildResultData(scoring), renderType: 'usil' }),
  summaryCode: (scoring) => scoring.usilCode,
  og: (result) => {
    const data = result.resultData;
    const profile = data.usilProfile;
    return {
      code: data.usilCode,
      label: `${profile.emoji} ${profile.name} (${data.usilScore}%)`,
      subtitle: `${data.usilLevel.name} · Survey Keusilan`,
      color: data.types?.[data.primary?.type]?.color,
    };
  },
  renderType: 'usil',
};
