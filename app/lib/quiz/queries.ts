/**
 * Storefront API queries for quiz page metaobjects.
 * Field keys match Shopify admin (snake_case).
 * CTAs are hardcoded in content.ts — not queried from Shopify.
 */

export const METAOBJECT_QUIZ_CHOICE_FRAGMENT = `#graphql
  fragment MetaobjectQuizChoice on Metaobject {
    answerIndex: field(key: "answer_index") {
      value
    }
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    icon: field(key: "icon") {
      value
    }
  }
` as const;

export const METAOBJECT_QUIZ_STEP_FRAGMENT = `#graphql
  fragment MetaobjectQuizStep on Metaobject {
    category: field(key: "category") {
      value
    }
    question: field(key: "question") {
      value
    }
    lead: field(key: "lead") {
      value
    }
    choices: field(key: "choices") {
      references(first: 5) {
        nodes {
          __typename
          ... on Metaobject {
            ...MetaobjectQuizChoice
          }
        }
      }
    }
  }
` as const;

export const METAOBJECT_QUIZ_PROFILE_FRAGMENT = `#graphql
  fragment MetaobjectQuizProfile on Metaobject {
    profileKey: field(key: "profile_key") {
      value
    }
    title: field(key: "title") {
      value
    }
    subtitle: field(key: "subtitle") {
      value
    }
    description: field(key: "description") {
      value
    }
  }
` as const;

/** Fallback when the configured handle is missing (e.g. after re-creating the entry). */
export const QUIZ_PAGE_LIST_QUERY = `#graphql
  query QuizPageList($type: String!) {
    quizPages: metaobjects(type: $type, first: 1) {
      nodes {
        id
        handle
      }
    }
  }
` as const;

export const QUIZ_PAGE_QUERY = `#graphql
  query QuizPage(
    $handle: String!
    $type: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    quizPage: metaobject(handle: {type: $type, handle: $handle}) {
      __typename
      id
      handle
      metaTitle: field(key: "meta_title") {
        value
      }
      resultLabel: field(key: "result_label") {
        value
      }
      steps: field(key: "steps") {
        references(first: 10) {
          nodes {
            __typename
            ... on Metaobject {
              ...MetaobjectQuizStep
            }
          }
        }
      }
      profiles: field(key: "profiles") {
        references(first: 5) {
          nodes {
            __typename
            ... on Metaobject {
              ...MetaobjectQuizProfile
            }
          }
        }
      }
    }
  }
  ${METAOBJECT_QUIZ_CHOICE_FRAGMENT}
  ${METAOBJECT_QUIZ_STEP_FRAGMENT}
  ${METAOBJECT_QUIZ_PROFILE_FRAGMENT}
` as const;
