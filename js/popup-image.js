document.addEventListener("DOMContentLoaded", () => {
  const initImagePopup = () => {
    const links = document.querySelectorAll(".popup-image");

    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const modal = document.createElement("div");
        modal.classList.add("img-modal");

        modal.innerHTML = `
          <div class="img-modal-content">
            <img src="${this.href}" alt="Preview">
          </div>
        `;

        modal.addEventListener("click", () => modal.remove());
        document.body.appendChild(modal);
      });
    });
  };

  // dynamic load safety
  setTimeout(initImagePopup, 600);
});
