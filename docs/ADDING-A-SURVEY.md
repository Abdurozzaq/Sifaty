# Menambah Survey Baru di Sifaty

Setiap survey = **1 folder** di `server/surveys/{slug}/`.

## Struktur folder

```
server/surveys/my-new-survey/
├── index.js      # Entry point (kontrak export)
├── survey.js     # Meta, questions, types, levels, scoring config
├── pustaka.js    # Referensi jurnal (array)
└── core.js       # (opsional) logic custom jika tidak pakai likert-helper
```

## Survey Likert standar (disarankan)

1. Copy folder `server/surveys/student-burnout/` sebagai template
2. Rename slug di `survey.js` dan folder
3. Isi `QUESTIONS`, `TYPES`, `LEVELS`, `SURVEY_META`, `pustaka.js`
4. Restart server — survey otomatis muncul di `/api/surveys`

`index.js` untuk survey Likert:

```js
const { createScaleSurveyModule } = require('../_shared/likert-helper');
const config = require('./survey');
const PUSTAKA = require('./pustaka');

module.exports = createScaleSurveyModule({ ...config, pustaka: PUSTAKA });
```

Set `renderType: 'scale'` (default di helper) — halaman hasil generik otomatis.

## Survey custom (RIASEC, age input, dll.)

Lihat `server/surveys/subjective-age/index.js` untuk pola custom:
- `getRequiredAnswerKeys`, `validateAnswer` khusus
- `renderType` custom (`sage`, `riasec`, `dtdd`, …)
- Tambah renderer di `public/js/renderers/` jika perlu UI khusus

## Field wajib di `index.js`

- `slug`, `meta`, `questions`, `types`, `pustaka`
- `calculateScores`, `buildResultData`, `summaryCode`, `og`
- `renderType` — routing frontend hasil

## Frontend

- Hasil `renderType: 'scale'` → `public/js/renderers/scale.js`
- Homepage: set `meta.audience` = `'mahasiswa'` | `'pekerja'` | `'umum'`
