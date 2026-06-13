import { LIKERT, escapeHtml, getSurveyDimTitle, getDimBadge, audienceBadge, stripYearLabel, filterSurveyTags } from './core/ui.js';
import {
  DEFAULT_STORE_FILTERS,
  parseStoreFiltersFromUrl,
  syncStoreFiltersToUrl,
  filterSurveys,
  getFeaturedSurveys,
  hasActiveFilters,
  paginateList,
  PAGE_SIZE,
} from './core/store.js';
import {
  saveQuizDraft,
  loadQuizDraft,
  clearQuizDraft,
  snapshotFromState,
} from './core/quiz-persist.js';
import { renderResultPage, registerLegacyRenderer } from './renderers/index.js';
import {
  NAV_ITEMS,
  renderFooter,
  renderTrustStrip,
  renderAboutPage,
  renderPenggunaanPage,
  renderCreditsPage,
} from './pages/site.js';

const API = '/api';

let state = {
  route: 'home',
  surveys: [],
  pustaka: [],
  currentSurvey: null,
  surveySlug: null,
  surveyPhase: 'detail',
  answers: {},
  currentQuestion: 0,
  participantName: '',
  ageAnswers: {},
  surveyPustaka: [],
  result: null,
  loading: false,
  advancing: false,
  storeFilters: { ...DEFAULT_STORE_FILTERS },
  catalogFacets: null,
};

let mobileNavOpen = false;

let advanceTimer = null;

function resetSurveyUiState() {
  state.loading = false;
  state.advancing = false;
  clearTimeout(advanceTimer);
  advanceTimer = null;
}

function persistQuizDraft() {
  if (state.route !== 'survey' || state.surveyPhase !== 'quiz' || !state.surveySlug) return;
  saveQuizDraft(state.surveySlug, snapshotFromState(state));
}

function restoreQuizDraft() {
  const draft = loadQuizDraft(state.surveySlug);
  if (!draft) return false;

  state.answers = { ...(draft.answers || {}) };
  state.ageAnswers = { ...(draft.ageAnswers || {}) };
  state.participantName = draft.participantName || '';

  const params = new URLSearchParams(window.location.search);
  const urlHasIndex = params.has('q') || params.get('done') === '1';
  if (!urlHasIndex && typeof draft.currentQuestion === 'number') {
    const total = state.currentSurvey?.questions?.length || 0;
    state.currentQuestion = Math.min(Math.max(0, draft.currentQuestion), total);
    syncQuizUrl(true);
  }
  return true;
}

const app = document.getElementById('app');

// ─── Router ───────────────────────────────────────────────────

function applyQuizIndexFromUrl() {
  if (state.surveyPhase !== 'quiz') return;
  const params = new URLSearchParams(window.location.search);
  const total = state.currentSurvey?.questions?.length || 0;

  if (params.get('done') === '1') {
    state.currentQuestion = total;
  } else {
    const q = parseInt(params.get('q') || '0', 10);
    state.currentQuestion = Number.isNaN(q) ? 0 : Math.min(Math.max(0, q), total);
  }
}

function syncQuizUrl(replace = false) {
  if (state.route !== 'survey' || state.surveyPhase !== 'quiz') return;
  const total = state.currentSurvey?.questions?.length || 0;
  let url = `/survey/${state.surveySlug}/mulai`;
  if (state.currentQuestion >= total) url += '?done=1';
  else if (state.currentQuestion > 0) url += `?q=${state.currentQuestion}`;

  const current = window.location.pathname + window.location.search;
  if (current === url) return;
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
}

function parseRoute() {
  const path = window.location.pathname;
  const surveyMatch = path.match(/^\/survey\/([^/]+)(?:\/(mulai))?$/);
  if (surveyMatch) {
    state.route = 'survey';
    state.surveySlug = surveyMatch[1];
    state.surveyPhase = surveyMatch[2] === 'mulai' ? 'quiz' : 'detail';
  } else if (path.startsWith('/hasil/')) {
    state.route = 'result';
    state.resultId = path.split('/hasil/')[1];
  } else if (path === '/pustaka') {
    state.route = 'pustaka';
  } else if (path === '/tentang') {
    state.route = 'tentang';
  } else if (path === '/penggunaan') {
    state.route = 'penggunaan';
  } else if (path === '/credits') {
    state.route = 'credits';
  } else {
    state.route = 'home';
    state.storeFilters = parseStoreFiltersFromUrl();
  }
}

function navigate(path) {
  closeMobileNav();
  const wasSurvey = state.route === 'survey';
  history.pushState(null, '', path);
  parseRoute();
  if (state.route === 'result' || (wasSurvey && state.route !== 'survey')) {
    resetSurveyUiState();
  }
  render();
}

window.addEventListener('popstate', () => { parseRoute(); render(); });

// ─── API ──────────────────────────────────────────────────────

async function fetchSurveys() {
  const res = await fetch(`${API}/surveys`);
  return res.json();
}

async function fetchSurvey(slug) {
  const res = await fetch(`${API}/surveys/${slug}`);
  if (!res.ok) throw new Error('Survey tidak ditemukan');
  return res.json();
}

