/**
 * imgTextProtect.js — Full Maximum Protection for Static Pages
 * Aggressive deterrence while preserving pinch zoom and input functionality
 */

document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Block right-click globally
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (e.target.tagName === "IMG" || e.target.closest("img")) {
      alert("Right-click is disabled on images.");
    } else {
      alert("Right-click is disabled on this site.");
    }
  }, true); // capture phase

  // 🔒 Disable dragging globally
  document.querySelectorAll("*").forEach(el => {
    el.setAttribute("draggable", "false");
  });
  document.addEventListener("dragstart", e => e.preventDefault(), true);

  // 🔒 Prevent copy/cut/paste globally except form inputs
  ["copy", "cut", "paste"].forEach(event => {
    document.addEventListener(event, function (e) {
      const tag = e.target.tagName.toLowerCase();
      if (!["input","textarea"].includes(tag)) {
        e.preventDefault();
        alert("Copying is disabled on this site.");
      }
    }, true);
  });

  // 🔒 Block keyboard shortcuts for DevTools / Save / Copy / Print / Select All
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    const keyCode = e.keyCode || e.which;

    const blockedKeys = ['c','u','i','j','a','x','v','s','p','k'];

    if (
      keyCode === 123 || // F12
      ((e.ctrlKey || e.metaKey) && blockedKeys.includes(key)) || // Ctrl/Cmd+Key
      (e.ctrlKey && e.shiftKey && blockedKeys.includes(key)) || // Ctrl+Shift+Key
      (e.altKey && keyCode === 115) // Alt+F4
    ) {
      e.preventDefault();
      alert("This keyboard shortcut is disabled.");
      return false;
    }

    // Block Ctrl+A / Cmd+A
    if ((e.ctrlKey || e.metaKey) && key === 'a') {
      e.preventDefault();
      alert("Select All is disabled.");
    }

    // Block Ctrl+P / Cmd+P
    if ((e.ctrlKey || e.metaKey) && key === 'p') {
      e.preventDefault();
      alert("Printing is disabled.");
    }
  }, true); // capture phase

  // 🔒 Disable double-click selection
  document.addEventListener("dblclick", e => e.preventDefault(), true);

  // 🔒 Mobile: Prevent long-press on images, allow pinch zoom
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", e => e.preventDefault(), true);
    img.addEventListener("dragstart", e => e.preventDefault(), true);
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

  // 🔒 Overlay protection for images (blocks right-click, drag, and Ctrl)
  document.querySelectorAll("img").forEach(img => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("img-wrapper");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const overlay = document.createElement("div");
    overlay.classList.add("img-overlay");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "2";

    overlay.addEventListener("contextmenu", e => {
      e.preventDefault();
      alert("Right-click is disabled on this image.");
    });
    overlay.addEventListener("mousedown", e => e.preventDefault());
    overlay.addEventListener("dragstart", e => e.preventDefault());

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
  });

});
