import { useEffect, useRef, useState } from 'react';
import { PROJECTS, MEDIA } from './data.js';
import { CARDS, FILTERS } from './cards.js';
import { WithIcon, openProject } from './Icon.jsx';

// The looping preview or screenshot at the top of a card. Previews only download and play
// while they are on screen, and stay as a still poster for people who prefer reduced motion.
function CardArt({ id, art }) {
  const video = useRef(null);
  useEffect(() => {
    const v = video.current;
    if (!v || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src;
            const played = v.play();
            if (played && played.catch) played.catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={'art ' + (art.type === 'video' ? 'art-video' : 'art-shot')} onClick={() => openProject(id)}>
      {art.type === 'video' ? (
        <video ref={video} muted loop playsInline preload="none" poster={art.poster} data-src={art.src} aria-label={art.label} />
      ) : (
        <img src={art.src} width={art.w} height={art.h} loading="lazy" alt={art.alt} />
      )}
      <span className="art-badge" aria-hidden="true">{art.badge}</span>
    </div>
  );
}

// One project card: preview, title, description, tech stack, details button and link.
function ProjectCard({ card, hidden }) {
  return (
    <article className="project reveal" data-delay={card.delay || undefined} data-category={card.category} data-tilt hidden={hidden}>
      <span className="glare" aria-hidden="true"></span>
      <CardArt id={card.id} art={card.art} />
      <p className="tag">{card.tag}</p>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      <ul className="chips">
        {card.chips.map((name) => (
          <li key={name}><WithIcon name={name} /></li>
        ))}
      </ul>
      <div className="card-actions">
        <button type="button" className="btn btn-small" onClick={() => openProject(card.id)}>
          Details<span className="sr-only">{card.detailsSr}</span>
        </button>
        <a className="text-link" href={card.link.href} target="_blank" rel="noopener">
          {card.link.text}<span className="sr-only">{card.link.sr}</span>
        </a>
      </div>
    </article>
  );
}

// The full story of one project, in a modal dialog.
function ProjectDialog() {
  const dialog = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const onOpen = (event) => setId(event.detail);
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!id || !el || el.open) return;
    if (typeof el.showModal === 'function') el.showModal();
    else el.setAttribute('open', '');
    document.documentElement.classList.add('modal-open');
  }, [id]);

  function close() {
    const el = dialog.current;
    if (el.close) el.close();
    else el.removeAttribute('open');
  }

  function onClosed() {
    document.documentElement.classList.remove('modal-open');
    setId(null); // empties the body, which also drops a playing video so it stops downloading
  }

  const project = id && PROJECTS[id];
  const media = id && MEDIA[id];

  return (
    <dialog ref={dialog} id="project-dialog" className="dialog" aria-labelledby="pd-title" onClose={onClosed} onClick={(e) => e.target === dialog.current && close()}>
      <button type="button" id="pd-close" className="dialog-close" aria-label="Close project details" onClick={close}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div id="pd-body">
        {project && (
          <>
            {media ? (
              <>
                <video className="pd-video" controls playsInline preload="metadata" poster={media.poster} width={media.w} height={media.h} aria-label={media.label}>
                  <source src={media.src} type="video/mp4" />
                </video>
                <p className="pd-caption">{media.caption}</p>
              </>
            ) : (
              project.image && <img className="pd-img" src={project.image} alt={project.alt} width="1280" height="760" />
            )}
            <p className="pd-kind">{project.kind} · {project.period}</p>
            <h2 id="pd-title">{project.title}</h2>
            <p className="pd-summary">{project.summary}</p>
            <h3 className="pd-h">Highlights</h3>
            <ul className="pd-list">
              {project.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <h3 className="pd-h">Tech stack</h3>
            <ul className="chips">
              {project.stack.map((name) => <li key={name}><WithIcon name={name} /></li>)}
            </ul>
            <div className="pd-links">
              {project.links.map((link) => (
                <a key={link.url} className="btn btn-primary" href={link.url} target="_blank" rel="noopener">
                  {link.label}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
              {project.private && !project.links.length && <p className="note">The source code for this project is private.</p>}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

// "Things I've built": category filter, the cards, a live count for screen readers and the dialog.
export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('');

  function choose(value) {
    const shown = CARDS.filter((c) => value === 'all' || c.category.split(' ').includes(value)).length;
    setFilter(value);
    setStatus('Showing ' + shown + (shown === 1 ? ' project' : ' projects'));
  }

  return (
    <>
      <div className="filters reveal" role="group" aria-label="Filter projects by category">
        {FILTERS.map(([value, label]) => (
          <button key={value} type="button" className={'filter' + (filter === value ? ' is-active' : '')} aria-pressed={filter === value} onClick={() => choose(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {CARDS.map((card) => (
          <ProjectCard key={card.id} card={card} hidden={filter !== 'all' && !card.category.split(' ').includes(filter)} />
        ))}
      </div>
      <p id="filter-status" className="sr-only" role="status" aria-live="polite">{status}</p>
      <ProjectDialog />
    </>
  );
}
