/* =========================================
   万摩星设计 — 主脚本
   ========================================= */

(function () {
  'use strict';

  /* ---- Preloader ---- */
  window.addEventListener('load', function () {
    var preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('hidden');
        setTimeout(function () { preloader.style.display = 'none'; }, 600);
      }, 1200);
    }
  });

  /* ---- Navigation ---- */
  (function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    // Scroll behavior
    function onScroll() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link
    var links = document.querySelectorAll('.nav-links a');
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Hamburger
    var hamburger = document.querySelector('.nav-hamburger');
    var overlay = document.querySelector('.nav-mobile-overlay');
    if (hamburger && overlay) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
      });
      overlay.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          hamburger.classList.remove('active');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  })();

  /* ---- Scroll Animations (Intersection Observer) ---- */
  (function () {
    var elements = document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .slide-left, .scale-in');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  })();

  /* ---- Smooth Scroll ---- */
  (function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  })();

  /* ---- Portfolio Filter ---- */
  (function () {
    var filterBtns = document.querySelectorAll('.portfolio-filter button');
    var cards = document.querySelectorAll('.portfolio-card[data-category]');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var category = this.dataset.filter;

        cards.forEach(function (card) {
          var cardCat = card.dataset.category;
          if (category === 'all' || cardCat === category) {
            card.style.display = '';
            setTimeout(function () { card.style.opacity = '1'; card.style.transform = ''; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(function () { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  })();

  /* ---- Counter Animation ---- */
  (function () {
    var counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 2000;
        var start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var value = Math.floor(easeOutQuart(progress) * target);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  })();

  /* ---- Lazy Loading Images ---- */
  (function () {
    var images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.addEventListener('load', function () { img.classList.add('loaded'); });
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(function (img) { observer.observe(img); });
  })();

  /* ---- Horizontal Scroll Drag ---- */
  (function () {
    var containers = document.querySelectorAll('.horizontal-scroll-wrapper');
    containers.forEach(function (container) {
      var isDown = false, startX = 0, scrollLeft = 0;

      container.addEventListener('mousedown', function (e) {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
      });
      container.addEventListener('mouseleave', function () { isDown = false; container.style.cursor = 'grab'; });
      container.addEventListener('mouseup', function () { isDown = false; container.style.cursor = 'grab'; });
      container.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - container.offsetLeft;
        container.scrollLeft = scrollLeft - (x - startX) * 1.5;
      });
    });
  })();

  /* ---- Custom Cursor (desktop only) ---- */
  (function () {
    if (window.matchMedia('(hover: none)').matches) return;
    var cursor = document.createElement('div');
    cursor.style.cssText = 'position:fixed;width:8px;height:8px;background:#C8A862;border-radius:50%;pointer-events:none;z-index:9999;transition:transform 0.15s,opacity 0.15s,background 0.15s;transform:translate(-50%,-50%);mix-blend-mode:normal;';
    document.body.appendChild(cursor);

    var following = document.createElement('div');
    following.style.cssText = 'position:fixed;width:32px;height:32px;border:1px solid rgba(200,168,98,0.3);border-radius:50%;pointer-events:none;z-index:9998;transition:transform 0.3s,opacity 0.3s;transform:translate(-50%,-50%);';
    document.body.appendChild(following);

    var mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animate() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      following.style.left = cx + 'px';
      following.style.top = cy + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    var interactives = 'a, button, .portfolio-card, .service-card, .team-card, .insight-card, input, textarea, select';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactives)) {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursor.style.background = 'rgba(200,168,98,0.5)';
        following.style.transform = 'translate(-50%,-50%) scale(1.5)';
        following.style.opacity = '0.5';
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactives)) {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursor.style.background = '#C8A862';
        following.style.transform = 'translate(-50%,-50%) scale(1)';
        following.style.opacity = '1';
      }
    });
  })();

  /* ---- Contact Form ---- */
  (function () {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var valid = true;

      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ff4444';
          valid = false;
        }
        if (field.type === 'email' && field.value) {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(field.value)) {
            field.style.borderColor = '#ff4444';
            valid = false;
          }
        }
      });

      if (!valid) return;

      var success = form.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
      }
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () { field.style.borderColor = ''; });
    });
  })();

  /* ---- Current Year ---- */
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Parallax ---- */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var parallaxSlow = document.querySelectorAll('.parallax-slow');
    var parallaxFast = document.querySelectorAll('.parallax-fast');
    if (!parallaxSlow.length && !parallaxFast.length) return;

    function onScroll() {
      var sy = window.scrollY;
      parallaxSlow.forEach(function (el) {
        el.style.transform = 'translateY(' + (sy * 0.2) + 'px)';
      });
      parallaxFast.forEach(function (el) {
        el.style.transform = 'translateY(' + (sy * 0.4) + 'px)';
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---- Page Header scroll effect ---- */
  (function () {
    var header = document.querySelector('.page-header');
    if (!header) return;
    var inner = header.querySelector('.page-header-content');
    if (!inner) return;

    function onScroll() {
      var progress = Math.min(window.scrollY / 300, 1);
      inner.style.transform = 'translateY(' + (progress * 20) + 'px)';
      inner.style.opacity = 1 - progress * 0.5;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

})();
