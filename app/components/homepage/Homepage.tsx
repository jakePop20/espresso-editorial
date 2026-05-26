import {HOMEPAGE_SECTIONS} from '~/lib/homepage/sections';

export function Homepage() {
  return (
    <div className="homepage">
      {HOMEPAGE_SECTIONS.map(({id, Component}) => (
        <Component key={id} />
      ))}
    </div>
  );
}
