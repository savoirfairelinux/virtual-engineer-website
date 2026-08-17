(() => {
  'use strict';

  const themeToggle = document.querySelector('.ve-theme-toggle');
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('ve-theme'); } catch {}
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  function updateThemeToggle() {
    if (!themeToggle) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggle.textContent = isLight ? 'Dark' : 'Light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'light');
      try { window.localStorage.setItem('ve-theme', isLight ? 'dark' : 'light'); } catch {}
      updateThemeToggle();
    });
    updateThemeToggle();
  }

  // ---- smooth scroll for "Get Started" / "See how it works" ----
  document.querySelectorAll('[data-scroll-to]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(el.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- nav solidify + scroll progress bar ----
  const nav = document.querySelector('.ve-nav');
  const progressBar = document.querySelector('.ve-progress-bar');

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  function onScroll() {
    const y = window.scrollY || 0;
    const navSolid = clamp01(y / 90);
    if (nav) {
      nav.style.background = `color-mix(in oklab, var(--bg) ${72 + navSolid * 20}%, transparent)`;
      nav.style.boxShadow = navSolid > 0.4 ? 'var(--shadow-sm)' : 'none';
      nav.style.padding = `${16 - navSolid * 5}px clamp(20px, 5vw, 64px)`;
    }
    if (progressBar) {
      const maxScroll = (document.documentElement.scrollHeight || window.innerHeight) - window.innerHeight;
      progressBar.style.width = `${maxScroll > 0 ? clamp01(y / maxScroll) * 100 : 0}%`;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- blob parallax ----
  const blob1 = document.querySelector('.ve-blob-anchor.b1');
  const blob2 = document.querySelector('.ve-blob-anchor.b2');
  function onBlobScroll() {
    const y = window.scrollY || 0;
    if (blob1) blob1.style.transform = `translateY(${y * 0.12}px)`;
    if (blob2) blob2.style.transform = `translateY(${-y * 0.08}px)`;
  }
  window.addEventListener('scroll', onBlobScroll, { passive: true });
  onBlobScroll();

  // ---- scroll reveal ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.ve-reveal').forEach((el) => revealObserver.observe(el));

  // ---- magnetic buttons ----
  document.querySelectorAll('.ve-magnet-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
  });

  // ---- tilt cards (how-it-works steps + trust cards) ----
  document.querySelectorAll('.ve-how-card, .ve-trust-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${py * -8}deg) rotateY(${px * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ---- how-it-works step highlight tied to scroll progress ----
  const howSection = document.getElementById('how');
  const stepCircles = Array.from(document.querySelectorAll('.ve-step-circle'));
  function onHowScroll() {
    if (!howSection || !stepCircles.length) return;
    const r = howSection.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const progress = clamp01((vh - r.top) / (vh * 0.62));
    const active = Math.floor(clamp01(progress) * 3.999);
    stepCircles.forEach((c, i) => c.classList.toggle('is-done', i <= active));
  }
  window.addEventListener('scroll', onHowScroll, { passive: true });
  onHowScroll();

  // ---- pipeline row state cycling ----
  const PIPELINE_STATES = ['AGENT_RUNNING', 'IN_REVIEW', 'FEEDBACK_PROCESSING', 'MERGED', 'DETECTED'];
  const STATE_META = {
    DETECTED: { label: 'DETECTED', tone: 'info' },
    AGENT_RUNNING: { label: 'AGENT_RUNNING', tone: 'active' },
    IN_REVIEW: { label: 'IN_REVIEW', tone: 'warn' },
    FEEDBACK_PROCESSING: { label: 'FEEDBACK_PROCESSING', tone: 'active' },
    MERGED: { label: 'MERGED', tone: 'ok' }
  };
  const pipelineRows = Array.from(document.querySelectorAll('[data-pipeline-row]'));
  let tick = 0;
  function renderPill(pillEl, state) {
    const meta = STATE_META[state];
    pillEl.className = `ve-pill sm tone-${meta.tone}`;
    const pulse = state === 'AGENT_RUNNING';
    pillEl.innerHTML = `<span class="dot${pulse ? ' live' : ''}"></span>${meta.label}`;
  }
  function tickPipeline() {
    pipelineRows.forEach((row, i) => {
      const state = PIPELINE_STATES[(tick + i * 2) % PIPELINE_STATES.length];
      const pill = row.querySelector('.ve-pill');
      if (pill) renderPill(pill, state);
    });
    tick += 1;
  }
  if (pipelineRows.length) {
    tickPipeline();
    setInterval(tickPipeline, 3200);
  }

  // ---- provider count-up when feed section becomes visible ----
  const feedSection = document.getElementById('feed');
  const providerCountEl = document.querySelector('[data-provider-count]');
  let countedUp = false;
  function runCountUp() {
    const start = Date.now();
    const dur = 900;
    const timer = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      if (providerCountEl) providerCountEl.textContent = Math.round(eased * 4);
      if (p >= 1) clearInterval(timer);
    }, 30);
  }
  if (feedSection) {
    const feedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countedUp) {
          countedUp = true;
          runCountUp();
          feedObserver.disconnect();
        }
      });
    }, { threshold: 0.55 });
    feedObserver.observe(feedSection);
  }
})();
