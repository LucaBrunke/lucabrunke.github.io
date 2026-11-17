# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website of Luca Brunke, served by GitHub Pages at the custom domain in `CNAME` (`lucabrunke.eu`). Plain static HTML/CSS/JS: no build step, no package manager, no tests, no linter. `.nojekyll` disables Jekyll processing, so files are served as-is.

## Local preview

```
python3 -m http.server
```

Then open http://localhost:8000. A server is required: `projects.html` loads `js/projects.js` as an ES module (which imports `projects-data.js`), and browsers block module imports on `file://`.

## Architecture

- **No templating.** The `<head>` (meta tags, font preloads, stylesheet), site header/nav and footer are duplicated verbatim in all six HTML pages (`index`, `projects`, `research`, `contact`, `imprint`, `privacy`). Any change to nav links, footer, or shared head tags must be applied to every page. The active nav item is marked with `aria-current="page"` per page.
- **Styling** lives entirely in `css/theme.css`. Design tokens (colours, font stacks, `--page-max`, `--gutter`) are CSS custom properties under `:root` at the top; use them rather than hard-coded values. Page-specific styles hang off a body class (e.g. `body.home`).
- **Projects page is data-driven.** `projects-data.js` exports an array of *results* (one tile each); results sharing the same `project` string are grouped, and the union of all `methods` becomes the filter chips. The schema (including the `media` item types `img` / `model` / `sketchfab` / `label`, and the optional `docs` link) is documented at the top of that file. Content edits go in `projects-data.js`, not `js/projects.js`. The first `media` item is the tile cover.
- **`js/projects.js`** renders the chips, grid and an accessible lightbox (focus trap, Esc/arrow keys, restores focus on close) using a small `el()` DOM helper; it never uses `innerHTML` for data-derived content.
- **`js/home.js`** and **`js/research.js`** are small classic-script IIFEs (ES5 style: `var`, `function`) for the model info popover and, on the research page, the sticky section menu highlight (`.toc` links ↔ section `id`s) and per-citation Copy buttons. Publications in `research.html` are hand-written `.pub` entries (a `.pub-cite` paragraph plus a Copy button), ordered newest first; Copy replaces labelled links with their URLs.
- **3D models** use Google's `<model-viewer>` web component, self-hosted at `assets/vendor/model-viewer.min.js` and loaded only on pages that need it (home, projects). The home model is `assets/merkur.glb` (texture downscaled to 2048 px to keep it ~1.7 MB); `assets/merkur-poster.jpg` (800 × 1000, a capture of the default front view) shows while it loads — replace both together.

## Constraints

- **Privacy / no third-party requests.** Fonts and the 3D viewer are deliberately self-hosted so visitors make no requests to Google or CDNs. Do not add CDN scripts, Google Fonts, analytics, or other external embeds. The only allowed third-party content is the Sketchfab embed in the Halliggye Fogou gallery; adding any new third-party service requires updating `privacy.html` (German-law Datenschutzerklärung) accordingly.
- **Images:** go in `images/` as `.jpg`; strip EXIF/GPS metadata before adding. Swapping an image is done by replacing the file under the same name. Portrait is `assets/portrait.jpg` (800 × 1000, 4:5).
- **Link previews:** every page has canonical + Open Graph tags (absolute `https://lucabrunke.eu/` URLs) pointing at `images/og-image.jpg` (1200 × 630). New pages need the same block. `404.html` uses root-relative paths because GitHub Pages serves it at any depth.
- **AI disclosure:** every page carries `ai-generated` / `ai-disclosure` meta tags and a footer link to `imprint.html#ai-notice` (EU AI Act transparency). Keep these on any new page.
- `imprint.html` (Impressum, § 5 DDG) and `privacy.html` are legal pages; don't alter their legal wording without being asked.
