/* ═══════════════════════════════════════════
   LONE STAR WEB SOLUTIONS — script.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Navbar: add .scrolled class on scroll ──
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll fade-in animations ──
  const fadeEls = document.querySelectorAll(
    '.service-card, .portfolio-item, .testimonial, .step, .feature, .stat'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  // ── Staggered animation for grid items ──
  document.querySelectorAll('.services-grid, .portfolio-grid, .testimonials-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // ── Contact form ──
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');
  const btnText     = form.querySelector('.btn-text');
  const btnLoading  = form.querySelector('.btn-loading');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    ['name', 'email', 'message'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('error');
      if (!el.value.trim()) {
        el.classList.add('error');
        valid = false;
      }
    });

    // Email format check
    const emailEl = document.getElementById('email');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailEl.value && !emailRe.test(emailEl.value)) {
      emailEl.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Simulate sending (replace with real backend / EmailJS / Formspree)
    btnText.hidden   = true;
    btnLoading.hidden = false;

    setTimeout(() => {
      btnText.hidden   = false;
      btnLoading.hidden = true;
      successMsg.hidden = false;
      form.reset();

      setTimeout(() => {
        successMsg.hidden = true;
      }, 6000);
    }, 1400);
  });

  // Remove error state on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });

  // ── Smooth scroll offset for fixed navbar ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Active nav link highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--gold)'
        : '';
    });
  }, { passive: true });

})();
