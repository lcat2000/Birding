/* ===================================================
   大橘子的家 — birds.js
   Mobile sidebar toggle + current-page highlighting
   =================================================== */

(function () {
  'use strict';

  /* --- Mobile Sidebar Toggle --- */
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('.sidebar');

  if (toggle && sidebar) {
    // Create backdrop element
    var backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    function openSidebar() {
      sidebar.classList.add('is-open');
      backdrop.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('is-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    backdrop.addEventListener('click', closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  /* --- Highlight Current Page Link in Sidebar --- */
  if (sidebar) {
    var currentFile = window.location.pathname.split('/').pop();
    if (!currentFile) currentFile = 'index.htm';

    var links = sidebar.querySelectorAll('a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // Decode both sides for comparison (handles spaces/special chars)
      try {
        var decodedHref = decodeURIComponent(href);
        var decodedCurrent = decodeURIComponent(currentFile);
        if (decodedHref === decodedCurrent) {
          link.style.color = 'var(--color-bark)';
          link.style.fontWeight = '700';
          link.style.borderLeft = '3px solid var(--color-fern)';
          link.style.paddingLeft = 'var(--space-3)';
          link.style.pointerEvents = 'none';
          link.style.cursor = 'default';
        }
      } catch (e) { /* ignore decode errors */ }
    });
  }

})();
