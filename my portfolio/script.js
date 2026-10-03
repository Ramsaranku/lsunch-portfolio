/* =========================================================
   SARAN KUMAR R — Portfolio JavaScript
========================================================= */

// EmailJS Initialization
const EMAILJS_SERVICE_ID  = 'service_w6pq20a';
const EMAILJS_TEMPLATE_ID = 'template_6q8waaf';
const EMAILJS_PUBLIC_KEY  = '7iEQulO84r4XvsmRX';

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

/* =========================================================
   1. CUSTOM CURSOR FOLLOWER
========================================================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursorDot && cursorOutline) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    const ease = 0.16;
    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, input, select, textarea, .project-glass-card, .skill-chip, .contact-card-glass').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
  });
}

/* =========================================================
   2. FLOATING CANVAS PARTICLES
========================================================= */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25 - 0.05;
      this.size = Math.random() * 1.6 + 0.4;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 
        ? `rgba(0, 242, 254, ${this.alpha})`
        : `rgba(157, 78, 221, ${this.alpha})`;
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
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  const count = window.innerWidth < 768 ? 40 : 85;
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const maxDist = window.innerWidth < 768 ? 70 : 100;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.05 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* =========================================================
   3. NAVBAR SCROLL & SMOOTH ANCHOR OFFSET
========================================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

if (hamburger && navLinksList) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });
}

/* =========================================================
   4. DYNAMIC HERO ROLE TICKER
========================================================= */
const tickerRoles = [
  'Full Stack Developer',
  'React.js & Node.js Engineer',
  'REST APIs & System Architect',
  'MySQL & MongoDB Specialist',
  'JWT & Cybersecurity Builder',
  'Flutter Mobile App Developer',
  'AI-Assisted Development Engineer'
];
const tickerEl = document.getElementById('heroRole');
let tickerIdx = 0;

if (tickerEl) {
  setInterval(() => {
    tickerEl.style.opacity = '0';
    setTimeout(() => {
      tickerIdx = (tickerIdx + 1) % tickerRoles.length;
      tickerEl.textContent = tickerRoles[tickerIdx];
      tickerEl.style.opacity = '1';
    }, 300);
  }, 2800);
}

/* =========================================================
   5. EXTENDED 6-IMAGE GALLERY SLIDER
========================================================= */
const sliderImages = document.querySelectorAll('.slider-img');
const sliderDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let currentSlide = 0;
let slideInterval;

function updateSlide(idx) {
  if (!sliderImages.length) return;
  sliderImages[currentSlide].classList.remove('active');
  if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.remove('active');

  currentSlide = (idx + sliderImages.length) % sliderImages.length;

  sliderImages[currentSlide].classList.add('active');
  if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');
}

function startSliderTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    updateSlide(currentSlide + 1);
  }, 3200);
}

if (sliderImages.length) {
  startSliderTimer();

  if (nextBtn) nextBtn.addEventListener('click', () => { updateSlide(currentSlide + 1); startSliderTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { updateSlide(currentSlide - 1); startSliderTimer(); });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateSlide(index);
      startSliderTimer();
    });
  });
}

/* =========================================================
   6. EMAIL TRANSMISSION HANDLER
========================================================= */
window.sendEmail = function () {
  const form = document.getElementById('contactForm');
  const msgDiv = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');

  if (!form || !btn) return;

  const name = form.querySelector('[name="from_name"]').value.trim();
  const email = form.querySelector('[name="reply_to"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const service = form.querySelector('[name="service"]').value;
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    displayNotification('Please fill in your name, email, and message.', 'error');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

  const templateParams = {
    from_name: name,
    reply_to: email,
    phone: phone || 'Not provided',
    service: service || 'General Inquiry',
    message: message
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      displayNotification('Message sent successfully! I will connect with you soon.', 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Transmit Message';
    })
    .catch((err) => {
      console.error('Email error:', err);
      displayNotification('Could not send message. Please ping directly via WhatsApp or Email.', 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Transmit Message';
    });
};

function displayNotification(text, type) {
  const msg = document.getElementById('formMsg');
  if (!msg) return;
  msg.textContent = text;
  msg.className = `form-notification ${type}`;
  setTimeout(() => {
    msg.style.display = 'none';
  }, 6000);
}