document.addEventListener('DOMContentLoaded', function () {
  // Prevent right-click menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  // Disable image dragging
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  });

  // Disable text selection (double-click, right-click, etc.)
  document.body.style.userSelect = "none";
  document.body.onselectstart = function () { return false; };

  // Prevent keyboard shortcuts (e.g., Ctrl+C, Ctrl+U, Ctrl+S, etc.)
  document.addEventListener('keydown', function (e) {
    const blockedKeys = ['c', 'x', 'u', 's', 'p', 'i', 'a', 'v']; // Disable Ctrl + C, X, U, S, P, I, A, V
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }

    // Block F12 (DevTools) and Ctrl+P (Print dialog)
    if (e.key === "F12" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
    }
  });

  // Prevent the page from being printed using the print dialog (Ctrl+P)
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => {
      window.close();
    }, 500);
  };
});
