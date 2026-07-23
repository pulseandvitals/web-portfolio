(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-mobile-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      panel.classList.toggle('is-open');
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        panel.classList.remove('is-open');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Portfolio galleries + lightbox ---------- */
  function initPortfolio() {
    var mount = document.getElementById('portfolio-galleries');
    if (!mount || !window.PORTFOLIO_DATA) return;

    var data = window.PORTFOLIO_DATA;
    var THUMB_LIMIT = 4;

    var html = data.map(function (cat, catIndex) {
      var thumbs = cat.images.slice(0, THUMB_LIMIT).map(function (src, i) {
        var isLast = i === THUMB_LIMIT - 1 && cat.images.length > THUMB_LIMIT;
        var remaining = cat.images.length - THUMB_LIMIT;
        return (
          '<button type="button" data-cat="' + catIndex + '" data-idx="' + i + '" aria-label="Open image ' + (i + 1) + '">' +
            '<img src="' + src + '" alt="' + cat.title + ' screenshot ' + (i + 1) + '" loading="lazy">' +
            (isLast ? '<span class="thumb-more">+' + remaining + '</span>' : '') +
          '</button>'
        );
      }).join('');

      return (
        '<article class="gallery-card reveal">' +
          '<div class="gallery-card-head">' +
            '<div>' +
              '<h3>' + cat.title + '</h3>' +
              '<p>' + cat.stack + '</p>' +
            '</div>' +
            '<span class="tag">' + cat.images.length + ' shots</span>' +
          '</div>' +
          '<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">' + cat.desc + '</p>' +
          '<div class="gallery-thumbs">' + thumbs + '</div>' +
        '</article>'
      );
    }).join('');

    mount.innerHTML = html;

    mount.querySelectorAll('.gallery-thumbs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var catIndex = parseInt(btn.getAttribute('data-cat'), 10);
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        openLightbox(data[catIndex].images, idx);
      });
    });
  }

  /* ---------- Lightbox controller ---------- */
  var lightboxState = { images: [], index: 0 };

  function openLightbox(images, index) {
    lightboxState.images = images;
    lightboxState.index = index;
    renderLightbox();
    document.getElementById('lightbox').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function stepLightbox(delta) {
    var len = lightboxState.images.length;
    lightboxState.index = (lightboxState.index + delta + len) % len;
    renderLightbox();
  }

  function renderLightbox() {
    var img = document.getElementById('lightbox-img');
    var counter = document.getElementById('lightbox-counter');
    img.src = lightboxState.images[lightboxState.index];
    counter.textContent = (lightboxState.index + 1) + ' / ' + lightboxState.images.length;
  }

  function initLightboxControls() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { stepLightbox(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileNav();
    initPortfolio();
    initLightboxControls();
    initReveal();
  });
})();
