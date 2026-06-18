/* ============================================================
   IMAGES - Real DFD photography in /assets, with Unsplash fallbacks
   for slots without a real photo yet.
   ============================================================ */

window.IMAGES = {
  // ---- Hero backgrounds ----
  heroHome:    "assets/opt/porsche-detailing-truck-1080.webp",       // Porsche + DFD branded truck
  heroAuto:    "assets/opt/bmw-x5m-detail-1400.webp",             // clean BMW X5M
  heroMarine:  "assets/opt/detailed-boat-3-1400.webp",    // real DFD boat photo
  heroCeramic: "assets/opt/porsche-911-ceramic-coating-1080.webp",         // glossy Porsche 911
  heroContact: "assets/opt/tesla-model-y-detail-640.webp",       // clean Tesla

  // ---- Service tiles on Home ----
  tileAuto:    "assets/opt/cadillac-escalade-detail-772.webp",   // detailed Escalade
  tileMarine:  "assets/opt/boat-detailing-scituate-900.webp",    // real DFD boat photo
  tileCeramic: "assets/opt/porsche-911-ceramic-coating-1080.webp",         // glossy ceramic-coated Porsche

  // ---- Process step illustrations on Home ----
  step01: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format&fit=crop",
  step02: "assets/opt/suv-foam-wash-driveway-600.webp",                  // foam-wash SUV in driveway
  step03: "assets/opt/bmw-x5m-detail-1400.webp",                  // pristine result

  // ---- Why-us / mid-page beauty shot ----
  whyUs: "assets/opt/porsche-foam-wash-1080.webp",         // Porsche being foam-washed

  // ---- Reviewer avatars ----
  avatarCatherine: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&auto=format&fit=crop",
  avatarShannon:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop",
  avatarRachel:    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&auto=format&fit=crop",

  // ---- Auto package tile photos ----
  pkgInterior: "assets/opt/tesla-model-y-detail-640.webp",
  pkgFull:     "assets/opt/suv-foam-wash-driveway-600.webp",             // foam wash
  pkgDiamond:  "assets/opt/blue-bmw-m4-detail-640.webp",         // BMW M4

  // ---- Marine package tile photos (Unsplash fallbacks) ----
  marinerPkg:  "assets/opt/detailed-boat-6-640.webp",    // real DFD boat photo
  captainPkg:  "assets/opt/detailed-boat-5-640.webp",    // real DFD boat photo
  ceramicPkg:  "assets/Boat%20Photos/ceramic-hull.png", // ceramic coated hull with water beading

  // ---- Marine service section accents ----
  marineCompound: "assets/opt/boat-compounding-900.webp",
  marineWax:      "assets/opt/boat-wax-900.webp",
  marineWash:     "assets/opt/boat-wash-900.webp",
  marineMetal:    "assets/opt/boat-metal-polishing-900.webp",
  marineCeramic:  "assets/opt/boat-ceramic-coating-900.webp",

  marinaDock: "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=1600&q=80&auto=format&fit=crop",

  // ---- Ceramic coating beauty shot ----
  ceramicHero2: "assets/opt/porsche-911-ceramic-coating-1080.webp",
  ceramicSplit: "assets/opt/blue-bmw-m4-detail-640.webp",
};

/* Image error handler */
window.handleImgError = function(img) {
  img.style.display = 'none';
  if (img.parentElement && img.parentElement.classList.contains('img-frame')) {
    img.parentElement.classList.add('img-frame--failed');
  }
};

/* Portfolio - auto + marine real photos */
Object.assign(window.IMAGES, {
  portfolio1: "assets/opt/porsche-detailing-truck-1080.webp",
  portfolio2: "assets/opt/cadillac-escalade-detail-772.webp",
  portfolio3: "assets/opt/porsche-foam-wash-1080.webp",
  portfolio4: "assets/opt/bmw-x5m-detail-1400.webp",
  portfolio5: "assets/opt/suv-foam-wash-driveway-600.webp",
  portfolio6: "assets/opt/porsche-911-ceramic-coating-1080.webp",
  portfolio7: "assets/opt/blue-bmw-m4-detail-640.webp",
  portfolio8: "assets/opt/tesla-model-y-detail-640.webp",

  // Marine gallery - 8 boat photos not bound to a specific service
  boat1: "assets/opt/boat-maintenance-900.webp",
  boat2: "assets/opt/detailed-boat-6-640.webp",
  boat3: "assets/opt/detailed-boat-5-640.webp",
  boat4: "assets/opt/detailed-boat-3-1400.webp",
  boat5: "assets/opt/detailed-boat-2-640.webp",
  boat6: "assets/opt/detailed-boat-4-640.webp",
  boat7: "assets/opt/detailed-boat-1-640.webp",
  boat8: "assets/opt/boat-detailing-scituate-900.webp",
});
