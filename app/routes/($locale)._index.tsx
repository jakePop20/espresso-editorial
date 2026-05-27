import type {Route} from './+types/($locale)._index';
import {useLoaderData} from 'react-router';
import {Homepage} from '~/components/homepage/Homepage';
import {
  HOMEPAGE_HERO_METAOBJECT,
  HOMEPAGE_STORY_METAOBJECT,
} from '~/lib/homepage/constants';
import {
  getDefaultHomepageDeferred,
  getDefaultHomepageHero,
  parseHomepageDeferred,
  parseHomepageHero,
} from '~/lib/homepage/parse';
import {
  HOMEPAGE_DEFERRED_QUERY,
  HOMEPAGE_HERO_QUERY,
} from '~/lib/homepage/queries';
import type {HomepageDeferredContent} from '~/lib/homepage/types';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Espresso Editorial | The Art of Slow Coffee'}];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Above-the-fold homepage content from Shopify metaobjects.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const {hero: heroMetaobject} = await storefront.query(HOMEPAGE_HERO_QUERY, {
    variables: {
      handle: HOMEPAGE_HERO_METAOBJECT.handle,
      type: HOMEPAGE_HERO_METAOBJECT.type,
    },
    cache: storefront.CacheLong(),
  });

  const hero = parseHomepageHero(heroMetaobject) ?? getDefaultHomepageHero();

  return {hero};
}

/**
 * Below-the-fold metaobjects (story, tiers). Non-blocking; errors must not 500 the page.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const homepageDeferred = storefront
    .query(HOMEPAGE_DEFERRED_QUERY, {
      variables: {
        storyHandle: HOMEPAGE_STORY_METAOBJECT.handle,
        storyType: HOMEPAGE_STORY_METAOBJECT.type,
      },
      cache: storefront.CacheLong(),
    })
    .then((data): HomepageDeferredContent => parseHomepageDeferred(data))
    .catch((error: Error) => {
      console.error('Homepage deferred metaobject query failed:', error);
      return getDefaultHomepageDeferred();
    });

  return {homepageDeferred};
}

export default function HomepageRoute() {
  const {hero, homepageDeferred} = useLoaderData<typeof loader>();

  return <Homepage hero={hero} homepageDeferred={homepageDeferred} />;
}
