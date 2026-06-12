export const NAV_ITEMS = [
  { path: '/', label: 'Katalog', route: 'home' },
  { path: '/pustaka', label: 'Pustaka', route: 'pustaka' },
  { path: '/tentang', label: 'Tentang', route: 'tentang' },
  { path: '/penggunaan', label: 'Penggunaan', route: 'penggunaan' },
];

export function renderTrustStrip(compact = false) {
  const items = [
    { label: 'Berbasis jurnal ilmiah', desc: 'Setiap instrumen memiliki referensi akademik' },
    { label: 'Instrumen tervalidasi', desc: 'Skala psikometri yang sudah diuji penelitian' },
    { label: 'Bukan diagnosis klinis', desc: 'Hasil untuk edukasi & refleksi, bukan terapi' },
  ];
  if (compact) {
    return `
      <div class="trust-strip-compact flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
        ${items.map((i) => `<span class="flex items-center gap-1.5"><span class="trust-dot"></span>${i.label}</span>`).join('')}
      </div>`;
  }
  return `
    <section class="trust-strip grid sm:grid-cols-3 gap-4 anim-fade-up">
      ${items.map((i) => `
        <div class="trust-item">
          <p class="font-semibold text-slate-800 text-sm mb-1">${i.label}</p>
          <p class="text-xs text-slate-500 leading-relaxed">${i.desc}</p>
        </div>`).join('')}
    </section>`;
}

export function renderFooter() {
  return `
    <footer class="site-footer mt-16 border-t border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 py-10">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p class="font-display font-bold text-slate-800 mb-2">Sifaty</p>
            <p class="text-sm text-slate-500 leading-relaxed">
              Platform pengukuran psikologis berbasis penelitian untuk edukasi, refleksi diri,
              dan literasi kesehatan mental.
            </p>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Navigasi</p>
            <ul class="space-y-2 text-sm">
              ${NAV_ITEMS.map((n) => `
                <li><a href="${n.path}" onclick="event.preventDefault(); navigate('${n.path}')" class="text-slate-600 hover:text-teal-800">${n.label}</a></li>
              `).join('')}
            </ul>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Penting</p>
            <p class="text-xs text-slate-500 leading-relaxed">
              Hasil survey di Sifaty <strong class="font-medium text-slate-700">bukan diagnosis medis atau psikologis</strong>.
              Jika Anda mengalami distress berat, hubungi profesional kesehatan mental
              atau layanan darurat setempat.
            </p>
          </div>
        </div>
        <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400">
          <span class="flex items-center gap-2 flex-wrap">
            <span>© ${new Date().getFullYear()} Sifaty — Platform Psikometri Edukatif</span>
            <button type="button" onclick="navigate('/credits')" class="credits-link">Credits</button>
          </span>
          <span>Data jawaban disimpan di PostgreSQL (anonim)</span>
        </div>
      </div>
    </footer>`;
}

function pageShell(title, subtitle, bodyHtml) {
  return `
    <main class="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <header class="mb-10 anim-fade-up">
        <p class="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">Sifaty</p>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">${title}</h1>
        ${subtitle ? `<p class="text-base text-slate-600 leading-relaxed">${subtitle}</p>` : ''}
      </header>
      <div class="prose-content space-y-8 anim-fade-up">${bodyHtml}</div>
    </main>`;
}

function contentBlock(title, paragraphs) {
  return `
    <section class="content-block">
      <h2 class="font-display text-lg font-bold text-slate-800 mb-3">${title}</h2>
      ${paragraphs.map((p) => `<p class="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">${p}</p>`).join('')}
    </section>`;
}

function bulletList(title, items) {
  return `
    <section class="content-block">
      <h2 class="font-display text-lg font-bold text-slate-800 mb-3">${title}</h2>
      <ul class="space-y-2">
        ${items.map((item) => `
          <li class="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
            <span class="text-teal-600 shrink-0 mt-0.5">—</span>
            <span>${item}</span>
          </li>`).join('')}
      </ul>
    </section>`;
}

export function renderAboutContent() {
  return `
    ${contentBlock('Apa itu Sifaty?', [
      'Sifaty adalah platform digital yang menyediakan instrumen pengukuran psikologis—survey dan skala Likert—yang dikembangkan berdasarkan literatur penelitian psikologi dan kesehatan mental.',
      'Setiap survey di platform ini dirancang untuk membantu individu memahami aspek-aspek tertentu dari diri mereka: minat karier, kecenderungan kepribadian, tingkat burnout, stres akademik, dan variabel psikologis lainnya yang relevan dengan kehidupan sehari-hari.',
    ])}
    ${contentBlock('Mengapa platform ini dibuat?', [
      'Akses terhadap instrumen psikometri yang valid seringkali terbatas pada lingkungan akademik atau klinis. Sifaty hadir untuk menjembatani celah tersebut: menyediakan alat ukur berbasis bukti yang mudah diakses, transparan metodologinya, dan dilengkapi pustaka referensi ilmiah.',
      'Tujuan utamanya adalah <strong class="font-medium text-slate-700">literasi psikologis</strong>—bukan menggantikan konsultasi profesional, melainkan mendorong refleksi diri yang terinformasi dan pemahaman awal yang lebih baik tentang kondisi psikologis seseorang.',
    ])}
    ${contentBlock('Dasar ilmiah', [
      'Semua instrumen di Sifaty memiliki landasan teori dan referensi jurnal yang dapat diperiksa di halaman Pustaka. Kami menggunakan skala yang sudah divalidasi dalam penelitian—seperti RIASEC Holland Code, Maslach Burnout Inventory (MBI), Dark Triad Dirty Dozen, dan adaptasi skala Likert untuk konteks mahasiswa dan pekerja Indonesia.',
      'Setiap halaman survey menampilkan penjelasan metodologi, dimensi yang diukur, dan batasan interpretasi hasil agar pengguna memahami apa yang sebenarnya diukur.',
    ])}
    ${bulletList('Prinsip etika & privasi', [
      'Tidak diperlukan akun atau data identitas wajib untuk mengikuti survey.',
      'Hasil disimpan dengan kode anonim (SF-XXXXXX) yang hanya Anda ketahui.',
      'Platform ini tidak menjual data pengguna.',
      'Hasil bersifat edukatif—bukan rekomendasi medis, rekrutmen, atau keputusan klinis.',
    ])}
    ${contentBlock('Batasan platform', [
      'Sifaty <strong class="font-medium text-slate-700">bukan alat diagnosis</strong> untuk gangguan mental, gangguan kepribadian, atau kondisi klinis lainnya. Skor tinggi atau rendah pada suatu dimensi tidak otomatis berarti patologis—interpretasi harus dilakukan dengan konteks dan, bila perlu, bantuan psikolog atau psikiater berlisensi.',
    ])}`;
}

