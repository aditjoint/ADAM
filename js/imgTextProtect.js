document.addEventListener('DOMContentLoaded', function () {
  // Allow clicking and scrolling; block copy-related behavior only

  // Disable right-click (context menu)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable text/image selection
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  // Disable drag (images, text, links)
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // Disable keyboard shortcuts for copy/print/etc.
  document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ['c', 'p', 'u', 's', 'x', 'a'].includes(key)) {
      e.preventDefault();
    }
    if (key === 'f12') {
      e.preventDefault(); // Disable DevTools
    }
  });

  // Disable copy event
  document.addEventListener('copy', function (e) {
    e.preventDefault();
  });

  // Disable print
  window.addEventListener('beforeprint', function (e) {
    e.preventDefault();
  });
});
