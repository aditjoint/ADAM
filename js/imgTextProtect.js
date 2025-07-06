// js/imgTextProtect.js

function initProtection() {
  const ALLOW_TAGS = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL", "NAV", "UL", "LI"];

  function isAllowed(target) {
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  document.addEventListener("dragstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("selectstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p"].includes(key)) {
      if (!isAllowed(e.target)) e.preventDefault();
    }
  });

  document.addEventListener("contextmenu", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowed(e.target)) e.preventDefault();
  });

  document.body.style.userSelect = "none";
}

// Allow manual trigger if script loads after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProtection);
} else {
  initProtection();
}

// For dynamic trigger support
window.triggerProtectScript = initProtection;
