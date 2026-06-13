/** Persist jawaban survey di localStorage (per slug). */

const PREFIX = 'sifaty:quiz:';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function storageKey(slug) {
  return `${PREFIX}${slug}`;
}

function readRaw(slug) {
  try {
    return localStorage.getItem(storageKey(slug))
      || sessionStorage.getItem(storageKey(slug));
  } catch {
    return null;
  }
}

function writeRaw(slug, raw) {
  try {
    localStorage.setItem(storageKey(slug), raw);
    sessionStorage.removeItem(storageKey(slug));
  } catch {
    /* quota / private mode */
  }
}

export function saveQuizDraft(slug, data) {
  if (!slug) return;
  writeRaw(slug, JSON.stringify({
    answers: data.answers || {},
    ageAnswers: data.ageAnswers || {},
    participantName: data.participantName || '',
    currentQuestion: data.currentQuestion ?? 0,
    savedAt: Date.now(),
  }));
}

export function loadQuizDraft(slug) {
  if (!slug) return null;
  try {
    const raw = readRaw(slug);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.savedAt || Date.now() - data.savedAt > MAX_AGE_MS) {
      clearQuizDraft(slug);
      return null;
    }
    if (!localStorage.getItem(storageKey(slug))) {
      writeRaw(slug, raw);
    }
    return data;
  } catch {
    return null;
  }
}

export function clearQuizDraft(slug) {
  if (!slug) return;
  try {
    localStorage.removeItem(storageKey(slug));
    sessionStorage.removeItem(storageKey(slug));
  } catch {
    /* ignore */
  }
}

export function snapshotFromState(state) {
  return {
    answers: state.answers,
    ageAnswers: state.ageAnswers,
    participantName: state.participantName,
    currentQuestion: state.currentQuestion,
  };
}
