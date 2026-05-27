import {NavLink} from 'react-router';
import type {HeaderQuery} from 'storefrontapi.generated';
import {ScrollSiteHeader} from '~/components/ScrollSiteHeader';
import {STORE_DISPLAY_NAME} from '~/lib/brand';

interface HeaderProps {
  header: HeaderQuery;
}

export function Header({header: _header}: HeaderProps) {
  return (
    <ScrollSiteHeader>
      <div className="site-header__inner">
        <NavLink className="site-header__brand" prefetch="intent" to="/" end>
          {STORE_DISPLAY_NAME}
        </NavLink>
        <HeaderMenu />
      </div>
    </ScrollSiteHeader>
  );
}

export function HeaderMenu() {
  return (
    <nav className="site-header__nav" role="navigation">
      {EDITORIAL_HEADER_NAV.map((item) => (
        <NavLink
          className={navLinkClassName}
          end={item.end}
          key={item.to}
          prefetch="intent"
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function navLinkClassName({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return [
    'header-menu-item',
    'nav-link',
    isActive ? 'nav-link--active' : '',
    isPending ? 'opacity-60' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

const EDITORIAL_HEADER_NAV = [
  {label: 'Home', to: '/', end: true},
  {label: 'Quiz', to: '/pages/quiz', end: false},
  {label: 'Subscriptions', to: '/pages/subscription', end: false},
] as const;
