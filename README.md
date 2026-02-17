# Label — motion-first React site

Vite + React + TypeScript promo site with:

- **React Router** pages (`/`, `/works`, `/works/:slug`)
- **TanStack React Query** (cache, prefetch on hover, mutation demo)
- **Smooth scrolling** (Lenis) + **motion transitions** (Framer Motion)
- **Local dev API** (Express) serving works/clients JSON

## Requirements

- Node.js 20+

## Run locally

Install:

```bash
npm install
```

Start **web + API** together:

```bash
npm run dev
```

- Web: `http://localhost:5173`
- API: `http://localhost:5175`

## Environment

Optionally override API base URL:

```bash
VITE_API_URL="http://localhost:5175"
```

## Useful scripts

- `npm run dev:web` — only Vite
- `npm run dev:api` — only API
- `npm run build` — production build
- `npm run preview` — serve build locally
- `npm run lint` — eslint

