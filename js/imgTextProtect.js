document.addEventListener("DOMContentLoaded", function () {

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

  // Prevent keyboard shortcuts like Ctrl+C, Ctrl+U, etc.
  document.addEventListener("keydown", function (e) {
    const blockedKeys = ['c', 'x', 'u', 's', 'p', 'i', 'j', 'k']; // Disable Ctrl + C, X, U, S, P, I, A, V
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }

    // Block F12 (DevTools) and Ctrl+P (Print dialog)
    if (e.key === "F12" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
    }
  });

  // Prevent printing (Ctrl + P) and right-click print options
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => {
      window.close();
    }, 500);
  };

});
