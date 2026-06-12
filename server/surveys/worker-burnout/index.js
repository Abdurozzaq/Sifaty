const { createScaleSurveyModule } = require('../_shared/likert-helper');
const config = require('./survey');
const PUSTAKA = require('./pustaka');

module.exports = createScaleSurveyModule({ ...config, pustaka: PUSTAKA });
