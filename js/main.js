/**
 * ADIT Joint - Main JavaScript
 * Author: ADIT Joint
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the mobile menu
  initMobileMenu();

  // Initialize tabs
  initTabs();

  // Initialize scroll animations
  initScrollAnimation();

  // Initialize service card effects
  initServiceCardEffects();

  // Push content down by header height
  const header = document.querySelector("header");
  if (header) {
    document.body.style.paddingTop = `${header.offsetHeight}px`;
  }
});

/**
 * Initialize mobile zoom after footer is loaded
 */
function initMobileZoom() {
  const zoomControls = document.getElementById('mobile-zoom-controls');
  if (!zoomControls) return;

  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  let currentScale = 1;

  function zoomPage(factor) {
    currentScale *= factor;
    currentScale = Math.min(Math.max(currentScale, 1), 5); // limit 1x - 5x
    pageContent.style.transformOrigin = "0 0";
    pageContent.style.transform = `scale(${currentScale})`;
  }

  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => zoomPage(1.1));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomPage(0.9));

  // Hide zoom buttons on desktop
  if (window.innerWidth >= 768) {
    zoomControls.style.display = 'none';
  }
}

/* -------------------------------
  Placeholder functions for site logic
--------------------------------*/
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector("nav ul");
  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }
}

function initTabs() {
  const tabs = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll("[data-tab-content]");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      contents.forEach(c => c.classList.remove("active"));
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = document.querySelector(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}

function initScrollAnimation() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  elements.forEach(el => observer.observe(el));
}

function initServiceCardEffects() {
  const cards = document.querySelectorAll(".service-cards .card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });
  });
}

<script>
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach(b => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Hide all tab panes
      tabPanes.forEach(pane => pane.classList.remove("active"));
      // Show the selected tab pane
      const target = document.getElementById(this.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
});
</script>

