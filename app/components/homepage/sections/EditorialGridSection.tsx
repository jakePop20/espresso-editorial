import {Link} from 'react-router';
import {Stagger, StaggerItem} from '~/components/motion/Stagger';
import {HomepageMediaImage} from '~/components/homepage/HomepageMediaImage';
import type {HomepageEditorialContent} from '~/lib/homepage/types';

type EditorialGridSectionProps = {
  editorial: HomepageEditorialContent;
};

export function EditorialGridSection({editorial}: EditorialGridSectionProps) {
  const {feature} = editorial;

  return (
    <section className="homepage-editorial" aria-labelledby="homepage-editorial-title">
      <div className="homepage-editorial__intro section section-intro">
        <span className="eyebrow">{editorial.intro.eyebrow}</span>
        <h2 className="homepage-editorial__title" id="homepage-editorial-title">
          {editorial.intro.title}
        </h2>
      </div>
      <div className="homepage-editorial__grid section">
        <article className="homepage-editorial__feature">
          <Link
            aria-label={feature.title}
            className="homepage-editorial__feature-image-link"
            prefetch="intent"
            to={feature.cta.to}
          >
            <div className="homepage-editorial__feature-image-wrap">
              <HomepageMediaImage
                className="homepage-editorial__feature-image"
                image={feature.image}
                sizes="(min-width: 768px) 66vw, 100vw"
              />
            </div>
          </Link>
          <span className="homepage-editorial__eyebrow">{feature.eyebrow}</span>
          <h3 className="homepage-editorial__feature-title">{feature.title}</h3>
          {feature.body ? (
            <p className="homepage-editorial__feature-body">{feature.body}</p>
          ) : null}
          <Link className="btn-ghost" prefetch="intent" to={feature.cta.to}>
            {feature.cta.label}
          </Link>
          <blockquote className="homepage-editorial__review">
            <p className="homepage-editorial__review-text">{editorial.review.text}</p>
            <footer className="homepage-editorial__review-footer">
              <cite className="homepage-editorial__review-cite">
                {editorial.review.attribution}
              </cite>
              <span className="homepage-editorial__review-detail">
                {editorial.review.detail}
              </span>
            </footer>
          </blockquote>
        </article>
        <Stagger className="homepage-editorial__sidebar">
          {editorial.sidebar.map((item) => (
            <StaggerItem as="article" className="homepage-editorial__card" key={item.handle}>
              <Link className="homepage-editorial__card-link" prefetch="intent" to={item.cta.to}>
                <div className="homepage-editorial__card-image-wrap">
                  <HomepageMediaImage
                    className="homepage-editorial__card-image"
                    image={item.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
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
