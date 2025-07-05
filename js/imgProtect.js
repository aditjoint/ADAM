// imgProtect.js
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    // Disable right-click on images
    img.oncontextmenu = () => false;

    // Disable drag
    img.setAttribute("draggable", "false");

    // Prevent selection
    img.style.userSelect = "none";
    img.style.webkitUserSelect = "none";
    img.style.msUserSelect = "none";
    img.style.pointerEvents = "none"; // If image is not clickable
  });
});

