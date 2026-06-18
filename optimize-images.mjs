import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = process.argv[2];
const OUT = path.join(ROOT, 'assets', 'opt');
fs.mkdirSync(OUT, { recursive: true });

const CAT = {
  hero:   { max: 1280, mids: [0.5, 0.75] },
  large:  { max: 1400, mids: [0.5] },
  medium: { max: 900,  mids: [0.5] },
  thumb:  { max: 640,  mids: [0.55] },
  logo:   { max: 1000, mids: [0.5], alpha: true },
};

const IMAGES = [
  ['assets/porsche-truck.png',                 'porsche-detailing-truck',     'hero'],
  ['assets/porsche-911.png',                   'porsche-911-ceramic-coating', 'large'],
  ['assets/bmw-x5m.png',                        'bmw-x5m-detail',              'large'],
  ['assets/porsche-foam-wash.png',             'porsche-foam-wash',           'large'],
  ['assets/cadillac-escalade.png',             'cadillac-escalade-detail',    'medium'],
  ['assets/tesla-model-y.png',                 'tesla-model-y-detail',        'thumb'],
  ['assets/photo-1.png',                        'suv-foam-wash-driveway',      'thumb'],
  ['assets/bmw-m4-blue.png',                    'blue-bmw-m4-detail',          'thumb'],
  ['assets/dfd-logo.png',                       'dfd-logo',                    'logo'],
  ['assets/SystemX logo.png',                   'systemx-logo',                'logo'],
  ['assets/Boat Photos/Ceramic Coating.webp',  'boat-ceramic-coating',        'medium'],
  ['assets/Boat Photos/IMG_2617.png',          'boat-detailing-scituate',     'medium'],
  ['assets/Boat Photos/IMG_0390.png',          'detailed-boat-1',             'thumb'],
  ['assets/Boat Photos/IMG_0381.png',          'detailed-boat-2',             'thumb'],
  ['assets/Boat Photos/IMG_0379.png',          'detailed-boat-3',             'large'],
  ['assets/Boat Photos/IMG_0385.png',          'detailed-boat-4',             'thumb'],
  ['assets/Boat Photos/IMG_0187.png',          'detailed-boat-5',             'thumb'],
  ['assets/Boat Photos/IMG_0162.png',          'detailed-boat-6',             'thumb'],
  ['assets/Boat Photos/Boat maintenance.webp', 'boat-maintenance',            'medium'],
  ['assets/Boat Photos/Wax.webp',              'boat-wax',                    'medium'],
  ['assets/Boat Photos/Wash.webp',             'boat-wash',                   'medium'],
  ['assets/Boat Photos/Metal Polishing.webp',  'boat-metal-polishing',        'medium'],
  ['assets/Boat Photos/Compounding.webp',      'boat-compounding',            'medium'],
];

const manifest = {};

for (const [rel, base, cat] of IMAGES) {
  const src = path.join(ROOT, rel);
  const cfg = CAT[cat];
  const meta = await sharp(src).metadata();
  const maxW = Math.min(cfg.max, meta.width);
  const widths = [...new Set([...cfg.mids.map(m => Math.round(maxW * m)), maxW])]
    .filter(w => w >= 80).sort((a, b) => a - b);
  const fallbackExt = cfg.alpha ? 'png' : 'jpg';
  const formats = cfg.alpha ? ['avif', 'webp', 'png'] : ['avif', 'webp', 'jpg'];
  const intrinsicH = Math.round(maxW * meta.height / meta.width);

  for (const w of widths) {
    const pipe = sharp(src).resize({ width: w, withoutEnlargement: true });
    for (const fmt of formats) {
      const outFile = path.join(OUT, `${base}-${w}.${fmt}`);
      let p = pipe.clone();
      if (fmt === 'avif') p = p.avif({ quality: cat === 'logo' ? 60 : 50 });
      else if (fmt === 'webp') p = p.webp({ quality: 78 });
      else if (fmt === 'jpg') p = p.jpeg({ quality: 80, mozjpeg: true });
      else if (fmt === 'png') p = p.png({ compressionLevel: 9, palette: true });
      await p.toFile(outFile);
    }
  }
  manifest[rel] = { base, cat, w: maxW, h: intrinsicH, widths, formats, fallbackExt };
  console.log(`${rel} -> ${base} [${widths.join(',')}] ${maxW}x${intrinsicH}`);
}

fs.writeFileSync('/tmp/img-manifest.json', JSON.stringify(manifest, null, 2));
let total = 0;
for (const f of fs.readdirSync(OUT)) total += fs.statSync(path.join(OUT, f)).size;
console.log(`\nGenerated ${fs.readdirSync(OUT).length} files, ${Math.round(total/1024)}KB total in assets/opt/`);
