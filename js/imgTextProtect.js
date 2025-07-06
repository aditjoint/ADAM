document.addEventListener('DOMContentLoaded', function () {
  const protectedTags = ['IMG', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  // Disable right-click on images and text
  document.body.addEventListener('contextmenu', function (e) {
    if (protectedTags.includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  // Disable dragging images
  document.body.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Disable text selection on main content only
  const contentSections = document.querySelectorAll('.protect-text');
  contentSections.forEach(section => {
    section.style.userSelect = 'none';
    section.style.webkitUserSelect = 'none';
    section.style.msUserSelect = 'none';
  });
});
