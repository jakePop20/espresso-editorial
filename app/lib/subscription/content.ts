import type {HomepageImage} from '~/lib/homepage/types';
import type {
  SubscriptionFrequencyId,
  SubscriptionPageContent,
  SubscriptionPageTier,
} from '~/lib/subscription/types';

const TIER_IMAGES: Record<string, HomepageImage> = {
  discover: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbXp5NHyJQj3dz3XOBIAKE5aar0FA5F6Gnco7P4bza1vZaZrERdtjsdKXZkgqmVRZcHUkyc90zxEQX0DyJoQnztS1qWfe3O5ZyegPd86WB5DaK1j3rlvtx9c9CDkarZHA2y6QBX0LNmq_oGCLpK-inYqTZBBhJkDQ2s3QKwp8XzwTlA3xXKCkcqoz3HfjczWb0BnHlFm9C2GkloIlukL-_i7jf2xHFA-ek55Y_W85CYUKenajMcjSLgN6suFhQP02rEPYvNJapI3nb',
    altText: 'Premium coffee beans scattered on cream linen',
    width: 800,
    height: 1000,
  },
  enthusiast: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBNIU_zUqLldUhK9h52yKzX_szm-TVqn6UkdH1tQxNm7BZogPpbwpkQ1_COALL8CxPE909ObuRZq2gLo9SVRfCIO8U7zECsdA6pLPjRVVXWHR26c-spyjGQfHge2cdQuFEedyC_MuoH3jVN8BljoPlRXJ2D1Lwg640lCDAbkhvsSjqSg5iuYEDfRX_UQVdtXybjxemUg_7mzkthMKz6irBt8IRqgT48ACgRd9yyxAls3JVTS_UUVcVWjwBKguno2apBe-2vmKdamhs',
    altText: 'Pour-over coffee extraction in warm studio light',
    width: 800,
    height: 1000,
  },
  master: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmloakLEW84opDXT8Uq_va6FAVBaqjcQCiPaMGRil4NPa_G7WJ-2-kzEjYLxpyLtHd1bEvtGR4IgZqvoWpE84KTGH8L-tvVvyMZwI5S-7c8FvPQTa5mCpWNvZN6o1KqKRZ_CpT4PF66VTCESmwsMc1AigDTHi-WBuzrSIrp9afI0o8aaVk5gilqAxr0yO0MfrmZQUAZucke76aQYFABrCkBdYA4Mm6CZG_ASymZmmwfuGAwxORv9la3alj7ZaLIPdCijLxQ2by2O6B',
    altText: 'High-end coffee brewing equipment in a minimalist studio',
    width: 800,
    height: 1000,
  },
};

export const SUBSCRIPTION_FREQUENCIES: Array<{
  id: SubscriptionFrequencyId;
  label: string;
}> = [
  {id: 'weekly', label: 'Weekly'},
  {id: 'biweekly', label: 'Bi-Weekly'},
  {id: 'monthly', label: 'Monthly'},
];

export const SUBSCRIPTION_FREQUENCY_MODIFIERS: Record<
  SubscriptionFrequencyId,
  number
> = {
  weekly: 1,
  biweekly: 1.8,
  monthly: 3.2,
};

export const SUBSCRIPTION_DEFAULT_TIERS: SubscriptionPageTier[] = [
  {
    id: 'discover',
    tierLabel: 'Tier 01',
    name: 'Discovery',
    basePrice: 24,
    image: TIER_IMAGES.discover,
    features: [
      {text: 'Rotating Single Origin Bean (250g)'},
      {text: 'Origin Flavor Profile Card'},
      {text: 'Free standard shipping'},
    ],
    ctaLabel: 'Select Discovery',
  },
  {
    id: 'enthusiast',
    tierLabel: 'Tier 02',
    name: 'Enthusiast',
    basePrice: 42,
    image: TIER_IMAGES.enthusiast,
    highlighted: true,
    badge: 'Most Popular',
    features: [
      {
        text: 'Two 250g Signature Roasts',
        highlighted: true,
        icon: 'star',
      },
      {text: 'Early access to limited drops'},
      {text: 'Monthly Brewing Narrative Guide'},
      {text: 'Complimentary Tasting Journal'},
    ],
    ctaLabel: 'Select Enthusiast',
  },
  {
    id: 'master',
    tierLabel: 'Tier 03',
    name: 'Master',
    basePrice: 68,
    image: TIER_IMAGES.master,
    features: [
      {text: 'Reserve Micro-Lot Beans (500g)'},
      {text: '1-on-1 Quarterly Virtual Cupping'},
      {text: 'Exclusive Masterclass Access'},
      {text: 'Priority Lab Testing Reports'},
    ],
    ctaLabel: 'Select Master',
  },
];

