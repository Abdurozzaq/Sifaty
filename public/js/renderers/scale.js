import { escapeHtml } from '../core/ui.js';

export function renderResultScale(r, { renderHeader, renderShareSection }) {
  const data = r.resultData;
  const primary = data.primary;
  const typeInfo = data.types[primary.type];
  const profile = data.profile || data.level;
  const level = data.level || profile;
  const shareUrl = `${window.location.origin}/share/${r.uniqueCode}`;
  const qrUrl = `/api/results/${r.id}/qrcode`;
  const scoreColor = typeInfo?.color || '#0891B2';

  return `
    ${renderHeader()}
    <main class="max-w-3xl mx-auto px-4 py-8">
      <section class="text-center mb-8 result-hero">
        <p class="text-cyan-600 text-sm font-medium mb-2 anim-fade-up">
          ${r.participantName ? `${escapeHtml(r.participantName)} · ` : ''}${escapeHtml(data.indexLabel || 'Indeks')}
        </p>
        <div class="text-5xl mb-2 anim-fade-up">${level.emoji || profile.emoji || '📊'}</div>
        <h2 id="holland-code" class="font-display text-5xl md:text-6xl font-bold mb-1 anim-hidden" style="color:${scoreColor}">${data.indexScore}%</h2>
        <p class="text-lg font-semibold text-slate-700 anim-fade-up">${level.name || profile.name}</p>
        <p class="text-sm text-slate-500 mt-2 anim-fade-up">Kode: <strong>${data.summaryCode}</strong></p>
        <div class="inline-flex items-center gap-2 mt-4 glass px-4 py-2 rounded-lg anim-fade-up">
          <span class="text-xs text-slate-500">Kode Unik</span>
          <code class="font-bold text-cyan-700">${r.uniqueCode}</code>
          <button onclick="copyText('${r.uniqueCode}')" class="text-cyan-500 hover:text-cyan-700 text-xs font-medium ml-1">Salin</button>
        </div>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Profil</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${level.desc || profile.desc || ''}</p>
      </section>

      <section class="glass rounded-2xl p-6 mb-5 anim-fade-up">
        <h3 class="font-display text-sm font-bold text-slate-800 mb-5 uppercase tracking-wide">Peta Dimensi</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${data.sorted.map(({ type, score }, i) => {
            const info = data.types[type];
            return `
              <div class="rounded-xl p-3.5 text-center ${i === 0 ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'bg-white/60'}">
                <div class="text-xl mb-1">${info.emoji}</div>
                <div class="font-semibold text-xs" style="color:${info.color}">${type} · ${info.nameId || info.name}</div>
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
        <h3 class="font-display text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Dominan: ${typeInfo.nameId || typeInfo.name}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${typeInfo.description || ''}</p>
        ${typeInfo.style ? `<p class="text-sm text-slate-700 mb-3 font-medium">${typeInfo.style}</p>` : ''}
        <p class="text-xs text-slate-400 leading-relaxed">${data.congruenceDescription || ''}</p>
      </section>

      ${renderShareSection(shareUrl, qrUrl, r, typeInfo, 'scale')}
    </main>`;
}
