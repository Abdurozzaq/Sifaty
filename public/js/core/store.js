/** Marketplace store — search, filter, sort, pagination */

export const PAGE_SIZE = 10;

export const DEFAULT_STORE_FILTERS = {
  search: '',
  audience: 'all',
  category: 'all',
  sort: 'featured',
  page: 1,
};

export function parseStoreFiltersFromUrl() {
  const p = new URLSearchParams(window.location.search);
  const page = parseInt(p.get('page') || '1', 10);
  return {
    search: p.get('q') || '',
    audience: p.get('audience') || 'all',
    category: p.get('cat') || 'all',
    sort: p.get('sort') || 'featured',
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function syncStoreFiltersToUrl(filters, replace = true) {
  if (window.location.pathname !== '/') return;
  const p = new URLSearchParams();
  if (filters.search) p.set('q', filters.search);
  if (filters.audience !== 'all') p.set('audience', filters.audience);
  if (filters.category !== 'all') p.set('cat', filters.category);
  if (filters.sort !== 'featured') p.set('sort', filters.sort);
  if (filters.page > 1) p.set('page', String(filters.page));
  const qs = p.toString();
  const url = qs ? `/?${qs}` : '/';
  const current = window.location.pathname + window.location.search;
  if (current === url) return;
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
}

function norm(s) {
  return String(s || '').toLowerCase();
}

function matchesSearch(survey, q) {
  if (!q) return true;
  const hay = [
    survey.title,
    survey.subtitle,
    survey.description,
    ...(survey.tags || []),
    survey.catalog?.categoryLabel,
    survey.catalog?.methodologyLabel,
    ...(survey.catalog?.moodLabels || []),
  ]
    .map(norm)
    .join(' ');
  return hay.includes(norm(q));
}

export function filterSurveys(surveys, filters) {
  let list = surveys.filter((s) => s.active !== false);

  if (filters.audience && filters.audience !== 'all') {
    list = list.filter((s) => (s.audience || 'umum') === filters.audience);
  }
  if (filters.category && filters.category !== 'all') {
    list = list.filter((s) => s.catalog?.category === filters.category);
  }
  if (filters.search?.trim()) {
    list = list.filter((s) => matchesSearch(s, filters.search.trim()));
  }

  return sortSurveys(list, filters.sort);
}

export function sortSurveys(list, sort) {
  const items = [...list];
  switch (sort) {
    case 'az':
      return items.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    case 'time':
      return items.sort((a, b) => (a.estimatedMinutes || 99) - (b.estimatedMinutes || 99));
    case 'questions':
      return items.sort((a, b) => (a.questionCount || 0) - (b.questionCount || 0));
    case 'featured':
    default:
      return items.sort((a, b) => {
        if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return a.title.localeCompare(b.title, 'id');
      });
  }
}

export function getFeaturedSurveys(surveys, limit = 4) {
  return sortSurveys(surveys.filter((s) => s.featured), 'featured').slice(0, limit);
}

export function hasActiveFilters(filters) {
  return (
    !!filters.search?.trim() ||
    filters.audience !== 'all' ||
    filters.category !== 'all'
  );
}

export function paginateList(list, page, pageSize = PAGE_SIZE) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page || 1), totalPages);
  const offset = (safePage - 1) * pageSize;
  return {
    items: list.slice(offset, offset + pageSize),
    page: safePage,
    totalPages,
    total,
    rangeStart: total ? offset + 1 : 0,
    rangeEnd: Math.min(offset + pageSize, total),
  };
}
