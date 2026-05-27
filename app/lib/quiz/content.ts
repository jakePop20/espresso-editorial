import type {
  QuizAnswerIndex,
  QuizPageContent,
  QuizProfileContent,
  QuizStepContent,
} from '~/lib/quiz/types';

export const QUIZ_STEPS: QuizStepContent[] = [
  {
    category: 'FEEL',
    question: 'How do you want your coffee to feel?',
    lead: 'Think texture, body, and how it lands on your palate.',
    choices: [
      {
        id: 0,
        title: 'Bright & lively',
        description: 'Crisp acidity and sparkling clarity.',
        icon: 'wb_sunny',
      },
      {
        id: 1,
        title: 'Smooth & balanced',
        description: 'Comforting sweetness with an even finish.',
        icon: 'balance',
      },
      {
        id: 2,
        title: 'Deep & bold',
        description: 'Dense body with a lingering intensity.',
        icon: 'dark_mode',
      },
    ],
  },
  {
    category: 'FLAVOR',
    question: 'Which flavor sounds most inviting?',
    lead: 'Pick the notes you want to linger after the sip.',
    choices: [
      {
        id: 0,
        title: 'Citrus & berries',
        description: 'Fruit-forward, vibrant, and aromatic.',
        icon: 'local_florist',
      },
      {
        id: 1,
        title: 'Caramel & toasted nuts',
        description: 'Round sweetness with warm, nutty depth.',
        icon: 'cookie',
      },
      {
        id: 2,
        title: 'Dark chocolate & spice',
        description: 'Rich cocoa with a subtle, peppery edge.',
        icon: 'restaurant',
      },
    ],
  },
  {
    category: 'MOMENT',
    question: 'Your ideal coffee moment?',
    lead: 'Choose the pace you want your cup to set.',
    choices: [
      {
        id: 0,
        title: 'A slow morning with sunlight',
        description: 'Gentle, bright, unhurried.',
        icon: 'coffee',
      },
      {
        id: 1,
        title: 'A quiet afternoon reset',
        description: 'Centered, steady, and calm.',
        icon: 'self_improvement',
      },
      {
        id: 2,
        title: 'An early start with purpose',
        description: 'Focused, driven, and bold.',
        icon: 'bolt',
      },
    ],
  },
  {
    category: 'ATMOSPHERE',
    question: 'Pick the atmosphere that feels most like you.',
    lead: 'This one’s about mood more than taste.',
    choices: [
      {
        id: 0,
        title: 'A bright café by the window',
        description: 'Open, airy, and vibrant.',
        icon: 'storefront',
      },
      {
        id: 1,
        title: 'A cozy reading nook',
        description: 'Warm, grounded, and sweet.',
        icon: 'menu_book',
      },
      {
        id: 2,
        title: 'A city street before sunrise',
        description: 'Dark, electric, and intentional.',
        icon: 'nightlife',
      },
    ],
  },
];

export const QUIZ_PROFILES: Record<QuizAnswerIndex, QuizProfileContent> = {
  0: {
    title: 'The Bright Explorer',
    subtitle: 'Fruit-forward, vibrant coffees',
    description:
      'You’re drawn to clarity and lift—coffees that feel like sunlight through glass. Expect lively acidity, floral aromatics, and bright fruit notes.',
  },
  1: {
    title: 'The Classic Storyteller',
    subtitle: 'Balanced, sweet, approachable',
    description:
      'You love harmony—comforting sweetness, gentle structure, and an easy finish. Expect caramel, toasted nuts, and smooth, rounded cups.',
  },
  2: {
    title: 'The Bold Ritualist',
    subtitle: 'Rich, intense, darker profiles',
    description:
      'You want depth and presence—coffees that anchor the day. Expect cocoa, spice, and a heavier body with a long, resonant finish.',
  },
};

/** Hardcoded until quiz CTAs are managed in Shopify. */
export const QUIZ_PRIMARY_CTA = {
  label: 'Add to Subscription',
  to: '/pages/subscription',
} as const;

export const QUIZ_RETAKE_LABEL = 'Take again';

export const QUIZ_PAGE: QuizPageContent = {
  metaTitle: 'Espresso Editorial | Find Your Roast',
  resultLabel: 'YOUR ROAST',
  steps: QUIZ_STEPS,
  profiles: QUIZ_PROFILES,
  primaryCta: {...QUIZ_PRIMARY_CTA},
  retakeLabel: QUIZ_RETAKE_LABEL,
};
