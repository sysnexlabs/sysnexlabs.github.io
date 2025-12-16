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
});
