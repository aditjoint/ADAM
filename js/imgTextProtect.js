document.addEventListener("DOMContentLoaded", function () {
  // Allowed interactive tags (to not block them)
  const ALLOW_TAGS = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL", "NAV", "UL", "LI"];

  function isAllowed(target) {
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  // Block drag
  document.addEventListener("dragstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block text selection
  document.addEventListener("selectstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block Ctrl + C / X / P / S
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p"].includes(key)) {
      if (!isAllowed(e.target)) e.preventDefault();
    }
  });

  // Optional: block context menu
  document.addEventListener("contextmenu", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  // Block double-click selection
  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowed(e.target)) e.preventDefault();
  });

  // Prevent user selection globally
  document.body.style.userSelect = "none";
});
