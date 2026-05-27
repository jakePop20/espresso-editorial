import {METAOBJECT_IMAGE_FRAGMENT} from '~/lib/homepage/queries';

export const SUBSCRIPTION_PRODUCT_FRAGMENT = `#graphql
  fragment SubscriptionProduct on Product {
    handle
    tags
    variants(first: 1) {
      nodes {
        id
        price {
          amount
          currencyCode
        }
      }
    }
    sellingPlanGroups(first: 5) {
      nodes {
        sellingPlans(first: 10) {
          nodes {
            id
            name
            options {
              name
              value
            }
          }
        }
      }
    }
  }
` as const;

export const SUBSCRIPTION_PRODUCTS_QUERY = `#graphql
  query SubscriptionProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 20, query: "tag:subscription") {
      nodes {
        ...SubscriptionProduct
      }
    }
  }
  ${SUBSCRIPTION_PRODUCT_FRAGMENT}
` as const;

export const SUBSCRIPTION_TIERS_QUERY = `#graphql
  query SubscriptionPageTiers(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
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
  }
  ${METAOBJECT_IMAGE_FRAGMENT}
` as const;
