/* Interactive content: skill explorer, project filter + detail dialog,
   profile terminal, certificate details, copy-email. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ======================= DATA ======================= */
  var PROJECTS = {
    clearko: {
      title: 'ClearKo', kind: 'AI · Document understanding', period: 'Nov 2026',
      summary: 'A web app that explains Korean documents to people who cannot read them. Photograph a rental contract, phone plan or part-time job contract and ClearKo reads it and explains it in Uzbek, Russian or English: a summary, key facts, red flags that quote the original Korean, and a to-do list. It explains documents; it is not legal advice.',
      points: [
        'Pipeline: OpenCV preprocessing, PaddleOCR, then a local LLM (qwen2.5:7b through Ollama) that reviews every added clause by id, plus fixed rules such as the legal minimum wage.',
        'Measured, not assumed: on 4 synthetic documents with 32 planted problems, ClearKo found 31 and a plain “explain this” prompt on the same model found 22.',
        'Shows the scan’s own Korean text with every flag, and hides any quote it cannot find in the scan, so it never shows invented Korean.',
        'Uzbek comes from NLLB-200 translating the English analysis, because the local models could not write usable Uzbek. A native Uzbek speaker still needs to review it.',
        'Privacy-first: nothing is stored and the default model runs on my own machine, so documents never leave it.',
        'Reading 8 pages takes about 3 seconds on the GPU and 6 to 15 minutes on the CPU. 160 backend tests and 10 frontend tests pass.',
        'The demo frontend is on Vercel and its GPU backend runs on my own PC, so the live demo works only while that PC is on.'
      ],
      stack: ['Python', 'FastAPI', 'OpenCV', 'PaddleOCR', 'Ollama', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      links: [
        { label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/clearko' },
        { label: 'Read the case study', url: 'https://github.com/rahimjonkomiljonov/clearko/blob/main/docs/case-study.md' },
        { label: 'Open live demo', url: 'https://clearko-ras-5e26.vercel.app' }
      ]
    },
    tracker: {
      title: 'Live Audience Attention Tracker', kind: 'AI · Computer vision', period: 'Aug – Sep 2026',
      summary: 'A real-time computer-vision system that watches webcam video of an audience and labels each person as attentive, partially engaged or looking away, based on head pose and eye gaze.',
      points: [
        'MediaPipe face landmarks give 3D head pose (yaw and pitch) from facial transformation matrices.',
        'Eye-gaze blendshapes catch people whose head faces forward but whose eyes are elsewhere.',
        'Tracks many faces at once with live engagement % on a browser dashboard (FastAPI, WebSockets, MJPEG streaming).',
        'Calibrates the camera automatically to correct for viewing angle.',
        'Logs sessions to CSV and generates an HTML report with an engagement timeline and attention-dip detection.',
        'Privacy-first: it never stores video frames, face images or identities, only per-second aggregates.'
      ],
      stack: ['Python', 'MediaPipe', 'OpenCV', 'FastAPI', 'WebSockets', 'NumPy', 'Pandas'],
      links: [{ label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/live-audience-attention-tracker' }]
    },
    overlap: {
      title: 'Overlap', kind: 'Web · Full-stack', period: '2026',
      summary: 'A Korean-first campus web app built on one idea: you already overlap with people on your campus. Same course, same club, free the same hour.',
      points: [
        'Bilingual interface (한국어 / English) with a waitlist landing page, deployed on Vercel.',
        'Built with Next.js 16 and TypeScript.',
        'The source repository is private, so the live site is the best way to see it.'
      ],
      stack: ['Next.js 16', 'TypeScript', 'Vercel'], links: [{ label: 'Open live site', url: 'https://overlap-vert.vercel.app' }], private: true,
      image: 'images/overlap.jpg', alt: 'Screenshot of the Overlap landing page with the headline "You already overlap." and a Join the waitlist button'
    },
    polling: {
      title: 'Audience Polling & Q&A', kind: 'Web · Realtime', period: 'Jul – Aug 2026',
      summary: 'A real-time polling platform in the style of Mentimeter or Slido. Hosts launch polls and the audience votes by room code or QR code, with no page refreshes.',
      points: [
        'Next.js 15 (App Router), React 19 and TypeScript on the front end.',
        'Supabase (PostgreSQL) with Realtime for instant updates.',
        'Row Level Security keeps host privileges separate from audience access.',
        'Live bar charts and word clouds with Plotly; mobile-first onboarding with Tailwind CSS and dynamic QR codes.',
        'Vercel Cron Jobs clean up stale rooms automatically.'
      ],
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Plotly'],
      links: [{ label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/audience-polling' }]
    },
    finance: {
      title: 'Finance Widget', kind: 'Desktop · Mobile', period: '2026',
      summary: 'A stock-portfolio tracker for Windows and Android. Add holdings by ticker, shares and buy price (USD or KRW) and see allocation, gain/loss and today’s move.',
      points: [
        'Desktop: Electron, React, TypeScript and Recharts with a donut allocation chart and a USD/KRW toggle.',
        'Android: Kotlin and Jetpack Compose with a home-screen widget that shows each stock’s change since the previous close.',
        'No account and no server: all data stays on the device.',
        'Fixed a bug where a KRW stock was treated as USD and showed a +37,765% “gain”. Each price now carries its own currency, and the app shows “—” when an exchange rate is missing.',
        '56 unit tests on Android. Open source under the MIT licence.'
      ],
      stack: ['Electron', 'React', 'TypeScript', 'Kotlin', 'Jetpack Compose', 'WorkManager'],
      links: [{ label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/finance-widget' }]
    },
    recipe: {
      title: 'Recipe Manager', kind: 'AI · Web', period: '2026',
      summary: 'Turns recipe websites, YouTube videos and Instagram posts into structured recipes in a searchable collection.',
      points: [
        'Reads schema.org JSON-LD from websites, falling back to Microdata and HTML heuristics.',
        'Google Gemini’s multimodal API watches YouTube videos directly (audio and on-screen text), so it does not depend on the description.',
        'When Instagram blocks scraping, it falls back to a manual paste.',
        'Model output is constrained with a JSON Schema so every recipe has the same shape.'
      ],
      stack: ['TypeScript', 'Node.js', 'Express', 'SQLite', 'Gemini API', 'Cheerio'],
      links: [{ label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/recipe-from-url' }]
    },
    voting: {
      title: 'Blockchain Voting System', kind: 'Python · Security', period: '2025',
      summary: 'A production-style voting platform where every vote is cryptographically verified.',
      points: [
        'Blockchain-verified votes with cryptographic verification.',
        'Admin panel, persistent storage and real-time analytics.',
        'PDF report generation.',
        'Built with Python, Streamlit and SQLAlchemy.'
      ],
      stack: ['Python', 'Streamlit', 'SQLAlchemy'],
      links: [{ label: 'View code on GitHub', url: 'https://github.com/rahimjonkomiljonov/Enterprise-Blockchain-Voting-System' }]
    }
  };

  /* Full demos shown inside the project dialog */
  var MEDIA = {
    clearko: { src: 'images/media/clearko.mp4', poster: 'images/media/clearko-poster.jpg', w: 1280, h: 720,
      label: '25-second demo of ClearKo: a Korean contract, the app, and the red flags with the original Korean quote',
      caption: 'A 25-second demo (it has music: Sascha Ende, ende.app, CC BY 4.0). The 31 of 32 versus 22 of 32 result at the end comes from my own test on synthetic documents.' },
    tracker: { src: 'images/media/tracker.mp4', poster: 'images/media/tracker-poster.jpg', w: 1280, h: 574,
      label: 'Screen recording of the attention tracker dashboard',
      caption: 'Real screen recording: engagement climbs and drops as I look at or away from the camera, then the session report with its engagement timeline.' },
    recipe: { src: 'images/media/recipe.mp4', poster: 'images/media/recipe-poster.jpg', w: 1280, h: 578,
      label: 'Screen recording of the Recipe Manager extracting a recipe from a YouTube link',
      caption: 'Real screen recording with the waiting time sped up: paste a YouTube link, Gemini reads the video, and a structured recipe is saved to the collection.' },
    finance: { src: 'images/media/finance.mp4', poster: 'images/media/finance-poster.jpg', w: 1280, h: 720,
      label: 'Promo video of the Finance Widget on Android and Windows',
      caption: 'Promo video for the project (it has sound). The widget shows the change since yesterday’s close, and the same portfolio opens on desktop and phone.' },
    polling: { src: 'images/media/polling.mp4', poster: 'images/media/polling-poster.jpg', w: 800, h: 364,
      label: 'Walkthrough of the polling app screens',
      caption: 'Captured from the app running on my laptop: the home screen, hosting a room, entering a room title, and joining with a room code.' },
    voting: { src: 'images/media/voting.mp4', poster: 'images/media/voting-poster.jpg', w: 920, h: 418,
      label: 'Walkthrough of the blockchain voting system',
      caption: 'Captured from the app running on my laptop with a sample election: the results chart, the mining screen, and the blockchain explorer confirming the chain is valid.' }
  };

  var SKILLS = {
    'Python': ['My first language and still my default. From 100 Days of Code to computer vision and a blockchain voting system.', ['tracker', 'voting', 'clearko']],
    'TypeScript': ['My choice for anything with a UI or an API, so bugs show up before users do.', ['overlap', 'polling', 'finance', 'recipe', 'clearko']],
    'JavaScript': ['Powers the interactions on this very portfolio, written without a framework.', ['polling']],
    'Kotlin': ['Native Android: the Finance Widget’s app and home-screen widget.', ['finance']],
    'Java': ['Android fundamentals from my Mobile Programming coursework.', []],
    'SQL': ['Schemas, migrations and Row Level Security policies in PostgreSQL.', ['polling']],
    'HTML & CSS': ['This portfolio uses semantic, responsive and accessible HTML and CSS.', []],
    'MediaPipe': ['Face landmarks, head pose and eye-gaze blendshapes for the attention tracker.', ['tracker']],
    'OpenCV': ['Webcam capture and frame handling for real-time vision.', ['tracker', 'clearko']],
    'Gemini API': ['Multimodal video understanding and schema-constrained output.', ['recipe', 'clearko']],
    'NumPy': ['The maths behind head pose and per-second aggregates.', ['tracker']],
    'Pandas': ['Session logs, reports and exploratory analysis (including the Book-Crossing dataset).', ['tracker']],
    'Next.js': ['App Router apps with server and client components, deployed on Vercel.', ['overlap', 'polling', 'clearko']],
    'React': ['Component UIs for the web and for the Electron desktop app.', ['finance', 'polling']],
    'Tailwind CSS': ['Fast, mobile-first styling for the polling app.', ['polling', 'clearko']],
    'Electron': ['Windows desktop widget with tray icon and always-on-top mode.', ['finance']],
    'Jetpack Compose': ['Declarative Android UI for the Finance Widget.', ['finance']],
    'Node.js': ['Server-side TypeScript for the Recipe Manager.', ['recipe']],
    'Express': ['A small REST API that extracts and stores recipes.', ['recipe']],
    'FastAPI': ['Serves the live attention dashboard and streams video.', ['tracker', 'clearko']],
    'WebSockets': ['Pushes live engagement numbers to the browser.', ['tracker']],
    'Supabase': ['Postgres, Realtime and Row Level Security on a free tier.', ['polling']],
    'PostgreSQL': ['The relational store behind live polls and Q&A.', ['polling']],
    'SQLite': ['Lightweight local storage for the Recipe Manager.', ['recipe']],
    'Streamlit': ['Rapid Python dashboards, like the voting system’s admin panel.', ['voting']],
    'React Native': ['Cross-platform mobile apps with Expo, like my Expiry Manager, which tracks expiry dates.', []],
    'Expo': ['Builds, routing and on-device testing for my React Native apps.', []],
    'Git & GitHub': ['Every project here lives on GitHub, and this portfolio is deployed from it with GitHub Pages.', []],
    'Vercel': ['Hosts Overlap, and runs the cron jobs that clean up stale polling rooms.', ['overlap', 'polling', 'clearko']]
  };

  /* Technology name -> icon id in the inline sprite (see index.html) */
  var ICONS = {
    'Python': 'python', 'TypeScript': 'typescript', 'JavaScript': 'javascript', 'Kotlin': 'kotlin', 'Java': 'openjdk', 'SQL': 'sql',
    'MediaPipe': 'mediapipe', 'OpenCV': 'opencv', 'Gemini API': 'googlegemini', 'NumPy': 'numpy', 'Pandas': 'pandas',
    'Next.js': 'nextdotjs', 'Next.js 16': 'nextdotjs', 'Next.js 15': 'nextdotjs', 'React': 'react', 'React 19': 'react', 'React Native': 'react',
    'Expo': 'expo', 'Tailwind': 'tailwindcss', 'Tailwind CSS': 'tailwindcss', 'Electron': 'electron', 'Jetpack Compose': 'jetpackcompose', 'Compose': 'jetpackcompose',
    'Node.js': 'nodedotjs', 'Express': 'express', 'FastAPI': 'fastapi', 'WebSockets': 'ws', 'Supabase': 'supabase', 'PostgreSQL': 'postgresql',
    'SQLite': 'sqlite', 'Streamlit': 'streamlit', 'Vercel': 'vercel', 'Plotly': 'plotly', 'SQLAlchemy': 'sqlalchemy', 'WorkManager': 'android', 'Cheerio': 'cheerio'
  };
  /* Logos that are near-black (dark) or very light need the text colour on one theme */
  var ICON_CLS = { 'javascript': 'ic-lt', 'openjdk': 'ic-dk', 'numpy': 'ic-dk', 'pandas': 'ic-dk', 'nextdotjs': 'ic-dk', 'react': 'ic-lt', 'expo': 'ic-dk', 'express': 'ic-dk', 'supabase': 'ic-lt', 'sqlite': 'ic-dk', 'vercel': 'ic-dk', 'android': 'ic-lt' };
  function iconSvg(id) {
    return '<svg class="ic i-' + id + (ICON_CLS[id] ? ' ' + ICON_CLS[id] : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-' + id + '"/></svg>';
  }
  function withIcon(name) { return ICONS[name] ? iconSvg(ICONS[name]) + '<span>' + name + '</span>' : name; }

  var TERM = {
    whoami: 'Rahimjon Komiljonov — Computer Engineering student at Gachon University, South Korea. AI · Cybersecurity · Software.',
    education: 'Gachon University · B.Eng. Computer Engineering · 2024 – present',
    languages: 'English (native/bilingual) · Uzbek (native/bilingual) · Korean (limited working)',
    interests: 'Artificial intelligence, cybersecurity, Python, software development, problem solving.',
    goals: 'Become an engineer who builds innovative, reliable and secure solutions, and use AI to protect sensitive information from emerging digital threats.',
    'ls projects': 'clearko/  attention-tracker/  overlap/  audience-polling/  finance-widget/  recipe-manager/'
  };

  /* ======================= SKILL EXPLORER ======================= */
  var chips = $$('.skill-chip');
  var detail = $('#skill-detail');
  var tabs = $$('.skill-tab');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function showSkill(name) {
    var d = SKILLS[name];
    if (!d || !detail) return;
    var chip = chips.filter(function (c) { return c.dataset.skill === name; })[0];
    var svg = chip && chip.querySelector('svg') ? chip.querySelector('svg').outerHTML : '';
    var html = '<h3>' + svg + '<span>' + esc(name) + '</span></h3><p>' + esc(d[0]) + '</p>';
    if (d[1].length) {
      html += '<p class="detail-label">Used in</p><ul class="used-in">' + d[1].map(function (id) {
        return '<li><button type="button" class="link-btn" data-open="' + id + '">' + esc(PROJECTS[id].title) + '</button></li>';
      }).join('') + '</ul>';
    }
    detail.innerHTML = html;
    detail.classList.remove('pop'); void detail.offsetWidth; detail.classList.add('pop');
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.skill === name)); });
  }

  chips.forEach(function (c) { c.addEventListener('click', function () { showSkill(c.dataset.skill); }); });

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var cat = t.dataset.cat;
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      chips.forEach(function (c) {
        var show = cat === 'all' || c.dataset.cat === cat;
        c.hidden = !show;
      });
    });
  });
  if (chips.length) showSkill('Python');

  /* icons on the tech chips of the project cards */
  $$('.project .chips li').forEach(function (li) { li.innerHTML = withIcon(li.textContent.trim()); });

  /* ======================= PROJECT FILTER ======================= */
  var filters = $$('.filter');
  var cards = $$('.project');
  var status = $('#filter-status');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter, n = 0;
      filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (card) {
        var match = f === 'all' || card.dataset.category.split(' ').indexOf(f) !== -1;
        card.hidden = !match; if (match) n++;
      });
      if (status) status.textContent = 'Showing ' + n + (n === 1 ? ' project' : ' projects');
    });
  });

  /* ======================= PROJECT DIALOG ======================= */
  var dlg = $('#project-dialog');
  var body = $('#pd-body');
  function openProject(id) {
    var p = PROJECTS[id];
    if (!p || !dlg || !body) return;
    var h = '';
    var m = MEDIA[id];
    if (m) {
      h += '<video class="pd-video" controls playsinline preload="metadata" poster="' + m.poster + '" width="' + m.w + '" height="' + m.h + '" aria-label="' + esc(m.label) + '"><source src="' + m.src + '" type="video/mp4"></video>';
      h += '<p class="pd-caption">' + esc(m.caption) + '</p>';
    } else if (p.image) {
      h += '<img class="pd-img" src="' + p.image + '" alt="' + esc(p.alt) + '" width="1280" height="760">';
    }
    h += '<p class="pd-kind">' + esc(p.kind) + ' · ' + esc(p.period) + '</p>';
    h += '<h2 id="pd-title">' + esc(p.title) + '</h2><p class="pd-summary">' + esc(p.summary) + '</p>';
    h += '<h3 class="pd-h">Highlights</h3><ul class="pd-list">' + p.points.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    h += '<h3 class="pd-h">Tech stack</h3><ul class="chips">' + p.stack.map(function (x) { return '<li>' + withIcon(esc(x)) + '</li>'; }).join('') + '</ul>';
    h += '<div class="pd-links">' + p.links.map(function (l) {
      return '<a class="btn btn-primary" href="' + l.url + '" target="_blank" rel="noopener">' + esc(l.label) + '<span class="sr-only"> (opens in a new tab)</span></a>';
    }).join('');
    if (p.private && !p.links.length) h += '<p class="note">The source code for this project is private.</p>';
    h += '</div>';
    body.innerHTML = h;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.classList.add('modal-open');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (t) openProject(t.dataset.open);
  });
  if (dlg) {
    var close = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    $('#pd-close').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); }); // backdrop click
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('modal-open');
      body.innerHTML = ''; // drops any playing video so it stops downloading
    });
  }

  /* ======================= CARD VIDEO PREVIEWS ======================= */
  var vids = $$('.art video');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (vids.length && !reduced && 'IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; // load lazily
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () { /* autoplay blocked: poster stays */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { vo.observe(v); });
  }

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
