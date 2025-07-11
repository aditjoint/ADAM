document.addEventListener("DOMContentLoaded", function () {
  // ❌ Disable Right-Click
  document.addEventListener("contextmenu", e => e.preventDefault());

  // ❌ Disable Selection Except for Editable Elements
  document.addEventListener("selectstart", function (e) {
    if (!e.target.closest("input, textarea, select, a, button")) {
      e.preventDefault();
    }
  });

  // ❌ Disable Drag
  document.addEventListener("dragstart", e => e.preventDefault());

  // ✅ Enhanced: Secure Images from Drag, Save, Mouse Hold
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.setAttribute("loading", "lazy"); // performance
    img.addEventListener("mousedown", e => e.preventDefault());
    img.classList.add("protected-img");
  });

  // ❌ Block Key Combinations
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    const keyCode = e.keyCode || e.which;

    // Block F12
    if (keyCode === 123 || e.key === 'F12') {
      e.preventDefault();
      alert("F12 is disabled.");
      return false;
    }

    // Block single key presses: C, I, U, J (without modifiers)
    if (['c', 'i', 'u', 'j'].includes(key)) {
      e.preventDefault();
      alert(`Key ${key.toUpperCase()} is disabled.`);
      return false;
    }

    // Block Ctrl or Meta + [C, I, U, J, A, X, V, P, S]
    if ((e.ctrlKey || e.metaKey) && ['c', 'i', 'u', 'j', 'a', 'x', 'v', 'p', 's'].includes(key)) {
      e.preventDefault();
      alert(`Shortcut Ctrl+${key.toUpperCase()} is disabled.`);
      return false;
    }

    // Block Ctrl+Shift + [C, I, J, K]
    if (e.ctrlKey && e.shiftKey && ['c', 'i', 'j', 'k'].includes(key)) {
      e.preventDefault();
      alert(`Shortcut Ctrl+Shift+${key.toUpperCase()} is disabled.`);
      return false;
    }
  });

  // ❌ Disable Copy Event
  document.addEventListener("copy", function (e) {
    e.preventDefault();
    alert("Copying content is disabled.");
  });

  // 🛑 Prevent Printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };
});
