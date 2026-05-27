export type SubscriptionTierId = 'discover' | 'enthusiast' | 'master';

export type SubscriptionTier = {
  id: SubscriptionTierId;
  name: string;
  bagsLabel: string;
  description: string;
  priceLabel: string;
  highlighted?: boolean;
  badge?: string;
};

export const HOMEPAGE_HERO = {
  title: 'Poetry in Every Pour.',
  primaryCta: {label: 'Start Your Journey', to: '/pages/quiz'},
  secondaryCta: {label: 'Explore the Origin', to: '#story'},
} as const;

export const HOMEPAGE_STORY = {
  eyebrow: 'The Editorial Standard',
  title: 'The Art of the Roast.',
  body: 'We treat coffee like literature—each bean is a character, every origin a setting, and the roast is the narrative arc. We don\u2019t just source coffee; we curate sensory experiences that demand a slower pace of life.',
  pillars: [
    {
      number: '01',
      title: 'Single Origin Integrity',
      body: 'Unblended, pure expressions of terroir from altitude-defying micro-lots.',
    },
    {
      number: '02',
      title: 'Small Batch Precision',
      body: 'Roasted in 5kg drums to ensure each cell structure is perfectly developed.',
    },
  ],
  quote: {
    text: '\u201cPrecision is the only ingredient we never measure—it is simply a constant in our process.\u201d',
    attribution: '— Master Roaster, Elena V.',
  },
} as const;

export const HOMEPAGE_SUBSCRIPTIONS_INTRO = {
  eyebrow: 'Tailored for You',
  title: 'The Subscription Editions.',
  body: 'Choose your rhythm. From the casual explorer to the seasoned connoisseur, our subscriptions are crafted to evolve with your palate.',
} as const;

export const HOMEPAGE_SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'discover',
    name: 'Discover',
    bagsLabel: '1 Bag / Month',
    description:
      'One curated single-origin discovery sent to your door every 30 days.',
    priceLabel: '$24 / Delivery',
  },
  {
    id: 'enthusiast',
    name: 'Enthusiast',
    bagsLabel: '2 Bags / Month',
    description:
      'Our most popular selection. Two contrasting profiles to compare and contrast.',
    priceLabel: '$42 / Delivery',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'master',
    name: 'Master',
    bagsLabel: '4 Bags / Month',
    description:
      'For the true enthusiast. A complete tour of the month\u2019s finest harvests.',
    priceLabel: '$78 / Delivery',
  },
];

export const HOMEPAGE_QUIZ_CTA = {
  title: 'Not sure where to begin your story?',
  body: 'Take our 2-minute palate assessment. We\u2019ll analyze your flavor preferences to find your perfect roast profile.',
  cta: {label: 'Find Your Profile', to: '/pages/quiz'},
} as const;

export const HOMEPAGE_EDITORIAL_INTRO = {
  eyebrow: 'From the Journal',
  title: 'Stories Worth Savoring',
} as const;

export const HOMEPAGE_EDITORIAL_FEATURE = {
  handle: 'brew-guide',
  eyebrow: 'Brew Guide',
  title: 'The Ritual of the Chemex: Clarity in Every Cup',
  body: 'Learn why the thick paper filter is the secret to unlocking the delicate floral notes in our lighter Ethiopian roasts.',
  cta: {label: 'Read Article', to: '/blogs/journal'},
} as const;

export const HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW = {
  text: '\u201cThe Enthusiast edition changed how I taste coffee. Each delivery feels like opening a letter from someone who truly understands my palate.\u201d',
  attribution: 'Sarah M.',
  detail: 'Enthusiast Subscriber \u00b7 8 months',
} as const;

export const HOMEPAGE_EDITORIAL_SIDEBAR = [
  {
    handle: 'origin-story',
    eyebrow: 'Origin Story',
    title: 'Huila: High Altitude, Higher Standards',
    cta: {label: 'Explore Region', to: '/blogs/journal'},
  },
  {
    handle: 'sustainability',
    eyebrow: 'Sustainability',
    title: 'Beyond the Fair Trade Label',
    cta: {label: 'Our Commitment', to: '/pages/sustainability'},
  },
] as const;
