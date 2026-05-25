import {NavLink} from 'react-router';
import {Icon} from '~/components/Icon';
import {STORE_DISPLAY_NAME} from '~/lib/brand';
import {
  FOOTER_ARCHIVE_LINKS,
  FOOTER_CUSTOMER_CARE_LINKS,
  FOOTER_NEWSLETTER_NOTE,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TAGLINE,
} from '~/lib/footer-content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__logo">{STORE_DISPLAY_NAME}</span>
            <p className="site-footer__tagline">{FOOTER_TAGLINE}</p>
            <div className="site-footer__social">
              {FOOTER_SOCIAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  aria-label={item.label}
                  className="site-footer__social-link"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkColumn heading="Archive" links={FOOTER_ARCHIVE_LINKS} />
          <FooterLinkColumn
            heading="Customer Care"
            links={FOOTER_CUSTOMER_CARE_LINKS}
          />

          <div className="site-footer__newsletter">
            <h2 className="site-footer__heading">Newsletter</h2>
            <form
              className="site-footer__newsletter-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                aria-label="Email address"
                className="input-editorial input-editorial--on-dark site-footer__newsletter-input"
                name="email"
                placeholder="Email Address"
                type="email"
              />
              <button
                aria-label="Subscribe"
                className="site-footer__newsletter-submit btn-icon"
                type="submit"
              >
                <Icon name="arrow_forward" />
              </button>
            </form>
            <p className="site-footer__newsletter-note">{FOOTER_NEWSLETTER_NOTE}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            &copy; {year} {STORE_DISPLAY_NAME}. Crafted for the slow living
            movement.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: ReadonlyArray<{label: string; to: string}>;
}) {
  return (
    <div className="site-footer__column">
      <h2 className="site-footer__heading">{heading}</h2>
      <ul className="site-footer__links">
        {links.map((item) => (
          <li key={item.to}>
            <NavLink className="site-footer__link" prefetch="intent" to={item.to}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
