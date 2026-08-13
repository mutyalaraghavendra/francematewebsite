// ─── Navigation ───────────────────────────────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navMobileClose = document.querySelector('.nav-mobile-close');
  const backTop = document.querySelector('.back-top');
  const cookieBanner = document.querySelector('.cookie-banner');

  // Scroll effects
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  // Mobile nav
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (navMobileClose && navMobile) {
    navMobileClose.addEventListener('click', () => {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close mobile nav on link click
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Back to top
  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Fade in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => io.observe(el));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Cookie consent
  const stored = localStorage.getItem('fm_cookie_consent');
  if (stored && cookieBanner) {
    cookieBanner.classList.add('hidden');
  }
  window.acceptCookies = function () {
    localStorage.setItem('fm_cookie_consent', '1');
    if (cookieBanner) cookieBanner.classList.add('hidden');
  };
  window.declineCookies = function () {
    localStorage.setItem('fm_cookie_consent', '0');
    if (cookieBanner) cookieBanner.classList.add('hidden');
  };

  // Active nav link
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      a.classList.add('active');
    }
  });
})();
