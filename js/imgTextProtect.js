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

  // ❌ Block image drag and click-hold
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("mousedown", e => e.preventDefault());
  });

  // ❌ Block Key Combinations
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    // Block Ctrl/Meta + [blocked keys]
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v', 'u', 'p', 's', 'a'].includes(key)) {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+Shift+I/J/K (Dev Tools)
    if (e.ctrlKey && e.shiftKey && ['i', 'j', 'k'].includes(key)) {
      e.preventDefault();
      return false;
    }

    // Block F12 (Dev Tools)
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+Shift+C (Inspect)
    if (e.ctrlKey && e.shiftKey && key === 'c') {
      e.preventDefault();
      return false;
    }
  });

  // ❌ Disable Copy Event
  document.addEventListener("copy", function (e) {
    e.preventDefault();
  });

// Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if ((e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key.toUpperCase())) || 
      (e.ctrlKey && e.key.toUpperCase() === 'U')) {
    e.preventDefault();
    alert("This shortcut is disabled");
    return false;
  }
  
  // 🛑 Prevent Printing
  window.onbeforeprint = function () {
    document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>⚠️ Printing is disabled on this site.</h1>";
    setTimeout(() => window.close(), 500);
  };
});
