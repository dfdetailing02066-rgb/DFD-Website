/* ============================================================
   IMAGES - Real DFD photography in /assets, with Unsplash fallbacks
   for slots without a real photo yet.
   ============================================================ */

window.IMAGES = {
  // ---- Hero backgrounds ----
  heroHome:    "assets/porsche-truck.png",       // Porsche + DFD branded truck
  heroAuto:    "assets/bmw-x5m.png",             // clean BMW X5M
  heroMarine:  "assets/Boat%20Photos/IMG_0379.png",    // real DFD boat photo
  heroCeramic: "assets/porsche-911.png",         // glossy Porsche 911
  heroContact: "assets/tesla-model-y.png",       // clean Tesla

  // ---- Service tiles on Home ----
  tileAuto:    "assets/cadillac-escalade.png",   // detailed Escalade
  tileMarine:  "assets/Boat%20Photos/IMG_2617.png",    // real DFD boat photo
  tileCeramic: "assets/porsche-911.png",         // glossy ceramic-coated Porsche

  // ---- Process step illustrations on Home ----
  step01: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format&fit=crop",
  step02: "assets/photo-1.png",                  // foam-wash SUV in driveway
  step03: "assets/bmw-x5m.png",                  // pristine result

  // ---- Why-us / mid-page beauty shot ----
  whyUs: "assets/porsche-foam-wash.png",         // Porsche being foam-washed

  // ---- Reviewer avatars ----
  avatarCatherine: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&auto=format&fit=crop",
  avatarShannon:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop",
  avatarRachel:    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&auto=format&fit=crop",

  // ---- Auto package tile photos ----
  pkgInterior: "assets/tesla-model-y.png",
  pkgFull:     "assets/photo-1.png",             // foam wash
  pkgDiamond:  "assets/bmw-m4-blue.png",         // BMW M4

  // ---- Marine package tile photos (Unsplash fallbacks) ----
  marinerPkg:  "assets/Boat%20Photos/IMG_0162.png",    // real DFD boat photo
  captainPkg:  "assets/Boat%20Photos/IMG_0187.png",    // real DFD boat photo
  ceramicPkg:  "assets/Boat%20Photos/ceramic-hull.png", // ceramic coated hull with water beading

  // ---- Marine service section accents ----
  marineCompound: "assets/Boat%20Photos/Compounding.webp",
  marineWax:      "assets/Boat%20Photos/Wax.webp",
  marineWash:     "assets/Boat%20Photos/Wash.webp",
  marineMetal:    "assets/Boat%20Photos/Metal%20Polishing.webp",
  marineCeramic:  "assets/Boat%20Photos/Ceramic%20Coating.webp",

  marinaDock: "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=1600&q=80&auto=format&fit=crop",

  // ---- Ceramic coating beauty shot ----
  ceramicHero2: "assets/porsche-911.png",
  ceramicSplit: "assets/bmw-m4-blue.png",
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
  portfolio1: "assets/porsche-truck.png",
  portfolio2: "assets/cadillac-escalade.png",
  portfolio3: "assets/porsche-foam-wash.png",
  portfolio4: "assets/bmw-x5m.png",
  portfolio5: "assets/photo-1.png",
  portfolio6: "assets/porsche-911.png",
  portfolio7: "assets/bmw-m4-blue.png",
  portfolio8: "assets/tesla-model-y.png",

  // Marine gallery - 8 boat photos not bound to a specific service
  boat1: "assets/Boat%20Photos/Boat%20maintenance.webp",
  boat2: "assets/Boat%20Photos/IMG_0162.png",
  boat3: "assets/Boat%20Photos/IMG_0187.png",
  boat4: "assets/Boat%20Photos/IMG_0379.png",
  boat5: "assets/Boat%20Photos/IMG_0381.png",
  boat6: "assets/Boat%20Photos/IMG_0385.png",
  boat7: "assets/Boat%20Photos/IMG_0390.png",
  boat8: "assets/Boat%20Photos/IMG_2617.png",
});
