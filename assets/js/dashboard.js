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
    if (name === 'skills') measureSkillCards();
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

  /* ---------- Clock ---------- */
  function initClock() {
    var el = document.getElementById('topbar-clock');
    if (!el) return;
    function tick() {
      var now = new Date();
      var opts = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' };
      el.textContent = 'Davao City, PH · ' + now.toLocaleTimeString('en-US', opts) + ' (GMT+8)';
    }
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    var mount = document.getElementById('skills-mount');
    if (!mount) return;
    mount.innerHTML = DATA.skills.map(function (cat) {
      return (
        '<div class="card skill-card">' +
          '<div class="skill-card-head"><i class="fa ' + cat.icon + '" aria-hidden="true"></i><h3>' + cat.category + '</h3></div>' +
          '<div class="skill-tags-wrap"><div class="tag-row skill-tags">' +
            cat.items.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join('') +
          '</div></div>' +
          '<button type="button" class="skill-toggle is-inactive">' +
            '<span class="skill-toggle-label">Show all (' + cat.items.length + ')</span>' +
            '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  /* Measures overflow to decide which skill cards need the toggle.
     Runs lazily once the Skills view is actually visible, since a
     display:none ancestor reports 0 for scrollHeight/clientHeight.
     Safe to call repeatedly (e.g. on resize) — the click listener is
     only ever attached once per card, tracked via data-bound. */
  function measureSkillCards() {
    var mount = document.getElementById('skills-mount');
    if (!mount) return;
    mount.querySelectorAll('.skill-card').forEach(function (card) {
      var wrap = card.querySelector('.skill-tags-wrap');
      if (!wrap.clientHeight) return;

      var tags = card.querySelector('.skill-tags');
      var toggle = card.querySelector('.skill-toggle');
      var label = toggle.querySelector('.skill-toggle-label');
      var total = card.querySelectorAll('.skill-tags .tag').length;
      var overflows = tags.scrollHeight > wrap.clientHeight + 2;

      toggle.classList.toggle('is-inactive', !overflows);
      if (!overflows) {
        card.classList.remove('is-open');
        label.textContent = 'Show all (' + total + ')';
      }

      if (!toggle.dataset.bound) {
        toggle.dataset.bound = '1';
        toggle.addEventListener('click', function () {
          var isOpen = card.classList.toggle('is-open');
          label.textContent = isOpen ? 'Show less' : 'Show all (' + total + ')';
        });
      }
    });
  }

  var resizeTimer;
  function initSkillsResizeCheck() {
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var view = document.querySelector('.view[data-view="skills"]');
        if (view && view.classList.contains('is-active')) measureSkillCards();
      }, 200);
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

  /* ---------- Core stack (Skills) ---------- */
  function renderCoreStack() {
    var mount = document.getElementById('core-stack-mount');
    if (!mount) return;
    mount.innerHTML = DATA.coreStack.map(function (s) {
      return '<span class="tag core-tag">' + s + '</span>';
    }).join('');
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
    if (workMount) {
      workMount.innerHTML = DATA.experience.map(function (job, i) {
        return (
          '<div class="card timeline-card" data-idx="' + i + '">' +
            '<div class="timeline-card-head">' +
              '<div class="timeline-card-head-main">' +
                '<h4>' + job.role + '</h4>' +
                '<span class="org">' + job.org + '</span>' +
                '<span class="period">' + job.period + '</span>' +
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

      workMount.querySelectorAll('.timeline-card').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('is-open'); });
      });
    }
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

  /* ---------- Selected work galleries ---------- */
  var EXCLUDED_GALLERIES = ['WordPress Projects'];
  var THUMB_LIMIT = 4;

  function renderPortfolioGalleries() {
    var mount = document.getElementById('portfolio-galleries');
    if (!mount) return;
    var data = GALLERIES.filter(function (cat) { return EXCLUDED_GALLERIES.indexOf(cat.title) === -1; });

    mount.innerHTML = data.map(function (cat, catIndex) {
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
        '<article class="card gallery-card">' +
          '<div class="gallery-card-head">' +
            '<div><h3>' + cat.title + '</h3><p>' + cat.stack + '</p></div>' +
            '<span class="tag">' + cat.images.length + ' shots</span>' +
          '</div>' +
          '<p class="gallery-card-desc">' + cat.desc + '</p>' +
          '<div class="gallery-thumbs">' + thumbs + '</div>' +
        '</article>'
      );
    }).join('');

    mount.querySelectorAll('.gallery-thumbs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var catIndex = parseInt(btn.getAttribute('data-cat'), 10);
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        openLightbox(data[catIndex].images, idx);
      });
    });
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
    initClock();
    renderSkills();
    renderCoreStack();
    renderServices();
    renderWhatIBuild();
    renderExperience();
    renderProjectFilters();
    renderProjectGrid();
    renderOverviewProjects();
    renderPortfolioGalleries();
    initLightbox();
    initModal();
    initContactForm();
    initRouting();
    initKeyboardNav();
    initSkillsResizeCheck();
  });
})();
