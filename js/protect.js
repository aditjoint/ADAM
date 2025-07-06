document.addEventListener('DOMContentLoaded', function () {
  const ALLOWED_CLASSES = [
    'tab-btn',
    'mobile-menu-toggle',
    'dropdown-toggle',
    'dropdown-menu',
    'main-nav',
    'nav-links',
    'btn'
  ];

  function isInsideAllowedElement(target) {
    while (target && target !== document.body) {
      if (target.classList) {
        for (const cls of ALLOWED_CLASSES) {
          if (target.classList.contains(cls)) return true;
        }
      }
      target = target.parentElement;
    }
    return false;
  }

  // Disable right-click unless inside allowed elements
  document.body.addEventListener('contextmenu', function (e) {
    if (!isInsideAllowedElement(e.target)) {
      e.preventDefault();
    }
  });

  // Disable text selection
  document.body.addEventListener('selectstart', function (e) {
    if (!isInsideAllowedElement(e.target)) {
      e.preventDefault();
    }
  });

  // Disable drag
  document.body.addEventListener('dragstart', function (e) {
    if (!isInsideAllowedElement(e.target)) {
      e.preventDefault();
    }
  });

  // CSS user-select disable globally
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // Disable developer shortcuts
  document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(key)) {
      e.preventDefault();
    }
    if (key === 'f12') e.preventDefault();
  });
});
