import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Icon} from '~/components/Icon';
import {STORE_DISPLAY_NAME} from '~/lib/brand';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="flex items-center gap-8">
          <NavLink className="site-header__brand" prefetch="intent" to="/" end>
            {STORE_DISPLAY_NAME}
          </NavLink>
          <HeaderMenu viewport="desktop" />
        </div>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({
  viewport,
}: {
  menu?: HeaderProps['header']['menu'];
  primaryDomainUrl?: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain?: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  const navClassName =
    viewport === 'desktop' ? 'site-header__nav' : 'header-menu-mobile';

  return (
    <nav className={navClassName} role="navigation">
      {EDITORIAL_HEADER_NAV.map((item) => (
        <NavLink
          className={navLinkClassName}
          end={item.end}
          key={item.to}
          onClick={close}
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

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="site-header__actions" role="navigation" aria-label="Header">
      <CartToggle cart={cart} />
      <AccountToggle isLoggedIn={isLoggedIn} />
      {/* Mock uses bag + person only; search stays available but off-canvas */}
      <SearchToggle className="sr-only" />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function AccountToggle({isLoggedIn}: Pick<HeaderProps, 'isLoggedIn'>) {
  return (
    <NavLink
      aria-label="Account"
      className="btn-icon"
      prefetch="intent"
      to="/account"
    >
      <span className="material-symbols-outlined" aria-hidden>
        person
      </span>
      <span className="sr-only">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </span>
    </NavLink>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      aria-label="Open menu"
      className="site-header__menu-toggle btn-icon"
      onClick={() => open('mobile')}
      type="button"
    >
      <Icon name="menu" />
    </button>
  );
}

function SearchToggle({className = ''}: {className?: string}) {
  const {open} = useAside();
  return (
    <button
      aria-label="Search"
      className={`btn-icon ${className}`.trim()}
      onClick={() => open('search')}
      type="button"
    >
      <Icon name="search" />
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      aria-label={`Cart, ${count} items`}
      className="btn-icon"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      type="button"
    >
      <Icon name="shopping_bag" />
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const EDITORIAL_HEADER_NAV = [
  {label: 'Home', to: '/', end: true},
  {label: 'Quiz', to: '/pages/quiz', end: false},
  {label: 'Subscription', to: '/pages/subscription', end: false},
  {label: 'Bundles', to: '/collections/bundles', end: false},
] as const;

