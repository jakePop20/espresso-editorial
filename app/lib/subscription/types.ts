import type {SubscriptionTierId} from '~/lib/homepage/content';
import type {HomepageImage} from '~/lib/homepage/types';
import type {SubscriptionCommerceTier} from '~/lib/subscription/commerce';

export type SubscriptionFrequencyId = 'weekly' | 'biweekly' | 'monthly';

export type SubscriptionTierFeature = {
  text: string;
  highlighted?: boolean;
  icon?: 'check' | 'star';
};

export type SubscriptionPageTier = {
  id: SubscriptionTierId;
  tierLabel: string;
  name: string;
  basePrice: number;
  image: HomepageImage | null;
  features: SubscriptionTierFeature[];
  highlighted?: boolean;
  badge?: string;
  ctaLabel: string;
};

export type SubscriptionComparisonRow = {
  label: string;
  values: Record<SubscriptionTierId, string | boolean>;
};

export type SubscriptionComparisonColumn = {
  id: SubscriptionTierId;
  tierLabel: string;
  name: string;
  editorsChoice?: string;
};

export type SubscriptionComparisonContent = {
  title: string;
  columns: SubscriptionComparisonColumn[];
  rows: SubscriptionComparisonRow[];
};

export type SubscriptionTestimonial = {
  quote: string;
  author: string;
  title: string;
  initials: string;
};

export type SubscriptionPageContent = {
  metaTitle: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  frequencies: Array<{id: SubscriptionFrequencyId; label: string}>;
  frequencyModifiers: Record<SubscriptionFrequencyId, number>;
  tiers: SubscriptionPageTier[];
  commerce: SubscriptionCommerceTier[];
  comparison: SubscriptionComparisonContent;
  testimonials: {
    eyebrow: string;
    items: SubscriptionTestimonial[];
    backgroundImage: HomepageImage | null;
  };
};

/** Static marketing copy and layout data — not fetched from Shopify. */
export type SubscriptionPageShell = Omit<
  SubscriptionPageContent,
  'tiers' | 'commerce'
>;

/** Shopify-backed tier pricing and checkout options — loaded after the page shell. */
export type SubscriptionDeferredContent = Pick<
  SubscriptionPageContent,
  'tiers' | 'commerce'
>;
