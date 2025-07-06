document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('copy', function (e) {
    e.preventDefault();
  });

  document.body.addEventListener('cut', function (e) {
    e.preventDefault();
  });

  document.body.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    const ctrlCmd = e.ctrlKey || e.metaKey;

    // Block Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+P (copy, cut, save, print)
    if (ctrlCmd && ['c', 'x', 's', 'p'].includes(key)) {
      e.preventDefault();
    }
  });
});
