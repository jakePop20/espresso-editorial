import {
  METAOBJECT_CTA_FRAGMENT,
  METAOBJECT_EDITORIAL_ITEM_FRAGMENT,
  METAOBJECT_IMAGE_FRAGMENT,
} from '~/lib/homepage/queries';

export const OUR_STORY_EDITORIAL_QUERY = `#graphql
  query OurStoryEditorial(
    $editorialFeatureHandle: String!
    $editorialFeatureType: String!
    $editorialSidebarHandle: String!
    $editorialSidebarType: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    editorialFeature: metaobject(
      handle: {type: $editorialFeatureType, handle: $editorialFeatureHandle}
    ) {
      __typename
      id
      handle
      ...MetaobjectEditorialItem
    }
    editorialSidebar: metaobject(
      handle: {type: $editorialSidebarType, handle: $editorialSidebarHandle}
    ) {
      id
      handle
      items: field(key: "editorial_sidebar_item") {
        references(first: 10) {
          nodes {
            __typename
            ... on Metaobject {
              ...MetaobjectEditorialItem
            }
          }
        }
      }
    }
  }
  ${METAOBJECT_CTA_FRAGMENT}
  ${METAOBJECT_IMAGE_FRAGMENT}
  ${METAOBJECT_EDITORIAL_ITEM_FRAGMENT}
` as const;