export function renderPenggunaanContent() {
  return `
    ${contentBlock('Untuk siapa platform ini?', [
      'Sifaty ditujukan bagi siapa saja yang ingin memahami aspek psikologis diri mereka secara terstruktur dan berbasis penelitian—mahasiswa, pekerja, peneliti, pendidik, maupun masyarakat umum.',
    ])}
    ${bulletList('Kegunaan yang sesuai', [
      '<strong class="font-medium text-slate-700">Refleksi diri &amp; self-awareness</strong> — memahami pola burnout, stres, minat karier, atau kecenderungan kepribadian sebagai titik awal percakapan dengan diri sendiri.',
      '<strong class="font-medium text-slate-700">Edukasi &amp; literasi kesehatan mental</strong> — mempelajari konsep psikologis (FOMO, imposter syndrome, work-life conflict) melalui pengalaman langsung mengisi instrumen standar.',
      '<strong class="font-medium text-slate-700">Penelitian akademik</strong> — mahasiswa psikologi, manajemen, atau kesehatan masyarakat dapat mempelajari struktur instrumen, referensi jurnal, dan cara interpretasi skor.',
      '<strong class="font-medium text-slate-700">Workshop &amp; diskusi kelompok</strong> — fasilitator dapat menggunakan survey sebagai ice breaker edukatif, dengan catatan hasil dibahas secara umum tanpa stigmatisasi.',
      '<strong class="font-medium text-slate-700">Screening awal (bukan diagnosis)</strong> — organisasi atau individu dapat menggunakan hasil sebagai sinyal awal untuk merencanakan intervensi wellbeing, bukan sebagai satu-satunya dasar keputusan.',
    ])}
    ${bulletList('Kegunaan yang tidak sesuai', [
      'Mendiagnosis gangguan mental atau kepribadian tanpa profesional klinis.',
      'Menjadi satu-satunya alat seleksi karyawan atau mahasiswa.',
      'Menggantikan konseling psikologis, terapi, atau pengobatan.',
      'Membuat keputusan medis, hukum, atau finansial berdasarkan skor survey saja.',
    ])}
    ${contentBlock('Cara menggunakan dengan bertanggung jawab', [
      'Baca halaman detail survey sebelum memulai—pahami teori, dimensi, dan batasan interpretasi.',
      'Jawab sejujur mungkin sesuai kondisi Anda saat ini, bukan jawaban yang dianggap "ideal".',
      'Gunakan hasil sebagai bahan refleksi; diskusikan dengan mentor, konselor, atau profesional bila skor menimbulkan kekhawatiran.',
      'Bagikan hasil hanya kepada pihak yang Anda percaya—link dan kode hasil bersifat pribadi.',
    ])}
    ${contentBlock('Butuh bantuan profesional?', [
      'Jika Anda mengalami gejala depresi berat, ide bunuh diri, atau distress yang mengganggu fungsi sehari-hari, segera hubungi layanan kesehatan mental terdekat, hotline crisis, atau fasilitas kesehatan setempat. Sifaty tidak menyediakan layanan intervensi klinis.',
    ])}`;
}

export function renderAboutPage() {
  return pageShell(
    'Tentang Sifaty',
    'Platform pengukuran psikologis berbasis penelitian untuk edukasi dan refleksi diri.',
    renderAboutContent()
  );
}

export function renderPenggunaanPage() {
  return pageShell(
    'Penggunaan Platform',
    'Panduan kegunaan yang tepat dan batasan etis penggunaan instrumen psikometri di Sifaty.',
    renderPenggunaanContent()
  );
}

export function renderCreditsContent() {
  return `
    <section class="content-block">
      <h2 class="font-display text-lg font-bold text-slate-800 mb-3">Pembuat</h2>
      <p class="text-sm text-slate-600 leading-relaxed mb-4">
        Sifaty dikembangkan sebagai platform psikometri edukatif berbasis penelitian.
      </p>
      <div class="glass rounded-lg p-5 inline-block min-w-[240px]">
        <p class="font-display font-semibold text-slate-900 mb-1">Abdurozzaq Nurul Hadi</p>
        <a href="https://rozzaq.my.id" target="_blank" rel="noopener noreferrer" class="text-sm text-teal-700 hover:text-teal-900 hover:underline">rozzaq.my.id</a>
      </div>
    </section>
    ${contentBlock('Kontak', [
      'Untuk pertanyaan teknis, kolaborasi penelitian, atau masukan pengembangan platform, kunjungi situs pribadi pembuat melalui tautan di atas.',
    ])}`;
}

export function renderCreditsPage() {
  return pageShell(
    'Credits',
    'Informasi pembuat dan pengembang platform Sifaty.',
    renderCreditsContent()
  );
}
