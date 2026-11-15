# Rahimjon Komiljonov: Portfolio

Personal portfolio built for K0126002 (Gachon University, 2026 Fall).

**Live site:** https://rahimjonkomiljonov.github.io/portfolio/

## Features

- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Responsive CSS (grid + media queries, hamburger menu on phones)
- JavaScript interactions:
  - Dark/light mode toggle (icon-only, remembers your choice)
  - Reactive network background in the hero that responds to the cursor
  - Skill explorer: click a skill to see which projects used it
  - Project filter, plus detail dialogs with real demo videos
  - Interactive profile terminal, expandable certificate cards with 3D tilt
  - Scroll reveal, scroll progress bar, animated counters, copy-email button
- Accessibility: skip link, visible focus styles, descriptive alt text, WCAG AA contrast in both themes, `prefers-reduced-motion` support, keyboard-operable dialogs
- Lighthouse: Accessibility 100 in dark and light themes (desktop and mobile)
- Downloadable one-page resume (PDF) with an on-site preview section
- The skills and projects sections are React components. They are rendered to plain HTML at build time and hydrated in the browser, so the page is complete before any script runs. The rest of the site is plain HTML, CSS and JavaScript. The built files are committed, so it deploys as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html      <- entry point (repo root)
  style.css
  js/
    theme.js      <- dark/light toggle
    effects.js    <- hero canvas, reveal, tilt, counters, nav
    explorer.js   <- terminal, certificates, copy email
    islands.js    <- built React bundle (skills + projects), from react/
  react/          <- source of the React sections (run `npm install && npm run build` here)
  resume/
    resume.html   <- source of the PDF (also a web version)
    Rahimjon_Komiljonov_Resume.pdf
  images/
    media/        <- compressed demo videos, loops and posters
```

## Rebuild the React sections

In `react/`, run `npm install` once and then `npm run build`. It writes `js/islands.js` and updates the pre-rendered markup between the `island` comments in `index.html`.

## Run locally

Run `python -m http.server` in this folder and visit http://localhost:8000.

## Credits

Technology logos come from [Simple Icons](https://simpleicons.org) (CC0). Logos are trademarks of their respective owners. The SQL and WebSockets icons are custom.
