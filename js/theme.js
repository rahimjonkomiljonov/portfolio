/* Theme toggle. The initial theme is set by a tiny inline script in <head>
   (so there is no flash); this file only wires the button and keeps state. */
(function () {
  'use strict';
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');

  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#090c0b' : '#f5f7f3');
    if (btn) {
      var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage blocked */ }
    }
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  apply(current(), false);

  if (btn) {
    btn.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark', true);
    });
  }
})();
