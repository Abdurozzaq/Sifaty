const { createScaleSurveyModule } = require('../_shared/likert-helper');
const config = require('./survey');
const pustaka = require('./pustaka');

module.exports = createScaleSurveyModule({ ...config, pustaka });
