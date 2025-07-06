document.addEventListener('DOMContentLoaded', function () {
  // Disable drag for image and text elements only
  document.body.addEventListener('dragstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (['img', 'p', 'span', 'div'].includes(tag)) {
      e.preventDefault();
    }
  });

  // Block only specific Ctrl key shortcuts (no mouse or arrow interference)
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (['c', 'u', 's', 'p'].includes(key)) {
        e.preventDefault();
      }
    }
  });
});
