import type {HomepageImage} from '~/lib/homepage/types';

export type OurStoryHeroTitleLine = {
  before: string;
  emphasis: string;
  after: string;
};

export type OurStoryCta = {
  label: string;
  to: string;
};

export type OurStoryStory = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: HomepageImage | null;
  paragraphs: string[];
};

export type OurStoryRoasteryPillar = {
  title: string;
  body: string;
  image: HomepageImage;
};

export type OurStoryPageContent = {
  metaTitle: string;
  hero: {
    eyebrow: string;
    titleLines: [OurStoryHeroTitleLine, OurStoryHeroTitleLine];
    lead: string;
    image: HomepageImage;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    manifestoTo: string;
    image: HomepageImage;
    pullQuote: string;
  };
  roastery: {
    eyebrow: string;
    title: string;
    pillars: OurStoryRoasteryPillar[];
  };
  quote: {
    text: string;
    attribution: string;
  };
  stories: {
    eyebrow: string;
    title: string;
    items: OurStoryStory[];
  };
  cta: {
    title: string;
    body: string;
    button: OurStoryCta;
  };
};
