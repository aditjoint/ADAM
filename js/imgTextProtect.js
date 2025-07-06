
document.addEventListener('DOMContentLoaded', function () {
  // Disable right-click on images and paragraph text only
  document.body.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'P') {
      e.preventDefault();
    }
  });

  // Disable dragging of images
  document.body.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Disable text selection on paragraph or heading content
  document.body.addEventListener('selectstart', function (e) {
    const tag = e.target.tagName;
    if (['P', 'SPAN', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) {
      e.preventDefault();
    }
  });
});
