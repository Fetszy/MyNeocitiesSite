// Serenith / Neocities shared JS (TR/EN)
(function(){
  const DESKTOP_MQ = window.matchMedia('(min-width: 1025px)');

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function setActiveNav(pageId){
    qsa('.nav-btn[data-page]').forEach(b => b.classList.remove('active'));
    if(!pageId) return;
    const btn = qs(`.nav-btn[data-page="${pageId}"]`);
    if(btn) btn.classList.add('active');
  }

  function setActiveSection(sectionId){
    qsa('.content-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if(target) target.classList.add('active');
  }

  function showPage(pageId){
    setActiveNav(pageId);
    setActiveSection(pageId);
    // clear active content links highlight
    qsa('.content-list a').forEach(a => a.classList.remove('active'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showContent(contentId, activeLink){
    setActiveNav(''); // keep top nav clean when browsing posts
    setActiveSection(contentId);
    if(activeLink){
      qsa('.content-list a').forEach(a => a.classList.remove('active'));
      activeLink.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupNav(){
    qsa('.nav-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if(page) showPage(page);
      });
    });
  }

  function setupSidebar(){
    // Category accordion
    qsa('.category-title[data-open-category]').forEach(title => {
      title.addEventListener('click', () => {
        const category = title.parentElement;
        const isActive = category.classList.contains('active');
        qsa('.category').forEach(c => c.classList.remove('active'));
        if(!isActive) category.classList.add('active');
      });
    });

    // Season accordion (inside an open category)
    qsa('.season-title').forEach(seasonTitle => {
      seasonTitle.addEventListener('click', () => {
        const seasonItem = seasonTitle.parentElement;
        const isActive = seasonItem.classList.contains('active');
        const parent = seasonItem.parentElement; // season-list
        qsa('.season-item', parent).forEach(item => item.classList.remove('active'));
        if(!isActive) seasonItem.classList.add('active');
      });
    });

    // Content links
    qsa('.content-list a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const contentId = link.dataset.content;
        if(contentId) showContent(contentId, link);
      });
    });
  }

  function setupLangLinks(){
    // optional: [data-goto] links
    qsa('[data-goto]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.goto;
        if(page) showPage(page);
      });
    });
  }

  function setupCrtToggle(){
    const btn = qs('#crt-toggle');
    if(!btn) return;

    function applyCrt(enabled){
      document.documentElement.classList.toggle('crt-enabled', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.textContent = enabled ? '📺 CRT: ON' : '📺 CRT: OFF';
    }

    function init(){
      if(!DESKTOP_MQ.matches){
        // hidden by CSS, but be safe:
        applyCrt(false);
        return;
      }
      const saved = localStorage.getItem('crtEnabled');
      const enabled = (saved === null) ? true : (saved === '1');
      applyCrt(enabled);
    }

    btn.addEventListener('click', () => {
      const enabled = !document.documentElement.classList.contains('crt-enabled');
      localStorage.setItem('crtEnabled', enabled ? '1' : '0');
      applyCrt(enabled);
    });

    // react to viewport changes
    DESKTOP_MQ.addEventListener('change', () => {
      if(!DESKTOP_MQ.matches){
        applyCrt(false);
      } else {
        // restore saved pref
        const saved = localStorage.getItem('crtEnabled');
        const enabled = (saved === null) ? true : (saved === '1');
        applyCrt(enabled);
      }
    });

    init();
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupNav();
    setupSidebar();
    setupLangLinks();
    setupCrtToggle();

    // initial section
    const hash = (window.location.hash || '').replace('#','').trim();
    if(hash && document.getElementById(hash)){
      // if hash matches a main page, keep nav active; else treat as content
      const isPage = !!qs(`.nav-btn[data-page="${hash}"]`);
      if(isPage) showPage(hash);
      else showContent(hash);
    } else {
      showPage('ana-sayfa');
    }
  });
})();