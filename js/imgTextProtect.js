// js/imgTextProtect.js
document.addEventListener('DOMContentLoaded', function () {
  // Block right-click and drag
  document.body.oncontextmenu = function () { return false; };
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';

  // Disable image right-click and drag
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  });

  // Disable print and prevent DevTools (Ctrl+P, F12, etc.)
  document.addEventListener('keydown', function (e) {
    // Block Ctrl+P (Print)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
    }
    // Block F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Block other keyboard shortcuts like Ctrl+C, Ctrl+U, etc.
    const blockedKeys = ['c', 'x', 'u', 's', 'a', 'i', 'j', 'k'];
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });

  // Block text selection
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  // Prevent double-click selection
  document.addEventListener('mousedown', function (e) {
    if (e.detail > 1) e.preventDefault();
  });
});
