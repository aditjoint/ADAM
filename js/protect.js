// protect.js
document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click
  document.body.oncontextmenu = function () {
    return false;
  };

  // Disable selection
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";

  // Disable drag & text selection
  document.body.onselectstart = function () {
    return false;
  };
  document.body.ondragstart = function () {
    return false;
  };

  // Disable certain keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+S, Ctrl+A)
  document.addEventListener('keydown', function (e) {
    const blockedKeys = ['c', 'x', 'u', 's', 'a'];
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });
});
