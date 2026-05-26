import {Link} from 'react-router';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {
  HOMEPAGE_SUBSCRIPTION_TIERS,
  HOMEPAGE_SUBSCRIPTIONS_INTRO,
} from '~/lib/homepage/content';

export function SubscriptionsSection() {
  return (
    <section className="homepage-subscriptions" aria-labelledby="homepage-subscriptions-title">
      <div className="homepage-subscriptions__intro section-intro">
        <span className="eyebrow">{HOMEPAGE_SUBSCRIPTIONS_INTRO.eyebrow}</span>
        <h2 className="homepage-subscriptions__title" id="homepage-subscriptions-title">
          {HOMEPAGE_SUBSCRIPTIONS_INTRO.title}
        </h2>
        <p className="homepage-subscriptions__lead">{HOMEPAGE_SUBSCRIPTIONS_INTRO.body}</p>
      </div>
      <div className="homepage-subscriptions__grid section">
        {HOMEPAGE_SUBSCRIPTION_TIERS.map((tier) => (
          <article
            className={
              tier.highlighted
                ? 'homepage-subscription-card homepage-subscription-card--highlighted'
                : 'homepage-subscription-card card-interactive group'
            }
            key={tier.id}
          >
            {tier.badge ? (
              <span className="homepage-subscription-card__badge">{tier.badge}</span>
            ) : null}
            <span className="homepage-subscription-card__tier">{tier.name}</span>
            <div className="homepage-subscription-card__image-wrap">
              <img
                alt={`${tier.name} subscription`}
                className={
                  tier.highlighted
                    ? 'homepage-subscription-card__image'
                    : 'homepage-subscription-card__image homepage-subscription-card__image--grayscale'
                }
                height={1000}
                loading="lazy"
                src={HOMEPAGE_ASSETS.subscriptions[tier.id]}
                width={800}
              />
            </div>
            <h3 className="homepage-subscription-card__bags">{tier.bagsLabel}</h3>
            <p className="homepage-subscription-card__description">{tier.description}</p>
            <p className="homepage-subscription-card__price">{tier.priceLabel}</p>
            <Link
              className={
                tier.highlighted
                  ? 'homepage-subscription-card__cta homepage-subscription-card__cta--light'
                  : 'homepage-subscription-card__cta btn-secondary w-full'
              }
              prefetch="intent"
              to={`/pages/subscription?tier=${tier.id}`}
            >
              Select Edition
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
