document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const day = today.getDate(); // 1–31
  document.body.classList.add(`day${day}`);
});
