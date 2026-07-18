# AirGlow

A React (Vite) prototype of the AirGlow data pipeline orchestrator UI.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Structure

- `src/pages` — one component per screen: Login, Dashboard, Dags, CreateDag, Runs, RunDetails, Webhooks, Placeholder
- `src/components` — Sidebar, Topbar, Layout (shell wrapping every `/app/*` route), Badge, icons
- `src/data/mockData.js` — sample DAGs, runs, webhooks and log data
- `src/App.jsx` — route definitions (React Router)
- `src/index.css` — all styling, using CSS custom properties for the design tokens (colors, radius, etc.)

## Routes

| Path | Page |
|---|---|
| `/` | Sign in |
| `/app/dashboard` | Dashboard |
| `/app/dags` | DAGs list |
| `/app/dags/new` | Create DAG wizard |
| `/app/runs` | Runs list |
| `/app/runs/:id` | Run details |
| `/app/webhooks` | Webhooks |
| `/app/schedules`, `/app/outputs`, `/app/users`, `/app/settings`, `/app/documentation` | Placeholder pages |

Signing in just navigates to `/app/dashboard` — there's no real auth wired up, this is a UI prototype with mock data.
