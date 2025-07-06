document.addEventListener('DOMContentLoaded', function () {
  // Exclude interactive elements by class or ID
  const safeSelectors = [
    '#mobile-menu-toggle',             // Mobile menu
    '.tab-button',                     // Tab controls
    '.nav-item',                       // Navigation items
    '.menu-toggle',                    // Hamburger button
    '.dropdown',                       // Dropdowns if any
    '.tab-link',                       // Custom tab links
  ];

  function isSafeTarget(target) {
    return safeSelectors.some(selector => target.closest(selector));
  }

  // Disable right-click unless inside safe elements
  document.body.oncontextmenu = function (e) {
    if (isSafeTarget(e.target)) return true;
    return false;
  };

  // Disable selection unless inside safe elements
  document.body.onselectstart = function (e) {
    if (isSafeTarget(e.target)) return true;
    return false;
  };

  document.body.ondragstart = function (e) {
    if (isSafeTarget(e.target)) return true;
    return false;
  };

  // Block DevTools and keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault();
  });
});
