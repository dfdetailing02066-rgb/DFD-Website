import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('/tmp/img-manifest.json', 'utf8'));
const OPT = 'assets/opt/';

// Build lookup keyed by the *decoded* src path as it appears in HTML.
const byPath = {};
for (const [rel, m] of Object.entries(manifest)) byPath[rel] = m;
const resolve = (src) => {
  if (!src) return null;
  let p = decodeURIComponent(src).replace(/^\.?\//, '');
  return byPath[p] || null;
};

// data-img hero keys actually used in the HTML -> their source file
const KEYMAP = {
  heroAuto: 'assets/bmw-x5m.png',
  heroCeramic: 'assets/porsche-911.png',
  heroMarine: 'assets/Boat Photos/IMG_0379.png',
};

const SIZES = {
  hero: '100vw',
  large: '(max-width: 900px) 100vw, 50vw',
  medium: '(max-width: 768px) 100vw, 33vw',
  thumb: '(max-width: 600px) 50vw, 25vw',
  logo: '(max-width: 1080px) 52px, 85px',
};

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : null;
};
const srcset = (m, fmt) => m.widths.map((w) => `${OPT}${m.base}-${w}.${fmt} ${w}w`).join(', ');
const fallbackSrc = (m) => `${OPT}${m.base}-${m.w}.${m.fallbackExt}`;

function buildImg(m, { alt, cls, style, onerror, eager, extra = '' }) {
  const parts = [
    cls ? `class="${cls}"` : '',
    `src="${fallbackSrc(m)}"`,
    `width="${m.w}" height="${m.h}"`,
    `alt="${alt ?? ''}"`,
    eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"',
    'decoding="async"',
    extra,
    style ? `style="${style}"` : '',
    onerror ? `onerror="${onerror}"` : '',
  ].filter(Boolean);
  return `<img ${parts.join(' ')}>`;
}

function buildPicture(m, opts) {
  const avif = `<source type="image/avif" srcset="${srcset(m, 'avif')}" sizes="${SIZES[m.cat]}">`;
  const webp = `<source type="image/webp" srcset="${srcset(m, 'webp')}" sizes="${SIZES[m.cat]}">`;
  return `<picture>${avif}${webp}${buildImg(m, opts)}</picture>`;
}

const IMG_RE = /<img\b[^>]*?>/gis;

function processHtml(file) {
  let html = fs.readFileSync(file, 'utf8');
  let count = 0;
  html = html.replace(IMG_RE, (tag, offset) => {
    const dataImg = attr(tag, 'data-img');
    const alt = attr(tag, 'alt');
    const cls = attr(tag, 'class');
    const style = attr(tag, 'style');
    const onerror = attr(tag, 'onerror');

    // data-img hero: keep <img>, point at optimized webp, mark eager
    if (dataImg && KEYMAP[dataImg]) {
      const m = byPath[KEYMAP[dataImg]];
      if (!m) return tag;
      count++;
      const eager = dataImg.startsWith('hero');
      return buildImg(m, { alt, cls, style, onerror, eager, extra: `data-img="${dataImg}"` });
    }

    // static <img> referencing an optimized asset -> <picture>
    const m = resolve(attr(tag, 'src'));
    if (!m) return tag;
    count++;
    const before = html.slice(Math.max(0, offset - 160), offset);
    const eager = /hero-bg/.test(before);
    return buildPicture(m, { alt, cls, style, onerror, eager });
  });
  fs.writeFileSync(file, html);
  console.log(`${file}: ${count} images transformed`);
  return html;
}

// --- HTML pages ---
for (const f of ['index.html', 'auto.html', 'ceramic.html', 'marine.html', 'contact.html']) {
  processHtml(f);
}

// --- shared.js logo (template literal) ---
{
  let js = fs.readFileSync('shared.js', 'utf8');
  const m = byPath['assets/dfd-logo.png'];
  js = js.replace(IMG_RE, (tag) => {
    if (resolve(attr(tag, 'src')) !== m && attr(tag, 'class') !== 'logo-img') return tag;
    if (!/logo-img/.test(tag)) return tag;
    return buildPicture(m, { alt: attr(tag, 'alt'), cls: attr(tag, 'class'), eager: true });
  });
  fs.writeFileSync('shared.js', js);
  console.log('shared.js: logo transformed');
}

// --- images.js: repoint IMAGES values that map to optimized files ---
{
  let js = fs.readFileSync('images.js', 'utf8');
  let n = 0;
  js = js.replace(/"(assets\/[^"]+\.(?:png|jpe?g|webp))"/g, (full, p) => {
    const m = resolve(p);
    if (!m) return full;
    n++;
    return `"${OPT}${m.base}-${m.w}.webp"`;
  });
  fs.writeFileSync('images.js', js);
  console.log(`images.js: ${n} map entries repointed`);
}
