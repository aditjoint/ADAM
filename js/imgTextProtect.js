document.addEventListener('DOMContentLoaded', function () {
  // Disable drag events for all images and text
  document.querySelectorAll('img, p, span, div').forEach(el => {
    el.setAttribute('draggable', 'false');
  });

  // Block specific key combinations: Ctrl+C, Ctrl+P, Ctrl+U
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c', 'p', 'u'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });
});
