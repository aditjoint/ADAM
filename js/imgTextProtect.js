document.addEventListener("DOMContentLoaded", function () {

  // Prevent right-click menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Prevent text selection and copy
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  // Prevent drag
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  // Prevent image dragging and selection
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  });

  // Block keyboard shortcuts like Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+P, etc.
  document.addEventListener("keydown", function (e) {
    const blockedKeys = ['c', 'x', 'v', 'u', 'p', 'i', 'j', 'k', 'a']; // Disable Ctrl + C, X, V, U, P, I, J, K
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }

    // Block F12 (DevTools) and Ctrl+P (Print dialog)
    if (e.key === "F12" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
    }
  });

  // Prevent printing (Ctrl + P)
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => {
      window.close();
    }, 500);
  };

  // Block 'Save As' and 'Print' dialog (Ctrl+S and Ctrl+P)
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.key === 's')) {
      e.preventDefault();
    }
  });

  // Prevent Developer Tools (F12, right-click)
  document.addEventListener("keydown", function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.key === "Shift" && e.keyCode === 73)) {
      e.preventDefault();
    }
  });
});
