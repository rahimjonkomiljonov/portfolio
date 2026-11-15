// What each project card on the page shows (the longer dialog text is in data.js).
export const CARDS = [
  {
    id: 'clearko', category: 'ai web python', delay: null,
    art: { type: 'video', poster: 'images/media/clearko-poster.jpg', src: 'images/media/clearko-loop.mp4',
      label: 'Looping preview of ClearKo: a phone screen showing the red flags found in a Korean part-time contract, each with the original Korean text and a plain explanation', badge: '▶ Demo' },
    tag: 'AI · Document understanding', title: 'ClearKo',
    desc: 'Photograph a Korean contract and get it explained in Uzbek, Russian or English: key facts, red flags that quote the original Korean, and what to do next. Measured against a plain-prompt baseline.',
    chips: ['Python', 'FastAPI', 'OpenCV', 'Next.js'], detailsSr: ' about ClearKo',
    link: { href: 'https://github.com/rahimjonkomiljonov/clearko', text: 'Code', sr: ' for ClearKo (opens in a new tab)' },
  },
  {
    id: 'tracker', category: 'ai python', delay: '80',
    art: { type: 'video', poster: 'images/media/tracker-poster.jpg', src: 'images/media/tracker-loop.mp4',
      label: 'Looping preview of the attention tracker dashboard: a webcam feed with a face box labelled attentive, partial or away, and a live engagement percentage', badge: '▶ Live demo' },
    tag: 'AI · Computer vision', title: 'Live Audience Attention Tracker',
    desc: 'Watches webcam video of an audience and labels each person attentive, partially engaged or looking away, using head pose and eye gaze. Privacy-first: no frames or identities stored.',
    chips: ['Python', 'MediaPipe', 'OpenCV', 'FastAPI'], detailsSr: ' about Live Audience Attention Tracker',
    link: { href: 'https://github.com/rahimjonkomiljonov/live-audience-attention-tracker', text: 'Code', sr: ' for Live Audience Attention Tracker (opens in a new tab)' },
  },
  {
    id: 'overlap', category: 'web', delay: '160',
    art: { type: 'image', src: 'images/overlap.jpg', w: '1280', h: '760',
      alt: 'Screenshot of the Overlap landing page with the headline "You already overlap."', badge: 'Live site' },
    tag: 'Web · Full-stack', title: 'Overlap',
    desc: 'A Korean-first campus app built on one idea: you already overlap with people on your campus. Same course, same club, free the same hour.',
    chips: ['Next.js 16', 'TypeScript', 'Vercel'], detailsSr: ' about Overlap',
    link: { href: 'https://overlap-vert.vercel.app', text: 'Live site', sr: ' (opens in a new tab)' },
  },
  {
    id: 'polling', category: 'web', delay: null,
    art: { type: 'video', poster: 'images/media/polling-poster.jpg', src: 'images/media/polling-loop.mp4',
      label: 'Looping walkthrough of the polling app: the home screen, hosting a room, typing a room title and the join-by-code screen', badge: '▶ Walkthrough' },
    tag: 'Web · Realtime', title: 'Audience Polling & Q&A',
    desc: 'A Slido-style platform: hosts launch polls and the audience votes by room code or QR code, with live charts and no page refreshes.',
    chips: ['Next.js 15', 'Supabase', 'Tailwind', 'Plotly'], detailsSr: ' about Audience Polling',
    link: { href: 'https://github.com/rahimjonkomiljonov/audience-polling', text: 'Code', sr: ' for Audience Polling (opens in a new tab)' },
  },
  {
    id: 'finance', category: 'apps', delay: '80',
    art: { type: 'video', poster: 'images/media/finance-poster.jpg', src: 'images/media/finance-loop.mp4',
      label: 'Looping promo of the Finance Widget: an Android home-screen widget with stock prices, a USD to KRW toggle, and the desktop app', badge: '▶ Promo' },
    tag: 'Desktop · Mobile', title: 'Finance Widget',
    desc: 'A stock-portfolio tracker for Windows and Android with allocation charts, gain/loss, a USD/KRW toggle and a home-screen widget. No account, no server.',
    chips: ['Electron', 'React', 'Kotlin', 'Compose'], detailsSr: ' about Finance Widget',
    link: { href: 'https://github.com/rahimjonkomiljonov/finance-widget', text: 'Code', sr: ' for Finance Widget (opens in a new tab)' },
  },
  {
    id: 'recipe', category: 'ai web', delay: '160',
    art: { type: 'video', poster: 'images/media/recipe-poster.jpg', src: 'images/media/recipe-loop.mp4',
      label: 'Looping preview of the Recipe Manager: pasting a YouTube link, extracting, and the structured recipe that results', badge: '▶ Live demo' },
    tag: 'AI · Web', title: 'Recipe Manager',
    desc: 'Turns recipe websites, YouTube videos and Instagram posts into structured, searchable recipes. Gemini watches the video directly.',
    chips: ['TypeScript', 'Node.js', 'Gemini API', 'SQLite'], detailsSr: ' about Recipe Manager',
    link: { href: 'https://github.com/rahimjonkomiljonov/recipe-from-url', text: 'Code', sr: ' for Recipe Manager (opens in a new tab)' },
  },
];

export const FILTERS = [
  ['all', 'All'], ['ai', 'AI'], ['web', 'Web'], ['apps', 'Desktop & Mobile'], ['python', 'Python'],
];

// [skill, category, icon id in the sprite], in the order shown on the page
export const SKILL_LIST = [
  ['Python', 'lang', 'python'], ['TypeScript', 'lang', 'typescript'], ['JavaScript', 'lang', 'javascript'],
  ['Kotlin', 'lang', 'kotlin'], ['Java', 'lang', 'openjdk'], ['SQL', 'lang', 'sql'], ['HTML & CSS', 'lang', 'html5'],
  ['MediaPipe', 'ai', 'mediapipe'], ['OpenCV', 'ai', 'opencv'], ['Gemini API', 'ai', 'googlegemini'],
  ['NumPy', 'ai', 'numpy'], ['Pandas', 'ai', 'pandas'],
  ['Next.js', 'web', 'nextdotjs'], ['React', 'web', 'react'], ['React Native', 'web', 'react'], ['Expo', 'web', 'expo'],
  ['Tailwind CSS', 'web', 'tailwindcss'], ['Electron', 'web', 'electron'], ['Jetpack Compose', 'web', 'jetpackcompose'],
  ['Node.js', 'data', 'nodedotjs'], ['Express', 'data', 'express'], ['FastAPI', 'data', 'fastapi'],
  ['WebSockets', 'data', 'ws'], ['Supabase', 'data', 'supabase'], ['PostgreSQL', 'data', 'postgresql'],
  ['SQLite', 'data', 'sqlite'], ['Streamlit', 'data', 'streamlit'],
  ['Git & GitHub', 'tools', 'git'], ['Vercel', 'tools', 'vercel'],
];

export const SKILL_TABS = [
  ['all', 'All'], ['lang', 'Languages'], ['ai', 'AI & Vision'], ['web', 'Web & Apps'], ['data', 'Backend & Data'], ['tools', 'Tools'],
];
