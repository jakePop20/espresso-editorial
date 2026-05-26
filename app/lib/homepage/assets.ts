/** Static homepage imagery — import paths match files in app/assets/homepage/. */

import heroEspressoPour from '~/assets/homepage/hero-espresso-pour.png';
import storyRoastTray from '~/assets/homepage/story-roast-tray.png';
import subscriptionDiscover from '~/assets/homepage/subscription-discovery.png';
import subscriptionEnthusiast from '~/assets/homepage/subscription-enthusiast.png';
import subscriptionMaster from '~/assets/homepage/subscription-master.png';
import quizBeansTexture from '~/assets/homepage/quiz-beans-texture.png';
import editorialChemex from '~/assets/homepage/editorial-chemex.png';
import editorialHuilaOrigin from '~/assets/homepage/editorial-huila-origin.png';
import editorialSlowLiving from '~/assets/homepage/editorial-slow-living.png';

export const HOMEPAGE_ASSETS = {
  hero: heroEspressoPour,
  story: storyRoastTray,
  subscriptions: {
    discover: subscriptionDiscover,
    enthusiast: subscriptionEnthusiast,
    master: subscriptionMaster,
  },
  quiz: quizBeansTexture,
  editorial: {
    chemex: editorialChemex,
    huila: editorialHuilaOrigin,
    slowLiving: editorialSlowLiving,
  },
} as const;
