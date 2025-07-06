// js/imgTextProtect.js
document.addEventListener("DOMContentLoaded", function () {
  // Prevent selecting text unless it's an input, button, etc.
  const ALLOW_TAGS = ["BUTTON", "A", "SELECT", "INPUT", "TEXTAREA", "LABEL"];

  function isAllowed(target) {
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  // Prevent text selection
  document.addEventListener("selectstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Prevent drag
  document.addEventListener("dragstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Prevent double-click selection
  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowed(e.target)) e.preventDefault();
  });

  // Block right-click (context menu)
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();  // Disable right-click
  });

  // Block keyboard shortcuts like Ctrl+C, Ctrl+U, etc.
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if (
      (e.ctrlKey || e.metaKey) &&
      ["c", "x", "u", "s", "p", "i", "j", "k"].includes(key)
    ) {
      e.preventDefault();  // Disable these keys
    }

    // Block F12 (DevTools), Ctrl+P (Print dialog)
    if (e.key === "F12" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
    }
  });

  // Prevent access to page source (Ctrl+U or right-click -> View page source)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();  // Block Ctrl+U (View Source)
    }
  });

  // Prevent the print dialog from appearing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => {
      window.close();
    }, 500);

    return false; // Prevent printing altogether
  };

  // Block print dialog via window.print()
  window.print = function () {
    console.log("Printing is disabled.");
    return false; // Prevent the window.print method
  };

  // Block QR code generation through browser extensions (harder to block)
  // Just making sure the page content is not easily copied
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", e => e.preventDefault());
    img.addEventListener("mousedown", e => e.preventDefault());
  });
});
