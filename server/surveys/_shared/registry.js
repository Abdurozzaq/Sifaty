const fs = require('fs');
const path = require('path');
const { enrichSurveyMeta, getCatalogFacets } = require('./survey-catalog');

const SURVEYS_DIR = path.join(__dirname, '..');

const AUDIENCE_ORDER = { mahasiswa: 0, pekerja: 1, umum: 2 };

function loadRegistry() {
  const registry = {};
  const entries = fs.readdirSync(SURVEYS_DIR, { withFileTypes: true });

  for (const ent of entries) {
    if (!ent.isDirectory() || ent.name.startsWith('_')) continue;
    const modPath = path.join(SURVEYS_DIR, ent.name);
    const indexPath = path.join(modPath, 'index.js');
    delete require.cache[require.resolve(indexPath)];
    const mod = require(indexPath);
    const slug = mod.slug || ent.name;
    registry[slug] = {
      meta: mod.meta,
      questions: mod.questions,
      types: mod.types,
      pustaka: mod.pustaka || [],
      validateAnswer: mod.validateAnswer || ((v) => v >= 1 && v <= 5),
      getRequiredAnswerKeys: mod.getRequiredAnswerKeys,
      calculateScores: mod.calculateScores,
      buildResultData: mod.buildResultData,
      summaryCode: mod.summaryCode || ((s) => s.summaryCode || s.hollandCode),
      og: mod.og,
      renderType: mod.renderType,
    };
  }
  return registry;
}

let REGISTRY = null;

function getRegistry() {
  if (!REGISTRY) REGISTRY = loadRegistry();
  return REGISTRY;
}

function getAllSurveys() {
  const registry = getRegistry();
  return Object.values(registry)
    .map((r) => enrichSurveyMeta(r.meta))
    .filter((s) => s.active !== false)
    .sort((a, b) => {
      const audA = AUDIENCE_ORDER[a.audience || 'umum'] ?? 2;
      const audB = AUDIENCE_ORDER[b.audience || 'umum'] ?? 2;
      if (audA !== audB) return audA - audB;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.title.localeCompare(b.title, 'id');
    });
}

function getModule(slug) {
  return getRegistry()[slug] || null;
}

function reloadRegistry() {
  const entries = fs.readdirSync(SURVEYS_DIR, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory() || ent.name.startsWith('_')) continue;
    const indexPath = path.join(SURVEYS_DIR, ent.name, 'index.js');
    try {
      delete require.cache[require.resolve(indexPath)];
    } catch {
      /* folder tanpa index */
    }
  }
  REGISTRY = null;
  return getRegistry();
}

module.exports = { getRegistry, getAllSurveys, getModule, reloadRegistry, getCatalogFacets, enrichSurveyMeta };
