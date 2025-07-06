document.addEventListener('DOMContentLoaded', () => {
  const allowed = [
    'mobile-menu-toggle',
    'dropdown-toggle',
    'tab-btn',
    'btn', // include your CTA buttons
  ];

  function isAllowedTarget(el) {
    return (
      el.closest('.mobile-menu-toggle') ||
      el.closest('.dropdown-toggle') ||
      el.closest('.tab-btn') ||
      el.closest('.btn')
    );
  }

  // BLOCK right‑click except on allowed
  document.body.addEventListener('contextmenu', e => {
    if (!isAllowedTarget(e.target)) e.preventDefault();
  });

  // BLOCK select/dragstart except in allowed
  ['selectstart', 'dragstart'].forEach(evt =>
    document.body.addEventListener(evt, e => {
      if (!isAllowedTarget(e.target)) e.preventDefault();
    })
  );

  // BLOCK key shortcuts
  document.addEventListener('keydown', e => {
    if (
      (e.ctrlKey || e.metaKey) &&
      ['c','x','u','s','p'].includes(e.key.toLowerCase())
    ) {
      // allow if focused inside allowed
      if (!isAllowedTarget(e.target)) e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault();
  });
});
