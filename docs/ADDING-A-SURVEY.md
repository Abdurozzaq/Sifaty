# Panduan Menambah Instrumen Survey Baru di Sifaty

Dokumen ini untuk **dua audiens**:

| Audiens | Fokus baca |
|---------|------------|
| **Peneliti kesehatan / psikologi** | Bagian 1–3 — persiapan ilmiah, etika, desain skala |
| **Pemula coding / kontributor teknis** | Bagian 4–7 — langkah praktis di komputer |

> **Intinya:** setiap instrumen = **1 folder** di `server/surveys/nama-instrumen/`.  
> Setelah folder lengkap dan server di-restart, survey **otomatis muncul** di katalog — tidak perlu daftar manual satu per satu.

---

## Bagian 1 — Untuk peneliti: sebelum menyentuh kode

### Apa yang cocok di-publish di Sifaty?

Sifaty dirancang untuk **instrumen psikometri edukatif** — self-report, refleksi diri, literasi kesehatan mental. Cocok jika:

- Ada **landasan teori** dan/atau **referensi jurnal** yang jelas
- Instrumen sudah atau pernah divalidasi (meski adaptasi bahasa Indonesia)
- Tujuan penggunaan **bukan diagnosis klinis**

Tidak cocok sebagai satu-satunya alat untuk: diagnosis gangguan mental, seleksi karyawan/mahasiswa, atau keputusan medis.

### Checklist persiapan (isi dulu di Word/Excel)

Sebelum coding, lengkapi tabel ini:

| # | Pertanyaan | Contoh jawaban |
|---|------------|----------------|
| 1 | **Nama instrumen** (judul tampilan) | Seberapa Burnout Kuliahmu? |
| 2 | **Slug** (ID teknis, huruf kecil, pakai `-`) | `student-burnout` |
| 3 | **Populasi** | `mahasiswa` / `pekerja` / `umum` |
| 4 | **Skala asli** (nama + penulis + tahun) | MBI-SS (Schaufeli et al., 2002) |
| 5 | **Jumlah dimensi** | 3 (Exhaustion, Cynicism, Efficacy) |
| 6 | **Item per dimensi** | 4 (total 12 item di Sifaty standar) |
| 7 | **Skala respons** | Likert 1–5 (1 = tidak setuju … 5 = sangat setuju) |
| 8 | **Item terbalik (reverse)?** | Ya / Tidak — sebutkan dimensinya |
| 9 | **Interpretasi skor tinggi** | Negatif (semakin tinggi = semakin parah) **atau** Positif (semakin tinggi = semakin baik) |
| 10 | **Level hasil** (5 tingkat) | Rendah → Sangat parah **atau** Sangat rendah → Sangat baik |
| 11 | **Minimal 3–5 referensi jurnal** | DOI + relevansi singkat |
| 12 | **Tag katalog** | Burnout, MBI, Analisis Negatif, dll. |

### Desain standar Sifaty (skala Likert)

Kebanyakan instrumen baru mengikuti pola ini:

```
12 pertanyaan = 3 dimensi × 4 item
Skala jawaban: 1 (tidak setuju) … 5 (sangat setuju)
Skor per dimensi: dinormalisasi 0–100%
Indeks total: rata-rata ketiga dimensi
Profil: level berdasarkan indeks (5 tingkat)
```

**Peneliti perlu menyiapkan:**

1. **Definisi tiap dimensi** (nama Indonesia + nama asli + deskripsi 1–2 kalimat)
2. **12 pernyataan** — ditulis dari sudut pandang responden (*"Aku merasa…"*, *"Aku sering…"*)
3. **Cut-off interpretif** (5 level) — meski Sifaty bersifat edukatif, teks level harus hati-hati dan tidak menakut-nakuti
4. **Pustaka** — minimal 3 entri; idealnya ada paper validasi asli + adaptasi lokal jika ada

### Etika & batasan (wajib di halaman instrumen)

Setiap instrumen harus punya `description` yang menjelaskan:

- Instrumen **bukan** diagnosis klinis
- Dasar teori singkat + sitasi
- Apa yang diukur dan **apa yang tidak** diukur

Contoh kalimat aman di level tinggi (negatif):  
*"Skor tinggi menandakan risiko burnout yang perlu diperhatikan — pertimbangkan konsultasi dengan profesional kesehatan mental."*

### Jenis analisis: positif vs negatif

Tambahkan tag di metadata agar mudah difilter di katalog:

| Tag | Arti skor tinggi | Contoh |
|-----|------------------|--------|
| `Analisis Negatif` | Semakin tinggi = semakin **parah** | Depresi, burnout, stres |
| `Analisis Positif` | Semakin tinggi = semakin **baik** | Hope, grit, flourishing |

---

## Bagian 2 — Konsep teknis (tanpa harus jadi programmer)

Setiap folder survey berisi **3 file utama**:

