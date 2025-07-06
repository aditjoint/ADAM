document.addEventListener('DOMContentLoaded', () => {
  // Block right-click on text or images only
  document.body.addEventListener('contextmenu', e => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'img' || tag === 'p' || tag === 'span' || tag === 'div') {
      e.preventDefault();
    }
  });

  // Block text/image selection
  document.body.addEventListener('selectstart', e => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'img' || tag === 'p' || tag === 'span' || tag === 'div') {
      e.preventDefault();
    }
  });

  // Block dragging of images
  document.body.addEventListener('dragstart', e => {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
  });

  // Block keyboard copy/view source shortcuts (Ctrl+C, Ctrl+U, etc.)
  document.addEventListener('keydown', e => {
    const blockedKeys = ['c', 'x', 'u', 's', 'p', 'a'];
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      if (!(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        e.preventDefault();
      }
    }
    if (e.key === 'F12') e.preventDefault(); // Prevent DevTools
  });
});
