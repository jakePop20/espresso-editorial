/**
 * Storefront API queries for homepage metaobjects.
 * Field keys match Shopify admin (snake_case).
 */

export const METAOBJECT_CTA_FRAGMENT = `#graphql
  fragment MetaobjectCta on Metaobject {
    handle
    label: field(key: "label") {
      value
    }
    to: field(key: "to") {
      value
    }
  }
` as const;

export const METAOBJECT_IMAGE_FRAGMENT = `#graphql
  fragment MetaobjectImage on MediaImage {
    image {
      url
      altText
      width
      height
    }
  }
` as const;

export const METAOBJECT_STORY_PILLAR_FRAGMENT = `#graphql
  fragment MetaobjectStoryPillar on Metaobject {
    number: field(key: "number") {
      value
    }
    title: field(key: "title") {
      value
    }
    body: field(key: "body") {
      value
    }
  }
` as const;

export const METAOBJECT_EDITORIAL_ITEM_FRAGMENT = `#graphql
  fragment MetaobjectEditorialItem on Metaobject {
    handle
    eyebrow: field(key: "eyebrow") {
      value
    }
    title: field(key: "title") {
      value
    }
    body: field(key: "body") {
      value
    }
    image: field(key: "image") {
      reference {
        __typename
        ... on MediaImage {
          ...MetaobjectImage
        }
      }
    }
    cta: field(key: "cta") {
      reference {
        __typename
        ... on Metaobject {
          ...MetaobjectCta
        }
      }
    }
  }
` as const;

export const HOMEPAGE_HERO_QUERY = `#graphql
  query HomepageHero(
    $handle: String!
    $type: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    hero: metaobject(handle: {type: $type, handle: $handle}) {
      id
      handle
      title: field(key: "title") {
        value
      }
      eyebrow: field(key: "eyebrow") {
        value
      }
      image: field(key: "image") {
        reference {
          __typename
          ... on MediaImage {
            ...MetaobjectImage
          }
        }
      }
      primaryCta: field(key: "primary_cta") {
        reference {
          __typename
          ... on Metaobject {
            ...MetaobjectCta
          }
        }
      }
      secondaryCta: field(key: "secondary_cta") {
        reference {
          __typename
          ... on Metaobject {
            ...MetaobjectCta
          }
        }
      }
    }
  }
  ${METAOBJECT_CTA_FRAGMENT}
  ${METAOBJECT_IMAGE_FRAGMENT}
` as const;

export const HOMEPAGE_DEFERRED_QUERY = `#graphql
  query HomepageDeferred(
    $storyHandle: String!
    $storyType: String!
    $quizHandle: String!
    $quizType: String!
    $editorialFeatureHandle: String!
    $editorialFeatureType: String!
    $editorialSidebarHandle: String!
    $editorialSidebarType: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    story: metaobject(handle: {type: $storyType, handle: $storyHandle}) {
      id
      handle
      eyebrow: field(key: "eyebrow") {
        value
      }
      title: field(key: "title") {
        value
      }
      body: field(key: "body") {
        value
      }
      image: field(key: "image") {
        reference {
          __typename
          ... on MediaImage {
            ...MetaobjectImage
          }
        }
      }
      quote: field(key: "quote") {
        reference {
          __typename
          ... on Metaobject {
            text: field(key: "text") {
              value
            }
            attribution: field(key: "attribution") {
              value
            }
          }
        }
      }
      pillars: field(key: "pillars") {
        references(first: 10) {
          nodes {
            __typename
            ... on Metaobject {
              ...MetaobjectStoryPillar
            }
          }
        }
      }
    }
    subscriptionTiers: metaobjects(type: "subscription_tier", first: 10) {
      nodes {
        id
        handle
        tierId: field(key: "tier_id") {
          value
        }
        name: field(key: "name") {
          value
        }
        bagsLabel: field(key: "bags_label") {
          value
        }
        description: field(key: "description") {
          value
        }
        priceLabel: field(key: "price_label") {
          value
        }
        badge: field(key: "badge") {
          value
        }
        highlighted: field(key: "highlighted") {
          value
        }
        image: field(key: "image") {
          reference {
            __typename
            ... on MediaImage {
              ...MetaobjectImage
            }
          }
        }
      }
    }
    quiz: metaobject(handle: {type: $quizType, handle: $quizHandle}) {
      __typename
      id
      handle
      title: field(key: "title") {
        value
      }
      body: field(key: "body") {
        value
      }
      image: field(key: "image") {
        reference {
          __typename
          ... on MediaImage {
            ...MetaobjectImage
          }
        }
      }
      cta: field(key: "cta") {
        reference {
          __typename
          ... on Metaobject {
            ...MetaobjectCta
          }
        }
      }
    }
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
  ${METAOBJECT_STORY_PILLAR_FRAGMENT}
  ${METAOBJECT_EDITORIAL_ITEM_FRAGMENT}
` as const;
