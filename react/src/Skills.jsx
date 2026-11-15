import { useRef, useState } from 'react';
import { SKILLS, PROJECTS } from './data.js';
import { SKILL_LIST, SKILL_TABS } from './cards.js';
import { Icon, openProject } from './Icon.jsx';

// "Pick a skill, see where I used it": category tabs, skill chips and a detail panel.
export default function Skills() {
  const [category, setCategory] = useState('all');
  const [skill, setSkill] = useState('Python');
  const detail = useRef(null);

  const [text, usedIn] = SKILLS[skill];
  const iconId = SKILL_LIST.find((s) => s[0] === skill)[2];

  function pick(name) {
    setSkill(name);
    // replay the small pop animation on the same element (so effects.js's reveal class stays)
    const el = detail.current;
    if (el) {
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
  }

  return (
    <>
      <div className="skill-tabs reveal" role="group" aria-label="Filter skills by category">
        {SKILL_TABS.map(([cat, label]) => (
          <button key={cat} type="button" className="skill-tab" aria-pressed={category === cat} onClick={() => setCategory(cat)}>
            {label}
          </button>
        ))}
      </div>

      <div className="skills-layout">
        <ul className="skill-chips reveal" aria-label="Skills">
          {SKILL_LIST.map(([name, cat, icon]) => (
            <li key={name} hidden={category !== 'all' && category !== cat}>
              <button type="button" className="skill-chip" aria-pressed={skill === name} onClick={() => pick(name)}>
                <Icon id={icon} />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div ref={detail} className="skill-detail reveal" data-delay="120" id="skill-detail" aria-live="polite">
          <h3>
            <Icon id={iconId} />
            <span>{skill}</span>
          </h3>
          <p>{text}</p>
          {usedIn.length > 0 && (
            <>
              <p className="detail-label">Used in</p>
              <ul className="used-in">
                {usedIn.map((id) => (
                  <li key={id}>
                    <button type="button" className="link-btn" onClick={() => openProject(id)}>
                      {PROJECTS[id].title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
