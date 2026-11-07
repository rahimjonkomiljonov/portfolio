/* Dark mode toggle + project filter. Plain JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ }
  }

  var toggle = document.getElementById('theme-toggle');
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#12110f' : '#faf7f2');
    if (toggle) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.querySelector('.toggle-text').textContent = isDark ? 'Light' : 'Dark';
      toggle.querySelector('.toggle-icon').textContent = isDark ? '☀' : '☾';
    }
  }

  var saved = safeGet('theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      safeSet('theme', next);
    });
  }

  /* ---------- Project filter ---------- */
  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.project');
  var status = document.getElementById('filter-status');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      var shown = 0;

      buttons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      cards.forEach(function (card) {
        var cats = card.getAttribute('data-category').split(' ');
        var match = filter === 'all' || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown += 1;
      });

      if (status) status.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects');
    });
  });
})();
