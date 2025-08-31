document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const day = today.getDate();
  const imageFolder = "/images/daily-backgrounds/";
  const imageName = `bg${day}.jpg`;

  document.body.classList.add(`day${day}`); // adds CSS class instead of inline
  document.body.style.backgroundImage = `url('${imageFolder}${imageName}')`;
});
