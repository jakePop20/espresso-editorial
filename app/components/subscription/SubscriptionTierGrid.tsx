import {useEffect, useMemo, useRef} from 'react';
import {getShipmentPrice, type SubscriptionCommerceTier} from '~/lib/subscription/commerce';
import type {
  SubscriptionFrequencyId,
  SubscriptionPageTier,
} from '~/lib/subscription/types';
import {SubscriptionTierCard} from '~/components/subscription/SubscriptionTierCard';

type SubscriptionTierGridProps = {
  tiers: SubscriptionPageTier[];
  frequency: SubscriptionFrequencyId;
  frequencyModifiers: Record<SubscriptionFrequencyId, number>;
  commerce: SubscriptionCommerceTier[];
  initialTierId?: string | null;
};

export function SubscriptionTierGrid({
  tiers,
  frequency,
  frequencyModifiers,
  commerce,
  initialTierId,
}: SubscriptionTierGridProps) {
  const tierRefs = useRef<Record<string, HTMLElement | null>>({});

  const prices = useMemo(() => {
    const modifier = frequencyModifiers[frequency];
    return tiers.map((tier) => {
      const fromShopify = getShipmentPrice(commerce, tier.id, frequency);
      if (fromShopify) return fromShopify;
      return {
        amount: String(Math.floor(tier.basePrice * modifier)),
        currencyCode: 'USD' as const,
      };
    });
  }, [commerce, frequency, frequencyModifiers, tiers]);

  useEffect(() => {
    if (!initialTierId) return;
    const node = tierRefs.current[initialTierId];
    node?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, [initialTierId]);

  return (
    <section className="section homepage-subscriptions__grid ee-subscription__tier-section">
      {tiers.map((tier, index) => (
        <div
          key={tier.id}
          ref={(node) => {
            tierRefs.current[tier.id] = node;
          }}
        >
          <SubscriptionTierCard
            commerce={commerce}
            frequency={frequency}
            price={prices[index]}
            tier={tier}
          />
        </div>
      ))}
    </section>
  );
}
