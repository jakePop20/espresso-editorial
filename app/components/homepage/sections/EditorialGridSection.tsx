import {Link} from 'react-router';
import {Stagger, StaggerItem} from '~/components/motion/Stagger';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {
  HOMEPAGE_EDITORIAL_FEATURE,
  HOMEPAGE_EDITORIAL_INTRO,
  HOMEPAGE_EDITORIAL_SIDEBAR,
  HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW,
} from '~/lib/homepage/content';

const SIDEBAR_IMAGES = {
  huila: HOMEPAGE_ASSETS.editorial.huila,
  slowLiving: HOMEPAGE_ASSETS.editorial.slowLiving,
} as const;

export function EditorialGridSection() {
  const featureHref = HOMEPAGE_EDITORIAL_FEATURE.cta.to;

  return (
    <section className="homepage-editorial" aria-labelledby="homepage-editorial-title">
      <div className="homepage-editorial__intro section section-intro">
        <span className="eyebrow">{HOMEPAGE_EDITORIAL_INTRO.eyebrow}</span>
        <h2 className="homepage-editorial__title" id="homepage-editorial-title">
          {HOMEPAGE_EDITORIAL_INTRO.title}
        </h2>
      </div>
      <div className="homepage-editorial__grid section">
        <article className="homepage-editorial__feature">
          <Link
            aria-label={HOMEPAGE_EDITORIAL_FEATURE.title}
            className="homepage-editorial__feature-image-link"
            prefetch="intent"
            to={featureHref}
          >
            <div className="homepage-editorial__feature-image-wrap">
              <img
                alt="Chemex coffee maker dripping on a bright minimalist counter"
                className="homepage-editorial__feature-image"
                height={720}
                loading="lazy"
                src={HOMEPAGE_ASSETS.editorial.chemex}
                width={1280}
              />
            </div>
          </Link>
          <span className="homepage-editorial__eyebrow">{HOMEPAGE_EDITORIAL_FEATURE.eyebrow}</span>
          <h3 className="homepage-editorial__feature-title">
            {HOMEPAGE_EDITORIAL_FEATURE.title}
          </h3>
          <p className="homepage-editorial__feature-body">{HOMEPAGE_EDITORIAL_FEATURE.body}</p>
          <Link className="btn-ghost" prefetch="intent" to={featureHref}>
            {HOMEPAGE_EDITORIAL_FEATURE.cta.label}
          </Link>
          <blockquote className="homepage-editorial__review">
            <p className="homepage-editorial__review-text">
              {HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW.text}
            </p>
            <footer className="homepage-editorial__review-footer">
              <cite className="homepage-editorial__review-cite">
                {HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW.attribution}
              </cite>
              <span className="homepage-editorial__review-detail">
                {HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW.detail}
              </span>
            </footer>
          </blockquote>
        </article>
        <Stagger className="homepage-editorial__sidebar">
          {HOMEPAGE_EDITORIAL_SIDEBAR.map((item) => (
            <StaggerItem as="article" className="homepage-editorial__card" key={item.title}>
              <Link className="homepage-editorial__card-link" prefetch="intent" to={item.cta.to}>
                <div className="homepage-editorial__card-image-wrap">
                  <img
                    alt=""
                    className="homepage-editorial__card-image"
                    height={600}
                    loading="lazy"
                    src={SIDEBAR_IMAGES[item.imageKey]}
                    width={600}
                  />
                </div>
                <span className="homepage-editorial__card-eyebrow">{item.eyebrow}</span>
                <h3 className="homepage-editorial__card-title">{item.title}</h3>
                <span className="homepage-editorial__card-cta">{item.cta.label}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
