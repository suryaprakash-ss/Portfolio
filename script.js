/* ============================================================
   SURYAPRAKASH S — Marvel-Style Portfolio JS
   ============================================================ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 1400);
});

/* ── CUSTOM CURSOR ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  }
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
  }
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-card, .ach-card, .lead-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    if (cursorRing) { cursorRing.style.width = '52px'; cursorRing.style.height = '52px'; cursorRing.style.opacity = '0.2'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    if (cursorRing) { cursorRing.style.width = '32px'; cursorRing.style.height = '32px'; cursorRing.style.opacity = '0.5'; }
  });
});

/* ── HERO CANVAS (particle web) ── */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeNodes(n) {
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    }));
  }
  makeNodes(60);

  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      const dx = mouseX - n.x, dy = mouseY - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) { n.vx += dx * 0.00006; n.vy += dy * 0.00006; }
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (speed > 1) { n.vx *= 0.98; n.vy *= 0.98; }
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230,36,41,0.8)';
      ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(230,36,41,${(1 - d / 140) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ── TYPED TEXT ── */
const roles = [
  'LLM-Powered Systems',
  'Healthcare AI Platforms',
  'FastAPI Backends',
  'NLP Research',
  'Intelligent Pipelines'
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('hero-typed');

function type() {
  if (!typedEl) return;
  const cur = roles[ri];
  typedEl.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
  deleting ? ci-- : ci++;
  let delay = deleting ? 45 : 85;
  if (!deleting && ci === cur.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ── NAV SCROLL ── */
const nav     = document.getElementById('nav');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
  revealElements();
}, { passive: true });

if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const pos = window.scrollY + 100;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-sec') === sec.id));
    }
  });
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  }));
}

/* ── SCROLL REVEAL ── */
function revealElements() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      const delay = parseInt(el.getAttribute('data-delay') || 0);
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });
}

// Add reveal class to section children
document.querySelectorAll('.section').forEach(sec => {
  Array.from(sec.querySelectorAll(':scope > .container > *')).forEach((el, i) => {
    if (!el.classList.contains('sec-label')) {
      el.classList.add('reveal');
      el.setAttribute('data-delay', Math.min(i * 80, 320));
    }
  });
});

revealElements();
updateActiveNav();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = window.innerWidth <= 768 ? 0 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── CONTACT FORM ── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('cf-status');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.cf-submit');
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim() || 'Inquiry from portfolio site';
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.style.color = '#f97316';
        status.textContent = 'Please complete the required fields before sending.';
      }
      return;
    }

    const recipient = 'suryaprakashstech@gmail.com';
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoLink = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening email...';
    if (status) {
      status.style.color = '#2563eb';
      status.textContent = 'Opening your email client...';
    }

    window.location.href = mailtoLink;

    setTimeout(() => {
      if (status) {
        status.style.color = '#22c55e';
        status.textContent = 'Email draft opened. Send it from your email app to complete.';
      }
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      setTimeout(() => { if (status) status.textContent = ''; }, 6000);
    }, 800);
  });
}


    /* ── WINDING ROAD: checkpoint click -> showcard ── */
    (function() {
      const stops = document.querySelectorAll('.wr-stop');
      const cards = document.querySelectorAll('.wr-card');
      if (!stops.length || !cards.length) return;

      // ensure all cards are hidden initially
      cards.forEach(c => c.classList.remove('show'));

      stops.forEach(s => {
        s.addEventListener('click', () => {
          const id = s.getAttribute('data-stop');
          const target = document.querySelector(`.wr-card[data-stop="${id}"]`);
          if (!target) return;
          if (target.classList.contains('show')) {
            target.classList.remove('show');
          } else {
            cards.forEach(c => c.classList.remove('show'));
            target.classList.add('show');
            // bring card into view on small screens
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }
        });
      });
    })();

    /* ── HORIZONTAL ROADMAP: rm-dot -> rm-card toggle ── */
    (function() {
      const dots = document.querySelectorAll('.rm-dot');
      const cards = document.querySelectorAll('.rm-card');
      if (!dots.length || !cards.length) return;

      // hide all rm-cards initially
      cards.forEach(c => c.classList.remove('show'));

      dots.forEach(d => {
        d.addEventListener('click', () => {
          const id = d.getAttribute('data-stop');
          const target = document.querySelector(`.rm-card[data-stop="${id}"]`);
          if (!target) return;
          if (target.classList.contains('show')) {
            target.classList.remove('show');
          } else {
            cards.forEach(c => c.classList.remove('show'));
            target.classList.add('show');
            // scroll card into view on narrow screens
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }
        });
      });

      // optional: close cards when clicking outside
      document.addEventListener('click', (e) => {
        const isDot = e.target.closest('.rm-dot');
        const isCard = e.target.closest('.rm-card');
        if (!isDot && !isCard) {
          cards.forEach(c => c.classList.remove('show'));
        }
      });
    })();

