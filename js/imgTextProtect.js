/* ============================================================
   >>> FINAL PATCH: block single-click open on images in all browsers
   (Appended only. Nothing above was removed or changed.)
   ============================================================ */

// 1) Make sure the overlay definitely receives pointer events everywhere
//    and slightly non-transparent so Safari/Firefox treat it as hit-testable.
(function hardenOverlayHitTesting(){
  try {
    const style = document.createElement('style');
    style.setAttribute('data-img-protect-style', 'true');
    style.textContent = `
      .img-overlay{
        pointer-events: auto !important;
        background: rgba(0,0,0,0.001) !important; /* tiny alpha so some engines hit-test it */
        -webkit-touch-callout: none !important;
      }
      .img-wrapper, .img-wrapper *{
        -webkit-user-select: none !important;
        user-select: none !important;
      }
      img{
        -webkit-touch-callout: none !important;
      }
    `;
    document.head.appendChild(style);
  } catch(_){}
})();

// 2) Absolute block: any left-click that originates on a protected image
//    (img / .img-wrapper / .img-overlay) will NOT navigate, even if inside <a>.
(function blockImageClicksEverywhere(){
  function isOnProtectedImage(target){
    return !!(target && target.closest && target.closest('img, .img-wrapper, .img-overlay'));
  }

  // Capture-phase cancel for click, mousedown, mouseup
  ['click','mousedown','mouseup'].forEach(evt=>{
    document.addEventListener(evt, function(e){
      if (e.button !== 0) return; // only left click
      if (isOnProtectedImage(e.target)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    }, true);
  });

  // Extra: if an <img> is wrapped by <a>, stop navigation before it happens
  document.addEventListener('click', function(e){
    const onImg = isOnProtectedImage(e.target);
    const link = e.target.closest && e.target.closest('a[href]');
    if (onImg && link) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  // Also block middle-click (open in new tab) & auxiliary clicks on protected images
  document.addEventListener('auxclick', function(e){
    if (isOnProtectedImage(e.target)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);
})();

// 3) Strengthen pointer routing: ensure the <img> itself never receives the click,
//    so the overlay (with our handlers) always wins—even in odd stacking contexts.
(function routeEventsToOverlay(){
  try {
    document.querySelectorAll('img').forEach(img=>{
      // Do not change layout; just make img ignore pointer so overlay catches it.
      img.style.pointerEvents = 'none';
    });
  } catch(_){}
})();

// 4) Keep browsing smooth (scroll & left-click on non-image UI still works)
//    No-op listeners to signal we *don’t* block wheel/scroll.
window.addEventListener('wheel', function(){}, {passive:true});

// 5) Mobile pinch-zoom support over images (allow 2+ fingers, block 1-finger)
//    Works even if earlier handlers tried to stop touch events.
(function allowPinchOverImages(){
  // Keep your existing behavior everywhere else; only special-case images.
  function onImage(target){ return target && target.closest && target.closest('img, .img-wrapper, .img-overlay'); }

  document.addEventListener('touchstart', function(e){
    if (!onImage(e.target)) return;
    if (e.touches && e.touches.length >= 2) {
      // allow pinch: do not preventDefault; stop others from cancelling it
      e.stopImmediatePropagation();
    } else {
      // block single-finger tap/long-press on images
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);

  ['touchmove','touchend','touchcancel'].forEach(evt=>{
    document.addEventListener(evt, function(e){
      if (!onImage(e.target)) return;
      if (e.touches && e.touches.length >= 2) {
        e.stopImmediatePropagation(); // let pinch proceed
      } else {
        e.preventDefault(); // block single-finger drag/hold
        e.stopImmediatePropagation();
      }
    }, true);
  });

  // Ensure the page allows pinch gestures overall (doesn't change your earlier line)
  try { document.documentElement.style.touchAction = 'manipulation'; } catch(_){}
})();
