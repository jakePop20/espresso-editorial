/** Storefront metaobject type + default entry handle for the homepage hero. */
export const HOMEPAGE_HERO_METAOBJECT = {
  type: 'homepage_hero',
  handle: 'poetry-in-every-pour',
} as const;

export const HOMEPAGE_STORY_METAOBJECT = {
  type: 'homepage_story',
  handle: 'the-editorial-standard',
} as const;

export const HOMEPAGE_QUIZ_METAOBJECT = {
  type: 'quiz_cta',
  handle: 'not-sure-where-to-begin-your-story',
} as const;

export const HOMEPAGE_EDITORIAL_FEATURE_METAOBJECT = {
  type: 'editorial_feature',
  handle: 'brew-guide',
} as const;

export const HOMEPAGE_EDITORIAL_SIDEBAR_METAOBJECT = {
  type: 'editorial_sidebar',
  handle: 'editorial-sidebar-2gdyd1uh',
} as const;

export const SUBSCRIPTION_TIER_ORDER = [
  'discover',
  'enthusiast',
  'master',
] as const;

/** Metaobject types loaded below the fold. */
export const HOMEPAGE_DEFERRED_METAOBJECT_TYPES = [
  'homepage_story',
  'subscription_tier',
  'quiz_cta',
  'editorial_feature',
  'editorial_sidebar',
  'editorial_sidebar_item',
] as const;