async function submitSurvey(slug, answers, name) {
  const res = await fetch(`${API}/surveys/${slug}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, participantName: name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Gagal submit');
  return data;
}

async function fetchResult(id) {
  const res = await fetch(`${API}/results/${id}`);
  if (!res.ok) throw new Error('Hasil tidak ditemukan');
  return res.json();
}

async function fetchPustaka(surveySlug) {
  const url = surveySlug ? `${API}/pustaka?survey=${encodeURIComponent(surveySlug)}` : `${API}/pustaka`;
  const res = await fetch(url);
  return res.json();
}

async function fetchCatalog() {
  const res = await fetch(`${API}/catalog`);
  if (!res.ok) throw new Error('Gagal memuat katalog');
  return res.json();
}

function getPustakaSurveyFilter() {
  return new URLSearchParams(window.location.search).get('survey');
}

function renderPustakaRefCard(ref, i) {
  return `
    <article class="glass rounded-2xl p-5 anim-fade-up card-hover">
      <div class="flex items-start gap-3">
        <span class="text-xs font-bold text-teal-700 bg-slate-100 w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5">
          ${String(i + 1).padStart(2, '0')}
        </span>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="text-[10px] font-semibold uppercase tracking-wide text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${ref.type}</span>
            <span class="text-[10px] text-slate-400">${ref.year}</span>
          </div>
          <h3 class="font-semibold text-sm text-slate-800 leading-snug mb-1">${ref.title}</h3>
          <p class="text-xs text-slate-500 mb-2">${ref.authors}</p>
          <p class="text-xs text-slate-500 italic mb-3">${ref.journal}${ref.volume ? `, Vol. ${ref.volume}` : ''}</p>
          ${ref.doi ? `<p class="text-[11px] text-slate-400 mb-3">DOI: ${ref.doi}</p>` : ''}
          <p class="text-xs text-slate-600 leading-relaxed">${ref.relevance}</p>
        </div>
      </div>
    </article>`;
}

async function fetchResultByCode(code) {
  const res = await fetch(`${API}/results/code/${encodeURIComponent(code)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kode tidak ditemukan');
  return data;
}

function normalizeLookupCode(raw) {
  let code = String(raw || '').trim().toUpperCase().replace(/\s/g, '');
  if (!code) return '';
  if (!code.startsWith('SF-')) code = `SF-${code.replace(/^SF-?/, '')}`;
  return code;
}

// ─── Utils ────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById('toast');
  const inner = t.querySelector('div');
  inner.textContent = msg;
  t.classList.remove('hidden');
  window.sifatyAnim?.toastShow(t);
  setTimeout(() => t.classList.add('hidden'), 3000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Link disalin ke clipboard'));
}

function afterRender() {
  syncMobileNavDom();
  requestAnimationFrame(() => {
    const total = state.currentSurvey?.questions?.length || 0;
    const isQuiz =
      state.route === 'survey' &&
      state.surveyPhase === 'quiz' &&
      state.currentQuestion < total;

    if (isQuiz) {
      window.sifatyAnim?.questionEnter();
      const bar = document.getElementById('survey-progress');
      const pct = (state.currentQuestion / total || 1) * 100;
      window.sifatyAnim?.progressBar(bar, pct);
    } else if (state.route === 'result') {
      window.sifatyAnim?.pageEnter();
      window.sifatyAnim?.scoreBars();
      window.sifatyAnim?.hollandCode(document.getElementById('holland-code'));
      window.sifatyAnim?.resultCelebration();
    } else {
      window.sifatyAnim?.pageEnter();
    }
  });
}

// ─── Views ────────────────────────────────────────────────────

function isQuizScreen() {
  const total = state.currentSurvey?.questions?.length || 0;
  return (
    state.route === 'survey' &&
    state.surveyPhase === 'quiz' &&
    state.currentQuestion < total
  );
}

function renderLookupForm(expectedSurveyId = null) {
  const surveyHint = expectedSurveyId
    ? 'Masukkan kode unik untuk survey ini.'
    : 'Masukkan kode unik hasil survey kamu.';
  const surveyArg = expectedSurveyId ? `'${expectedSurveyId}'` : 'null';

  return `
    <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
      <h3 class="font-display text-sm font-bold text-slate-800 mb-1 uppercase tracking-wide">Lihat Hasil Lagi</h3>
      <p class="text-xs text-slate-500 mb-4">${surveyHint} Contoh: <code class="text-cyan-700 font-semibold">SF-HUUHKT</code></p>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          id="lookup-code-input"
          type="text"
          placeholder="SF-HUUHKT"
          autocomplete="off"
          spellcheck="false"
          class="flex-1 px-4 py-2.5 rounded-lg border border-cyan-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm font-mono uppercase tracking-wider"
          onkeydown="if(event.key==='Enter'){event.preventDefault();lookupResult(${surveyArg})}"
        />
        <button
          id="lookup-code-btn"
          type="button"
          onclick="lookupResult(${surveyArg})"
          class="btn-primary btn-solid shrink-0 px-5 py-2.5 rounded-md text-sm font-semibold text-white"
        >Cari Hasil</button>
      </div>
    </section>`;
}

function renderHeader() {
  const headerAnim = isQuizScreen() ? '' : 'anim-fade-up';
  const mobileLinks = [
    ...NAV_ITEMS,
    { path: '/credits', label: 'Credits', route: 'credits' },
  ];
  return `
    <header class="site-header sticky top-0 z-40 ${headerAnim}">
      <div class="site-header-inner">
        <a href="/" onclick="event.preventDefault(); navigate('/')" class="site-logo flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div class="w-9 h-9 rounded-md bg-teal-800 flex items-center justify-center text-white font-display font-bold text-sm shrink-0">S</div>
          <div class="min-w-0">
            <p class="font-display text-base font-bold text-slate-900 leading-tight truncate">Sifaty</p>
            <p class="text-[10px] text-slate-500 -mt-0.5 tracking-wide hidden sm:block">Psikometri &amp; Kesehatan Mental</p>
          </div>
        </a>
        <nav class="site-nav-desktop" aria-label="Navigasi utama">
          ${NAV_ITEMS.map((n) => `
            <a href="${n.path}" onclick="event.preventDefault(); navigate('${n.path}')"
               class="nav-link ${state.route === n.route ? 'nav-link-active' : ''}">${n.label}</a>
          `).join('')}
        </nav>
        <button type="button" id="site-nav-toggle" class="site-nav-toggle" aria-label="Buka menu navigasi"
          aria-expanded="${mobileNavOpen ? 'true' : 'false'}" aria-controls="site-nav-mobile"
          onclick="toggleMobileNav()">
          <span class="site-nav-toggle-bar"></span>
          <span class="site-nav-toggle-bar"></span>
          <span class="site-nav-toggle-bar"></span>
        </button>
      </div>
      <div id="site-nav-backdrop" class="site-nav-backdrop" onclick="closeMobileNav()" aria-hidden="true"></div>
      <nav id="site-nav-mobile" class="site-nav-mobile" aria-label="Menu navigasi">
        ${mobileLinks.map((n) => `
          <a href="${n.path}" onclick="event.preventDefault(); navigate('${n.path}')"
             class="site-nav-mobile-link ${state.route === n.route ? 'site-nav-mobile-link-active' : ''}">${n.label}</a>
        `).join('')}
      </nav>
    </header>`;
}

function syncMobileNavDom() {
  document.documentElement.classList.toggle('nav-open', mobileNavOpen);
  document.body.classList.toggle('nav-open', mobileNavOpen);
  const btn = document.getElementById('site-nav-toggle');
  if (btn) {
    btn.setAttribute('aria-expanded', mobileNavOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', mobileNavOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  }
}

function closeMobileNav() {
  if (!mobileNavOpen) return;
  mobileNavOpen = false;
  syncMobileNavDom();
}

function toggleMobileNav() {
  mobileNavOpen = !mobileNavOpen;
  syncMobileNavDom();
}

function renderStoreChip(key, value, label, active) {
  const safeVal = String(value).replace(/'/g, "\\'");
  const display = String(label).replace(/^[🎓💼🌍🎯🧩📚💼🧠🪞🎉]\s*/, '');
  return `
    <button type="button"
      onclick="setStoreFilter('${key}', '${safeVal}')"
      class="store-chip shrink-0 text-xs font-medium px-3 py-1.5 border transition-colors
        ${active ? 'store-chip-active' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}">
      ${escapeHtml(display)}
    </button>`;
}

function renderMarketplaceCard(s, i) {
  const cat = s.catalog || {};
  const tags = filterSurveyTags(s);
  const polarity = tags.find((t) => t === 'Analisis Negatif' || t === 'Analisis Positif');
  const polarityClass = polarity === 'Analisis Negatif'
    ? 'bg-rose-50 text-rose-700'
    : polarity === 'Analisis Positif'
      ? 'bg-emerald-50 text-emerald-700'
      : '';
  return `
    <article
      class="store-card rounded-lg p-5 cursor-pointer anim-fade-up group"
      style="animation-delay:${Math.min(i * 0.03, 0.3)}s"
      onclick="navigate('/survey/${s.slug}')"
    >
      <div class="flex gap-4">
        <div class="store-card-icon w-12 h-12 flex items-center justify-center text-xl shrink-0">${s.icon}</div>
        <div class="flex-1 min-w-0">
          <h4 class="font-display text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-teal-800 transition-colors mb-1">${escapeHtml(s.title)}</h4>
          <p class="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">${escapeHtml(stripYearLabel(s.subtitle))}</p>
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${audienceBadge(s.audience)}
            ${polarity ? `<span class="text-[10px] font-medium px-2 py-0.5 rounded ${polarityClass}">${polarity}</span>` : ''}
            ${cat.categoryLabel ? `<span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">${escapeHtml(cat.categoryLabel)}</span>` : ''}
            ${cat.methodologyShort ? `<span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">${escapeHtml(cat.methodologyShort)}</span>` : ''}
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
            <span>${s.estimatedMinutes} menit · ${s.questionCount} item</span>
            <span class="text-teal-700 font-medium">Lihat instrumen →</span>
          </div>
        </div>
      </div>
    </article>`;
}

function renderFeaturedCard(s) {
  return `
    <article
      class="store-featured-card shrink-0 w-[260px] sm:w-[280px] rounded-lg p-4 cursor-pointer"
      onclick="navigate('/survey/${s.slug}')"
    >
      <p class="text-[10px] font-semibold uppercase tracking-wide text-teal-700 mb-2">Instrumen unggulan</p>
      <h4 class="font-display font-semibold text-sm text-slate-900 line-clamp-1 mb-1">${escapeHtml(s.title)}</h4>
      <p class="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">${escapeHtml(stripYearLabel(s.subtitle))}</p>
      <p class="text-[11px] text-slate-400">${s.estimatedMinutes} menit · ${s.questionCount} item</p>
    </article>`;
}

function renderStorePagination(p) {
  if (p.totalPages <= 1) {
    return p.total ? `<p class="text-xs text-slate-400 mt-4 text-center">Menampilkan ${p.rangeStart}–${p.rangeEnd} dari ${p.total} instrumen</p>` : '';
  }

  const pages = [];
  for (let i = 1; i <= p.totalPages; i++) {
    if (
      i === 1 ||
      i === p.totalPages ||
      (i >= p.page - 1 && i <= p.page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return `
    <nav class="store-pagination mt-6" aria-label="Paginasi katalog">
      <p class="text-xs text-slate-500 text-center mb-3">
        Menampilkan ${p.rangeStart}–${p.rangeEnd} dari ${p.total} instrumen · Halaman ${p.page} / ${p.totalPages}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-1.5">
        <button type="button"
          onclick="setStorePage(${p.page - 1})"
          class="store-page-btn ${p.page <= 1 ? 'store-page-btn-disabled' : ''}"
          ${p.page <= 1 ? 'disabled' : ''}>← Sebelumnya</button>
        ${pages.map((n) => {
          if (n === '…') return `<span class="store-page-ellipsis">…</span>`;
          return `<button type="button"
            onclick="setStorePage(${n})"
            class="store-page-btn ${n === p.page ? 'store-page-btn-active' : ''}"
            ${n === p.page ? 'aria-current="page"' : ''}>${n}</button>`;
        }).join('')}
        <button type="button"
          onclick="setStorePage(${p.page + 1})"
          class="store-page-btn ${p.page >= p.totalPages ? 'store-page-btn-disabled' : ''}"
          ${p.page >= p.totalPages ? 'disabled' : ''}>Berikutnya →</button>
      </div>
    </nav>`;
}

function renderHome() {
  const surveys = state.surveys;
  const facets = state.catalogFacets;
  const f = state.storeFilters;
  const filtered = filterSurveys(surveys, f);
  const paged = paginateList(filtered, f.page, PAGE_SIZE);
  if (paged.page !== f.page) {
    state.storeFilters.page = paged.page;
    syncStoreFiltersToUrl(state.storeFilters);
  }
  const featured = getFeaturedSurveys(surveys, 5);
  const active = hasActiveFilters(f);

  const chipRow = (title, key, items, allLabel = 'Semua') => {
    if (!items?.length) return '';
    return `
      <div class="mb-5 last:mb-0">
        <p class="text-xs font-semibold text-slate-500 mb-2">${title}</p>
        <div class="store-scroll-x flex gap-2 pb-1">
          ${renderStoreChip(key, 'all', allLabel, f[key] === 'all')}
          ${items.map((item) => renderStoreChip(key, item.id, item.label, f[key] === item.id)).join('')}
        </div>
      </div>`;
  };

  const audienceFacets = facets?.audiences?.filter((a) => a.id !== 'all') || [
    { id: 'mahasiswa', label: 'Mahasiswa' },
    { id: 'pekerja', label: 'Pekerja' },
    { id: 'umum', label: 'Umum' },
  ];

  return `
    ${renderHeader()}
    <main class="max-w-6xl mx-auto px-4 pb-4">
      <section class="store-hero rounded-lg p-5 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-8 mb-6 anim-fade-up">
        <p class="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-3">Platform Psikometri Edukatif</p>
        <h2 class="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight max-w-2xl">
          Katalog instrumen pengukuran psikologis berbasis penelitian
        </h2>
        <p class="text-sm text-slate-600 max-w-2xl leading-relaxed mb-6">
          Sifaty menyediakan survey dan skala psikometri yang tervalidasi untuk refleksi diri,
          edukasi kesehatan mental, dan literasi psikologis—dengan referensi jurnal yang transparan.
        </p>
        ${renderTrustStrip()}
        <p class="text-xs text-slate-400 mt-5">${surveys.length} instrumen tersedia · <a href="/pustaka" onclick="event.preventDefault(); navigate('/pustaka')" class="text-teal-700 hover:underline">Lihat pustaka referensi</a></p>
      </section>

      <section class="sticky top-16 z-30 mb-6 anim-fade-up store-sticky-search">
        <div class="store-search rounded-lg p-1.5 flex flex-col sm:flex-row gap-2">
          <div class="flex-1 flex items-center gap-2 px-3 min-w-0">
            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input id="store-search-input" type="search" placeholder="Cari instrumen..."
              value="${escapeHtml(f.search)}"
              class="w-full py-2 bg-transparent text-sm focus:outline-none placeholder:text-slate-400 text-slate-700"
              oninput="onStoreSearch(this.value)" />
          </div>
          <select class="text-xs font-medium border border-slate-200 bg-slate-50 text-slate-700 rounded-md px-3 py-2.5 sm:py-2 focus:outline-none focus:border-teal-600 w-full sm:w-auto shrink-0"
            onchange="setStoreFilter('sort', this.value)">
            <option value="featured" ${f.sort === 'featured' ? 'selected' : ''}>Unggulan</option>
            <option value="az" ${f.sort === 'az' ? 'selected' : ''}>A–Z</option>
            <option value="time" ${f.sort === 'time' ? 'selected' : ''}>Durasi terpendek</option>
            <option value="questions" ${f.sort === 'questions' ? 'selected' : ''}>Item ter sedikit</option>
          </select>
        </div>
        ${active ? `<div class="flex items-center justify-between mt-2 px-1">
          <p class="text-xs text-slate-600"><strong>${filtered.length}</strong> instrumen ditemukan</p>
          <button type="button" onclick="clearStoreFilters()" class="text-xs font-medium text-slate-500 hover:text-teal-800">Reset filter</button>
        </div>` : ''}
      </section>

      <section class="glass rounded-lg p-5 mb-8 anim-fade-up">
        ${chipRow('Populasi', 'audience', audienceFacets)}
        ${chipRow('Kategori', 'category', facets?.categories?.map((c) => ({ id: c.id, label: c.label })))}
      </section>

      ${!active && featured.length ? `
        <section class="mb-8 anim-fade-up">
          <h3 class="font-display text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Instrumen unggulan</h3>
          <div class="store-featured rounded-lg p-4">
            <div class="store-scroll-x flex gap-3 pb-1">${featured.map((s) => renderFeaturedCard(s)).join('')}</div>
          </div>
        </section>` : ''}

      <section id="catalog-list" class="mb-10 anim-fade-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display text-sm font-semibold text-slate-800 uppercase tracking-wide">${active ? 'Hasil filter' : 'Semua instrumen'}</h3>
          <span class="text-xs text-slate-400">${filtered.length} instrumen</span>
        </div>
        ${filtered.length ? `
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${paged.items.map((s, i) => renderMarketplaceCard(s, i)).join('')}</div>
          ${renderStorePagination(paged)}
        ` : `
          <div class="glass rounded-lg p-12 text-center">
            <h4 class="font-semibold text-slate-700 mb-1">Instrumen tidak ditemukan</h4>
            <p class="text-sm text-slate-500 mb-4">Ubah kata kunci atau reset filter pencarian</p>
            <button type="button" onclick="clearStoreFilters()" class="btn-primary btn-solid text-sm font-medium px-5 py-2.5 rounded-md">Reset filter</button>
          </div>`}
      </section>

      ${renderLookupForm()}

      <section class="glass rounded-lg p-6 mb-4 anim-fade-up">
        <h3 class="font-display text-sm font-semibold text-slate-800 mb-4">Alur penggunaan</h3>
        <ol class="grid sm:grid-cols-4 gap-4">
          ${[
            { step: '1', title: 'Pilih instrumen', desc: 'Filter berdasarkan populasi dan kategori' },
            { step: '2', title: 'Pelajari metodologi', desc: 'Baca teori, dimensi, dan referensi jurnal' },
            { step: '3', title: 'Isi skala', desc: 'Jawab item secara jujur (~3–5 menit)' },
            { step: '4', title: 'Interpretasi hasil', desc: 'Gunakan skor untuk refleksi, bukan diagnosis' },
          ].map((s) => `
            <li>
              <span class="text-xs font-bold text-teal-700 mb-2 block">${s.step}</span>
              <h4 class="font-semibold text-slate-800 text-sm mb-1">${s.title}</h4>
              <p class="text-xs text-slate-500 leading-relaxed">${s.desc}</p>
            </li>`).join('')}
        </ol>
        <p class="text-xs text-slate-400 mt-5 pt-4 border-t border-slate-100">
          Pelajari batasan etis penggunaan di halaman
          <a href="/penggunaan" onclick="event.preventDefault(); navigate('/penggunaan')" class="text-teal-700 hover:underline">Penggunaan</a>.
        </p>
      </section>
    </main>
    ${renderFooter()}`;
}

function renderPustaka() {
  const filter = getPustakaSurveyFilter();
  const items = state.pustaka;
  const surveys = state.surveys.length ? state.surveys : [];

  const slugTitle = (slug) => surveys.find((s) => s.slug === slug || s.id === slug)?.title || slug;

  const grouped = {};
  for (const ref of items) {
    for (const slug of ref.usedIn || []) {
      if (!grouped[slug]) grouped[slug] = [];
      grouped[slug].push(ref);
    }
  }

  const slugs = filter
    ? [filter]
    : Object.keys(grouped).sort((a, b) => slugTitle(a).localeCompare(slugTitle(b), 'id'));

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-10">
      <section class="mb-8 anim-fade-up">
        <p class="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">Referensi Akademik</p>
        <h2 class="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">Pustaka</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          Daftar jurnal dan publikasi ilmiah yang menjadi dasar metodologi setiap instrumen di Sifaty.
        </p>
        ${filter ? `
          <p class="text-xs text-slate-600 mt-3 bg-slate-50 border border-slate-200 inline-block px-3 py-1.5 rounded-md">
            Filter: ${escapeHtml(slugTitle(filter))}
            <button onclick="navigate('/pustaka')" class="ml-2 text-teal-700 hover:underline">Lihat semua</button>
          </p>
        ` : ''}
      </section>

      <div class="space-y-10">
        ${slugs.map((slug) => {
          const refs = grouped[slug] || [];
          if (!refs.length) return '';
          return `
            <section class="anim-fade-up">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-display text-base font-bold text-slate-800">${escapeHtml(slugTitle(slug))}</h3>
                <span class="text-[11px] text-slate-400">${refs.length} referensi</span>
              </div>
              <div class="space-y-4">
                ${refs.map((ref, i) => renderPustakaRefCard(ref, i)).join('')}
              </div>
            </section>
          `;
        }).join('')}
      </div>

      <div class="text-center mt-8 anim-fade-up">
        <button onclick="navigate('/')" class="text-teal-700 text-sm font-medium hover:text-teal-900">
          ← Kembali ke katalog
        </button>
      </div>
    </main>
    ${renderFooter()}`;
}

function renderSurveyCard(s, i) {
  return renderMarketplaceCard(s, i);
}

function renderSurveyDetail() {
  const survey = state.currentSurvey;
  if (!survey) return `${renderHeader()}<main class="text-center py-20 text-cyan-600 text-sm">Memuat...</main>`;

  const d = survey.detail;
  const types = survey.types ? Object.values(survey.types) : [];

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <button onclick="navigate('/')" class="text-teal-700 text-xs font-medium mb-6 hover:text-teal-900 anim-fade-up">
        ← Kembali ke katalog
      </button>

      <section class="glass rounded-lg p-6 mb-5 anim-fade-up">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">${survey.icon}</div>
          <div>
            <h2 class="font-display text-xl font-bold text-slate-900 mb-1">${survey.title}</h2>
            <p class="text-sm text-slate-600 mb-3 leading-relaxed">${stripYearLabel(survey.subtitle)}</p>
            <div class="flex flex-wrap gap-1.5">
              ${audienceBadge(survey.audience)}
              ${filterSurveyTags(survey).map((t) => `<span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">${t}</span>`).join('')}
            </div>
            ${survey.catalog ? `
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">${survey.catalog.categoryLabel}</span>
                <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">${survey.catalog.methodologyShort}</span>
              </div>
            ` : ''}
            <p class="text-xs text-slate-400 mt-3">${survey.estimatedMinutes} menit · ${survey.questionCount} item</p>
          </div>
        </div>
      </section>

      <aside class="glass rounded-lg px-4 py-3 mb-5 text-xs text-slate-500 leading-relaxed anim-fade-up border-l-4 border-teal-700">
        Hasil instrumen ini bersifat <strong class="font-medium text-slate-700">edukatif dan reflektif</strong>, bukan diagnosis klinis.
        Baca <a href="/penggunaan" onclick="event.preventDefault(); navigate('/penggunaan')" class="text-teal-700 hover:underline">panduan penggunaan</a> sebelum memulai.
      </aside>

      ${d ? `
        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Tentang Survey</h3>
          <p class="text-sm text-slate-600 leading-relaxed">${d.about}</p>
        </section>

        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">${d.theory.title}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">${d.theory.content}</p>
        </section>

        ${types.length ? `
          <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
            <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">${getSurveyDimTitle(survey.slug, types.length)}</h3>
            <div class="grid sm:grid-cols-2 gap-3">
              ${types.map((t) => `
                <div class="bg-white/70 rounded-xl p-3.5 border border-slate-100">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-lg">${t.emoji}</span>
                    <span class="font-semibold text-sm" style="color:${t.color}">${t.code} · ${t.name}</span>
                  </div>
                  <p class="text-xs text-slate-500 leading-relaxed">${t.description}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Cara Kerja</h3>
          <div class="space-y-3">
            ${d.howItWorks.map((step) => `
              <div class="flex gap-3">
                <span class="text-xs font-bold text-cyan-500 bg-cyan-50 w-7 h-7 rounded-lg flex items-center justify-center shrink-0">${step.step}</span>
                <div>
                  <h4 class="font-semibold text-sm text-slate-700">${step.title}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${step.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">${d.methodology.title}</h3>
          <ul class="space-y-2">
            ${d.methodology.items.map((item) => `
              <li class="flex gap-2 text-sm text-slate-600">
                <span class="text-cyan-500 shrink-0">·</span>${item}
              </li>
            `).join('')}
          </ul>
        </section>

        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">${d.results.title}</h3>
          <ul class="space-y-2">
            ${d.results.items.map((item) => `
              <li class="flex gap-2 text-sm text-slate-600">
                <span class="text-cyan-500 shrink-0">✓</span>${item}
              </li>
            `).join('')}
          </ul>
        </section>

        ${state.surveyPustaka.length ? `
          <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
            <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Referensi Survey</h3>
            <div class="space-y-3">
              ${state.surveyPustaka.slice(0, 4).map((ref) => `
                <div class="bg-white/70 rounded-xl p-3.5 border border-slate-100">
                  <p class="text-xs font-semibold text-slate-800 leading-snug mb-1">${ref.title}</p>
                  <p class="text-[11px] text-slate-500">${ref.authors} (${ref.year})</p>
                </div>
              `).join('')}
            </div>
            <p class="text-center text-xs text-slate-400 mt-4">
              ${state.surveyPustaka.length > 4 ? `${state.surveyPustaka.length} referensi · ` : ''}
              <a href="/pustaka?survey=${survey.slug}" onclick="event.preventDefault(); navigate('/pustaka?survey=${survey.slug}')" class="text-cyan-600 hover:underline">Lihat semua di Pustaka</a>
            </p>
          </section>
        ` : `
          <p class="text-center text-xs text-slate-400 mb-6 anim-fade-up">
            Referensi akademik tersedia di
            <a href="/pustaka?survey=${survey.slug}" onclick="event.preventDefault(); navigate('/pustaka?survey=${survey.slug}')" class="text-cyan-600 hover:underline">halaman Pustaka</a>
          </p>
        `}
      ` : `
        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <p class="text-sm text-slate-600 leading-relaxed">${survey.description}</p>
        </section>
      `}

      ${renderLookupForm(survey.id)}

      <button
        onclick="startSurvey()"
        class="btn-primary btn-solid w-full py-3.5 rounded-md font-semibold text-white text-sm anim-fade-up"
      >Mulai Survey</button>
    </main>`;
}

function renderSurvey() {
  const survey = state.currentSurvey;
  if (!survey) return `${renderHeader()}<main class="text-center py-20 text-cyan-600 text-sm">Memuat survey...</main>`;

  const questions = survey.questions;
  const total = questions.length;
  const idx = state.currentQuestion;
  const q = questions[idx];
  const progress = (idx / total) * 100;
  const answered = state.answers[q?.id];

  if (idx >= total) return renderSurveyComplete();

  return `
    ${renderHeader()}
    <main class="max-w-2xl mx-auto px-4 py-6">
      <button
        type="button"
        class="flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 px-3 py-2 rounded-lg -ml-3 mb-4"
        onclick="prevQuestion()"
      >
        <span aria-hidden="true">←</span>
        ${idx === 0 ? 'Kembali ke detail' : 'Kembali'}
      </button>

      <div class="mb-6">
        <div class="flex justify-between text-xs text-cyan-700 mb-2 font-medium">
          <span>Pertanyaan ${idx + 1} dari ${total}</span>
          <span>${Math.round(progress)}%</span>
        </div>
        <div class="h-1.5 bg-cyan-100 rounded-full overflow-hidden">
          <div id="survey-progress" class="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" style="width:0%"></div>
        </div>
      </div>

      <div class="glass rounded-2xl p-7 mb-5" id="question-card">
        <div class="mb-6">
          <span class="inline-block text-[11px] font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded mb-3 uppercase tracking-wide">
            ${getDimBadge(survey, q.type)}
          </span>
          <h3 class="font-display text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">${q.text}</h3>
        </div>

        <div class="flex justify-between gap-2 mt-6">
          ${LIKERT.map((l) => `
            <button
              class="likert-btn flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl
                     ${answered === l.value
                       ? 'selected bg-cyan-50 border-2 border-cyan-400 text-cyan-800'
                       : 'bg-white border border-slate-200 hover:border-cyan-300 text-slate-600'}"
              onclick="selectAnswer('${q.id}', ${l.value}, this)"
            >
              <span class="text-base font-bold">${l.label}</span>
              <span class="text-[10px] font-medium text-slate-400">${l.desc}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <p class="text-center text-[11px] text-slate-400 mt-3">Pilih jawaban untuk lanjut otomatis</p>
    </main>`;
}

function renderSurveyComplete() {
  const survey = state.currentSurvey;
  const ageFields = survey?.ageFields || [];

  return `
    ${renderHeader()}
    <main class="max-w-md mx-auto px-4 py-12 anim-fade-up">
      <button
        type="button"
        class="flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 px-3 py-2 rounded-lg -ml-3 mb-6"
        onclick="prevQuestion()"
      >
        <span aria-hidden="true">←</span> Kembali ke pertanyaan terakhir
      </button>

      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">✓</div>
        <h2 class="font-display text-2xl font-bold text-slate-800 mb-2">Survey Selesai</h2>
        <p class="text-sm text-slate-500">Masukkan nama untuk hasil yang lebih personal (opsional)</p>
      </div>

      <div class="glass rounded-2xl p-6 mb-5">
        <label class="block text-left text-xs font-semibold text-cyan-700 mb-2 uppercase tracking-wide">Nama</label>
        <input
          type="text"
          placeholder="Contoh: Budi Santoso"
          value="${escapeHtml(state.participantName)}"
          class="w-full px-4 py-2.5 rounded-lg border border-cyan-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm"
          oninput="setParticipantName(this.value)"
        />
      </div>

      ${ageFields.length ? `
        <div class="glass rounded-2xl p-6 mb-5">
          <h3 class="text-left text-xs font-semibold text-cyan-700 mb-3 uppercase tracking-wide">Usia (tahun)</h3>
          <p class="text-left text-[11px] text-slate-500 mb-4">Diperlukan untuk menghitung Cognitive Age vs usia kronologis (Barak & Schiffman, 1981).</p>
          <div class="space-y-3">
            ${ageFields.map((f) => `
              <div>
                <label class="block text-left text-xs font-medium text-slate-700 mb-1">${f.label}</label>
                <input
                  type="number"
                  min="10"
                  max="99"
                  placeholder="${f.hint}"
                  value="${state.ageAnswers[f.id] || ''}"
                  class="w-full px-4 py-2.5 rounded-lg border border-cyan-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm"
                  oninput="setAgeAnswer('${f.id}', this.value)"
                />
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <button
        class="btn-primary w-full py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-cyan-500 to-sky-500
               ${state.loading ? 'opacity-60 pointer-events-none' : ''}"
        onclick="finishSurvey()"
      >
        ${state.loading ? 'Menghitung hasil...' : 'Lihat Hasil'}
      </button>
    </main>`;
}

function renderResult() {
  const r = state.result;
  if (!r) return `${renderHeader()}<main class="text-center py-20 text-cyan-600 text-sm anim-fade-up">Memuat hasil...</main>`;

  return renderResultPage(r, { renderHeader, renderShareSection });
}

function renderResultRiasec(r) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}Kode Holland
        </p>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-2 anim-hidden" style="color:${typeInfo.color}">${r.hollandCode}</h2>
        <p class="text-lg text-slate-600 anim-fade-up">${typeInfo.name} — <em>${typeInfo.nameId}</em></p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Peta RIASEC</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${data.sorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.name}</div>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="score-bar h-full rounded-full" data-score="${score}" style="background:${info.color}"></div>
                </div>
                <div class="text-sm font-bold mt-1.5" style="color:${info.color}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Tipe ${typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${typeInfo.traits.map((t) => `<span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style="background:${typeInfo.color}18;color:${typeInfo.color}">${t}</span>`).join('')}
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">${data.congruenceDescription}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Rekomendasi Pekerjaan</h3>
        <div class="space-y-2">
          ${data.recommendedCareers.map((c, i) => `
            <div class="flex items-center gap-3 bg-white/70 rounded-xl p-3.5 card-hover">
              <span class="text-xs font-bold text-cyan-300 w-6">${String(i + 1).padStart(2, '0')}</span>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-sm text-slate-800">${c.title}</div>
                <div class="text-[11px] text-slate-400">${c.typeInfo.name}</div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-bold text-sm" style="color:${c.typeInfo.color}">${c.match}%</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'riasec')}
    </main>`;
}

function renderResultDtdd(r) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const level = data.annoyanceLevel;
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}Indeks Menyebalkan
        </p>
        <div class="text-5xl mb-2 anim-fade-up">${level.emoji}</div>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-1 anim-hidden" style="color:${typeInfo.color}">${data.annoyanceScore}%</h2>
        <p class="text-lg font-semibold text-slate-700 anim-fade-up">${level.name}</p>
        <p class="text-sm text-slate-500 mt-2 anim-fade-up">Kode DTDD: <strong>${data.dtddCode}</strong></p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Level Menyebalkan</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${level.desc}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Peta Dark Triad</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${data.sorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.nameId}</div>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="score-bar h-full rounded-full" data-score="${score}" style="background:${info.color}"></div>
                </div>
                <div class="text-sm font-bold mt-1.5" style="color:${info.color}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Dominan: ${typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        <p class="text-sm text-slate-700 mb-3 font-medium">${typeInfo.annoyingStyle}</p>
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${typeInfo.traits.map((t) => `<span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style="background:${typeInfo.color}18;color:${typeInfo.color}">${t}</span>`).join('')}
        </div>
        <ul class="space-y-1.5">
          ${typeInfo.behaviors.map((b) => `<li class="text-xs text-slate-500 flex gap-2"><span class="text-cyan-500">·</span>${b}</li>`).join('')}
        </ul>
        <p class="text-xs text-slate-400 mt-4 leading-relaxed">${data.congruenceDescription}</p>
      </section>

      ${data.annoyingTraits?.length ? `
        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Sisi Menyebalkan yang Menonjol</h3>
          <div class="flex flex-wrap gap-2">
            ${data.annoyingTraits.map((t) => `<span class="text-xs font-medium bg-red-50 text-red-700 px-3 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'dtdd')}
    </main>`;
}

function renderResultVex(r) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const level = data.vulnerabilityLevel;
  const profile = data.vulnerabilityProfile;
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}Indeks Kerentanan
        </p>
        <div class="text-5xl mb-2 anim-fade-up">${level.emoji}</div>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-1 anim-hidden" style="color:${typeInfo.color}">${data.vulnerabilityScore}%</h2>
        <p class="text-lg font-semibold text-slate-700 anim-fade-up">${level.name}</p>
        <p class="text-sm text-slate-500 mt-2 anim-fade-up">${profile.emoji} <strong>${profile.name}</strong></p>
        <p class="text-xs text-slate-400 mt-1 anim-fade-up">Kode VEX: <strong>${data.vexCode}</strong></p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Profil Kerentanan</h3>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">${profile.desc}</p>
        <p class="text-xs text-slate-400 leading-relaxed">${level.desc}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Dua Indeks Utama</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl p-4 bg-blue-50 ring-1 ring-blue-100 text-center">
            <div class="text-2xl mb-1">🎭</div>
            <div class="font-semibold text-xs text-blue-700 mb-2">Indeks Dibodohi</div>
            <div class="text-3xl font-bold text-blue-600">${data.gullibilityScore}%</div>
            <p class="text-[11px] text-slate-500 mt-2">Kognitif · Percaya · Emosional · Situasional</p>
          </div>
          <div class="rounded-xl p-4 bg-orange-50 ring-1 ring-orange-100 text-center">
            <div class="text-2xl mb-1">🧲</div>
            <div class="font-semibold text-xs text-orange-700 mb-2">Indeks Dimanfaatkan</div>
            <div class="text-3xl font-bold text-orange-600">${data.exploitabilityScore}%</div>
            <p class="text-[11px] text-slate-500 mt-2">Compliance & Batas · Dependency</p>
          </div>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Peta 6 Dimensi</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${data.sorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.nameId}</div>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="score-bar h-full rounded-full" data-score="${score}" style="background:${info.color}"></div>
                </div>
                <div class="text-sm font-bold mt-1.5" style="color:${info.color}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Celah Dominan: ${typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        <p class="text-sm text-slate-700 mb-3 font-medium">${typeInfo.vulnerabilityStyle}</p>
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${typeInfo.traits.map((t) => `<span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style="background:${typeInfo.color}18;color:${typeInfo.color}">${t}</span>`).join('')}
        </div>
        <ul class="space-y-1.5">
          ${typeInfo.behaviors.map((b) => `<li class="text-xs text-slate-500 flex gap-2"><span class="text-cyan-500">·</span>${b}</li>`).join('')}
        </ul>
        <p class="text-xs text-slate-400 mt-4 leading-relaxed">${data.congruenceDescription}</p>
      </section>

      ${data.vulnerableTraits?.length ? `
        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Celah yang Menonjol</h3>
          <div class="flex flex-wrap gap-2">
            ${data.vulnerableTraits.map((t) => `<span class="text-xs font-medium bg-amber-50 text-amber-800 px-3 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'vex')}
    </main>`;
}

function renderResultUsil(r) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const level = data.usilLevel;
  const profile = data.usilProfile;
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}Indeks Usil
        </p>
        <div class="text-5xl mb-2 anim-fade-up">${level.emoji}</div>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-1 anim-hidden" style="color:${typeInfo.color}">${data.usilScore}%</h2>
        <p class="text-lg font-semibold text-slate-700 anim-fade-up">${level.name}</p>
        <p class="text-sm text-slate-500 mt-2 anim-fade-up">${profile.emoji} <strong>${profile.name}</strong></p>
        <p class="text-xs text-slate-400 mt-1 anim-fade-up">Kode USIL: <strong>${data.usilCode}</strong></p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Gaya Usilmu</h3>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">${profile.desc}</p>
        <p class="text-xs text-slate-400 leading-relaxed">${level.desc}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Playful vs Gelap</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl p-4 bg-amber-50 ring-1 ring-amber-100 text-center">
            <div class="text-2xl mb-1">😜</div>
            <div class="font-semibold text-xs text-amber-700 mb-2">Indeks Playful</div>
            <div class="text-3xl font-bold text-amber-600">${data.playfulScore}%</div>
            <p class="text-[11px] text-slate-500 mt-2">Violation + Fun (bonding)</p>
          </div>
          <div class="rounded-xl p-4 bg-violet-50 ring-1 ring-violet-100 text-center">
            <div class="text-2xl mb-1">🖤</div>
            <div class="font-semibold text-xs text-violet-700 mb-2">Indeks Gelap</div>
            <div class="text-3xl font-bold text-violet-600">${data.darkScore}%</div>
            <p class="text-[11px] text-slate-500 mt-2">Ironi + Reaksi + Konteks</p>
          </div>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Peta 6 Dimensi</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${data.sorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.nameId}</div>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="score-bar h-full rounded-full" data-score="${score}" style="background:${info.color}"></div>
                </div>
                <div class="text-sm font-bold mt-1.5" style="color:${info.color}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Dominan: ${typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        <p class="text-sm text-slate-700 mb-3 font-medium">${typeInfo.usilStyle}</p>
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${typeInfo.traits.map((t) => `<span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style="background:${typeInfo.color}18;color:${typeInfo.color}">${t}</span>`).join('')}
        </div>
        <ul class="space-y-1.5">
          ${typeInfo.behaviors.map((b) => `<li class="text-xs text-slate-500 flex gap-2"><span class="text-cyan-500">·</span>${b}</li>`).join('')}
        </ul>
        <p class="text-xs text-slate-400 mt-4 leading-relaxed">${data.congruenceDescription}</p>
      </section>

      ${data.strongTraits?.length ? `
        <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
          <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Sisi Usil yang Menonjol</h3>
          <div class="flex flex-wrap gap-2">
            ${data.strongTraits.map((t) => `<span class="text-xs font-medium bg-violet-50 text-violet-800 px-3 py-1 rounded-full">${t}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'usil')}
    </main>`;
}

function renderResultSage(r) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const level = data.maturityLevel;
  const profile = data.mindsetProfile;
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;
  const gapColor = data.ageGap > 0 ? '#059669' : data.ageGap < 0 ? '#6366F1' : '#0891B2';

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}Usia Pikiran
        </p>
        <div class="text-5xl mb-2 anim-fade-up">🧠</div>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-1 anim-hidden" style="color:${gapColor}">${data.cognitiveAge}</h2>
        <p class="text-lg font-semibold text-slate-700 anim-fade-up">tahun (Cognitive Age)</p>
        <p class="text-sm text-slate-500 mt-2 anim-fade-up">${profile.emoji} <strong>${profile.name}</strong></p>
        <p class="text-xs text-slate-400 mt-1 anim-fade-up">
          Kronologis <strong>${data.chronologicalAge}</strong> · Gap <strong style="color:${gapColor}">${data.gapLabel}</strong> th
          ${data.gapPercent ? ` (${data.gapPercent > 0 ? '+' : ''}${data.gapPercent}%)` : ''}
        </p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Profil Mindset</h3>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">${profile.desc}</p>
        <p class="text-xs text-slate-400 leading-relaxed">${level.desc}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Perbandingan Usia</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div class="rounded-xl p-4 bg-slate-50 ring-1 ring-slate-100">
            <div class="text-xs text-slate-500 mb-1">Kronologis</div>
            <div class="text-3xl font-bold text-slate-700">${data.chronologicalAge}</div>
            <div class="text-[11px] text-slate-400">tahun (asli)</div>
          </div>
          <div class="rounded-xl p-4 bg-indigo-50 ring-1 ring-indigo-100">
            <div class="text-xs text-indigo-600 mb-1">Kognitif</div>
            <div class="text-3xl font-bold text-indigo-600">${data.cognitiveAge}</div>
            <div class="text-[11px] text-slate-400">Cognitive Age</div>
          </div>
          <div class="rounded-xl p-4 bg-teal-50 ring-1 ring-teal-100">
            <div class="text-xs text-teal-600 mb-1">Kematangan</div>
            <div class="text-3xl font-bold text-teal-600">${data.maturityIndex}%</div>
            <div class="text-[11px] text-slate-400">${level.name}</div>
          </div>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">4 Dimensi Barak (Cognitive Age)</h3>
        <div class="grid grid-cols-2 gap-3">
          ${data.barakSorted.map(({ type, score }) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 bg-white/70 text-center">
                <div class="text-lg mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${info.name}</div>
                <div class="text-2xl font-bold mt-1" style="color:${info.color}">${score}</div>
                <div class="text-[10px] text-slate-400">tahun</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Kematangan Kognitif-Emosional</h3>
        <div class="grid grid-cols-2 gap-3">
          ${data.likertSorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.nameId}</div>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="score-bar h-full rounded-full" data-score="${score}" style="background:${info.color}"></div>
                </div>
                <div class="text-sm font-bold mt-1.5" style="color:${info.color}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Dominan: ${typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        <p class="text-sm text-slate-700 mb-3 font-medium">${typeInfo.ageStyle}</p>
        <p class="text-xs text-slate-400 leading-relaxed">${data.congruenceDescription}</p>
      </section>

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'sage')}
    </main>`;
}

function renderShareSection(shareUrl, qrUrl, result, typeInfo, kind) {
  const data = result.resultData;
  let title;
  let text;

  if (data?.shareTitle && data?.shareText) {
    title = `${result.participantName || 'Saya'} — ${data.shareTitle}`;
    text = data.shareText;
  } else if (kind === 'dtdd') {
    title = `${result.participantName || 'Saya'} — Menyebalkan ${data.annoyanceScore}% (${data.dtddCode})`;
    text = `Aku dapat indeks menyebalkan ${data.annoyanceScore}% (DTDD: ${data.dtddCode})! Lihat:`;
  } else if (kind === 'vex') {
    title = `${result.participantName || 'Saya'} — Kerentanan ${data.vulnerabilityScore}% (${data.vexCode})`;
    text = `Indeks kerentananku ${data.vulnerabilityScore}% — ${data.vulnerabilityProfile.name}. Lihat:`;
  } else if (kind === 'usil') {
    title = `${result.participantName || 'Saya'} — Usil ${data.usilScore}% (${data.usilCode})`;
    text = `Indeks usilku ${data.usilScore}% — ${data.usilProfile.name}! Lihat:`;
  } else if (kind === 'sage') {
    title = `${result.participantName || 'Saya'} — Usia Pikiran ${data.cognitiveAge} th (gap ${data.gapLabel})`;
    text = `Usia pikiranku ${data.cognitiveAge} tahun (kronologis ${data.chronologicalAge}, gap ${data.gapLabel}). Lihat:`;
  } else if (kind === 'scale') {
    title = `${result.participantName || 'Saya'} — ${data.shareTitle || data.indexLabel + ' ' + data.indexScore + '%'}`;
    text = data.shareText || `${data.indexLabel}: ${data.indexScore}%. Lihat:`;
  } else {
    title = `${result.participantName || 'Saya'} — Holland Code: ${result.hollandCode}`;
    text = `Hasil survey RIASEC: ${result.hollandCode} (${typeInfo.name}). Lihat lengkap:`;
  }

  return `
      <section class="glass rounded-2xl p-6 mb-8 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 text-center uppercase tracking-wide">Bagikan Hasil</h3>
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="text-center shrink-0">
            <img src="${qrUrl}" alt="QR Code" class="w-40 h-40 rounded-xl border border-cyan-100 mx-auto" />
            <p class="text-[11px] text-slate-400 mt-2">Scan untuk buka hasil</p>
          </div>
          <div class="flex-1 w-full space-y-2">
            ${renderShareButtons(shareUrl, title, text)}
            <button onclick="copyText('${shareUrl}')" class="share-btn w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2.5 rounded-lg text-sm">
              Salin Link
            </button>
          </div>
        </div>
      </section>

      <div class="text-center pb-8 anim-fade-up">
        <button onclick="navigate('/')" class="text-cyan-600 text-sm font-medium hover:text-cyan-800">
          ← Kembali ke Survey Store
        </button>
      </div>`;
}

function renderShareButtons(url, title, text) {
  const encoded = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} ${url}`);

  const buttons = [
    { name: 'WhatsApp', color: 'bg-emerald-500 hover:bg-emerald-600', href: `https://wa.me/?text=${encodedText}` },
    { name: 'Telegram', color: 'bg-sky-500 hover:bg-sky-600', href: `https://t.me/share/url?url=${encoded}&text=${encodeURIComponent(text)}` },
    { name: 'Email', color: 'bg-slate-600 hover:bg-slate-700', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}` },
    { name: 'Twitter/X', color: 'bg-cyan-500 hover:bg-cyan-600', href: `https://twitter.com/intent/tweet?text=${encodedText}` },
  ];

  return buttons.map((b) => `
    <a href="${b.href}" target="_blank" rel="noopener"
       class="share-btn block text-center ${b.color} text-white font-medium py-2.5 rounded-lg text-sm">
      Share via ${b.name}
    </a>
  `).join('');
}


registerLegacyRenderer('riasec', (r) => renderResultRiasec(r));
registerLegacyRenderer('dtdd', (r) => renderResultDtdd(r));
registerLegacyRenderer('vex', (r) => renderResultVex(r));
registerLegacyRenderer('usil', (r) => renderResultUsil(r));
registerLegacyRenderer('sage', (r) => renderResultSage(r));

window.navigate = navigate;
window.copyText = copyText;
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;

window.selectAnswer = (id, value, btn) => {
  if (state.advancing) return;
  state.answers[id] = value;
  persistQuizDraft();
  state.advancing = true;
  window.sifatyAnim?.likertSelect(btn);

  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(() => {
    state.currentQuestion++;
    state.advancing = false;
    persistQuizDraft();
    syncQuizUrl();
    render();
  }, 320);
};

window.startSurvey = () => {
  clearQuizDraft(state.surveySlug);
  resetSurveyUiState();
  state.currentQuestion = 0;
  state.answers = {};
  state.ageAnswers = {};
  state.participantName = '';
  navigate(`/survey/${state.surveySlug}/mulai`);
};

window.lookupResult = async (expectedSurveyId = null) => {
  const input = document.getElementById('lookup-code-input');
  const btn = document.getElementById('lookup-code-btn');
  const code = normalizeLookupCode(input?.value);

  if (!code || code === 'SF-') {
    showToast('Masukkan kode unik (contoh: SF-HUUHKT)');
    input?.focus();
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Mencari...';
  }

  try {
    const result = await fetchResultByCode(code);
    if (expectedSurveyId && result.surveyId !== expectedSurveyId) {
      showToast('Kode ini bukan untuk survey ini');
      return;
    }
    state.result = result;
    navigate(`/hasil/${result.id}`);
  } catch (err) {
    showToast(err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Cari Hasil';
    }
  }
};

window.setParticipantName = (value) => {
  state.participantName = value;
  persistQuizDraft();
};

window.setAgeAnswer = (id, value) => {
  state.ageAnswers[id] = value;
  persistQuizDraft();
};

let storeSearchTimer = null;

function refreshHomeView() {
  if (state.route !== 'home') return;
  app.innerHTML = renderHome();
  afterRender();
}

window.setStoreFilter = (key, value) => {
  if (key === 'sort') {
    state.storeFilters.sort = value;
  } else {
    const cur = state.storeFilters[key];
    state.storeFilters[key] = cur === value && value !== 'all' ? 'all' : value;
  }
  state.storeFilters.page = 1;
  syncStoreFiltersToUrl(state.storeFilters);
  refreshHomeView();
};

window.onStoreSearch = (q) => {
  clearTimeout(storeSearchTimer);
  storeSearchTimer = setTimeout(() => {
    state.storeFilters.search = q;
    state.storeFilters.page = 1;
    syncStoreFiltersToUrl(state.storeFilters);
    refreshHomeView();
    const input = document.getElementById('store-search-input');
    if (input) {
      input.focus();
      const len = q.length;
      input.setSelectionRange(len, len);
    }
  }, 250);
};

window.clearStoreFilters = () => {
  state.storeFilters = { ...DEFAULT_STORE_FILTERS };
  syncStoreFiltersToUrl(state.storeFilters);
  refreshHomeView();
};

window.setStorePage = (page) => {
  const n = parseInt(page, 10);
  if (!Number.isFinite(n) || n < 1) return;
  state.storeFilters.page = n;
  syncStoreFiltersToUrl(state.storeFilters);
  refreshHomeView();
  requestAnimationFrame(() => {
    document.getElementById('catalog-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

window.prevQuestion = () => {
  resetSurveyUiState();
  const total = state.currentSurvey?.questions?.length || 0;

  if (state.currentQuestion > 0 || state.currentQuestion >= total) {
    history.back();
  } else {
    navigate(`/survey/${state.surveySlug}`);
  }
};

window.finishSurvey = async () => {
  const survey = state.currentSurvey;
  if (survey?.ageFields?.length) {
    for (const f of survey.ageFields) {
      const v = parseInt(state.ageAnswers[f.id], 10);
      if (!Number.isFinite(v) || v < 10 || v > 99) {
        showToast(`Isi ${f.label} (10–99 tahun)`);
        return;
      }
    }
  }

  state.loading = true;
  render();
  try {
    const payload = { ...state.answers, ...state.ageAnswers };
    const res = await submitSurvey(state.surveySlug, payload, state.participantName);
    clearQuizDraft(state.surveySlug);
    resetSurveyUiState();
    navigate(`/hasil/${res.id}`);
  } catch (err) {
    showToast(err.message);
    resetSurveyUiState();
    render();
  }
};

// ─── Main Render ──────────────────────────────────────────────

async function render() {
  app.innerHTML = '<main class="text-center py-20 text-slate-500 text-sm">Memuat...</main>';

  try {
    if (state.route === 'home') {
      state.storeFilters = parseStoreFiltersFromUrl();
      const [surveys, facets] = await Promise.all([fetchSurveys(), fetchCatalog()]);
      state.surveys = surveys;
      state.catalogFacets = facets;
      app.innerHTML = renderHome();
    } else if (state.route === 'survey') {
      const slugChanged = !state.currentSurvey || state.currentSurvey.slug !== state.surveySlug;
      if (slugChanged) {
        state.currentSurvey = await fetchSurvey(state.surveySlug);
        state.surveyPustaka = await fetchPustaka(state.surveySlug);
        resetSurveyUiState();
        if (state.surveyPhase !== 'quiz') {
          state.answers = {};
          state.ageAnswers = {};
          state.participantName = '';
          state.currentQuestion = 0;
        }
      }
      if (state.surveyPhase === 'quiz') {
        if (slugChanged || Object.keys(state.answers).length === 0) {
          restoreQuizDraft();
        }
        applyQuizIndexFromUrl();
        persistQuizDraft();
      } else if (slugChanged) {
        state.currentQuestion = 0;
      }
      if (state.surveyPhase === 'detail') {
        app.innerHTML = renderSurveyDetail();
      } else {
        app.innerHTML = renderSurvey();
      }
    } else if (state.route === 'result') {
      resetSurveyUiState();
      if (!state.result || state.result.id !== state.resultId) {
        state.result = await fetchResult(state.resultId);
      }
      app.innerHTML = renderResult();
    } else if (state.route === 'pustaka') {
      if (!state.surveys.length) state.surveys = await fetchSurveys();
      state.pustaka = await fetchPustaka(getPustakaSurveyFilter());
      app.innerHTML = renderPustaka();
    } else if (state.route === 'tentang') {
      app.innerHTML = renderHeader() + renderAboutPage() + renderFooter();
    } else if (state.route === 'penggunaan') {
      app.innerHTML = renderHeader() + renderPenggunaanPage() + renderFooter();
    } else if (state.route === 'credits') {
      app.innerHTML = renderHeader() + renderCreditsPage() + renderFooter();
    }
    afterRender();
  } catch (err) {
    app.innerHTML = `
      ${renderHeader()}
      <main class="text-center py-20 anim-fade-up">
        <h2 class="font-display text-xl font-bold text-slate-700 mb-2">Terjadi Kesalahan</h2>
        <p class="text-sm text-slate-500 mb-6">${err.message}</p>
        <button onclick="navigate('/')" class="btn-primary btn-solid px-5 py-2.5 rounded-md text-sm font-semibold text-white">Kembali</button>
      </main>`;
    afterRender();
  }
}

document.documentElement.classList.add('js-ready');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

parseRoute();
render();
