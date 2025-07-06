document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click only on text or images (specific sections, not globally)
  document.body.oncontextmenu = function (e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'P') {
      return false;
    }
  };

  // Disable text selection globally (optional, can be restricted to specific elements)
  document.body.style.userSelect = "none";

  // Prevent key shortcuts for copying, viewing source etc.
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });
});
