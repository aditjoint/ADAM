document.addEventListener('DOMContentLoaded', function () {
  // Disable drag for image and text elements
  document.body.addEventListener('dragstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (['img', 'p', 'span', 'div', 'section', 'article'].includes(tag)) {
      e.preventDefault();
    }
  });

  // Block only specific Ctrl key shortcuts (but not arrow, tab, mouse etc.)
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (['c', 's', 'u', 'p'].includes(key)) {
        e.preventDefault();
        console.warn('Copy/Save/ViewSource/Print disabled');
      }
    }
  });
});
