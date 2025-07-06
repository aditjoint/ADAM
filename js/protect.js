<script>
document.addEventListener('DOMContentLoaded', function () {
  const ALLOWED_CLASSES = [
    'tab-btn',
    'mobile-menu-toggle',
    'dropdown-toggle',
    'dropdown-menu',
    'main-nav',
    'nav-links',
    'btn',
    'link',
    'dropdown',
    'logo'
  ];

  function isInsideAllowedElement(target) {
    while (target && target !== document.body) {
      if (target.classList) {
        for (const cls of ALLOWED_CLASSES) {
          if (target.classList.contains(cls)) return true;
        }
      }
      target = target.parentElement;
    }
    return false;
  }

  // Prevent right-click only outside allowed elements
  document.body.addEventListener('contextmenu', function (e) {
    if (!isInsideAllowedElement(e.target)) e.preventDefault();
  });

  // Optional: prevent select only on body content (not inside inputs, etc.)
  document.body.addEventListener('selectstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (!['input', 'textarea'].includes(tag)) {
      e.preventDefault();
    }
  });

  // Optional: prevent drag on images
  document.body.addEventListener('dragstart', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.preventDefault();
    }
  });

  // Remove these lines — they harm usability
  // document.body.style.userSelect = 'none';

  // Remove keyboard blocker — these can’t be fully blocked and hurt UX
  // document.addEventListener('keydown', function (e) {
  //   const key = e.key.toLowerCase();
  //   if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a', 'p'].includes(key)) {
  //     e.preventDefault();
  //   }
  //   if (key === 'f12') e.preventDefault();
  // });
});
</script>
