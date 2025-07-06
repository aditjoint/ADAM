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

  // Block right-click
  document.addEventListener("contextmenu", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block keyboard shortcuts like Ctrl+C, Ctrl+U, etc.
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if (
      (e.ctrlKey || e.metaKey) &&
      ["c", "x", "u", "s", "p", "i", "j", "k"].includes(key)
    ) {
      if (!isAllowed(e.target)) e.preventDefault();
    }
  });

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

  // Block image right-click and drag
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", e => e.preventDefault());
    img.addEventListener("mousedown", e => e.preventDefault());
  });
});
