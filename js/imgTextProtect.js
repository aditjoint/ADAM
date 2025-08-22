/**
 * imgTextProtect.js — Full Maximum Protection for Static Pages
 * Images cannot be clicked, dragged, or opened in new tab
 * Blocks all mouse interactions, keyboard shortcuts, text selection
 * Allows pinch zoom and scrolling
 */

document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Block right-click globally
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Right-click is disabled on this site.");
  }, true);

  // 🔒 Disable dragging globally
  document.querySelectorAll("*").forEach(el => el.setAttribute("draggable", "false"));
  document.addEventListener("dragstart", e => e.preventDefault(), true);

  // 🔒 Prevent copy/cut/paste globally
  ["copy", "cut", "paste"].forEach(event => {
    document.addEventListener(event, e => {
      e.preventDefault();
      alert("Copying is disabled on this site.");
    }, true);
  });

  // 🔒 Block keyboard shortcuts (DevTools / Save / Copy / Print / Select All)
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    const keyCode = e.keyCode || e.which;
    const blockedKeys = ['c','u','i','j','a','x','v','s','p','k'];

    if (
      keyCode === 123 || // F12
      ((e.ctrlKey || e.metaKey) && blockedKeys.includes(key)) || 
      (e.ctrlKey && e.shiftKey && blockedKeys.includes(key)) || 
      (e.altKey && keyCode === 115) // Alt+F4
    ) {
      e.preventDefault();
      alert("This keyboard shortcut is disabled.");
      return false;
    }

    if ((e.ctrlKey || e.metaKey) && key === 'a') { e.preventDefault(); alert("Select All is disabled."); }
    if ((e.ctrlKey || e.metaKey) && key === 'p') { e.preventDefault(); alert("Printing is disabled."); }
  }, true);

  // 🔒 Disable double-click selection only on text
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, pre, code").forEach(el => {
    el.style.userSelect = "none";
    el.addEventListener("dblclick", e => e.preventDefault(), true);
    el.addEventListener("touchstart", e => { if(e.touches.length===1) e.preventDefault(); }, {passive:false});
  });

  // 🔒 Protect images completely: block all mouse/touch interaction
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");

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
    overlay.style.zIndex = "9999";

    // Block all mouse events on overlay
    ["mousedown", "mouseup", "click", "dblclick", "contextmenu", "dragstart"].forEach(evt => {
      overlay.addEventListener(evt, e => e.preventDefault());
    });

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);

    // Block touch events for mobile
    ["touchstart", "touchend", "touchmove", "touchcancel"].forEach(evt => {
      img.addEventListener(evt, e => e.preventDefault(), {passive:false});
    });
  });

  // 🖨️ Block printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };

  // 🖐️ Ensure pinch zoom works
  document.documentElement.style.touchAction = "pan-x pan-y";

  // 🧱 Optional: Auto-padding for fixed headers
  const header = document.querySelector("header");
  if (header) document.body.style.paddingTop = `${header.offsetHeight}px`;

});
