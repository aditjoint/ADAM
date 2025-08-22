/**
 * imgTextProtect.js — Full Maximum Protection for Static Pages
 * Aggressive deterrence while allowing image double-click / Ctrl+Click to open
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

  // 🔒 Disable double-click selection only on text
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, pre, code").forEach(el => {
    el.style.userSelect = "none";
    el.addEventListener("dblclick", e => e.preventDefault(), true);
    el.addEventListener("touchstart", e => { if(e.touches.length===1) e.preventDefault(); }, {passive:false});
  });

  // 🖐️ Mobile: Prevent long-press on images
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");

    // Overlay wrapper for image protection
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

    // Only block right-click and drag on overlay
    overlay.addEventListener("contextmenu", e => {
      e.preventDefault();
      alert("Right-click is disabled on this image.");
    });
    overlay.addEventListener("mousedown", e => {
      if (e.button === 2) e.preventDefault(); // only right-click
    });
    overlay.addEventListener("dragstart", e => e.preventDefault());

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);

    // Allow regular clicks (single/double click) to propagate to image
    overlay.style.pointerEvents = "auto";
    img.addEventListener("touchstart", e => {
      if (e.touches.length === 1) e.preventDefault();
    }, { passive: false });
    img.addEventListener("touchend", e => {}, { passive: true });
  });

  // 🖨️ Block printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };

  // 🧱 Optional: Auto-padding for fixed headers
  const header = document.querySelector("header");
  if (header) document.body.style.paddingTop = `${header.offsetHeight}px`;

  // 🖐️ Ensure pinch zoom works
  document.documentElement.style.touchAction = "pan-x pan-y";

});
