// Projects: method filter chips, result grid and lightbox gallery.
// All content comes from projects-data.js — edit that file, not this one.
import results from '../projects-data.js';

const $ = (id) => document.getElementById(id);
const chipsEl = $('chips'), countEl = $('count'), gridEl = $('grid');
const lb = $('lightbox'), stage = $('lb-stage'), thumbsEl = $('lb-thumbs'), actionsEl = $('lb-actions');

const EXT_SVG = '<svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

const state = { method: 'All', project: null, openId: null, mediaIndex: 0 };
let lastFocus = null;

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) if (c) node.append(c);
  return node;
}

// replaceChildren() would print false/null as text; drop them
const fill = (node, ...kids) => node.replaceChildren(...kids.filter(Boolean));

const mediaOf = (r) => (r.media && r.media.length ? r.media : [{ label: r.title }]);
const is3d = (m) => !!(m.model || m.sketchfab);
const siblingsOf = (r) => results.filter((x) => x.project === r.project).length;

/* ---- Filters + grid ---- */
function render() {
  const methods = ['All', ...new Set(results.flatMap((r) => r.methods || []))];
  fill(chipsEl,
    ...methods.map((m) => el('button', {
      class: 'chip', type: 'button', 'aria-pressed': String(m === state.method), text: m,
      onclick: () => { state.method = m; render(); },
    })),
    state.project && el('button', {
      class: 'chip-project', type: 'button', 'aria-label': `Remove project filter: ${state.project}`,
      onclick: () => { state.project = null; render(); },
    }, `Project: ${state.project}`, el('span', { 'aria-hidden': 'true', text: '×' })),
  );

  const list = results.filter((r) =>
    (state.method === 'All' || (r.methods || []).includes(state.method)) &&
    (!state.project || r.project === state.project));

  countEl.textContent = `${list.length} result${list.length === 1 ? '' : 's'}`;
  fill(gridEl, ...list.map(tile));
}

function tile(r) {
  const media = mediaOf(r);
  const first = media[0];
  const cover = first.img
    ? el('img', { src: first.img, alt: '', loading: 'lazy', decoding: 'async' })
    : el('div', { class: 'placeholder', text: is3d(first) ? '3D model' : first.label });

  const badges = el('div', { class: 'tile-badges' },
    media.some(is3d) && el('span', { class: 'badge badge-3d', text: '3D' }),
    media.length > 1 && el('span', { class: 'badge', text: `${media.length} images` }));

  return el('button', { class: 'tile', type: 'button', onclick: (e) => open(r.id, e.currentTarget) },
    el('div', { class: 'tile-media' }, cover, badges),
    el('div', { class: 'tile-title', text: r.title }),
    el('div', { class: 'tile-meta', text: `${r.project} · ${r.year}` }));
}

/* ---- Lightbox ---- */
function open(id, from) {
  lastFocus = from || document.activeElement;
  state.openId = id;
  state.mediaIndex = 0;
  lb.hidden = false;
  document.body.classList.add('no-scroll');
  renderLightbox();
  $('lb-close').focus();
}

function close() {
  state.openId = null;
  lb.hidden = true;
  stage.replaceChildren(); // stops model/iframe
  document.body.classList.remove('no-scroll');
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

function step(d) {
  const r = results.find((x) => x.id === state.openId);
  const n = r ? mediaOf(r).length : 0;
  if (n < 2) return;
  state.mediaIndex = (state.mediaIndex + d + n) % n;
  renderLightbox();
}

function renderStage(r, m) {
  if (m.model) {
    return el('model-viewer', {
      src: m.model, alt: `3D model: ${r.title}`, 'camera-controls': '', 'auto-rotate': '',
      'rotation-per-second': '16deg', 'interaction-prompt': 'none', 'shadow-intensity': '0.6', exposure: '1.05',
    });
  }
  if (m.sketchfab) {
    return el('iframe', {
      src: m.sketchfab, title: `${r.title} – 3D model on Sketchfab`,
      allow: 'autoplay; fullscreen; xr-spatial-tracking', allowfullscreen: '',
    });
  }
  if (m.img) return el('img', { src: m.img, alt: m.alt || r.title });
  return el('div', { class: 'placeholder', text: m.label });
}

function renderLightbox() {
  const r = results.find((x) => x.id === state.openId);
  if (!r) return;
  const media = mediaOf(r);
  const i = state.mediaIndex;
  const gallery = media.length > 1;

  fill(stage,
    renderStage(r, media[i]),
    gallery && el('button', { class: 'round-btn stage-nav stage-prev', type: 'button', 'aria-label': 'Previous image', text: '←', onclick: () => step(-1) }),
    gallery && el('button', { class: 'round-btn stage-nav stage-next', type: 'button', 'aria-label': 'Next image', text: '→', onclick: () => step(1) }),
    gallery && el('div', { class: 'stage-pos', text: `${i + 1} / ${media.length}` }),
  );

  thumbsEl.hidden = !gallery;
  fill(thumbsEl, ...(gallery ? media.map((m, j) => el('button', {
    class: 'thumb', type: 'button', 'aria-label': is3d(m) ? `3D model` : `Image ${j + 1}`,
    'aria-current': String(j === i),
    onclick: () => { state.mediaIndex = j; renderLightbox(); },
  }, m.img && !is3d(m) ? el('img', { src: m.img, alt: '' })
    : is3d(m) ? el('div', { class: 'thumb-3d', text: '3D' })
    : el('div', { class: 'placeholder' }))) : []));

  $('lb-eyebrow').textContent = [r.project, (r.methods || []).join(', '), r.year].filter(Boolean).join(' · ');
  $('lb-title').textContent = r.title;
  $('lb-desc').textContent = r.description || '';

  const docs = r.docs && el('a', { class: 'btn-accent', href: r.docs, target: '_blank', rel: 'noopener' });
  if (docs) docs.innerHTML = 'Documentation' + EXT_SVG;
  const siblings = siblingsOf(r);
  fill(actionsEl,
    docs,
    siblings > 1 && el('button', {
      class: 'link-project', type: 'button', text: `All ${siblings} results from this project →`,
      onclick: () => { state.project = r.project; state.method = 'All'; close(); render(); chipsEl.querySelector('.chip-project')?.focus(); },
    }),
  );
}

lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
$('lb-close').addEventListener('click', close);
document.addEventListener('keydown', (e) => {
  if (!state.openId) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'Tab') {
    // keep focus inside the dialog
    const f = [...lb.querySelectorAll('button, a[href], iframe, model-viewer')].filter((n) => n.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

render();
