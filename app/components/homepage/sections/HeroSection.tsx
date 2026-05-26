import {Link} from 'react-router';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {HOMEPAGE_HERO} from '~/lib/homepage/content';

export function HeroSection() {
  return (
    <section className="homepage-hero" aria-label="Hero">
      <div className="homepage-hero__media">
        <img
          alt="Dark espresso pouring into a minimalist ceramic cup with dramatic low-key lighting"
          className="homepage-hero__image"
          fetchPriority="high"
          height={1080}
          src={HOMEPAGE_ASSETS.hero}
          width={1920}
        />
        <div aria-hidden className="homepage-hero__overlay" />
      </div>
      <div className="homepage-hero__content">
        <h1 className="homepage-hero__title">{HOMEPAGE_HERO.title}</h1>
        <div className="homepage-hero__actions">
          <Link className="btn-primary" prefetch="intent" to={HOMEPAGE_HERO.primaryCta.to}>
            {HOMEPAGE_HERO.primaryCta.label}
          </Link>
          <Link className="btn-ghost homepage-hero__link-secondary" to={HOMEPAGE_HERO.secondaryCta.to}>
            {HOMEPAGE_HERO.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
