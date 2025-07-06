document.addEventListener('DOMContentLoaded', function () {
  const allowedSelectors = [
    '.tab-btn',              // Service section tab buttons
    '.mobile-menu-toggle',   // Hamburger mobile toggle
    '.dropdown-toggle',      // Dropdown triggers
    '.dropdown-menu',        // Dropdown items
    '.main-nav',             // Nav container
    '.nav-links',            // Nav links
    '.btn',                  // CTA buttons
  ];

  // Helper to check if target is inside any allowed elements
  function isAllowedTarget(target) {
    return allowedSelectors.some(selector => {
      return target.closest(selector);
    });
  }

  // Disable right-click unless it's on allowed elements
  document.body.oncontextmenu = function (e) {
    if (isAllowedTarget(e.target)) return true;
    e.preventDefault();
    return false;
  };

  // Disable selection except on allowed
  document.body.onselectstart = function (e) {
    if (isAllowedTarget(e.target)) return true;
    e.preventDefault();
    return false;
  };

  // Disable dragging except on allowed
  document.body.ondragstart = function (e) {
    if (isAllowedTarget(e.target)) return true;
    e.preventDefault();
    return false;
  };

  // General user-select styles (can override in CSS for allowed)
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // Disable specific keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === 'F12') {
      e.preventDefault(); // Block DevTools
    }
  });
});
