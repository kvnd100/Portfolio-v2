# Grid.KN

Single-page interactive portfolio with a **Tron** aesthetic: ride a lightcycle on the Grid, open sector portals for projects, experience, skills, contact, and resume content. Built with **React 18** and **Vite 5**.

## Features

- Phase-driven UI (`ride` → `entering` → `open` → `exiting` → `returning`) coordinated in [`src/App.jsx`](src/App.jsx)
- Responsive layouts for mobile / tablet / desktop ([`styles/responsive.css`](src/styles/responsive.css))
- Optional **SFX** (Web Audio lightcycle hum and UI clicks) and **MUSIC** (theme loop via [`public/Circuit Noir.mp3`](public/Circuit%20Noir.mp3))
- **PROGRAM** terminal narrator with queued typewriter lines ([`hooks/useProgram.js`](src/hooks/useProgram.js))
- Résumé PDF linked from the Resume sector ([`public/Kavindu_Resume_v2.pdf`](public/Kavindu_Resume_v2.pdf))

## Prerequisites

- **Node.js** 18+ recommended (aligned with current Vite 5 toolchain)
- **npm** (or use your preferred package manager; commands below assume npm)

## Getting started

```bash
npm install
npm run dev
```

Development server defaults to **http://localhost:5173**.

| Command           | Purpose                          |
|-------------------|----------------------------------|
| `npm run dev`     | Start Vite in development mode    |
| `npm run build`   | Production build output to `dist/` |
| `npm run preview` | Serve `dist/` locally for checks |

This repository does not include automated tests, ESLint, or TypeScript by default.

## Project layout

```
src/
  App.jsx              # Phase machine and shell composition
  main.jsx             # Entry + global styles
  data/portfolio.js    # Résumé data, PROJECTS, SECTIONS
  hooks/               # Sound engine, theme music, PROGRAM, viewport
  components/
    chrome/            # HUD, hero, boot, controls, CRT, cursor
    program/           # PROGRAM terminal
    ride/              # Lightcycle, nodes, trails, ride surface
    sections/          # Section overlay + pane components
  styles/
    index.css          # Imports (order matters)
    base.css …         # Tokens, typography
    responsive.css     # **All** breakpoints (load last)

public/
  Kavindu_Resume_v2.pdf
  Circuit Noir.mp3
```

## Editing content

- **Bio, stats, jobs, skills, projects, writing list:** [`src/data/portfolio.js`](src/data/portfolio.js)
- **Section portals (order matters):** `SECTIONS` in the same file must stay in sync with **node layouts** in [`RideMode.jsx`](src/components/ride/RideMode.jsx) (`LAYOUTS` has one `[x,y]` fraction per section, same length and order).

## Swapping assets

- **Résumé:** Replace `public/Kavindu_Resume_v2.pdf` and update `PORTFOLIO.resume` (file path string, optional size/date/pages metadata).
- **Theme:** Replace `public/Circuit Noir.mp3` if you rename the file or update `<audio>` / loader references accordingly (see [`useThemeMusic.js`](src/hooks/useThemeMusic.js)).

---

**grid-kn-portfolio** (public). Fork or adapt for your own site; attribution is appreciated.
