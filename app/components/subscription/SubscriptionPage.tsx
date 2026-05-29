import {Suspense, useState} from 'react';
import {Await} from 'react-router';
import type {
  SubscriptionDeferredContent,
  SubscriptionFrequencyId,
  SubscriptionPageShell,
} from '~/lib/subscription/types';
import {SubscriptionComparison} from '~/components/subscription/SubscriptionComparison';
import {SubscriptionFrequencySelector} from '~/components/subscription/SubscriptionFrequencySelector';
import {SubscriptionHero} from '~/components/subscription/SubscriptionHero';
import {SubscriptionTestimonials} from '~/components/subscription/SubscriptionTestimonials';
import {SubscriptionTierGrid} from '~/components/subscription/SubscriptionTierGrid';

type SubscriptionPageProps = {
  subscriptionShell: SubscriptionPageShell;
  subscriptionDeferred: Promise<SubscriptionDeferredContent>;
  initialTierId?: string | null;
};

type SubscriptionTiersProps = {
  deferred: SubscriptionDeferredContent;
  frequency: SubscriptionFrequencyId;
  frequencyModifiers: SubscriptionPageShell['frequencyModifiers'];
  initialTierId?: string | null;
};

function SubscriptionTiers({
  deferred,
  frequency,
  frequencyModifiers,
  initialTierId,
}: SubscriptionTiersProps) {
  return (
    <SubscriptionTierGrid
      commerce={deferred.commerce}
      frequency={frequency}
      frequencyModifiers={frequencyModifiers}
      initialTierId={initialTierId}
      tiers={deferred.tiers}
    />
  );
}

function SubscriptionTiersLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading subscription tiers"
      className="section ee-subscription__tier-section ee-subscription__tier-section--loading"
    />
  );
}

export function SubscriptionPage({
  subscriptionShell,
  subscriptionDeferred,
  initialTierId,
}: SubscriptionPageProps) {
  const [frequency, setFrequency] = useState<SubscriptionFrequencyId>('weekly');

  return (
    <div className="ee-subscription">
      <SubscriptionHero hero={subscriptionShell.hero} />
      <SubscriptionFrequencySelector
        frequencies={subscriptionShell.frequencies}
        onChange={setFrequency}
        selected={frequency}
      />
      <Suspense fallback={<SubscriptionTiersLoading />}>
        <Await resolve={subscriptionDeferred}>
          {(deferred) => (
            <SubscriptionTiers
              deferred={deferred}
              frequency={frequency}
              frequencyModifiers={subscriptionShell.frequencyModifiers}
              initialTierId={initialTierId}
            />
          )}
        </Await>
      </Suspense>
      <SubscriptionComparison comparison={subscriptionShell.comparison} />
      <SubscriptionTestimonials testimonials={subscriptionShell.testimonials} />
    </div>
  );
}
