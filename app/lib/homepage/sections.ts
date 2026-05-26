import type {ComponentType} from 'react';
import {EditorialGridSection} from '~/components/homepage/sections/EditorialGridSection';
import {HeroSection} from '~/components/homepage/sections/HeroSection';
import {QuizCtaSection} from '~/components/homepage/sections/QuizCtaSection';
import {StorySection} from '~/components/homepage/sections/StorySection';
import {SubscriptionsSection} from '~/components/homepage/sections/SubscriptionsSection';

export type HomepageSectionEntry = {
  id: string;
  Component: ComponentType;
};

/**
 * Homepage section order. Reorder, omit, or swap entries to change the page layout.
 */
export const HOMEPAGE_SECTIONS: HomepageSectionEntry[] = [
  {id: 'hero', Component: HeroSection},
  {id: 'story', Component: StorySection},
  {id: 'subscriptions', Component: SubscriptionsSection},
  {id: 'quiz', Component: QuizCtaSection},
  {id: 'editorial', Component: EditorialGridSection},
];
