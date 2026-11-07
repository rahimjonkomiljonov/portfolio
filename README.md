# Rahimjon Komiljonov: Portfolio

Personal portfolio built for K0126002 (Gachon University, 2026 Fall).

**Live site:** https://rahimjonkomiljonov.github.io/portfolio/

## Features

- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Responsive CSS (grid + media queries, tested down to phone width)
- JavaScript interactions: dark/light mode toggle (remembers choice, respects system preference) and a project category filter
- Accessibility: skip link, visible focus styles, descriptive alt text, WCAG AA colour contrast in both themes, reduced-motion support
- No frameworks, no build step, no external requests. Deploys as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html   <- entry point (repo root)
  style.css
  script.js
  images/
```

## Run locally

Open `index.html` in a browser, or run `python -m http.server` and visit http://localhost:8000.
