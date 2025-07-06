document.addEventListener('DOMContentLoaded', function () {
  const allowInputs = ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT'];

  // Prevent copying text/image except from inputs or buttons
  document.body.addEventListener('copy', function (e) {
    if (!allowInputs.includes(e.target.tagName)) e.preventDefault();
  });

  document.body.addEventListener('cut', function (e) {
    if (!allowInputs.includes(e.target.tagName)) e.preventDefault();
  });

  document.body.addEventListener('dragstart', function (e) {
    if (!allowInputs.includes(e.target.tagName)) e.preventDefault();
  });

  // Prevent Ctrl+C/X/S/P, but allow all other keys and clicks
  document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    if (ctrlOrCmd && ['c', 'x', 's', 'p'].includes(key)) {
      if (!allowInputs.includes(e.target.tagName)) e.preventDefault();
    }
  });
});
