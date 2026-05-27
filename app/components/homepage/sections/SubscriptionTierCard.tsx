import {Image} from '@shopify/hydrogen';
import {motion, useReducedMotion} from 'motion/react';
import {useState} from 'react';
import {Link} from 'react-router';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {HOVER_TRANSITION} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';
import type {HomepageSubscriptionTierContent} from '~/lib/homepage/types';

type SubscriptionTierCardProps = {
  tier: HomepageSubscriptionTierContent;
};

export function SubscriptionTierCard({tier}: SubscriptionTierCardProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const highlighted = Boolean(tier.highlighted);
  const tierHref = `/pages/subscription?tier=${tier.id}`;

  const className = highlighted
    ? 'homepage-subscription-card homepage-subscription-card--highlighted homepage-subscription-card--motion'
    : 'homepage-subscription-card homepage-subscription-card--motion';

  const imageClassName = highlighted
    ? 'homepage-subscription-card__image'
    : 'homepage-subscription-card__image homepage-subscription-card__image--motion';

  const image = tier.image ? (
    <Image
      alt=""
      className={imageClassName}
      data={tier.image}
      loading="lazy"
      sizes="(min-width: 768px) 33vw, 100vw"
    />
  ) : (
    <img
      alt=""
      className={imageClassName}
      height={1000}
      loading="lazy"
      src={HOMEPAGE_ASSETS.subscriptions[tier.id]}
      width={800}
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

  const content = (
    <>
      {tier.badge ? (
        <span className="homepage-subscription-card__badge">{tier.badge}</span>
      ) : null}
      <span className="homepage-subscription-card__tier">{tier.name}</span>
      {imageWrap}
      <h3 className="homepage-subscription-card__bags">{tier.bagsLabel}</h3>
      <p className="homepage-subscription-card__description">{tier.description}</p>
      <p className="homepage-subscription-card__price">{tier.priceLabel}</p>
    </>
  );

  return (
    <Link
      aria-label={`Select ${tier.name} subscription — ${tier.bagsLabel}, ${tier.priceLabel}`}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      prefetch="intent"
      to={tierHref}
    >
      {content}
    </Link>
  );
}
