/** @deprecated Use server/surveys/_shared/pustaka-aggregator.js */
const { getAllPustaka, getSurveyLabels } = require('../surveys/_shared/pustaka-aggregator');

module.exports = {
  PUSTAKA: getAllPustaka(),
  SURVEY_LABELS: getSurveyLabels(),
};
