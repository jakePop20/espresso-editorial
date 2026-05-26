import {Link} from 'react-router';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {
  HOMEPAGE_EDITORIAL_FEATURE,
  HOMEPAGE_EDITORIAL_SIDEBAR,
} from '~/lib/homepage/content';

const SIDEBAR_IMAGES = {
  huila: HOMEPAGE_ASSETS.editorial.huila,
  slowLiving: HOMEPAGE_ASSETS.editorial.slowLiving,
} as const;

export function EditorialGridSection() {
  return (
    <section className="homepage-editorial section" aria-label="Editorial features">
      <div className="homepage-editorial__grid">
        <article className="homepage-editorial__feature">
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
          <span className="homepage-editorial__eyebrow">{HOMEPAGE_EDITORIAL_FEATURE.eyebrow}</span>
          <h2 className="homepage-editorial__feature-title">
            {HOMEPAGE_EDITORIAL_FEATURE.title}
          </h2>
          <p className="homepage-editorial__feature-body">{HOMEPAGE_EDITORIAL_FEATURE.body}</p>
          <Link className="btn-ghost" prefetch="intent" to={HOMEPAGE_EDITORIAL_FEATURE.cta.to}>
            {HOMEPAGE_EDITORIAL_FEATURE.cta.label}
          </Link>
        </article>
        <div className="homepage-editorial__sidebar">
          {HOMEPAGE_EDITORIAL_SIDEBAR.map((item) => (
            <article className="homepage-editorial__card" key={item.title}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
