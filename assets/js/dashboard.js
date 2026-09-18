(function () {
  'use strict';

  var DATA = window.DASHBOARD_DATA;
  var GALLERIES = window.PORTFOLIO_DATA || [];
  var THEME_KEY = 'portfolio-theme';
  var root = document.documentElement;

  var SECTION_META = {
    overview: { kicker: 'Dashboard', title: 'Overview' },
    about: { kicker: 'Profile', title: 'About' },
    skills: { kicker: 'Stack', title: 'Skills' },
    projects: { kicker: 'Portfolio', title: 'Projects' },
    work: { kicker: 'Selected Work', title: 'Work' },
    experience: { kicker: 'Background', title: 'Experience' },
    services: { kicker: 'Offering', title: 'Services' },
    contact: { kicker: 'Reach out', title: 'Contact' }
  };

  /* ---------- Theme ---------- */
  function initTheme() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      });
    });
  }

  /* ---------- Routing ---------- */
  function getSectionFromHash() {
    var hash = (location.hash || '').replace('#', '');
    return SECTION_META[hash] ? hash : 'overview';
  }

  function goToSection(name) {
    if (!SECTION_META[name]) name = 'overview';
    location.hash = name;
  }

  function renderSection(name) {
    document.querySelectorAll('.view').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-view') === name);
    });
    document.querySelectorAll('.nav-item').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-nav') === name);
    });
    var meta = SECTION_META[name];
    var crumb = document.getElementById('breadcrumb');
    if (crumb) crumb.innerHTML = 'Dashboard <i class="fa fa-angle-right" aria-hidden="true"></i> <strong>' + meta.title + '</strong>';
    document.title = meta.title + ' — Robert Aeron Salcedo';
    closeDrawer();
    document.querySelector('.content').scrollTop = 0;
  }

  var SECTION_ORDER = ['overview', 'about', 'skills', 'projects', 'work', 'experience', 'services', 'contact'];

  function initRouting() {
    document.querySelectorAll('[data-nav], [data-goto]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var target = el.getAttribute('data-nav') || el.getAttribute('data-goto');
        if (!target) return;
        e.preventDefault();
        goToSection(target);
      });
    });
    window.addEventListener('hashchange', function () { renderSection(getSectionFromHash()); });
    renderSection(getSectionFromHash());
  }

  /* ---------- Keyboard shortcuts (1-7 jump sections) ---------- */
  function initKeyboardNav() {
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      var idx = Number(e.key) - 1;
      if (idx >= 0 && idx < SECTION_ORDER.length) goToSection(SECTION_ORDER[idx]);
    });
  }

  /* ---------- Mobile drawer ---------- */
  function openDrawer() {
    document.getElementById('sidebar').classList.add('is-open');
    document.getElementById('drawer-backdrop').classList.add('is-open');
  }
  function closeDrawer() {
    document.getElementById('sidebar').classList.remove('is-open');
    document.getElementById('drawer-backdrop').classList.remove('is-open');
  }
  function initDrawer() {
    var toggle = document.getElementById('drawer-toggle');
    var backdrop = document.getElementById('drawer-backdrop');
    if (toggle) toggle.addEventListener('click', openDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }

  /* ---------- Skills ---------- */
  /* One panel open at a time; the first starts open. Height animates via
     CSS grid rows (0fr -> 1fr), so no JS measuring is needed. */
  function renderSkills() {
    var mount = document.getElementById('skills-mount');
    if (!mount) return;
    mount.innerHTML = DATA.skills.map(function (cat, i) {
      var open = i === 0;
      return (
        '<div class="acc-item' + (open ? ' is-open' : '') + '">' +
          '<button type="button" class="acc-head" id="acc-head-' + i + '" aria-expanded="' + open + '" aria-controls="acc-body-' + i + '">' +
            '<span class="acc-icon"><i class="fa ' + cat.icon + '" aria-hidden="true"></i></span>' +
            '<span class="acc-title">' + cat.category + '</span>' +
            '<span class="acc-count">' + cat.items.length + '</span>' +
            '<i class="fa fa-chevron-down acc-chevron" aria-hidden="true"></i>' +
          '</button>' +
          '<div class="acc-body" id="acc-body-' + i + '" role="region" aria-labelledby="acc-head-' + i + '">' +
            '<div class="acc-body-inner"><div class="tag-row">' +
              cat.items.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join('') +
            '</div></div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    mount.querySelectorAll('.acc-item').forEach(function (item) {
      item.querySelector('.acc-head').addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        mount.querySelectorAll('.acc-item').forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          item.querySelector('.acc-head').setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Services ---------- */
  function renderServices() {
    var mount = document.getElementById('services-mount');
    if (!mount) return;
    mount.innerHTML = DATA.services.map(function (s) {
      return (
        '<div class="card service-card">' +
          '<i class="fa ' + s.icon + '" aria-hidden="true"></i>' +
          '<h3>' + s.title + '</h3>' +
          '<p>' + s.desc + '</p>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- What I Build (Overview) ---------- */
  function renderWhatIBuild() {
    var mount = document.getElementById('what-i-build-mount');
    if (!mount) return;
    mount.innerHTML = DATA.whatIBuild.map(function (s) {
      return (
        '<div class="card service-card">' +
          '<i class="fa ' + s.icon + '" aria-hidden="true"></i>' +
          '<h3>' + s.title + '</h3>' +
          '<p>' + s.desc + '</p>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- Hero skills (Overview) ---------- */
  function renderHeroSkills() {
    var mount = document.getElementById('hero-skills');
    if (!mount) return;
    mount.innerHTML = DATA.coreStack.map(function (s) {
      return '<span class="tag">' + s.name + '</span>';
    }).join('');
  }

  /* ---------- Core stack (Skills) ---------- */
  function renderCoreStack() {
    var mount = document.getElementById('core-stack-mount');
    if (!mount) return;
    function tile(s) {
      return (
        '<div class="core-tile' + (s.primary ? ' core-tile--primary' : '') + '">' +
          '<span class="core-tile-icon"><i class="fa ' + s.icon + '" aria-hidden="true"></i></span>' +
          '<div class="core-tile-text">' +
            '<div class="core-tile-name">' + s.name + '</div>' +
            '<div class="core-tile-role">' + s.role + '</div>' +
          '</div>' +
        '</div>'
      );
    }
    var primary = DATA.coreStack.filter(function (s) { return s.primary; });
    var rest = DATA.coreStack.filter(function (s) { return !s.primary; });
    mount.innerHTML =
      '<div class="core-primary">' + primary.map(tile).join('') + '</div>' +
      '<div class="core-rest">' + rest.map(tile).join('') + '</div>';
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    var eduMount = document.getElementById('education-mount');
    var workMount = document.getElementById('experience-mount');
    if (eduMount) {
      eduMount.innerHTML = DATA.education.map(function (e) {
        return (
          '<div class="card edu-card">' +
            '<h4>' + e.school + '</h4>' +
            '<span class="org">' + e.org + '</span>' +
            '<span class="period">' + e.period + '</span>' +
            (e.detail ? '<p class="detail">' + e.detail + '</p>' : '') +
          '</div>'
        );
      }).join('');
    }
    renderTimeline(workMount, DATA.experience);
    renderTimeline(document.getElementById('support-mount'), DATA.support);
  }

  function renderTimeline(mount, list) {
    if (!mount || !list) return;
    mount.innerHTML = list.map(function (job) {
      var meta = [job.role, job.period].filter(Boolean).join(' · ');
      return (
        '<div class="card timeline-card">' +
          '<div class="timeline-card-head">' +
            '<div class="timeline-card-head-main">' +
              '<h4>' + job.org + '</h4>' +
              '<span class="org">' + meta + '</span>' +
            '</div>' +
            '<span class="timeline-toggle"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>' +
          '</div>' +
          '<div class="timeline-body">' +
            '<p>' + job.desc + '</p>' +
            '<div class="tag-row">' + job.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    mount.querySelectorAll('.timeline-card').forEach(function (card) {
      card.addEventListener('click', function () { card.classList.toggle('is-open'); });
    });
  }

  /* ---------- Projects ---------- */
  var activeFilter = 'All';

  function findGallery(key) {
    if (!key) return null;
    var cat = GALLERIES.filter(function (g) { return g.title === key; })[0];
    return cat || null;
  }

  function renderProjectFilters() {
    var mount = document.getElementById('project-filters');
    if (!mount) return;
    mount.innerHTML = DATA.projectTypes.map(function (t) {
      return '<button type="button" class="filter-chip' + (t === activeFilter ? ' is-active' : '') + '" data-filter="' + t + '">' + t + '</button>';
    }).join('');
    mount.querySelectorAll('.filter-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-filter');
        renderProjectFilters();
        renderProjectGrid();
      });
    });
  }

  function renderProjectGrid() {
    var mount = document.getElementById('project-grid');
    if (!mount) return;
    var list = activeFilter === 'All' ? DATA.projects : DATA.projects.filter(function (p) { return p.type === activeFilter; });

    if (!list.length) {
      mount.innerHTML = '<div class="project-empty">No projects in this category yet.</div>';
      return;
    }

    mount.innerHTML = list.map(function (p) {
      return (
        '<article class="card project-card" data-project="' + p.id + '">' +
          '<div class="project-type-label">' + p.type + '</div>' +
          '<div class="project-card-top"><h3>' + p.title + '</h3>' + (p.link ? '<i class="fa fa-external-link" aria-hidden="true"></i>' : '') + '</div>' +
          '<p class="project-desc">' + p.tagline + '</p>' +
          '<div class="tag-row">' + p.tech.slice(0, 3).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
        '</article>'
      );
    }).join('');

    mount.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('click', function () { openProjectModal(card.getAttribute('data-project')); });
    });
  }

  function renderOverviewProjects() {
    var mount = document.getElementById('overview-projects');
    if (!mount) return;
    var featured = DATA.projects.filter(function (p) { return p.link; }).slice(0, 5);
    mount.innerHTML = featured.map(function (p) {
      return (
        '<div class="mini-project-row">' +
          '<span>' + p.title + '</span>' +
          '<span class="mp-type">' + p.type + ' <i class="fa fa-external-link" aria-hidden="true"></i></span>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- Work showcase (slider per project) ---------- */
  var EXCLUDED_GALLERIES = ['WordPress Projects'];

  function workSlug(title) {
    return 'work-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function workCardHtml(cat) {
    var n = cat.images.length;
    var segs = cat.images.map(function (s, i) {
      return '<button type="button" class="work-seg" data-i="' + i + '" aria-label="Show screenshot ' + (i + 1) + '"></button>';
    }).join('');
    return (
      '<article class="card work-card" id="' + workSlug(cat.title) + '">' +
        '<div class="work-slider" tabindex="0" role="group" aria-roledescription="carousel" aria-label="' + cat.title + ' screenshots">' +
          '<div class="work-stage">' +
            '<img class="work-img is-loading" alt="' + cat.title + ' screenshot" draggable="false">' +
            '<button type="button" class="work-nav work-prev" aria-label="Previous screenshot"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>' +
            '<button type="button" class="work-nav work-next" aria-label="Next screenshot"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>' +
            '<button type="button" class="work-expand" aria-label="View full size"><i class="fa fa-expand" aria-hidden="true"></i></button>' +
            '<span class="work-counter" aria-live="polite">1 / ' + n + '</span>' +
          '</div>' +
          '<div class="work-progress">' + segs + '</div>' +
        '</div>' +
        '<div class="work-info">' +
          '<div class="work-info-main">' +
            '<div class="work-kind">' + cat.kind + '</div>' +
            '<h3>' + cat.title + '</h3>' +
            '<p class="work-stack">' + cat.stack + '</p>' +
            '<p class="work-desc">' + cat.desc + '</p>' +
          '</div>' +
          '<div class="work-info-side">' +
            '<ul class="work-points">' + cat.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul>' +
            '<div class="work-foot">' +
              '<span class="work-role">' + cat.role + ' · ' + n + ' screens</span>' +
              (cat.link ? '<a class="btn btn-ghost btn-sm" href="' + cat.link + '" target="_blank" rel="noopener">Visit live site <i class="fa fa-external-link" aria-hidden="true"></i></a>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initWorkSlider(card, cat) {
    var n = cat.images.length;
    var idx = 0;
    var token = 0;
    var started = false;
    var slider = card.querySelector('.work-slider');
    var img = card.querySelector('.work-img');
    var counter = card.querySelector('.work-counter');
    var segs = card.querySelectorAll('.work-seg');
    var stage = card.querySelector('.work-stage');

    function go(i) {
      idx = (i + n) % n;
      var mine = ++token;
      var src = cat.images[idx];
      img.classList.add('is-loading');
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        if (mine !== token) return;
        img.src = src;
        img.alt = cat.title + ' screenshot ' + (idx + 1) + ' of ' + n;
        img.classList.remove('is-loading');
        new Image().src = cat.images[(idx + 1) % n];
      };
      pre.src = src;
      counter.textContent = (idx + 1) + ' / ' + n;
      segs.forEach(function (s, k) {
        s.classList.toggle('is-active', k === idx);
        s.setAttribute('aria-current', k === idx ? 'true' : 'false');
      });
    }

    card.startSlider = function () { if (!started) { started = true; go(0); } };

    card.querySelector('.work-prev').addEventListener('click', function () { go(idx - 1); });
    card.querySelector('.work-next').addEventListener('click', function () { go(idx + 1); });
    segs.forEach(function (s) {
      s.addEventListener('click', function () { go(parseInt(s.getAttribute('data-i'), 10)); });
    });
    card.querySelector('.work-expand').addEventListener('click', function () { openLightbox(cat.images, idx); });

    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
    });

    /* swipe on touch/pen; a swipe must not also count as a click that opens the lightbox */
    var startX = null;
    var swiped = false;
    stage.addEventListener('pointerdown', function (e) { startX = e.clientX; swiped = false; });
    stage.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (e.pointerType !== 'mouse' && Math.abs(dx) > 40) {
        swiped = true;
        go(dx < 0 ? idx + 1 : idx - 1);
      }
    });
    img.addEventListener('click', function () {
      if (swiped) { swiped = false; return; }
      openLightbox(cat.images, idx);
    });
  }

  function renderWorkShowcase() {
    var mount = document.getElementById('work-list');
    if (!mount) return;
    var data = GALLERIES.filter(function (cat) { return EXCLUDED_GALLERIES.indexOf(cat.title) === -1; });

    var chips = document.getElementById('work-chips');
    if (chips) {
      chips.innerHTML = data.map(function (cat) {
        return '<button type="button" class="filter-chip" data-target="' + workSlug(cat.title) + '">' + cat.title + '</button>';
      }).join('');
      chips.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          var target = document.getElementById(chip.getAttribute('data-target'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    mount.innerHTML = data.map(workCardHtml).join('');
    var cards = mount.querySelectorAll('.work-card');
    cards.forEach(function (card, i) { initWorkSlider(card, data[i]); });

    /* load each slider's first image only when its card nears the viewport */
    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (card) { card.startSlider(); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.startSlider();
        observer.unobserve(entry.target);
      });
    }, { root: document.querySelector('.content'), rootMargin: '400px 0px' });
    cards.forEach(function (card) { observer.observe(card); });
  }

  /* ---------- Lightbox ---------- */
  var lightboxState = { images: [], index: 0 };

  function openLightbox(images, index) {
    lightboxState.images = images;
    lightboxState.index = index;
    renderLightboxImage();
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
    renderLightboxImage();
  }

  function renderLightboxImage() {
    document.getElementById('lightbox-img').src = lightboxState.images[lightboxState.index];
    document.getElementById('lightbox-counter').textContent = (lightboxState.index + 1) + ' / ' + lightboxState.images.length;
  }

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { stepLightbox(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  /* ---------- Project modal ---------- */
  function openProjectModal(id) {
    var p = DATA.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var overlay = document.getElementById('project-modal');
    var gallery = findGallery(p.gallery);

    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-type').textContent = p.type;
    document.getElementById('modal-role').textContent = p.role;
    document.getElementById('modal-problem').textContent = p.problem;
    document.getElementById('modal-challenge').textContent = p.challenge;
    document.getElementById('modal-solution').textContent = p.solution;
    document.getElementById('modal-features').innerHTML = p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
    document.getElementById('modal-tech').innerHTML = p.tech.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');

    var galleryMount = document.getElementById('modal-gallery-section');
    if (gallery && gallery.images.length) {
      galleryMount.style.display = '';
      document.getElementById('modal-gallery').innerHTML = gallery.images.slice(0, 6).map(function (src) {
        return '<img src="' + src + '" alt="' + p.title + ' screenshot" loading="lazy">';
      }).join('');
    } else {
      galleryMount.style.display = 'none';
    }

    var linkBtn = document.getElementById('modal-link');
    if (p.link) {
      linkBtn.style.display = '';
      linkBtn.setAttribute('href', p.link);
    } else {
      linkBtn.style.display = 'none';
    }

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initModal() {
    var overlay = document.getElementById('project-modal');
    document.getElementById('modal-close').addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeProjectModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeProjectModal();
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var scrollBtn = document.getElementById('scroll-to-form');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function () {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var nameField = form.querySelector('[name="name"]');
        if (nameField) setTimeout(function () { nameField.focus(); }, 300);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var subject = encodeURIComponent('Portfolio inquiry from ' + (name || 'a visitor'));
      var body = encodeURIComponent(message + (email ? '\n\n— ' + name + ' (' + email + ')' : '\n\n— ' + name));
      window.location.href = 'mailto:robertaeronsalcedo@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initDrawer();
    renderSkills();
    renderCoreStack();
    renderHeroSkills();
    renderServices();
    renderWhatIBuild();
    renderExperience();
    renderProjectFilters();
    renderProjectGrid();
    renderOverviewProjects();
    renderWorkShowcase();
    initLightbox();
    initModal();
    initContactForm();
    initRouting();
    initKeyboardNav();
  });
})();
