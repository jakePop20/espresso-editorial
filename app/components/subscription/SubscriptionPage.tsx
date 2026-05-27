import type {SubscriptionPageContent} from '~/lib/subscription/types';
import {SubscriptionComparison} from '~/components/subscription/SubscriptionComparison';
import {SubscriptionFrequencySelector} from '~/components/subscription/SubscriptionFrequencySelector';
import {SubscriptionHero} from '~/components/subscription/SubscriptionHero';
import {SubscriptionTestimonials} from '~/components/subscription/SubscriptionTestimonials';
import {SubscriptionTierGrid} from '~/components/subscription/SubscriptionTierGrid';
import {useState} from 'react';
import type {SubscriptionFrequencyId} from '~/lib/subscription/types';

type SubscriptionPageProps = {
  subscription: SubscriptionPageContent;
  initialTierId?: string | null;
};

export function SubscriptionPage({
  subscription,
  initialTierId,
}: SubscriptionPageProps) {
  const [frequency, setFrequency] = useState<SubscriptionFrequencyId>('weekly');

  return (
    <div className="ee-subscription">
      <SubscriptionHero hero={subscription.hero} />
      <SubscriptionFrequencySelector
        frequencies={subscription.frequencies}
        onChange={setFrequency}
        selected={frequency}
      />
      <SubscriptionTierGrid
        commerce={subscription.commerce}
        frequency={frequency}
        frequencyModifiers={subscription.frequencyModifiers}
        initialTierId={initialTierId}
        tiers={subscription.tiers}
      />
      <SubscriptionComparison comparison={subscription.comparison} />
      <SubscriptionTestimonials testimonials={subscription.testimonials} />
    </div>
  );
}
