/**
 * ADIT Joint - Main JavaScript
 * Author: ADIT Joint
 * Version: 1.1
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the mobile menu
  initMobileMenu();

  // Initialize tabs (supports both systems)
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

  // Initialize mobile zoom after DOM loaded
  initMobileZoom();
});

/* -------------------------------
  Mobile Zoom
--------------------------------*/
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
  Mobile Menu
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

/* -------------------------------
  Tabs (Supports both systems)
--------------------------------*/
function initTabs() {
  // System 1: data-tab / data-tab-content
  const tabs1 = document.querySelectorAll("[data-tab]");
  const contents1 = document.querySelectorAll("[data-tab-content]");

  tabs1.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs1.forEach(t => t.classList.remove("active"));
      contents1.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const target = document.querySelector(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  // System 2: .tab-btn / .tab-pane
  const tabs2 = document.querySelectorAll(".tab-btn");
  const panes2 = document.querySelectorAll(".tab-pane");

  tabs2.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs2.forEach(b => b.classList.remove("active"));
      panes2.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}

/* -------------------------------
  Scroll Animations
--------------------------------*/
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

/* -------------------------------
  Service Card Hover Effects
--------------------------------*/
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


