const { getRegistry } = require('./registry');

function getAllPustaka() {
  const registry = getRegistry();
  const all = [];
  for (const [slug, mod] of Object.entries(registry)) {
    for (const ref of mod.pustaka || []) {
      all.push({
        ...ref,
        usedIn: ref.usedIn?.length ? ref.usedIn : [slug],
      });
    }
  }
  return all.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

function getSurveyLabels() {
  const registry = getRegistry();
  const labels = {};
  for (const [slug, mod] of Object.entries(registry)) {
    labels[slug] = mod.meta?.title || slug;
  }
  return labels;
}

function getPustakaBySurvey(slug) {
  return getAllPustaka().filter((p) => p.usedIn?.includes(slug));
}

module.exports = { getAllPustaka, getSurveyLabels, getPustakaBySurvey };
