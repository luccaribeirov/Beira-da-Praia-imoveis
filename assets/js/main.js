/* ==========================================================================
   BEIRA DA PRAIA INCORPORADORA — main.js
   Navegação, header dinâmico, revelação ao rolar, galeria com lightbox,
   player de vídeo institucional.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Header: transparente -> sólido ao rolar ---------- */
  var header = document.querySelector('.site-header');
  if (header && !header.classList.contains('static-solid')) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add('solid');
      } else {
        header.classList.remove('solid');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    var closeMenu = function () {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Revelação suave ao rolar (.reveal / .horizon) ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .horizon');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Vídeo institucional: poster + play sob demanda ---------- */
  document.querySelectorAll('.video-block').forEach(function (block) {
    var btn = block.querySelector('.video-play');
    var video = block.querySelector('video');
    if (!btn || !video) return;
    btn.addEventListener('click', function () {
      block.classList.add('playing');
      video.play();
    });
    video.addEventListener('pause', function () {
      if (video.currentTime > 0 && !video.ended) return;
      block.classList.remove('playing');
    });
    video.addEventListener('ended', function () {
      block.classList.remove('playing');
      video.currentTime = 0;
    });
  });

  /* ---------- Galeria com lightbox ---------- */
  var galleryButtons = Array.prototype.slice.call(document.querySelectorAll('.gallery [data-full]'));
  var lightbox = document.querySelector('.lightbox');
  if (galleryButtons.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCounter = lightbox.querySelector('.lightbox-counter');
    var current = 0;

    var show = function (index) {
      current = (index + galleryButtons.length) % galleryButtons.length;
      var btn = galleryButtons[current];
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = btn.getAttribute('data-alt') || '';
      if (lbCounter) lbCounter.textContent = (current + 1) + ' / ' + galleryButtons.length;
    };

    var open = function (index) {
      show(index);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    galleryButtons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { open(i); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Aviso promocional flutuante (toast) ---------- */
  var promoToast = document.getElementById('promoToast');
  if (promoToast) {
    var promoCloseBtn = document.getElementById('promoToastClose');
    var PROMO_KEY = 'bp_promo_almare_dismissed';
    var alreadyDismissed = false;
    try { alreadyDismissed = sessionStorage.getItem(PROMO_KEY) === '1'; } catch (e) {}

    if (!alreadyDismissed) {
      var promoAutoHide;
      var promoShowTimer = setTimeout(function () {
        promoToast.classList.add('show');
      }, 2500);

      var dismissPromo = function () {
        promoToast.classList.remove('show');
        clearTimeout(promoShowTimer);
        clearTimeout(promoAutoHide);
        try { sessionStorage.setItem(PROMO_KEY, '1'); } catch (e) {}
      };

      promoToast.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'transform' && promoToast.classList.contains('show')) {
          promoAutoHide = setTimeout(dismissPromo, 15000);
        }
      });

      if (promoCloseBtn) {
        promoCloseBtn.addEventListener('click', dismissPromo);
      }
    }
  }

  /* ---------- Ano corrente no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