export const SUBSCRIPTION_COMPARISON = {
  title: 'Comparing the craft.',
  columns: [
    {id: 'discover', tierLabel: 'Tier 01', name: 'Discovery'},
    {
      id: 'enthusiast',
      tierLabel: 'Tier 02',
      name: 'Enthusiast',
      editorsChoice: "THE EDITOR'S CHOICE",
    },
    {id: 'master', tierLabel: 'Tier 03', name: 'Master'},
  ],
  rows: [
    {
      label: 'Shipping',
      values: {
        discover: 'Free Standard',
        enthusiast: 'Free Express',
        master: 'Free Overnight',
      },
    },
    {
      label: 'Early Access',
      values: {
        discover: false,
        enthusiast: true,
        master: true,
      },
    },
    {
      label: 'Brew Guides',
      values: {
        discover: 'Digital PDF',
        enthusiast: 'Printed Edition',
        master: 'Premium Kit',
      },
    },
    {
      label: 'Customization',
      values: {
        discover: 'Partial',
        enthusiast: 'Full Profile',
        master: 'Bespoke Roasting',
      },
    },
  ],
} as const;

export const SUBSCRIPTION_TESTIMONIALS = {
  eyebrow: 'Words from the Field',
  backgroundImage: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGduVAHqQh_Q1BIMF7Y2cofUZfugDqidxuhYECaSXXT1u328RRWPoSLayv5NI2f0_Gt7DqIOv0RI3OuOBV9saNeMOaAafq_cBtMmF84VZng-B5VTYNyowICNhMq0xcjEtNLM8SCXPbr_7qGxOQwgNKGFQ3wQbq3V3Xi61fDnF704r65GxtydrWUYUIqaqqbfrWVpT1FRy1I93s7-QJu34pbBStg0_gKB5jxGLp8AHDrbgsYCxlm_AZXRnF6alHqnDYFXX8yFMeGVjP',
    altText: 'Macro detail of freshly roasted coffee beans',
    width: 1200,
    height: 800,
  } satisfies HomepageImage,
  items: [
    {
      quote:
        "Espresso Editorial doesn't just deliver beans; they deliver a curated education. The Enthusiast tier has completely transformed my weekend mornings.",
      author: 'Julian Devereaux',
      title: 'SCA Certified Brewmaster',
      initials: 'JD',
    },
    {
      quote:
        'The transparency of origin and the quality of roasting is unparalleled. It\u2019s the only subscription that satisfies a professional palate.',
      author: 'Sarah Lin',
      title: 'Roaster at Origin Collective',
      initials: 'SL',
    },
  ],
};

export function getDefaultSubscriptionPage(): SubscriptionPageContent {
  return {
    metaTitle: 'Espresso Editorial | Subscriptions',
    hero: {
      eyebrow: 'The Ritual Awaits',
      title: 'Curated bean-to-cup narratives, delivered.',
      lead: 'Subscribe to a world of specialty coffee. From origin-focused discovery to master-level brewing, select the path that suits your morning ritual.',
    },
    frequencies: SUBSCRIPTION_FREQUENCIES,
    frequencyModifiers: SUBSCRIPTION_FREQUENCY_MODIFIERS,
    tiers: SUBSCRIPTION_DEFAULT_TIERS,
    commerce: [],
    comparison: SUBSCRIPTION_COMPARISON,
    testimonials: SUBSCRIPTION_TESTIMONIALS,
  };
}

export function formatShipmentPrice(amount: number, currencyCode = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${Math.round(amount)}`;
  }
}
