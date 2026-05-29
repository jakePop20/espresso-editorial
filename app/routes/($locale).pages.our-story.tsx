import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).pages.our-story';
import {OurStoryPage} from '~/components/our-story/OurStoryPage';
import {
  HOMEPAGE_EDITORIAL_FEATURE_METAOBJECT,
  HOMEPAGE_EDITORIAL_SIDEBAR_METAOBJECT,
} from '~/lib/homepage/constants';
import {getOurStoryPageContent} from '~/lib/our-story/content';
import {parseOurStoryPageContent} from '~/lib/our-story/parse';
import {OUR_STORY_EDITORIAL_QUERY} from '~/lib/our-story/queries';

export const meta: Route.MetaFunction = ({loaderData}) => [
  {title: loaderData?.content.metaTitle ?? 'Our Story | Espresso Editorial'},
];

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;

  try {
    const data = await storefront.query(OUR_STORY_EDITORIAL_QUERY, {
      cache: storefront.CacheShort(),
      variables: {
        editorialFeatureHandle: HOMEPAGE_EDITORIAL_FEATURE_METAOBJECT.handle,
        editorialFeatureType: HOMEPAGE_EDITORIAL_FEATURE_METAOBJECT.type,
        editorialSidebarHandle: HOMEPAGE_EDITORIAL_SIDEBAR_METAOBJECT.handle,
        editorialSidebarType: HOMEPAGE_EDITORIAL_SIDEBAR_METAOBJECT.type,
      },
    });

    return {content: parseOurStoryPageContent(data)};
  } catch (error) {
    console.error('Our Story editorial query failed:', error);
    return {content: getOurStoryPageContent()};
  }
}

export default function OurStoryRoute() {
  const {content} = useLoaderData<typeof loader>();
  return <OurStoryPage content={content} />;
}
