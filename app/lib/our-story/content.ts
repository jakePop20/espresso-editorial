import heroImage from '~/assets/our-story-hero.png';
import philosophyImage from '~/assets/our-story-philosophy.png';
import roasteryPrecisionImage from '~/assets/our-story-roastery-precision.png';
import roasterySensoryImage from '~/assets/our-story-roastery-sensory.png';
import roasteryPackagingImage from '~/assets/our-story-roastery-packaging.png';
import type {OurStoryPageContent} from '~/lib/our-story/types';

export const OUR_STORY_PAGE_PATH = '/pages/our-story';

export const OUR_STORY_STORY_IDS = {
  chemex: 'brew-guide',
  huila: 'origin-story',
  sustainability: 'sustainability',
} as const;

export function ourStoryStoryHref(storyId: string) {
  return `${OUR_STORY_PAGE_PATH}#${storyId}`;
}

export function getOurStoryPageContent(): OurStoryPageContent {
  return OUR_STORY_PAGE_CONTENT;
}

export const OUR_STORY_PAGE_CONTENT: OurStoryPageContent = {
  metaTitle: 'Our Story | Espresso Editorial',
  hero: {
    eyebrow: 'ESTABLISHED IN PURSUIT OF THE PERFECT PAUSE',
    titleLines: [
      {before: 'Coffee as ', emphasis: 'Literature', after: '.'},
      {before: 'Life as a ', emphasis: 'Process', after: '.'},
    ],
    lead: 'We believe the finest beans tell a story—not just of soil and altitude, but of the patience required to roast, brew, and finally, savor.',
    image: {
      url: heroImage,
      altText:
        'A ceramic coffee cup on vintage books in warm directional light',
      width: 512,
      height: 512,
    },
  },
  philosophy: {
    eyebrow: 'THE PHILOSOPHY',
    title: 'The Art of the Slow Pour',
    paragraphs: [
      'In a world obsessed with velocity, we choose the deliberate. Espresso Editorial was born from the realization that coffee is more than a stimulant; it is a punctuation mark in the day.',
      'Our roasts are curated like a publishing house selects its authors. We look for character, narrative arc, and a finish that lingers like the final sentence of a great novel. Every bag is a chapter in our ongoing exploration of sensory depth.',
    ],
    manifestoTo: '/pages/subscription',
    image: {
      url: philosophyImage,
      altText: 'Dark roasted coffee beans poured into a silver scoop',
      width: 512,
      height: 512,
    },
    pullQuote: 'Time is the invisible ingredient in every cup.',
  },
  roastery: {
    eyebrow: 'THE ROASTERY',
    title: 'Where Chemistry Meets Soul',
    pillars: [
      {
        title: 'Precision Thermal Profiling',
        body: 'We use micro-batch roasting to isolate the unique molecular signatures of every bean, ensuring the terroir is heard clearly.',
        image: {
          url: roasteryPrecisionImage,
          altText: 'A roaster monitoring a vintage coffee roasting machine',
          width: 512,
          height: 512,
        },
      },
      {
        title: 'The Sensory Edit',
        body: 'Before a roast is approved, it undergoes three rounds of blind cupping by our editorial panel to guarantee a balanced narrative.',
        image: {
          url: roasterySensoryImage,
          altText: 'Hands cupping coffee during a sensory evaluation',
          width: 512,
          height: 512,
        },
      },
      {
        title: 'Sustainable Packaging',
        body: 'Our commitment extends to the vessel. Compostable bags preserve freshness without compromising the planet.',
        image: {
          url: roasteryPackagingImage,
          altText: 'Artisanal coffee packaging on a stone plinth',
          width: 512,
          height: 512,
        },
      },
    ],
  },
  quote: {
    text: 'We do not sell coffee to wake people up; we sell coffee to wake people up to the beauty of their own morning.',
    attribution: '— ARTHUR FINCH, FOUNDER',
  },
  stories: {
    eyebrow: 'FROM THE JOURNAL',
    title: 'Stories Worth Savoring',
    items: [
      {
        id: OUR_STORY_STORY_IDS.chemex,
        eyebrow: 'Brew Guide',
        title: 'The Ritual of the Chemex: Clarity in Every Cup',
        subtitle: 'Brewing · Filter Coffee',
        image: null,
        paragraphs: [
          'Learn why the thick paper filter is the secret to unlocking the delicate floral notes in our lighter Ethiopian roasts.',
          'The Chemex is not merely a brewer—it is a lens. Its bonded filters strip away sediment and oils, leaving a cup that reads like a clean first draft: transparent, bright, and honest about origin.',
          'We recommend a medium-fine grind, water just off the boil, and a pour rhythm slow enough to hear the room. Three minutes of patience yields a clarity that louder methods cannot replicate.',
        ],
      },
      {
        id: OUR_STORY_STORY_IDS.huila,
        eyebrow: 'Origin Story',
        title: 'Huila: High Altitude, Higher Standards',
        subtitle: 'Colombia · 1,900m Altitude',
        image: null,
        paragraphs: [
          'In the mountains of Huila, altitude is not a marketing line—it is a measurable difference in sugar development and acidity.',
          'Our partners harvest in small lots, ferment with intentional restraint, and dry on raised beds where cool air preserves nuance. The result is a profile of red fruit, panela sweetness, and a finish that unfolds slowly.',
          'Every shipment arrives with traceability we are proud to publish: farm, elevation, variety, and the name of the person who signed the bag.',
        ],
      },
      {
        id: OUR_STORY_STORY_IDS.sustainability,
        eyebrow: 'Sustainability',
        title: 'Beyond the Fair Trade Label',
        subtitle: 'Ethics · Transparency',
        image: null,
        paragraphs: [
          'Certifications matter, but relationships matter more. We visit origins twice yearly and publish what we pay—not as a footnote, but as a central chapter.',
          'Direct Trade Plus means premiums above fair-trade minimums, multi-year contracts, and investment in drying infrastructure where our partners ask for it.',
          'When you read "Beyond the Fair Trade Label," read it as a promise: traceability without theater, and economics that respect the people who make exceptional coffee possible.',
        ],
      },
    ],
  },
  cta: {
    title: 'Begin Your Edition.',
    body: 'Join our curated subscription service and receive the season\u2019s most compelling roasts, delivered with editorial brew guides.',
    button: {label: 'START THE JOURNEY', to: '/pages/subscription'},
  },
};
