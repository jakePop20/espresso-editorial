import {Suspense} from 'react';
import {Await} from 'react-router';
import {EditorialGridSection} from '~/components/homepage/sections/EditorialGridSection';
import {QuizCtaSection} from '~/components/homepage/sections/QuizCtaSection';
import {StorySection} from '~/components/homepage/sections/StorySection';
import {SubscriptionsSection} from '~/components/homepage/sections/SubscriptionsSection';
import {HeroSection} from '~/components/homepage/sections/HeroSection';
import {
  getDefaultHomepageDeferred,
} from '~/lib/homepage/parse';
import type {
  HomepageDeferredContent,
  HomepageHeroContent,
} from '~/lib/homepage/types';

type HomepageProps = {
  hero: HomepageHeroContent;
  homepageDeferred: Promise<HomepageDeferredContent>;
};

function HomepageBelowFold({content}: {content: HomepageDeferredContent}) {
  return (
    <>
      <StorySection story={content.story} />
      <SubscriptionsSection tiers={content.subscriptionTiers} />
      <QuizCtaSection />
      <EditorialGridSection />
    </>
  );
}

function HomepageBelowFoldFallback() {
  const content = getDefaultHomepageDeferred();
  return <HomepageBelowFold content={content} />;
}

export function Homepage({hero, homepageDeferred}: HomepageProps) {
  return (
    <div className="homepage">
      <HeroSection hero={hero} />
      <Suspense fallback={<HomepageBelowFoldFallback />}>
        <Await resolve={homepageDeferred}>
          {(content) => <HomepageBelowFold content={content} />}
        </Await>
      </Suspense>
    </div>
  );
}