/* ── EDUCATION JOURNEY: CAR ANIMATION ── */
(function() {
  const car = document.getElementById('ej-car');
  const roadPath = document.getElementById('ej-road-path');
  const scene = document.getElementById('ej-scene');
  
  if (!car || !roadPath || !scene) return;

  // Checkpoint positions (% along the path) and their associated card IDs
  const checkpoints = [
    { percent: 0.15, cardId: 'ej-card-1', ringId: 'cp1-ring' },  // SSLC at ~15%
    { percent: 0.40, cardId: 'ej-card-2', ringId: 'cp2-ring' },  // HSC at ~40%
    { percent: 0.80, cardId: 'ej-card-3', ringId: 'cp3-ring' }   // B.E. at ~80%
  ];

  let currentPosition = 0;
  let visibleCards = new Set();
  let isAnimating = false;
  let isVisible = false;

  // Get point on SVG path at percentage
  function getPointOnPath(percent) {
    const pathLen = roadPath.getTotalLength();
    const dist = pathLen * Math.max(0, Math.min(1, percent));
    return roadPath.getPointAtLength(dist);
  }

  // Get car rotation to match path direction
  function getRotationAtPath(percent) {
    const delta = 0.01;
    const p1 = getPointOnPath(percent - delta);
    const p2 = getPointOnPath(percent + delta);
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    return angle;
  }

  // Show card with animation
  function showCard(cardId, ringId) {
    const card = document.getElementById(cardId);
    const ring = document.getElementById(ringId);
    
    if (card && !visibleCards.has(cardId)) {
      card.classList.remove('ej-card-hidden');
      card.classList.add('ej-card-visible');
      visibleCards.add(cardId);
      
      // Pulse the checkpoint ring
      if (ring) {
        ring.style.animation = 'none';
        setTimeout(() => {
          ring.style.animation = 'cp-arrive 0.8s ease-out';
        }, 10);
      }
    }
  }

  // Animate car along path
  function animateCar() {
    if (!isAnimating || !isVisible) return;

    currentPosition += 0.002; // Speed control

    if (currentPosition > 1) {
      // Journey complete - stop animation
      return;
    }

    // Update car position and rotation
    const point = getPointOnPath(currentPosition);
    const angle = getRotationAtPath(currentPosition);
    car.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

    // Check for checkpoint arrivals
    checkpoints.forEach(cp => {
      if (currentPosition >= cp.percent - 0.02 && currentPosition < cp.percent + 0.02) {
        showCard(cp.cardId, cp.ringId);
      }
    });

    requestAnimationFrame(animateCar);
  }

  // Start animation when scene comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
        if (!isAnimating) {
          isAnimating = true;
          currentPosition = 0;
          visibleCards.clear();
          document.querySelectorAll('.ej-card-hidden.ej-card-visible').forEach(c => {
            c.classList.remove('ej-card-visible');
            c.classList.add('ej-card-hidden');
          });
          animateCar();
        }
      } else {
        isVisible = false;
      }
    });
  }, { threshold: 0.1 });

  observer.observe(scene);
})();
