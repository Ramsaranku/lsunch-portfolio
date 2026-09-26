/* =========================================================
   SARAN KUMAR R — Portfolio JavaScript
========================================================= */

/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */
const EMAILJS_SERVICE_ID  = 'service_w6pq20a';
const EMAILJS_TEMPLATE_ID = 'template_6q8waaf';
const EMAILJS_PUBLIC_KEY  = '7iEQulO84r4XvsmRX';

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

/* =========================================================
   1. CUSTOM CURSOR TRACKING (Pointer devices only)
========================================================= */
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursorDot && cursorOutline) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    const speed = 0.14;
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top  = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .tool-card, .project-card, .achievement-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
  });
}

/* =========================================================
   2. FLOATING CANVAS PARTICLES
========================================================= */
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3 - 0.1;
    this.size  = Math.random() * 1.8 + 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5
      ? `rgba(0, 212, 255, ${this.alpha})`
      : `rgba(168, 85, 247, ${this.alpha})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur  = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}

// Particle count scaled to screen size
const particleCount = window.innerWidth < 768 ? 45 : 100;
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maxDistance = window.innerWidth < 768 ? 70 : 100;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / maxDistance)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================================================
   3. HIGH-PRECISION SMOOTH SCROLL WITH OFFSET
========================================================= */
function getNavbarHeight() {
  const navbar = document.getElementById('navbar');
  return navbar ? navbar.offsetHeight : 70;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();

      // Close mobile menu if active
      if (hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinksList.classList.remove('open');
      }

      const offset = getNavbarHeight() + 12;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* =========================================================
   4. NAVBAR SCROLL STATE & ACTIVE LINK MONITOR
========================================================= */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  let current = '';
  const currentNavHeight = getNavbarHeight();

  sections.forEach(sec => {
    const top = sec.offsetTop - currentNavHeight - 80;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* =========================================================
   5. MOBILE HAMBURGER MENU
========================================================= */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

// Dismiss navigation on external click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinksList.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  }
});

/* =========================================================
   6. HERO DYNAMIC ROLE TEXT ROTATION
========================================================= */
const roles = [
  'Full Stack Developer',
  'Software Developer Intern',
  'React & Node Specialist',
  'REST API Engineer'
];
const roleEl = document.getElementById('heroRole');
let roleIndex = 0;

function changeRole() {
  if (!roleEl) return;
  roleEl.style.opacity = '0';
  roleEl.style.transform = 'translateY(10px)';
  roleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = '1';
    roleEl.style.transform = 'translateY(0)';
  }, 420);
}

setInterval(changeRole, 2500);

/* =========================================================
   7. HERO PARALLAX MOUSE EFFECT (Desktop only)
========================================================= */
const heroSection = document.getElementById('hero');
const parallaxItems = heroSection ? heroSection.querySelectorAll('[data-parallax]') : [];

if (window.innerWidth > 1024) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    parallaxItems.forEach(item => {
      const factor = parseFloat(item.getAttribute('data-parallax'));
      const mx = dx * factor * 50;
      const my = dy * factor * 35;
      item.style.transform = `translate(${mx}px, ${my}px)`;
      item.style.transition = 'transform 0.15s ease-out';
    });
  });
}

/* =========================================================
   8. ABOUT IMAGE SLIDER
========================================================= */
const sliderImgs = document.querySelectorAll('.slider-img');
const sliderDots = document.querySelectorAll('.dot');
let sliderIndex  = 0;

function goToSlide(index) {
  if (!sliderImgs.length) return;
  sliderImgs[sliderIndex].classList.remove('active');
  sliderDots[sliderIndex].classList.remove('active');
  sliderIndex = index % sliderImgs.length;
  sliderImgs[sliderIndex].classList.add('active');
  sliderDots[sliderIndex].classList.add('active');
}

let sliderTimer = setInterval(() => goToSlide(sliderIndex + 1), 2400);

sliderDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(i);
    sliderTimer = setInterval(() => goToSlide(sliderIndex + 1), 2400);
  });
});

/* =========================================================
   9. INTERSECTION OBSERVERS (Scroll reveals & Progress bars)
========================================================= */
const revealSections = document.querySelectorAll('.reveal-section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
revealSections.forEach(sec => sectionObserver.observe(sec));

const revealCards = document.querySelectorAll('.reveal-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-card');
      let delay = 0;
      siblings.forEach((sib, i) => { if (sib === entry.target) delay = (i % 3) * 80; });

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealCards.forEach(card => cardObserver.observe(card));

const langFills = document.querySelectorAll('.lang-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.getAttribute('data-pct');
      entry.target.style.width = pct + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
langFills.forEach(bar => barObserver.observe(bar));

/* =========================================================
   10. EMAILJS FORM SUBMISSION
========================================================= */
window.sendEmail = function () {
  const btn    = document.getElementById('submitBtn');
  const msgDiv = document.getElementById('formMsg');
  const form   = document.getElementById('contactForm');

  const fromName = form.querySelector('[name="from_name"]').value.trim();
  const replyTo  = form.querySelector('[name="reply_to"]').value.trim();
  const phone    = form.querySelector('[name="phone"]').value.trim();
  const service  = form.querySelector('[name="service"]').value;
  const message  = form.querySelector('[name="message"]').value.trim();

  if (!fromName || !replyTo || !message) {
    showMsg('Please fill in your Name, Email, and Message.', 'error');
    return;
  }
  if (!isValidEmail(replyTo)) {
    showMsg('Please enter a valid email address.', 'error');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  msgDiv.style.display = 'none';

  const templateParams = {
    from_name: fromName,
    reply_to:  replyTo,
    phone:     phone || 'Not provided',
    service:   service || 'Not specified',
    message:   message
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showMsg('🚀 Message sent successfully! I will get back to you within 24 hours.', 'success');
      form.querySelectorAll('input, textarea, select').forEach(el => { el.value = ''; });
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      showMsg('Oops! Something went wrong. Please reach out directly.', 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
};

function showMsg(text, type) {
  const msgDiv = document.getElementById('formMsg');
  msgDiv.textContent = text;
  msgDiv.className = 'form-msg ' + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   11. HERO INITIAL MOUNT ENTRANCE
========================================================= */
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-text');
  const heroImg  = document.querySelector('.hero-image-wrap');

  if (heroText) heroText.style.animation = 'fadeInUp 0.9s ease 0.2s both';
  if (heroImg)  heroImg.style.animation  = 'fadeInUp 0.9s ease 0.45s both';
});