/** Persist jawaban survey di sessionStorage (per slug). */

const PREFIX = 'sifaty:quiz:';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function storageKey(slug) {
  return `${PREFIX}${slug}`;
}

export function saveQuizDraft(slug, data) {
  if (!slug) return;
  try {
    sessionStorage.setItem(storageKey(slug), JSON.stringify({
      answers: data.answers || {},
      ageAnswers: data.ageAnswers || {},
      participantName: data.participantName || '',
      currentQuestion: data.currentQuestion ?? 0,
      savedAt: Date.now(),
    }));
  } catch {
    /* quota / private mode */
  }
}

export function loadQuizDraft(slug) {
  if (!slug) return null;
  try {
    const raw = sessionStorage.getItem(storageKey(slug));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.savedAt || Date.now() - data.savedAt > MAX_AGE_MS) {
      clearQuizDraft(slug);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearQuizDraft(slug) {
  if (!slug) return;
  try {
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
