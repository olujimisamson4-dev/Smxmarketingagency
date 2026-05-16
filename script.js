/* ===== ANIMATED BACKGROUND CANVAS ===== */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const GREEN  = 'rgba(34,197,94,';
  const GREEN2 = 'rgba(74,222,128,';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vy:    -(0.3 + Math.random() * 0.8),
      vx:    (Math.random() - 0.5) * 0.3,
      size:  0.8 + Math.random() * 2.2,
      alpha: 0.08 + Math.random() * 0.18,
      tail:  6 + Math.random() * 14,
      type:  Math.random() > 0.6 ? 'line' : 'dot',
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    const count = Math.floor((W * H) / 9000);
    particles = Array.from({ length: count }, createParticle);
  }

  function drawParticle(p) {
    p.pulse += 0.025;
    const brightness = p.alpha + Math.sin(p.pulse) * 0.06;
    if (p.type === 'line') {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * p.tail, p.y + p.vy * p.tail);
      const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.vx * p.tail, p.y + p.vy * p.tail);
      grad.addColorStop(0, GREEN + brightness + ')');
      grad.addColorStop(1, GREEN + '0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth   = p.size * 0.6;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = GREEN2 + brightness + ')';
      ctx.fill();
    }
  }

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y + p.tail < 0) { p.y = H + p.tail; p.x = Math.random() * W; }
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { drawParticle(p); updateParticle(p); });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  draw();
})();

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER MENU ===== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');
hamburger.addEventListener('click', () => { mobileMenu.classList.toggle('open'); });
mobLinks.forEach(l => l.addEventListener('click', () => { mobileMenu.classList.remove('open'); }));

/* ===== FADE-UP ANIMATIONS ===== */
const fadeEls = document.querySelectorAll(
  '.service-card, .result-card, .testi-card, .video-review-card, .sec-head, .about-grid, .contact-inner'
);
fadeEls.forEach(el => el.classList.add('fade-up'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center;padding:3rem 0;">
        <div style="font-size:2.5rem;margin-bottom:1rem;">✅</div>
        <h3 style="font-family:var(--ff-head);font-size:1.5rem;margin-bottom:0.5rem;">We got your message!</h3>
        <p style="color:var(--muted2);">We'll be in touch within 24 hours.</p>
      </div>`;
  });
}