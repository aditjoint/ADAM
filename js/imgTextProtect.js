function initProtection() {
  const ALLOW_TAGS = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL", "NAV", "UL", "LI"];

  function isAllowed(target) {
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  // Block context menu (right-click)
  document.addEventListener("contextmenu", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block drag
  document.addEventListener("dragstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block selection
  document.addEventListener("selectstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block double click
  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowed(e.target)) e.preventDefault();
  });

  // Block keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "u", "s", "p", "v"].includes(key)) {
      if (!isAllowed(e.target)) e.preventDefault();
    }
  });

  // Disable text selection globally
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";
}

// Safe init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProtection);
} else {
  initProtection();
}

// Expose for dynamic loading
window.triggerProtectScript = initProtection;
