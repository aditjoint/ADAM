document.addEventListener('DOMContentLoaded', function () {
  // Right-click disable only on images and text
  document.body.addEventListener('contextmenu', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'img' || tag === 'p' || tag === 'span' || tag === 'div') {
      e.preventDefault();
    }
  });

  // Prevent dragging of images
  document.body.addEventListener('dragstart', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
  });

  // Disable print shortcut (Ctrl+P / Cmd+P)
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      alert("Printing is disabled on this page.");
    }
  });
});
