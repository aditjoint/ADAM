/**
 * imgTextProtect.js
 * Blocks: right-click, image drag/save, copy, keyboard shortcuts, printing.
 * Safe for: scroll, form inputs, links, navigation.
 * Mobile: Allows pinch zoom, blocks long-press on images.
 */

document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Block right-click on images
  document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "IMG" || e.target.closest("img")) {
      e.preventDefault();
      alert("Right-click is disabled on images.");
    }
  });

  // 🔒 Disable drag globally
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG" || e.target.closest("img")) {
      e.preventDefault();
    }
  });

  // 🔒 Prevent copy/cut/paste globally, allow form inputs
  ["copy", "cut", "paste"].forEach(event => {
    document.addEventListener(event, function (e) {
      const tag = e.target.tagName.toLowerCase();
      if (!["input","textarea"].includes(tag)) {
        e.preventDefault();
        alert("Copying is disabled on this site.");
      }
    });
  });

  // 🔒 Block DevTools / Save / Copy keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    const keyCode = e.keyCode || e.which;

    if (
      keyCode === 123 || // F12
      ((e.ctrlKey || e.metaKey) && ['c','u','i','j','a','x','v','s','p'].includes(key)) || // Ctrl/Cmd+Key
      (e.ctrlKey && e.shiftKey && ['c','i','j','k'].includes(key)) // Ctrl+Shift+Key
    ) {
      e.preventDefault();
      alert("This keyboard shortcut is disabled.");
      return false;
    }
  });

  // 🔒 Disable double-click selection
  document.addEventListener("dblclick", function (e) {
    e.preventDefault();
  });

  // 🔒 Mobile: Prevent long-press on images, allow pinch zoom
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");

    img.addEventListener("mousedown", e => e.preventDefault());
    img.addEventListener("dragstart", e => e.preventDefault());

    img.addEventListener("touchstart", e => {
      if (e.touches.length === 1) e.preventDefault(); // block single-touch long press
    }, { passive: false });

    // optional: touchend safe
    img.addEventListener("touchend", e => {}, { passive: true });
  });

  // 🖨️ Block printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };

  // 🧱 Auto-padding for fixed headers (optional)
  const header = document.querySelector("header");
  if (header) document.body.style.paddingTop = `${header.offsetHeight}px`;

  // 🖐️ Ensure pinch zoom works
  document.documentElement.style.touchAction = "pan-x pan-y";
});
