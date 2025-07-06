document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('copy', function (e) {
    e.preventDefault(); // Block copying
  });
});
