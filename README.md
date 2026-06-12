# Sifaty

**Platform psikometri edukatif** — katalog instrumen pengukuran psikologis berbasis penelitian untuk refleksi diri, literasi kesehatan mental, dan edukasi.

Tanpa login · hasil bisa dishare · setiap instrumen punya referensi jurnal.

---

## Isi singkat

| | |
|---|---|
| **Instrumen** | ~50 survey (mahasiswa, pekerja, umum) |
| **Metodologi** | RIASEC, Likert, MBI, dan skala tervalidasi lainnya |
| **Frontend** | SPA vanilla JS + Tailwind |
| **Backend** | Express.js |
| **Database** | PostgreSQL (hasil survey) |

> Hasil di Sifaty bersifat **edukatif**, bukan diagnosis klinis.

---

## Mulai cepat

### 1. Prasyarat

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/download/) 14+

Buat database:

```bash
createdb sifaty
```

### 2. Install

```bash
git clone <repo-url>
cd Sifaty
npm install
```

### 3. Environment

Copy `.env.example` → `.env`, lalu sesuaikan:

```env
DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/sifaty
PORT=3000
BASE_URL=http://localhost:3000
```

### 4. Jalankan

```bash
npm run dev
```

Buka **http://localhost:3000**

Kalau PostgreSQL terhubung, terminal menampilkan `PostgreSQL terhubung`. Tabel `results` dibuat otomatis saat pertama kali start.

### Migrasi data lama (opsional)

Jika masih punya file `server/data/results.json` dari versi sebelumnya:

```bash
npm run migrate:postgres
```

---

## Perintah npm

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Development + auto-reload |
| `npm start` | Production |
| `npm run migrate:postgres` | Import `results.json` ke PostgreSQL |

---

## Halaman utama

| Rute | Isi |
|------|-----|
| `/` | Katalog — search, filter, pagination (10/halaman) |
| `/pustaka` | Referensi jurnal per instrumen |
| `/tentang` | Visi, dasar ilmiah, etika |
| `/penggunaan` | Kegunaan yang sesuai & batasan |
| `/credits` | Info pembuat |
| `/survey/:slug` | Detail & mulai survey |
| `/hasil/:id` | Hasil + share |

---

## Fitur

- **Katalog instrumen** — filter populasi (mahasiswa / pekerja / umum) & kategori
- **Pustaka** — jurnal acuan tiap survey
- **Skala Likert** — auto-advance, ~3–5 menit per instrumen
- **Hasil & share** — kode unik `SF-XXXXXX`, QR code, link OG preview
- **Analisis positif & negatif** — tag di kartu instrumen (skor tinggi = baik / parah)

---

## Struktur project

```
Sifaty/
├── public/                 # Frontend SPA
│   ├── js/app.js           # Router & UI
│   ├── js/core/            # Store, filter, pagination
│   └── css/
├── server/
│   ├── index.js            # Express + API
│   ├── db.js               # PostgreSQL queries
│   ├── db/postgres.js      # Pool & schema
│   └── surveys/            # 1 folder = 1 survey (auto-registry)
│       ├── _shared/        # Registry, katalog, likert-helper
│       ├── riasec-career/
│       ├── student-burnout/
│       └── ...
└── docs/
    └── ADDING-A-SURVEY.md  # Panduan tambah survey baru
```

Survey baru cukup ditambah sebagai folder di `server/surveys/` — muncul otomatis di API tanpa edit registry manual.

---

## API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/surveys` | Daftar semua instrumen (+ metadata katalog) |
| `GET` | `/api/catalog` | Facet filter (kategori, populasi, dll.) |
| `GET` | `/api/surveys/:slug` | Detail + pertanyaan |
| `POST` | `/api/surveys/:slug/submit` | Submit jawaban → simpan ke PostgreSQL |
| `GET` | `/api/results/:id` | Ambil hasil by ID |
| `GET` | `/api/results/code/:code` | Ambil hasil by kode `SF-XXXXXX` |
| `GET` | `/api/results/:id/qrcode` | QR code PNG |
| `GET` | `/api/pustaka?survey=slug` | Referensi jurnal (filter opsional) |
| `GET` | `/share/:code` | Halaman share + OG meta |
| `GET` | `/api/og/:code.png` | Thumbnail untuk social media |

---

## Menambah survey

Lihat **[docs/ADDING-A-SURVEY.md](docs/ADDING-A-SURVEY.md)** — panduan untuk peneliti kesehatan & pemula coding.

Ringkasnya:

1. Copy folder `server/surveys/student-burnout/` sebagai template
2. Isi `survey.js`, `pustaka.js`, rename slug
3. Restart server

Untuk batch banyak survey sekaligus, ada script generator di `server/scripts/bootstrap-scale-surveys*.js`.

---

## Tech stack

| Layer | Teknologi |
|-------|-----------|
| Runtime | Node.js |
| Server | Express.js |
| Database | PostgreSQL + `pg` |
| UI | Vanilla JS, Tailwind CSS, Anime.js |
| ID & share | nanoid, qrcode |

---

## Lisensi

MIT
