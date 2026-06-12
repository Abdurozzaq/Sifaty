import { renderResultScale } from './scale.js';

const LEGACY_RENDERERS = {};

export function registerLegacyRenderer(type, fn) {
  LEGACY_RENDERERS[type] = fn;
}

export function renderResultPage(r, helpers) {
  const type = r.resultData?.renderType || r.resultData?.surveyType;

  if (type === 'scale') return renderResultScale(r, helpers);
  if (LEGACY_RENDERERS[type]) return LEGACY_RENDERERS[type](r, helpers);

  return LEGACY_RENDERERS.riasec?.(r, helpers) || '';
}
