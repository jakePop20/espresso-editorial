/** Storefront metaobject type + entry handle (must match Shopify admin). */
export const QUIZ_PAGE_METAOBJECT = {
  type: 'quiz_page',
  handle: 'espresso-editorial-find-your-roast',
} as const;

/** Metaobject types loaded for /pages/quiz. */
export const QUIZ_METAOBJECT_TYPES = [
  'quiz_page',
  'quiz_step',
  'quiz_choice',
  'quiz_profile',
] as const;
