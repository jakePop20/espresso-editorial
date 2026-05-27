import {useState} from 'react';
import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {motion, useReducedMotion} from 'motion/react';
import {HomepageMediaImage} from '~/components/homepage/HomepageMediaImage';
import {HOVER_TRANSITION} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';
import {getCheckoutOption} from '~/lib/subscription/commerce';
import type {SubscriptionCommerceTier} from '~/lib/subscription/commerce';
import type {SubscriptionFrequencyId, SubscriptionPageTier} from '~/lib/subscription/types';
import {SubscribeButton} from '~/components/subscription/SubscribeButton';

type SubscriptionTierCardProps = {
  tier: SubscriptionPageTier;
  price: MoneyV2;
  frequency: SubscriptionFrequencyId;
  commerce: SubscriptionCommerceTier[];
};

function FeatureIcon({icon}: {icon?: 'check' | 'star'}) {
  if (icon === 'star') {
    return (
      <span
        aria-hidden
        className="material-symbols-outlined mt-0.5 shrink-0 text-sm text-roasted-clay"
        style={{fontVariationSettings: "'FILL' 1, 'wght' 300"}}
      >
        star
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="material-symbols-outlined mt-0.5 shrink-0 text-sm text-roasted-clay"
      style={{fontVariationSettings: "'FILL' 0, 'wght' 300"}}
    >
      check
    </span>
  );
}

export function SubscriptionTierCard({
  tier,
  price,
  frequency,
  commerce,
}: SubscriptionTierCardProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const highlighted = Boolean(tier.highlighted);

  const className = highlighted
    ? 'homepage-subscription-card homepage-subscription-card--highlighted homepage-subscription-card--motion homepage-subscription-card--detail'
    : 'homepage-subscription-card homepage-subscription-card--motion homepage-subscription-card--detail';

  const imageClassName = highlighted
    ? 'homepage-subscription-card__image'
    : 'homepage-subscription-card__image homepage-subscription-card__image--motion';

  const image = (
    <HomepageMediaImage
      className={imageClassName}
      image={tier.image}
      sizes="(min-width: 768px) 33vw, 100vw"
    />
  );

  const imageAtRest = highlighted
    ? {scale: 1}
    : {scale: 1, filter: 'grayscale(100%)'};
  const imageHovered = highlighted
    ? {scale: 1.06}
    : {scale: 1.06, filter: 'grayscale(0%)'};

  const imageWrap =
    mounted && !reducedMotion ? (
      <motion.div
        className="homepage-subscription-card__image-wrap"
        animate={hovered ? imageHovered : imageAtRest}
        transition={HOVER_TRANSITION}
      >
        {image}
      </motion.div>
    ) : (
      <div className="homepage-subscription-card__image-wrap">{image}</div>
    );

  return (
    <article
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tier.badge ? (
        <span className="homepage-subscription-card__badge">{tier.badge}</span>
      ) : null}

      <span className="homepage-subscription-card__tier-label">
        {tier.tierLabel}
      </span>
      <h2 className="homepage-subscription-card__tier">{tier.name}</h2>

      {imageWrap}

      <ul className="homepage-subscription-card__features">
        {tier.features.map((feature) => (
          <li key={feature.text} className="homepage-subscription-card__feature">
            <FeatureIcon icon={feature.icon} />
            <span
              className={
                feature.highlighted
                  ? 'homepage-subscription-card__feature-text homepage-subscription-card__feature-text--emphasis'
                  : 'homepage-subscription-card__feature-text'
              }
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <p className="homepage-subscription-card__price">
        <Money as="span" data={price} />
        <span className="homepage-subscription-card__price-suffix">
          {' '}
          / shipment
        </span>
      </p>

      <SubscribeButton
        tierId={tier.id}
        frequency={frequency}
        label={tier.ctaLabel}
        highlighted={highlighted}
        disabled={!getCheckoutOption(commerce, tier.id, frequency)}
        disabledReason="This subscription is not available for the selected delivery frequency."
      />
    </article>
  );
}
