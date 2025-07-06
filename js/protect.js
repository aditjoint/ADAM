document.addEventListener('DOMContentLoaded', function () {
  const allowedSelectors = [
    '.tab-btn',              // Allow tabs to work
    '.mobile-menu-toggle',   // Allow mobile menu toggle
    '.dropdown-toggle',      // Allow dropdown triggers
    '.dropdown-menu',        // Allow dropdown items
    '.main-nav',             // Allow main navigation
    '.nav-links',            // Allow nav links
    '.btn',                  // Allow buttons
  ];

  // Prevent right-click and selection on everything except allowed selectors
  document.body.oncontextmenu = (e) => {
    if (allowedSelectors.some(selector => e.target.matches(selector))) {
      return true; // Allow right-click on allowed elements
    }
    return false; // Block right-click on everything else
  };

  document.body.onselectstart = (e) => {
    if (allowedSelectors.some(selector => e.target.matches(selector))) {
      return true; // Allow selection on allowed elements
    }
    return false; // Block selection on everything else
  };

  // Disable dragstart
  document.body.ondragstart = (e) => {
    if (allowedSelectors.some(selector => e.target.matches(selector))) {
      return true; // Allow dragging on allowed elements
    }
    return false; // Block drag on everything else
  };

  // Block certain keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault(); // Block DevTools
  });
});
