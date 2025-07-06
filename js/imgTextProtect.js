(function () {
  const ALLOW_TAGS = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL"];

  function isAllowed(target) {
    while (target && target !== document.body) {
      if (ALLOW_TAGS.includes(target.tagName)) return true;
      target = target.parentElement;
    }
    return false;
  }

  document.addEventListener("contextmenu", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("dragstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("selectstart", function (e) {
    if (!isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1 && !isAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p", "u", "v"].includes(key)) {
      if (!isAllowed(e.target)) e.preventDefault();
    }
  });

  window.addEventListener("load", () => {
    document.body.style.userSelect = "none";
  });
})();
