/* ============================================================
   PUBLIC HEALTH SOLUTIONS — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NAV: STICKY & SCROLL ---------- */
  const nav = document.querySelector('.nav');
  const isLightPage = nav && nav.classList.contains('nav--light-default');

  function updateNav() {
    if (!nav) return;
    const scrolled = window.scrollY > 60;
    if (isLightPage) {
      nav.classList.toggle('nav--light', true);
      nav.classList.toggle('nav--scrolled', scrolled);
    } else {
      nav.classList.toggle('nav--transparent', !scrolled);
      nav.classList.toggle('nav--solid', scrolled);
    }
  }

  if (nav) {
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ---------- NAV: HAMBURGER MOBILE MENU ---------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });

    // Mobile sub-menu toggles
    document.querySelectorAll('.nav__mobile-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        if (sub) sub.classList.toggle('open');
        btn.querySelector('.arrow')?.classList.toggle('open');
      });
    });
  }

  /* ---------- SCROLL ANIMATIONS (IntersectionObserver) ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll, .animate-fade').forEach(el => {
    observer.observe(el);
  });

  /* ---------- COUNTER ANIMATION ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    if (prefersReducedMotion) {
      el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
      return;
    }
    const duration = 2000;
    const start = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = decimals > 0
        ? current.toFixed(decimals) + suffix
        : Math.floor(current) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-counter').forEach(el => {
    counterObserver.observe(el);
  });

  /* ---------- TESTIMONIALS SLIDER ---------- */
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let autoplayTimer = null;
  let slidesPerView = 3;

  function getSlidesPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 900) return 1;
    return 3;
  }

  function goToSlide(index) {
    if (!track) return;
    const cards = track.querySelectorAll('.testimonial-card');
    const spv = getSlidesPerView();
    const maxIndex = Math.max(0, cards.length - spv);
    index = Math.max(0, Math.min(index, maxIndex));
    currentSlide = index;
    const offset = (100 / spv) * index;
    track.style.transform = `translateX(-${offset}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function startAutoplay() {
    if (!track || prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const cards = track.querySelectorAll('.testimonial-card');
      const spv = getSlidesPerView();
      const maxIndex = cards.length - spv;
      goToSlide(currentSlide >= maxIndex ? 0 : currentSlide + 1);
    }, 5000);
  }

  function stopAutoplay() { clearInterval(autoplayTimer); }

  if (track) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); stopAutoplay(); });
    });

    // Touch swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
      startAutoplay();
    });

    window.addEventListener('resize', () => goToSlide(currentSlide));
    goToSlide(0);
    startAutoplay();
  }

  /* ---------- TABS (Services Page) ---------- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        if (b.hasAttribute('aria-selected')) b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      if (btn.hasAttribute('aria-selected')) btn.setAttribute('aria-selected', 'true');
      const content = document.querySelector(`[data-tab-content="${target}"]`);
      if (content) {
        content.classList.add('active');
        // Trigger scroll animations within newly visible tab
        content.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('visible');
        });
      }
    });
  });

  /* ---------- SERVICE CARD EXPAND ---------- */
  document.querySelectorAll('.service-card').forEach(card => {
    const header = card.querySelector('.service-card__header');
    if (header) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.toggle('expanded');
        header.setAttribute('aria-expanded', isExpanded);
      });
    }
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- BEFORE/AFTER SLIDER ---------- */
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const after = slider.querySelector('.ba-after');
    const divider = slider.querySelector('.ba-divider');
    let isDragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      const percent = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
      after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      divider.style.left = percent + '%';
    }

    slider.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); });
    slider.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
    slider.addEventListener('mouseup', () => { isDragging = false; });
    slider.addEventListener('mouseleave', () => { isDragging = false; });

    slider.addEventListener('touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchend', () => { isDragging = false; });
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- COOKIE CONSENT ---------- */
  const cookieBar = document.querySelector('.cookie-bar');
  if (cookieBar && !localStorage.getItem('phs-cookie-accepted')) {
    setTimeout(() => cookieBar.classList.add('visible'), 1500);
    document.querySelector('.cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('phs-cookie-accepted', '1');
      cookieBar.classList.remove('visible');
    });
    document.querySelector('.cookie-decline')?.addEventListener('click', () => {
      cookieBar.classList.remove('visible');
    });
  }

  /* ---------- QUOTE FORM VALIDATION ---------- */
  const form = document.querySelector('.quote-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear errors
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(f => f.classList.remove('error'));

      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        const val = field.value.trim();
        if (!val) {
          valid = false;
          if (group) group.classList.add('has-error');
          field.classList.add('error');
        }
      });

      // Email format
      const email = form.querySelector('[type="email"]');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        email.classList.add('error');
        const group = email.closest('.form-group');
        if (group) { group.classList.add('has-error'); }
      }

      // Consent checkbox
      const consent = form.querySelector('[name="consent"]');
      if (consent && !consent.checked) {
        valid = false;
        const group = consent.closest('.form-group');
        if (group) group.classList.add('has-error');
      }

      if (valid) {
        const success = document.querySelector('.form-success');
        if (success) {
          success.classList.add('visible');
          form.reset();
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        const firstError = form.querySelector('.error, [required]:invalid');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Real-time validation feedback
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('error');
          const group = field.closest('.form-group');
          if (group) group.classList.remove('has-error');
        }
      });
    });
  }

  /* ---------- MOBILE: TOUCH INDUSTRY CARDS ---------- */
  document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('touch-active'));
      card.classList.add('touch-active');
    });
  });

  /* ---------- FOOTER: CURRENT YEAR ---------- */
  document.querySelectorAll('.footer__year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- SMOOTH ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 84;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

});