```
server/surveys/student-burnout/
├── index.js      ← penghubung ke sistem (jarang diubah)
├── survey.js     ← isi instrumen: pertanyaan, dimensi, level, judul
└── pustaka.js    ← daftar jurnal
```

| File | Analogi | Isi |
|------|---------|-----|
| `survey.js` | **Lembar kerja instrumen** | Judul, 12 pertanyaan, 3 dimensi, 5 level hasil |
| `pustaka.js` | **Daftar pustaka** | Referensi APA-style + DOI |
| `index.js` | **Staples ke mesin** | 4 baris standar — copy saja |

Setelah folder dibuat, daftarkan juga di **`server/surveys/_shared/survey-catalog.js`** agar kategori & metodologi muncul di filter katalog.

---

## Bagian 3 — Worksheet item untuk peneliti

Salin template ini, isi di Google Docs, baru diterjemahkan ke `survey.js`.

### Dimensi A — `[Kode: E]` Exhaustion / Kelelahan

| No | Pernyataan (Indonesia) | Skala asli (opsional) |
|----|------------------------|------------------------|
| E1 | Aku merasa lelah meski cuma duduk di kelas | … |
| E2 | … | … |
| E3 | … | … |
| E4 | … | … |

### Dimensi B — `[Kode: C]` Cynicism / Sinisme

| No | Pernyataan | |
|----|------------|---|
| C1 | … | |
| … | … | |

### Dimensi C — `[Kode: A]` Academic Efficacy *(item terbalik: skor tinggi = efikasi tinggi)*

| No | Pernyataan | Reverse? |
|----|------------|----------|
| A1 | Aku yakin bisa menyelesaikan tugas kuliah | Ya → masuk `invertDimensions` |

### Level interpretasi (5 tingkat)

| Indeks % | Nama level | Emoji | Deskripsi singkat untuk pengguna |
|----------|------------|-------|----------------------------------|
| 0–30 | Rendah | 🌿 | … |
| 31–45 | Ringan | 🙂 | … |
| 46–60 | Sedang | 😓 | … |
| 61–75 | Tinggi | 😰 | … |
| 76–100 | Sangat parah | 🆘 | … |

---

## Bagian 4 — Langkah praktis (pemula coding)

### Yang perlu disiapkan di komputer

- Node.js terinstall
- Editor teks (VS Code / Cursor)
- Project Sifaty sudah `npm install`
- PostgreSQL jalan (lihat [README.md](../README.md))

### Langkah 1 — Duplikasi template

1. Buka folder `server/surveys/`
2. **Copy** seluruh folder `student-burnout/`
3. **Rename** menjadi slug baru, misalnya `student-sleep-quality/`

> Slug = huruf kecil, pakai `-`, tanpa spasi. Harus unik — cek folder lain dulu.

### Langkah 2 — File `index.js` (jangan diubah isinya)

Isinya tetap seperti ini:

```js
const { createScaleSurveyModule } = require('../_shared/likert-helper');
const config = require('./survey');
const PUSTAKA = require('./pustaka');

module.exports = createScaleSurveyModule({ ...config, pustaka: PUSTAKA });
```

### Langkah 3 — Edit `pustaka.js`

Satu entri jurnal = satu objek `{}`. Minimal **3**, disarankan **5**.

```js
module.exports = [
  {
    id: 'penulis-tahun-singkat',           // unik, huruf-kecil-dengan-strip
    authors: 'Nama, A., & Nama, B.',
    year: 2020,
    title: 'Judul Artikel Lengkap',
    journal: 'Nama Jurnal',
    volume: '12(3)',
    doi: '10.xxxx/xxxxx',                  // opsional tapi disarankan
    type: 'Jurnal',                        // Jurnal | Buku | Laporan
    relevance: 'Kenapa referensi ini relevan untuk instrumen ini.',
    usedIn: ['student-sleep-quality'],     // sama dengan slug folder
  },
  // ... entri berikutnya
];
```

### Langkah 4 — Edit `survey.js` (bagian penting)

Buka `survey.js`. Yang **wajib** diganti:

| Bagian | Apa itu |
|--------|---------|
| `slug` / `SURVEY_META.slug` | ID folder, mis. `student-sleep-quality` |
| `SURVEY_META.title` | Judul di katalog |
| `SURVEY_META.subtitle` | Satu baris penjelasan |
| `SURVEY_META.description` | Paragraf metodologi + sitasi |
| `SURVEY_META.audience` | `mahasiswa` / `pekerja` / `umum` |
| `SURVEY_META.tags` | Topik + `Analisis Negatif` atau `Analisis Positif` |
| `TYPES` | 3 dimensi (kode, nama, emoji, warna, deskripsi) |
| `QUESTIONS` | 12 item — field `id`, `type`, `text` |
| `LEVELS` | 5 tingkat interpretasi |
| `dimensionOrder` | Urutan 3 kode dimensi, mis. `['Q', 'D', 'H']` |
| `indexLabel` | Nama indeks di halaman hasil |

**Contoh satu pertanyaan:**

