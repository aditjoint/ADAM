// protect.js
document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click
  document.body.oncontextmenu = () => false;

  // Disable selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // Disable drag & selection
  document.body.onselectstart = () => false;
  document.body.ondragstart = () => false;

  // Block keyboard shortcuts like Ctrl+C, Ctrl+S, Ctrl+U etc.
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault(); // Block DevTools
  });
});
