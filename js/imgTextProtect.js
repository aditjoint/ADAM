document.addEventListener('DOMContentLoaded', function () {
  // Disable drag on all images and selected text areas
  document.body.addEventListener('dragstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'img' || tag === 'p' || tag === 'span' || tag === 'div') {
      e.preventDefault();
    }
  });

  // Block Ctrl or Shift key combos (used for copy/inspect/print/etc.)
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.shiftKey) {
      const key = e.key.toLowerCase();
      const blockKeys = ['c', 'u', 's', 'p', 'a', 'x', 'i'];
      if (blockKeys.includes(key)) {
        e.preventDefault();
      }
    }
  });
});
