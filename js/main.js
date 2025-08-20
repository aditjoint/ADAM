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

  document.getElementById('zoom-in').addEventListener('click', () => zoomPage(1.1));
  document.getElementById('zoom-out').addEventListener('click', () => zoomPage(0.9));

  // Hide zoom buttons on desktop
  if (window.innerWidth >= 768) zoomControls.style.display = 'none';
}

/* -------------------------------
  Other functions (mobile menu, tabs, scroll animation, etc.)
--------------------------------*/
function initMobileMenu() { /* existing code */ }
function initTabs() { /* existing code */ }
function initScrollAnimation() { /* existing code */ }
function initServiceCardEffects() { /* existing code */ }

