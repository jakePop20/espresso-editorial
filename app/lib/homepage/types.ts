import type {SubscriptionTierId} from '~/lib/homepage/content';

export type HomepageCta = {
  label: string;
  to: string;
};

export type HomepageImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type HomepageHeroContent = {
  title: string;
  eyebrow: string | null;
  image: HomepageImage | null;
  primaryCta: HomepageCta;
  secondaryCta: HomepageCta;
};

export type HomepageStoryPillar = {
  number: string;
  title: string;
  body: string;
};

export type HomepageStoryContent = {
  eyebrow: string;
  title: string;
  body: string;
  image: HomepageImage | null;
  pillars: HomepageStoryPillar[];
  quote: {
    text: string;
    attribution: string;
  };
};

export type HomepageSubscriptionTierContent = {
  id: SubscriptionTierId;
  name: string;
  bagsLabel: string;
  description: string;
  priceLabel: string;
  image: HomepageImage | null;
  highlighted?: boolean;
  badge?: string;
};

export type HomepageDeferredContent = {
  story: HomepageStoryContent;
  subscriptionTiers: HomepageSubscriptionTierContent[];
};
