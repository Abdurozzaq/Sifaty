# Sifaty — Survey Store Interaktif 🌟

Aplikasi survey berbasis **Holland RIASEC Theory** untuk membantu menemukan pekerjaan yang cocok berdasarkan kepribadian, minat, dan kebiasaan.

## Fitur

- 🏪 **Survey Store** — listing survey yang tersedia
- 🎮 **Interaktif & Lucu** — UI game-like dengan animasi 3D (Three.js)
- 📝 **Survey RIASEC** — 30 pertanyaan (5 per tipe RIASEC)
- 🔑 **Tanpa Login** — langsung ikuti survey
- ✨ **Kode Unik + QR Code** — setiap hasil mendapat kode `SF-XXXXXX` dan QR
- 📱 **Shareable Link** — share ke WhatsApp, Telegram, Email dengan OG thumbnail
- 📊 **Rekomendasi Karier** — berdasarkan Holland Code & O*NET mapping

## Metodologi (dari Jurnal Referensi)

Berdasarkan:
- Holland, J.L. (1997) — RIASEC Theory
- Zainudin et al. (2024) — Application in Educational Settings
- Wistarini & Syarifah (2023) — RIASEC Model Assessment
- Wei (2024) — Questionnaire structure (3 pertanyaan/tipe, threshold 0.67)

**Scoring:** Likert 1-5 per pertanyaan → normalisasi 0-100% per dimensi → Holland Code dari 3 tipe tertinggi.

## Menjalankan

```bash
npm install
npm start
# atau development mode:
npm run dev
```

Buka http://localhost:3000

## Tech Stack

- **Backend:** Express.js + SQLite (better-sqlite3)
- **Frontend:** Vanilla JS SPA + Tailwind CSS + Three.js
- **QR Code:** qrcode npm package
- **Share:** Open Graph meta tags untuk thumbnail preview

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/surveys` | List survey |
| GET | `/api/surveys/:slug` | Detail survey + pertanyaan |
| POST | `/api/surveys/:slug/submit` | Submit jawaban |
| GET | `/api/results/:id` | Hasil survey |
| GET | `/api/results/:id/qrcode` | QR code PNG |
| GET | `/share/:code` | Share page dengan OG tags |
| GET | `/api/og/:code.png` | Thumbnail untuk social media |
