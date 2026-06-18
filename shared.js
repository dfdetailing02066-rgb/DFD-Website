// Shared header + footer injected on every page
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const navItem = (href, label) => {
    const active = href === path ? 'active' : '';
    return `<li><a href="${href}" class="${active}">${label}</a></li>`;
  };

  const header = `
<header class="site-header">
  <div class="container nav">
    <a href="index.html" class="logo">
      <img src="assets/dfd-logo.png" alt="Diamond Finish Detailing" class="logo-img">
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-controls="primary-nav" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-menu" id="primary-nav">
      <ul class="nav-links">
        ${navItem('index.html', 'Home')}
        ${navItem('auto.html', 'Auto')}
        ${navItem('marine.html', 'Marine')}
        ${navItem('ceramic.html', 'Ceramic Coating')}
        ${navItem('contact.html', 'Contact')}
      </ul>
      <div class="nav-cta">
        <a href="tel:7814243314" class="nav-phone">(781) 424-3314</a>
        <a href="https://app.urable.com/virtual-shop/eKBgJfajP9ydNkViFCtR" class="btn btn-primary" target="_blank" rel="noopener">Book Online <span class="arrow">→</span></a>
      </div>
    </div>
  </div>
</header>`;

  const footer = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="logo logo-footer">
          <img src="assets/dfd-logo.png" alt="Diamond Finish Detailing" class="logo-img">
        </a>
        <p class="footer-tagline">Premium mobile auto and marine detailing serving Eastern Massachusetts. Licensed, insured, SystemX Certified - and backed by our 100% satisfaction guarantee.</p>
        <div class="trust-badges">
          <span class="trust-badge">Licensed &amp; Insured</span>
          <span class="trust-badge">SystemX Certified</span>
          <span class="trust-badge">1,000+ Vehicles Detailed</span>
          <span class="trust-badge">5-Star Google Reviews</span>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="auto.html">Auto</a></li>
          <li><a href="marine.html">Marine</a></li>
          <li><a href="ceramic.html">Ceramic Coating</a></li>
          <li><a href="index.html#service-areas">Service Areas</a></li>
          <li><a href="index.html#faqs">FAQs</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="https://app.urable.com/virtual-shop/eKBgJfajP9ydNkViFCtR" target="_blank" rel="noopener">Book Online</a></li>
          <li><a href="contact.html">Gift Cards</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:7814243314">(781) 424-3314</a></li>
          <li><a href="mailto:DFdetailing02066@gmail.com">DFdetailing02066@gmail.com</a></li>
          <li>Everyday: 7am - 9pm</li>
          <li>Eastern Massachusetts</li>
        </ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">TikTok</a></li>
          <li><a href="#">YouTube</a></li>
          <li><a href="#">Google Reviews</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Diamond Finish Detailing. All rights reserved.</span>
      <span>Licensed &amp; Insured · SystemX Certified Installer</span>
    </div>
  </div>
</footer>`;

  document.addEventListener('DOMContentLoaded', () => {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.outerHTML = header;
    if (f) f.outerHTML = footer;

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-nav');
    if (toggle && menu) {
      const setOpen = (open) => {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      toggle.addEventListener('click', () => {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });
      // Close after tapping a link
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      // Close on Escape
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }

    // Resolve <img data-img="key"> to actual Unsplash URLs
    if (window.IMAGES) {
      document.querySelectorAll('img[data-img]').forEach(img => {
        const key = img.getAttribute('data-img');
        if (window.IMAGES[key]) img.src = window.IMAGES[key];
      });
    }
  });
})();
