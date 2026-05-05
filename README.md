# 📊 Campaign Analyzer Frontend

AI-powered advertising campaign analyzer — input data kampanye, dapatkan insight dan rekomendasi optimasi secara otomatis dari Gemini AI.

---

## 🧠 Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | SvelteKit + TypeScript |
| Styling | Tailwind CSS |
| Supabase (PostgreSQL + Auth) |
| AI | Google Gemini 3.5 Flash Preview |
| Architecture | Clean Architecture |

---

## 🏗️ Arsitektur Sistem

```
[SvelteKit Frontend]
        ↓
Supabase Auth (JWT)
        ↓
[Go Backend — Gin]
        ↓
    Usecase Layer
        ↓
    Domain Layer
        ↓
Infrastructure Layer
        ↓
Supabase DB + Gemini AI
```

### Frontend — Clean Architecture

```
src/lib/
├── components/     ← UI only, terima props & emit events
├── services/       ← Business logic, tidak tahu komponen mana yang pakai
├── repositories/   ← Data access, abstraksi ke API/Supabase
├── stores/         ← State global (Svelte writable stores)
└── types/          ← TypeScript interfaces & types
```

## ✨ Fitur

- **Campaign CRUD** — Buat, lihat, dan hapus data kampanye iklan
- **Metrics Engine** — Kalkulasi CTR, CPC, CPA otomatis dari data mentah
- **AI Analysis** — Analisis performa kampanye menggunakan Gemini AI:
  - Ringkasan performa
  - Identifikasi isu
  - Rekomendasi optimasi
  - Prioritas tindakan
- **Analysis History** — Riwayat semua hasil analisis AI
- **Dashboard** — Overview metrik dan chart performa mingguan
- **Auth** — Register & login via Supabase Auth (JWT)

---

## 📁 Struktur Project

```
├── campaign-analyzer/                        # SvelteKit
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── ui/              # Button, Input, Card, Badge
│   │   │   │   ├── layout/          # Sidebar, Navbar
│   │   │   │   ├── campaigns/       # CampaignForm, CampaignInfo, dll
│   │   │   │   ├── dashboard/       # StatsCard, WeeklyChart, dll
│   │   │   │   ├── analyze/         # AnalyzeLoading, AnalyzeSummary, dll
│   │   │   │   └── history/         # HistoryCard, HistoryEmpty
│   │   │   ├── repositories/
│   │   │   │   └── campaign.repository.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── campaign.service.ts
│   │   │   ├── stores/
│   │   │   │   ├── auth.store.ts
│   │   │   │   ├── campaign.store.ts
│   │   │   │   └── history.store.ts
│   │   │   ├── types/
│   │   │   │   └── campaign.types.ts
│   │   │   └── utils/
│   │   │       ├── api-server.ts    # HTTP server ke go backend
│   │   │       ├── api.ts           # HTTP client ke Go backend
│   │   │       └── format.ts        # Date, currency formatters
│   │   └── routes/
│   │       ├── (auth)/
│   │       │   ├── login/           # Halaman login
│   │       │   └── register/        # Halaman register
│   │       └── (dashboard)/         # Protected routes
│   │           ├── +layout.svelte   # Auth guard
│   │           ├── +page.svelte     # Dashboard home
│   │           ├── campaigns/
│   │           │   ├── +page.svelte         # Campaign list
│   │           │   ├── new/+page.svelte     # Buat campaign baru
│   │           │   └── [id]/
│   │           │       ├── +page.svelte     # Detail campaign
│   │           │       └── analyze/
│   │           │           └── +page.svelte # AI Analysis
│   │           ├── history/
│   │           │   └── +page.svelte # Analysis history
│   ├── .env
│   └── package.json
```

---

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js 18+
- Akun Supabase
---

### 1. Clone Repository

```bash
git clone https://github.com/username/campaign-analyzer-client.git
cd campaign-analyzer-client
```

---

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Buat file `.env`:

```env
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:8080
```

Jalankan development server:

```bash
npm run dev
```

Frontend berjalan di `http://localhost:5173`

---

## 🔒 Autentikasi

Autentikasi sepenuhnya ditangani oleh **Supabase Auth** — tidak ada tabel user yang dibuat secara manual.

**Flow:**
1. User register/login via Supabase Auth di frontend
2. Supabase mengembalikan JWT access token
3. Frontend menyertakan token di header setiap request ke backend: `Authorization: Bearer <token>`
4. Backend Go memverifikasi JWT menggunakan Supabase JWT Secret

---

## 🧱 Engineering Principles

### 1. Frontend Clean Architecture

```
UI (Svelte) → Store → Service → Repository → API/Supabase
```

Komponen hanya menerima data via props dan mengemit events — tidak boleh langsung call API.

---

## 📈 Roadmap

- [x] Phase 1 — Backend Setup (Go + Gin)
- [x] Phase 2 — Domain Layer
- [x] Phase 3 — Campaign CRUD + Database
- [x] Phase 4 — Metrics Engine (CTR, CPC, CPA)
- [x] Phase 5 — AI Integration (Gemini)
- [x] Phase 6 — Dashboard UI (SvelteKit)
- [x] Phase 7 — Analysis History (store & retrieve)
- [ ] Phase 8 — CSV Upload, Campaign Comparison, Export PDF
