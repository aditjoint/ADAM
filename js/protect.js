document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click on images and text only
  document.body.oncontextmenu = function (e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'P') {
      return false; // Block right-click
    }
  };

  // Disable text selection on the page
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";

  // Prevent drag & select
  document.body.onselectstart = function () { return false; };
  document.body.ondragstart = function () { return false; };

  // Block copying keyboard shortcuts like Ctrl+C, Ctrl+S, Ctrl+U, etc.
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
      e.preventDefault(); // Block these keys
    }
  });
});
