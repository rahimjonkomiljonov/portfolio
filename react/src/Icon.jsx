import { ICONS, ICON_CLS } from './data.js';

// An icon from the inline sprite in index.html. Near-black and very light logos get a
// class so they stay visible on one of the two themes.
export function Icon({ id }) {
  const cls = 'ic i-' + id + (ICON_CLS[id] ? ' ' + ICON_CLS[id] : '');
  return (
    <svg className={cls} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <use href={'#i-' + id} />
    </svg>
  );
}

// a technology name, with its logo when there is one
export function WithIcon({ name }) {
  const id = ICONS[name];
  return id ? (
    <>
      <Icon id={id} />
      <span>{name}</span>
    </>
  ) : (
    name
  );
}

// ask the project dialog to open (the skills and projects sections are separate React roots)
export function openProject(id) {
  window.dispatchEvent(new CustomEvent('open-project', { detail: id }));
}
