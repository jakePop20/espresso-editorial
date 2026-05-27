import {Link} from 'react-router';
import {
  HeroEntrance,
  HeroEntranceItem,
} from '~/components/motion/HeroEntrance';
import {HomepageMediaImage} from '~/components/homepage/HomepageMediaImage';
import type {HomepageHeroContent} from '~/lib/homepage/types';

type HeroSectionProps = {
  hero: HomepageHeroContent;
};

export function HeroSection({hero}: HeroSectionProps) {
  const media = (
    <>
      <HomepageMediaImage
        className="homepage-hero__image"
        fetchPriority="high"
        image={hero.image}
        loading="eager"
        placeholderClassName="homepage-hero__image bg-espresso"
        sizes="100vw"
      />
      <div aria-hidden className="homepage-hero__overlay" />
    </>
  );

  const content = (
    <>
      {hero.eyebrow ? (
        <HeroEntranceItem>
          <span className="homepage-hero__eyebrow">{hero.eyebrow}</span>
        </HeroEntranceItem>
      ) : null}
      <HeroEntranceItem>
        <h1 className="homepage-hero__title">{hero.title}</h1>
      </HeroEntranceItem>
      <HeroEntranceItem>
        <div className="homepage-hero__actions">
          <Link className="btn-primary" prefetch="intent" to={hero.primaryCta.to}>
            {hero.primaryCta.label}
          </Link>
          <Link
            className="btn-ghost homepage-hero__link-secondary"
            prefetch="intent"
            to={hero.secondaryCta.to}
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </HeroEntranceItem>
    </>
  );

  return (
    <section className="homepage-hero" aria-label="Hero">
      <HeroEntrance content={content} media={media} />
    </section>
  );
}