```js
{ id: 'q1', type: 'Q', text: 'Aku sulit tidur nyenyak di malam hari' }
```

- `id` — unik dalam survey (`q1`, `q2`, …)
- `type` — kode dimensi (harus ada di `TYPES`)
- `text` — pernyataan untuk responden

**Item terbalik (reverse-coded):**

Jika dimensi semakin **rendah** skor mentah = semakin **buruk** (mis. efikasi, dukungan sosial), tambahkan di export:

```js
invertDimensions: ['A'],
```

### Langkah 5 — Daftar di katalog

Buka `server/surveys/_shared/survey-catalog.js`, tambahkan entri di `SURVEY_CATALOG`:

```js
'student-sleep-quality': {
  category: 'mental',        // karier | kepribadian | akademik | kerja | mental | refleksi | hiburan
  methodology: 'likert',     // lihat daftar METHODOLOGIES di file yang sama
  moods: ['kuliah-harian', 'check-in'],
  installLabel: 'Kualitas Tidur',
},
```

### Langkah 6 — (Opsional) Label di halaman hasil

Jika nama dimensi perlu tampil rapi di UI, tambahkan di `public/js/core/ui.js` → objek `labels` dalam `getSurveyDimTitle`:

```js
'student-sleep-quality': 'Kualitas Tidur',
```

### Langkah 7 — Restart & uji

```bash
npm run dev
```

**Checklist uji:**

- [ ] Survey muncul di homepage http://localhost:3000
- [ ] Filter populasi & kategori benar
- [ ] Halaman detail menampilkan teori & metodologi
- [ ] 12 pertanyaan bisa dijawab sampai selesai
- [ ] Hasil tampil (indeks, dimensi, level)
- [ ] Kode `SF-XXXXXX` dan link share berfungsi
- [ ] Pustaka menampilkan referensi ( `/pustaka?survey=slug-kamu` )

---

## Bagian 5 — Cara scoring (peneliti)

Untuk instrumen Likert standar Sifaty:

1. Responden menjawab **1–5** per item
2. Item dikelompokkan per **dimensi** (4 item)
3. Skor mentah dinormalisasi → **0–100%** per dimensi
4. Dimensi di `invertDimensions` dibalik: `100 - skor`
5. **Indeks** = rata-rata 3 dimensi
6. **Level** = band 0–30, 31–45, … sesuai `LEVELS`
7. **Kode profil** = 3 huruf dimensi tertinggi (urutan skor)

Responden melihat hasil **edukatif** — bukan label diagnostik DSM/ICD.

---

## Bagian 6 — Kapan butuh bantuan developer?

Gunakan template Likert (Bagian 4) jika instrumenmu:

- 3 dimensi × 4 item Likert
- Skoring sum/average per dimensi

**Butuh developer** jika:

- Jumlah item bukan 12 / struktur bukan 3 dimensi
- Butuh input khusus (usia, multi-step, branching)
- Skoring non-Likert (RIASEC Holland Code, cognitive age, dll.)
- UI hasil custom (lihat `riasec-career/`, `subjective-age/`)

Survey custom butuh file `core.js` + renderer di `public/js/renderers/` — di luar cakupan panduan ini.

---

## Bagian 7 — Ringkasan alur kerja tim

```
Peneliti                          Kontributor / Dev
────────                          ─────────────────
Isi worksheet (Bagian 3)    →     Buat folder + survey.js
Siapkan referensi jurnal    →     pustaka.js
Review teks level & etika   →     survey-catalog.js
Uji isi item (face validity)→     npm run dev + checklist uji
```

---

## Referensi cepat — file contoh

| Ingin lihat… | Buka folder |
|--------------|-------------|
| Skala Likert mahasiswa | `server/surveys/student-burnout/` |
| Skala analisis negatif | `server/surveys/student-depression/` |
| Skala analisis positif | `server/surveys/student-hope/` |
| Instrumen kompleks (RIASEC) | `server/surveys/riasec-career/` |
| Generator batch (developer) | `server/scripts/bootstrap-scale-surveys*.js` |

---

## Pertanyaan umum

**Apakah survey langsung online setelah simpan file?**  
Ya, setelah restart server (`npm run dev`). Folder di-scan otomatis.

**Boleh pakai bahasa Inggris untuk item?**  
Bisa, tapi audiens Sifaty dominan Indonesia — disarankan Bahasa Indonesia yang natural.

**Berapa lama satu instrumen siap?**  
Peneliti: 2–4 jam menyiapkan item + referensi. Teknis: 30–60 menit input ke file jika worksheet sudah lengkap.

**Apakah data responden tersimpan?**  
Ya, hasil submit disimpan di **PostgreSQL** (jawaban, skor, metadata). Bukan diagnosis — gunakan sesuai etika penelitian dan informed consent jika untuk studi formal.

---

*Panduan ini melengkapi [README.md](../README.md). Ada saran perbaikan? Update dokumen ini seiring evolusi platform.*
