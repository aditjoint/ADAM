/**
 * imgTextProtect.js — Full Maximum Protection for Static Pages (Hardened)
 * Combines original protections + hardened extras
 */

document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Block right-click globally
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    e.stopPropagation();
    alert("Right-click is disabled on this site.");
    return false;
  }, true);

  // 🔒 Disable dragging globally
  document.querySelectorAll("*").forEach(el => el.setAttribute("draggable", "false"));
  document.addEventListener("dragstart", e => e.preventDefault(), true);

  // 🔒 Prevent copy/cut/paste globally
  ["copy", "cut", "paste"].forEach(event => {
    document.addEventListener(event, e => {
      e.preventDefault();
      e.stopPropagation();
      alert("Copying is disabled on this site.");
    }, true);
  });

  // 🔒 Block dangerous keyboard shortcuts
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
      e.stopPropagation();
      alert("This keyboard shortcut is disabled.");
      return false;
    }
  }, true);

  // 🔒 Disable double-click selection only on text
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, pre, code").forEach(el => {
    el.style.userSelect = "none";
    el.addEventListener("dblclick", e => e.preventDefault(), true);
    el.addEventListener("touchstart", e => { if(e.touches.length===1) e.preventDefault(); }, {passive:false});
  });

  // 🔒 Absolute Image Protection
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.style.pointerEvents = "none"; // disable browser native actions
    img.style.userSelect = "none";

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "999999";
    overlay.style.cursor = "default";

    ["click","mousedown","mouseup","dblclick","contextmenu","dragstart"].forEach(evt => {
      overlay.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);
    });

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
  });

  // 🖨️ Block printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };

  // 🖐️ Ensure pinch zoom works
  document.documentElement.style.touchAction = "manipulation";

  // 🧱 DevTools detection
  setInterval(function(){
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160){
      document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>DevTools Detected — Access Denied</h1>";
    }
  }, 1000);

  // 🔒 Trap PrintScreen key
  document.addEventListener("keyup", function(e){
    if(e.key === "PrintScreen"){
      navigator.clipboard.writeText("");
      alert("Screenshots are blocked!");
    }
  });

});

// ============================================================
// >>> Reinforcement Layer (final hardening)
// ============================================================

// 🛡️ Stronger right/middle-click suppression
document.oncontextmenu = function(){ return false; };
window.addEventListener("contextmenu", function(e){
  e.preventDefault();
  e.stopPropagation();
  return false;
}, true);

// Block middle-click (auxclick)
window.addEventListener("auxclick", function(e){
  if (e.button === 1 || e.button === 2) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

// ✅ Allow left-click on interactive elements only
document.addEventListener("click", function(e){
  const tag = e.target.closest("a, button, input, textarea, select, label, summary, details");
  if (tag) return; // let it through
  if (e.target.closest("img, .img-wrapper, .img-overlay")) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

// 🧱 Periodic re-application of locks
setInterval(function(){
  document.oncontextmenu = function(){ return false; };
}, 1500);

// 🧯 Safety: don’t block scroll
window.addEventListener("wheel", function(){}, {passive:true});
