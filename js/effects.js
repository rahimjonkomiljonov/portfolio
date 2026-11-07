/* Visual effects: scroll progress, reveal, cursor glow, reactive network hero,
   name scramble, role typing, counters, 3D tilt, magnetic buttons, mobile menu.
   Everything degrades gracefully and respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Scroll progress + nav state ---------- */
  var bar = $('#progress');
  var header = $('.site-header');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    if (header) header.classList.toggle('is-scrolled', h.scrollTop > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  var links = $$('.nav-links a[href^="#"]');
  var sections = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menu-toggle');
  var navLinks = $('#nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('is-open', !open);
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target, wait = parseInt(el.dataset.delay || '0', 10);
          el.classList.add('in');
          revObs.unobserve(el);
          // Clear the stagger delay once the reveal is done; otherwise it keeps
          // delaying later transitions (like the hover tilt) on delayed cards.
          setTimeout(function () { el.style.transitionDelay = ''; }, wait + 1000);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
      revObs.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Cursor glow ---------- */
  var glow = $('#cursor-glow');
  if (glow && fine && !reduced) {
    var gx = 0, gy = 0, tx = 0, ty = 0, glowOn = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!glowOn) { glowOn = true; glow.classList.add('on'); requestAnimationFrame(loop); }
    }, { passive: true });
    var loop = function () {
      gx += (tx - gx) * 0.14; gy += (ty - gy) * 0.14;
      glow.style.transform = 'translate3d(' + (gx - 200) + 'px,' + (gy - 200) + 'px,0)';
      requestAnimationFrame(loop);
    };
  }

  /* ---------- Name scramble ---------- */
  var scr = $('[data-scramble]');
  var CH = '!<>-_\\/[]{}=+*^?#01';
  function scramble(el, text, dur) {
    if (reduced) { el.textContent = text; return; }
    var start = performance.now();
    (function frame(now) {
      var p = Math.min(1, (now - start) / dur);
      var out = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === ' ') { out += ' '; continue; }
        out += (i / text.length < p) ? ch : CH[Math.floor(Math.random() * CH.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame); else el.textContent = text;
    })(start);
  }
  if (scr) {
    var full = scr.textContent;
    scramble(scr, full, 1100);
    scr.closest('h1').addEventListener('pointerenter', function () { scramble(scr, full, 700); });
  }

  /* ---------- Kicker + rotating role (typing) ---------- */
  var roleEl = $('#role');
  var roles = ['Computer Engineering student', 'Python developer', 'AI & computer vision builder', 'Cybersecurity enthusiast', 'Full-stack tinkerer'];
  if (roleEl && !reduced) {
    var ri = 0, ci = roles[0].length, del = true;
    var tick = function () {
      var word = roles[ri];
      if (del) { ci--; } else { ci++; }
      roleEl.textContent = word.slice(0, Math.max(0, ci));
      var wait = del ? 35 : 70;
      if (!del && ci >= word.length) { del = true; wait = 1700; }
      else if (del && ci <= 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 2200); // rest on the first role before cycling
  }

  /* ---------- Counters ---------- */
  var counters = $$('[data-count]');
  function runCounter(el) {
    var to = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = to + suffix; return; }
    var t0 = performance.now(), dur = 1300;
    (function f(now) {
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 3D tilt + glare ---------- */
  if (fine && !reduced) {
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * 12).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 12).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    /* ---------- Magnetic buttons ---------- */
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    /* ---------- Hero parallax chips ---------- */
    var chips = $$('[data-depth]');
    window.addEventListener('pointermove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      chips.forEach(function (c) {
        var d = parseFloat(c.dataset.depth) || 20;
        c.style.translate = (nx * d).toFixed(1) + 'px ' + (ny * d).toFixed(1) + 'px';
      });
    }, { passive: true });
  }

  /* ---------- Reactive network canvas ---------- */
  var cv = $('#net');
  if (cv && !reduced) {
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], mouse = { x: -999, y: -999 }, running = false, color = '94,234,212';

    var readColor = function () {
      var c = getComputedStyle(document.documentElement).getPropertyValue('--net').trim();
      if (c) color = c;
    };
    var resize = function () {
      var r = cv.parentElement.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(24, Math.min(80, Math.round(W * H / 16000)));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
      }
    };
    var draw = function () {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 140 && md > 0) { p.x += mdx / md * 0.9; p.y += mdy / md * 0.9; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283);
        ctx.fillStyle = 'rgba(' + color + ',.8)'; ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.strokeStyle = 'rgba(' + color + ',' + (0.35 * (1 - d / 12000)).toFixed(3) + ')';
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        if (md < 170) {
          ctx.strokeStyle = 'rgba(' + color + ',' + (0.6 * (1 - md / 170)).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };
    var start = function () { if (!running) { running = true; requestAnimationFrame(draw); } };
    var stop = function () { running = false; };

    readColor(); resize();
    window.addEventListener('resize', resize);
    document.addEventListener('themechange', readColor);
    cv.parentElement.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    cv.parentElement.addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }).observe(cv.parentElement);
    } else { start(); }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  }
})();
