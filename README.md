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
- No frameworks and no build step. Deploys as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html      <- entry point (repo root)
  style.css
  js/
    theme.js      <- dark/light toggle
    effects.js    <- hero canvas, reveal, tilt, counters, nav
    explorer.js   <- skills, projects, terminal, certificates
  images/
    media/        <- compressed demo videos, loops and posters
```

## Run locally

Run `python -m http.server` in this folder and visit http://localhost:8000.

## Credits

Technology logos come from [Simple Icons](https://simpleicons.org) (CC0). Logos are trademarks of their respective owners. The SQL and WebSockets icons are custom.
