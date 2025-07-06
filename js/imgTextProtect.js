document.addEventListener('DOMContentLoaded', function () {
  // Disable drag on images and common text containers
  document.body.addEventListener('dragstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (['img', 'p', 'span', 'div'].includes(tag)) {
      e.preventDefault();
    }
  });

  // Block Ctrl or Shift key combinations commonly used for copy/dev tools
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.shiftKey) {
      const blocked = ['c', 'u', 's', 'p', 'a', 'x', 'i'];
      if (blocked.includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    }
  });
});
