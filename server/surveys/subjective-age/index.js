const core = require('./core');
const PUSTAKA = require('./pustaka');

module.exports = {
  slug: 'subjective-age',
  meta: { ...core.SURVEY_META, audience: 'umum' },
  questions: core.QUESTIONS,
  types: core.SAGE_TYPES,
  pustaka: PUSTAKA,
  validateAnswer: core.validateAnswer,
  getRequiredAnswerKeys: core.getRequiredAnswerKeys,
  calculateScores: core.calculateScores,
  buildResultData: (scoring) => ({ ...core.buildResultData(scoring), renderType: 'sage' }),
  summaryCode: (scoring) => scoring.mindsetCode,
  og: (result) => {
    const data = result.resultData;
    const profile = data.mindsetProfile;
    return {
      code: data.mindsetCode,
      label: `${profile.emoji} ${profile.name} (usia pikiran ${data.cognitiveAge})`,
      subtitle: `Kronologis ${data.chronologicalAge} · Gap ${data.gapLabel} th`,
      color: data.types?.[data.primary?.type]?.color,
    };
  },
  renderType: 'sage',
};
