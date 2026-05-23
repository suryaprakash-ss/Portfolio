/* ============================================================
   SURYAPRAKASH S — Spider-Man Portfolio JS
   ============================================================ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1400);
});

/* ── CUSTOM CURSOR ── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animFollower() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animFollower);
})();

document.querySelectorAll('a,button,.skill-card,.project-card,.pub-card,.stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
    follower.style.width   = '52px';
    follower.style.height  = '52px';
    follower.style.opacity = '0.15';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.width   = '30px';
    follower.style.height  = '30px';
    follower.style.opacity = '0.5';
  });
});

/* ── SPIDER WEB CANVAS ── */
const canvas = document.getElementById('web-canvas');
const ctx    = canvas.getContext('2d');
let W, H, nodes = [];

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

function makeNodes(n) {
  nodes = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.8 + 0.8
  }));
}
makeNodes(70);

/* Mouse-attracted node */
let mouseNode = { x: W / 2, y: H / 2 };
document.addEventListener('mousemove', e => { mouseNode.x = e.clientX; mouseNode.y = e.clientY; });

function drawWeb() {
  ctx.clearRect(0, 0, W, H);

  /* move nodes */
  nodes.forEach(n => {
    /* slight attraction to mouse */
    const dx = mouseNode.x - n.x, dy = mouseNode.y - n.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) { n.vx += dx * 0.00008; n.vy += dy * 0.00008; }
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
    /* speed cap */
    const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
    if (speed > 1.2) { n.vx *= 0.98; n.vy *= 0.98; }

    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230,36,41,0.7)';
    ctx.fill();
  });

  /* draw web lines */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        const alpha = (1 - d / 150) * 0.18;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(230,36,41,${alpha})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }
    }
  }

  /* mouse-to-nearest-5 web threads */
  const sorted = [...nodes].sort((a, b) => {
    const da = (a.x - mouseNode.x) ** 2 + (a.y - mouseNode.y) ** 2;
    const db = (b.x - mouseNode.x) ** 2 + (b.y - mouseNode.y) ** 2;
    return da - db;
  });
  sorted.slice(0, 5).forEach(n => {
    const d = Math.sqrt((n.x - mouseNode.x) ** 2 + (n.y - mouseNode.y) ** 2);
    if (d < 180) {
      ctx.beginPath();
      ctx.moveTo(mouseNode.x, mouseNode.y);
      ctx.lineTo(n.x, n.y);
      ctx.strokeStyle = `rgba(230,36,41,${0.25 * (1 - d / 180)})`;
      ctx.lineWidth   = 0.9;
      ctx.stroke();
    }
  });

  requestAnimationFrame(drawWeb);
}
drawWeb();

/* ── NAVBAR ── */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('visible', window.scrollY > 400);
  highlightNav();
  triggerAOS();
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const pos      = window.scrollY + 130;
  sections.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + s.id));
    }
  });
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ── TYPED TEXT ── */
const roles = [
  'Gen AI Applications',
  'LLM-Powered Systems',
  'FastAPI Backends',
  'AI / ML Solutions',
  'Intelligent Pipelines'
];
let ri = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const cur = roles[ri];
  typedEl.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
  del ? ci-- : ci++;
  let delay = del ? 55 : 95;
  if (!del && ci === cur.length) { delay = 2000; del = true; }
  else if (del && ci === 0)      { del = false; ri = (ri + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ── AOS (Animate On Scroll) ── */
function triggerAOS() {
  document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(el => {
    const rect  = el.getBoundingClientRect();
    const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
    if (rect.top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}
triggerAOS(); /* run on load too */

/* ── COUNTER ANIMATION ── */
function runCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target    = parseFloat(el.getAttribute('data-count'));
    const isDecimal = target % 1 !== 0;
    let current     = 0;
    const step      = target / 55;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(t); }
      el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
    }, 22);
  });
}
const statsEl = document.querySelector('.stats-grid');
if (statsEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { runCounters(); entries[0].target._obs.disconnect(); }
  }, { threshold: 0.3 }).observe(statsEl);
  /* store ref for disconnect */
  statsEl._obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { runCounters(); statsEl._obs.disconnect(); }
  }, { threshold: 0.3 });
  statsEl._obs.observe(statsEl);
}

/* ── SKILL PILL STAGGER ── */
document.querySelectorAll('.skill-card').forEach((card, ci) => {
  card.querySelectorAll('.skill-pills span').forEach((pill, pi) => {
    pill.style.transitionDelay = `${pi * 40}ms`;
  });
});

/* ── CONTACT FORM ── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    setTimeout(() => {
      status.style.color   = '#4caf50';
      status.textContent   = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();
      btn.disabled         = false;
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
      setTimeout(() => status.textContent = '', 5000);
    }, 1500);
  });
}

/* ── SECTION WEB DECORATION (draw mini webs on section bg) ── */
document.querySelectorAll('.section').forEach(sec => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'section-web-deco');
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.style.cssText = 'position:absolute;bottom:20px;left:20px;width:120px;height:120px;opacity:0.06;pointer-events:none;z-index:0';
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('stroke', '#e62429');
  g.setAttribute('stroke-width', '0.8');
  g.setAttribute('fill', 'none');
  /* radial lines */
  [[60,60,60,0],[60,60,102,18],[60,60,120,60],[60,60,102,102],[60,60,60,120],[60,60,18,102],[60,60,0,60],[60,60,18,18]].forEach(([x1,y1,x2,y2]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',x1); line.setAttribute('y1',y1);
    line.setAttribute('x2',x2); line.setAttribute('y2',y2);
    g.appendChild(line);
  });
  [15,30,45,60].forEach(r => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',60); circle.setAttribute('cy',60); circle.setAttribute('r',r);
    g.appendChild(circle);
  });
  svg.appendChild(g);
  sec.style.position = 'relative';
  sec.appendChild(svg);
});
