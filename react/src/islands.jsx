import { createRoot, hydrateRoot } from 'react-dom/client';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';

// The page already contains this markup (rendered at build time by build.mjs), so React
// hydrates it instead of replacing it: the sections look right before any script runs.
function mount(id, element) {
  const root = document.getElementById(id);
  if (!root) return;
  if (root.hasChildNodes()) hydrateRoot(root, element);
  else createRoot(root).render(element);
}

mount('skills-root', <Skills />);
mount('projects-root', <Projects />);
