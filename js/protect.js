// protect.js
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');

  // Disable right-click except on mobile menu toggle
  document.body.oncontextmenu = function (e) {
    if (menuToggle && menuToggle.contains(e.target)) return true;
    return false;
  };

  // Disable text selection except on mobile menu toggle
  document.body.onselectstart = function (e) {
    if (menuToggle && menuToggle.contains(e.target)) return true;
    return false;
  };

  // Disable drag start except on mobile menu toggle
  document.body.ondragstart = function (e) {
    if (menuToggle && menuToggle.contains(e.target)) return true;
    return false;
  };

  // Prevent keyboard shortcuts globally
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault();
  });

  // Optional: keep user-select disabled on body
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
});
