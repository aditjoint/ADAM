/**
 * imgTextProtect.js — Enhanced Version
 * Keeps all original protections + improved key blocking
 */

document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Block right-click globally
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (e.target.tagName === "IMG" || e.target.closest("img")) {
      alert("Right-click is disabled on images.");
    }
  });

  // 🔒 Disable dragging globally
  document.querySelectorAll("*").forEach(el => {
    el.setAttribute("draggable", "false");
  });
  document.addEventListener("dragstart", e => e.preventDefault());

  // 🔒 Prevent copy/cut/paste globally except form inputs
  ["copy", "cut", "paste"].forEach(event => {
    document.addEventListener(event, function (e) {
      const tag = e.target.tagName.toLowerCase();
      if (!["input","textarea"].includes(tag)) {
        e.preventDefault();
        alert("Copying is disabled on this site.");
      }
    });
  });

  // 🔒 Block keyboard shortcuts for DevTools / Save / Copy
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    const keyCode = e.keyCode || e.which;

    const blockedKeys = ['c','u','i','j','a','x','v','s','p'];

    // Enhanced: Capture phase to ensure first listener triggers
    if (
      keyCode === 123 || // F12
      ((e.ctrlKey || e.metaKey) && blockedKeys.includes(key)) || // Ctrl/Cmd+Key
      (e.ctrlKey && e.shiftKey && ['c','i','j','k','s','p'].includes(key)) || // Ctrl+Shift+Key
      (e.altKey && keyCode === 115) // Alt+F4 (Windows)
    ) {
      e.preventDefault();
      alert("This keyboard shortcut is disabled.");
      return false;
    }

    // Optional: debug pressed keys
    // console.log(`Key pressed: ${key}, code: ${keyCode}, ctrl: ${e.ctrlKey}, shift: ${e.shiftKey}`);
  }, true); // true = capture phase

  // 🔒 Disable double-click selection
  document.addEventListener("dblclick", e => e.preventDefault());

  // 🔒 Mobile: Prevent long-press on images, allow pinch zoom
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", e => e.preventDefault());
    img.addEventListener("dragstart", e => e.preventDefault());
    img.addEventListener("touchstart", e => {
      if (e.touches.length === 1) e.preventDefault();
    }, { passive: false });
    img.addEventListener("touchend", e => {}, { passive: true });
  });

  // 🔒 Mobile & desktop: Block long-press / selection on all text
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, pre, code").forEach(el => {
    el.style.userSelect = "none";
    el.addEventListener("touchstart", e => { if(e.touches.length===1) e.preventDefault(); }, {passive:false});
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
