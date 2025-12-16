document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  const tasks = Array.from(includes).map(async (el) => {
    const url = el.getAttribute('data-include');
    if (!url) return;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Failed to fetch ${url}`);
      el.innerHTML = await resp.text();
    } catch (err) {
      console.error(err);
    }
  });

  const initMobileNavigation = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (navbar.dataset.mobileNavInitialized === 'true') return;
    navbar.dataset.mobileNavInitialized = 'true';

    const navToggle = navbar.querySelector('.nav-toggle');
    const nav = navbar.querySelector('nav[aria-label="Main navigation"]');

    let isMenuOpen = false;
    const setMenuOpen = (open) => {
      isMenuOpen = Boolean(open);
      navbar.classList.toggle('is-open', isMenuOpen);
      if (navToggle) navToggle.setAttribute('aria-expanded', String(isMenuOpen));
    };

    if (navToggle && nav) {
      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        setMenuOpen(!isMenuOpen);
      });

      // Close menu after clicking any link
      nav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) setMenuOpen(false);
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!isMenuOpen) return;
        if (!navbar.contains(e.target)) setMenuOpen(false);
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      });
    }

    // Dropdown toggles (mobile)
    navbar.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;

      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const open = dropdown.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    });
  };

  Promise.all(tasks).then(() => {
    const page = document.body.dataset.page;
    if (page) {
      // Handle regular nav links
      document
        .querySelectorAll('nav a[data-page]')
        .forEach((link) => {
          const linkPage = link.getAttribute('data-page');
          // Check if this is a parent page (product, consulting) or exact match
          const isActive = linkPage === page || 
            (page === 'pricing' && linkPage === 'product') ||
            (page === 'methods' && linkPage === 'consulting') ||
            (page === 'process' && linkPage === 'consulting') ||
            (page === 'tools' && linkPage === 'consulting');
          
          if (isActive) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            // Also activate parent dropdown if it's a submenu item
            const dropdown = link.closest('.nav-dropdown');
            if (dropdown) {
              const parentLink = dropdown.querySelector('.nav-link-dropdown');
              if (parentLink) {
                parentLink.classList.add('active');
              }
            }
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
    }
    document.dispatchEvent(new CustomEvent('partials:loaded'));
  });

  document.addEventListener('partials:loaded', () => {
    initMobileNavigation();
  });
});
