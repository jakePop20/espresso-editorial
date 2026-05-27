/** Storefront metaobject type + default entry handle for the homepage hero. */
export const HOMEPAGE_HERO_METAOBJECT = {
  type: 'homepage_hero',
  handle: 'poetry-in-every-pour',
} as const;

export const HOMEPAGE_STORY_METAOBJECT = {
  type: 'homepage_story',
  handle: 'the-editorial-standard',
} as const;

export const SUBSCRIPTION_TIER_ORDER = [
  'discover',
  'enthusiast',
  'master',
] as const;

/** Metaobject types to load below the fold (add entries in Shopify as you build CMS). */
export const HOMEPAGE_DEFERRED_METAOBJECT_TYPES = [
  'homepage_story',
  'subscription_tier',
  'homepage_quiz',
  'homepage_editorial_item',
] as const;
