# lucabrunke

Personal website of Luca Brunke. Plain static HTML, no build step, served by GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home (single screen, interactive 3D model) |
| `projects.html` | Project results grid + lightbox |
| `research.html` | Research & CV |
| `contact.html` | Contact |
| `imprint.html` | Impressum (§ 5 DDG) |
| `privacy.html` | Datenschutzerklärung |

## Editing

- **Colours, fonts, spacing:** `css/theme.css` (tokens at the top under `:root`).
- **Projects:** add or change results in `projects-data.js` only. Instructions are at the top of that file.
  Images go in `images/`. To swap an image, upload a new file with the same name.
- **Home 3D model:** `assets/merkur.glb`.
- **Portrait:** `assets/portrait.jpg` (800 × 1000, 4:5).
- Header and footer are repeated in each HTML page. If you change a nav link, change it in all six files.

## Privacy notes

Fonts (`assets/fonts/`) and the 3D viewer (`assets/vendor/model-viewer.min.js`, Apache-2.0) are self-hosted,
so visitors' browsers make no requests to Google or other CDNs. The only third-party content is the Sketchfab
embed in the Halliggye Fogou gallery. Strip EXIF/GPS metadata from photos before adding them.

## Local preview

`projects.html` loads its data as a JavaScript module, which browsers block for `file://` pages. Preview with a local server:

```
python3 -m http.server
```

then open http://localhost:8000.
