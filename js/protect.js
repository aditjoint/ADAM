// protect.js
document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click
  document.body.oncontextmenu = function () { return false; };

  // Disable selection
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";

  // Disable drag & text selection
  document.body.onselectstart = function () { return false; };
  document.body.ondragstart = function () { return false; };

  // Disable keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });
});

