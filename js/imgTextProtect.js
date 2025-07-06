document.addEventListener("DOMContentLoaded", function () {
  // Allowed tags to interact with (e.g., nav, buttons, inputs)
  const ALLOW_TAGS = ["BUTTON", "A", "SELECT", "INPUT", "TEXTAREA", "LABEL"];

  function isAllowedTarget(target) {
    // Traverse up the DOM to check if parent is allowed
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  // Prevent drag (images/text)
  document.addEventListener("dragstart", function (e) {
    if (!isAllowedTarget(e.target)) e.preventDefault();
  });

  // Prevent text selection
  document.addEventListener("selectstart", function (e) {
    if (!isAllowedTarget(e.target)) e.preventDefault();
  });

  // Prevent Ctrl+C / Ctrl+X / Ctrl+S / Ctrl+P
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p"].includes(key)) {
      if (!isAllowedTarget(e.target)) e.preventDefault();
    }
  });

  // Block context menu (optional: you can remove if you want right-click)
  document.addEventListener("contextmenu", function (e) {
    if (!isAllowedTarget(e.target)) e.preventDefault();
  });

  // Prevent double click selection
  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowedTarget(e.target)) {
      e.preventDefault();
    }
  });

  // Optional: Disable user-select globally (as a fallback)
  document.body.style.userSelect = "none";
});
