import {Reveal} from '~/components/motion/Reveal';
import {SubscriptionTierCard} from '~/components/homepage/sections/SubscriptionTierCard';
import {HOMEPAGE_SUBSCRIPTIONS_INTRO} from '~/lib/homepage/content';
import type {HomepageSubscriptionTierContent} from '~/lib/homepage/types';

type SubscriptionsSectionProps = {
  tiers: HomepageSubscriptionTierContent[];
};

export function SubscriptionsSection({tiers}: SubscriptionsSectionProps) {
  return (
    <section className="homepage-subscriptions" aria-labelledby="homepage-subscriptions-title">
      <Reveal className="homepage-subscriptions__intro section-intro">
        <span className="eyebrow">{HOMEPAGE_SUBSCRIPTIONS_INTRO.eyebrow}</span>
        <h2 className="homepage-subscriptions__title" id="homepage-subscriptions-title">
          {HOMEPAGE_SUBSCRIPTIONS_INTRO.title}
        </h2>
        <p className="homepage-subscriptions__lead">{HOMEPAGE_SUBSCRIPTIONS_INTRO.body}</p>
      </Reveal>
      <div className="homepage-subscriptions__grid section">
        {tiers.map((tier) => (
          <SubscriptionTierCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}
