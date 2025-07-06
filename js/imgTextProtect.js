document.addEventListener("DOMContentLoaded", function () {

  // ❌ Disable Right-Click Context Menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // ❌ Disable Text Selection (if not allowed via CSS)
  document.addEventListener("selectstart", function (e) {
    if (!e.target.closest("input, textarea, select, a, button")) {
      e.preventDefault();
    }
  });

  // ❌ Disable Drag Events
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  // ❌ Prevent image dragging and interaction
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  });

  // 🚫 Block critical Ctrl/Meta key combinations
  document.addEventListener("keydown", function (e) {
    const blockedKeys = ['c', 'x', 'v', 'u', 'p', 's', 'i', 'j', 'k', 'a'];
    const key = e.key.toLowerCase();

    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(key)) {
      e.preventDefault();
    }

    // ❌ Block F12 (Dev Tools) and Print Dialog
    if (e.key === "F12" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
    }

    // ❌ Block Ctrl+Shift+I/J/K for DevTools
    if ((e.ctrlKey && e.shiftKey && ['i', 'j', 'k'].includes(key))) {
      e.preventDefault();
    }
  });

  // 🛑 Prevent printing via browser shortcuts
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => {
      window.close();
    }, 500);
  };
});
