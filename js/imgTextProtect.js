document.addEventListener('DOMContentLoaded', function () {
  // Target only elements with class "protect-text"
  const protectedAreas = document.querySelectorAll('.protect-text');

  protectedAreas.forEach(function (area) {
    // Disable right-click context menu
    area.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    // Disable drag (mainly for images)
    area.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  });
});
