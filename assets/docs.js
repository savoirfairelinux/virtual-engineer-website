(() => {
  'use strict';

  const { SECTIONS, HOME, MAP, PAGE_CONTENT } = window.VEDocs;

  const tabsEl = document.getElementById('docs-tabs');
  const sidebarLabelEl = document.getElementById('docs-sidebar-label');
  const sidebarListEl = document.getElementById('docs-sidebar-list');
  const crumbSectionEl = document.getElementById('docs-crumb-section');
  const crumbPageEl = document.getElementById('docs-crumb-page');
  const titleEl = document.getElementById('docs-title');
  const descEl = document.getElementById('docs-desc');
  const cardsEl = document.getElementById('docs-cards');
  const contentEl = document.getElementById('docs-content');

  function lookup(id) {
    if (id === 'home') return { page: HOME, section: null, isHub: false };
    if (id === 'docs-map') return { page: MAP, section: SECTIONS[0], isHub: false };
    for (const s of SECTIONS) {
      if (s.id === id) return { page: { id: s.id, title: s.title, desc: s.desc }, section: s, isHub: true };
      const p = s.pages.find((x) => x.id === id);
      if (p) return { page: p, section: s, isHub: false };
    }
    return { page: HOME, section: null, isHub: false };
  }

  function render(cur) {
    const { page, section, isHub } = lookup(cur);

    tabsEl.innerHTML = SECTIONS.map((s) => {
      const active = section && section.id === s.id;
      return `<a href="#/${s.id}" class="ve-tab${active ? ' is-active' : ''}">${s.label}</a>`;
    }).join('');

    const sidebarSection = section || SECTIONS[0];
    sidebarListEl.innerHTML = sidebarSection.pages.map((p) => {
      const active = p.id === cur;
      return `<a href="#/${p.id}" class="ve-side${active ? ' is-active' : ''}">${p.title}</a>`;
    }).join('');

    crumbSectionEl.textContent = section ? section.label : 'Overview';
    crumbPageEl.textContent = page.title;
    titleEl.textContent = page.title;
    descEl.textContent = page.desc;

    const showCards = isHub || cur === 'home';
    cardsEl.classList.toggle('is-rendered', showCards);
    if (showCards) {
      const hubItems = isHub ? section.pages : SECTIONS.map((s) => ({ id: s.id, title: s.title, desc: s.desc }));
      cardsEl.innerHTML = hubItems.map((h) => `<a href="#/${h.id}" class="ve-card"><div style="font-size: 14.5px; font-weight: 600; color: var(--text); margin-bottom: 6px;">${h.title}</div><div style="font-size: 13px; line-height: 1.6; color: var(--text-dim);">${h.desc}</div></a>`).join('');
      cardsEl.style.display = '';
    } else {
      cardsEl.innerHTML = '';
      cardsEl.style.display = 'none';
    }

    const build = PAGE_CONTENT[cur];
    contentEl.innerHTML = build ? build() : '';

    window.scrollTo(0, 0);
  }

  function onHash() {
    const id = (location.hash || '').replace(/^#\/?/, '') || 'home';
    render(id);
  }

  window.addEventListener('hashchange', onHash);
  onHash();
})();
