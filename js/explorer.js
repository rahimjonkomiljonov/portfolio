/* Interactive content: profile terminal, certificate details, copy-email.
   The skill explorer and the project filter + detail dialog are React components
   (see react/ and js/islands.js). */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  var TERM = {
    whoami: 'Rahimjon Komiljonov — Computer Engineering student at Gachon University, South Korea. AI · Cybersecurity · Software.',
    education: 'Gachon University · B.Eng. Computer Engineering · 2024 – present',
    languages: 'English (native/bilingual) · Uzbek (native/bilingual) · Korean (limited working)',
    interests: 'Artificial intelligence, cybersecurity, Python, software development, problem solving.',
    goals: 'Become an engineer who builds innovative, reliable and secure solutions, and use AI to protect sensitive information from emerging digital threats.',
    'ls projects': 'ovoz/  clearko/  attention-tracker/  overlap/  audience-polling/  finance-widget/  recipe-manager/'
  };

  /* ======================= TERMINAL ======================= */
  var out = $('#term-out');
  var cmds = $$('.term-cmd');
  function run(cmd) {
    if (!out || !TERM[cmd]) return;
    var line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = '<p class="term-in"><span class="prompt" aria-hidden="true">$</span> ' + esc(cmd) + '</p><p class="term-res">' + esc(TERM[cmd]) + '</p>';
    out.appendChild(line);
    while (out.children.length > 3) out.removeChild(out.firstChild);
    out.scrollTop = out.scrollHeight;
    cmds.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cmd === cmd)); });
  }
  cmds.forEach(function (b) { b.addEventListener('click', function () { run(b.dataset.cmd); }); });
  run('whoami');

  /* ======================= CERTIFICATE DETAILS ======================= */
  $$('.cert-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
      btn.querySelector('span').textContent = open ? 'What’s covered' : 'Hide details';
    });
  });

  /* ======================= COPY EMAIL ======================= */
  var copyBtn = $('#copy-email');
  var toast = $('#toast');
  if (copyBtn && toast) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.dataset.email;
      var done = function () {
        toast.textContent = 'Email copied to clipboard';
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done, function () { window.location.href = 'mailto:' + email; });
      else window.location.href = 'mailto:' + email;
    });
  }
})();
