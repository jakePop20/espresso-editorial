import type {SubscriptionTierId} from '~/lib/homepage/content';
import {
  HOMEPAGE_EDITORIAL_FEATURE,
  HOMEPAGE_EDITORIAL_INTRO,
  HOMEPAGE_EDITORIAL_SIDEBAR,
  HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW,
  HOMEPAGE_HERO,
  HOMEPAGE_QUIZ_CTA,
  HOMEPAGE_STORY,
  HOMEPAGE_SUBSCRIPTION_TIERS,
} from '~/lib/homepage/content';
import {
  SUBSCRIPTION_TIER_ORDER,
} from '~/lib/homepage/constants';
import type {
  HomepageCta,
  HomepageDeferredContent,
  HomepageEditorialContent,
  HomepageEditorialItemContent,
  HomepageHeroContent,
  HomepageImage,
  HomepageQuizContent,
  HomepageStoryContent,
  HomepageStoryPillar,
  HomepageSubscriptionTierContent,
} from '~/lib/homepage/types';
import type {
  HomepageDeferredQuery,
  HomepageHeroQuery,
} from 'storefrontapi.generated';

type HomepageHeroQueryHero = HomepageHeroQuery['hero'];
type HomepageHeroRecord = NonNullable<HomepageHeroQueryHero>;
type HomepageDeferredStory = HomepageDeferredQuery['story'];
type HomepageDeferredTier = NonNullable<
  HomepageDeferredQuery['subscriptionTiers']
>['nodes'][number];
type HomepageDeferredQuiz = HomepageDeferredQuery['quiz'];
type HomepageDeferredEditorialFeature = HomepageDeferredQuery['editorialFeature'];
type HomepageDeferredEditorialSidebarItem = NonNullable<
  NonNullable<
    NonNullable<HomepageDeferredQuery['editorialSidebar']>['items']
  >['references']
>['nodes'][number];

type CtaReference = NonNullable<
  NonNullable<HomepageHeroRecord>['primaryCta']
>['reference'];

type MediaImageReference = {
  __typename?: string;
  image?: HomepageImage | null;
};

const SUBSCRIPTION_TIER_IDS = new Set<SubscriptionTierId>([
  'discover',
  'enthusiast',
  'master',
]);

function isSubscriptionTierId(value: string): value is SubscriptionTierId {
  return SUBSCRIPTION_TIER_IDS.has(value as SubscriptionTierId);
}

function parseCta(
  reference: CtaReference | null | undefined,
  fallback: HomepageCta,
): HomepageCta {
  if (reference?.__typename !== 'Metaobject') return fallback;

  const label = reference.label?.value?.trim();
  const to = reference.to?.value?.trim();
  if (!label || !to) return fallback;
  return {label, to};
}

function parseMediaImageReference(
  reference: MediaImageReference | null | undefined,
): HomepageImage | null {
  if (reference?.__typename !== 'MediaImage') return null;
  const image = reference.image;
  if (!image?.url) return null;
  return {
    url: image.url,
    altText: image.altText ?? null,
    width: image.width ?? null,
    height: image.height ?? null,
  };
}

function parseImage(
  imageField: HomepageHeroRecord['image'],
): HomepageImage | null {
  return parseMediaImageReference(
    imageField?.reference as MediaImageReference | null | undefined,
  );
}

function parseBooleanField(value: string | null | undefined): boolean {
  return value?.trim().toLowerCase() === 'true';
}

type StoryPillarNode = NonNullable<
  NonNullable<NonNullable<HomepageDeferredStory>['pillars']>['references']
>['nodes'][number];

function parseStoryPillar(node: StoryPillarNode): HomepageStoryPillar | null {
  if (node?.__typename !== 'Metaobject') return null;

  const number = node.number?.value?.trim();
  const title = node.title?.value?.trim();
  const body = node.body?.value?.trim();
  if (!number || !title || !body) return null;

  return {number, title, body};
}

export function getDefaultHomepageHero(): HomepageHeroContent {
  return {
    title: HOMEPAGE_HERO.title,
    eyebrow: null,
    image: null,
    primaryCta: {...HOMEPAGE_HERO.primaryCta},
    secondaryCta: {...HOMEPAGE_HERO.secondaryCta},
  };
}

export function getDefaultHomepageStory(): HomepageStoryContent {
  return {
    eyebrow: HOMEPAGE_STORY.eyebrow,
    title: HOMEPAGE_STORY.title,
    body: HOMEPAGE_STORY.body,
    image: null,
    pillars: HOMEPAGE_STORY.pillars.map((pillar) => ({...pillar})),
    quote: {...HOMEPAGE_STORY.quote},
  };
}

export function getDefaultSubscriptionTiers(): HomepageSubscriptionTierContent[] {
  return HOMEPAGE_SUBSCRIPTION_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    bagsLabel: tier.bagsLabel,
    description: tier.description,
    priceLabel: tier.priceLabel,
    image: null,
    highlighted: tier.highlighted,
    badge: tier.badge,
  }));
}

export function getDefaultHomepageQuiz(): HomepageQuizContent {
  return {
    title: HOMEPAGE_QUIZ_CTA.title,
    body: HOMEPAGE_QUIZ_CTA.body,
    image: null,
    cta: {...HOMEPAGE_QUIZ_CTA.cta},
  };
}

function getDefaultEditorialItem(
  fallback: (typeof HOMEPAGE_EDITORIAL_SIDEBAR)[number] | typeof HOMEPAGE_EDITORIAL_FEATURE,
): HomepageEditorialItemContent {
  return {
    handle: fallback.handle,
    eyebrow: fallback.eyebrow,
    title: fallback.title,
    body: 'body' in fallback ? fallback.body : undefined,
    image: null,
    cta: {...fallback.cta},
  };
}

export function getDefaultHomepageEditorial(): HomepageEditorialContent {
  return {
    intro: {...HOMEPAGE_EDITORIAL_INTRO},
    feature: getDefaultEditorialItem(HOMEPAGE_EDITORIAL_FEATURE),
    sidebar: HOMEPAGE_EDITORIAL_SIDEBAR.map((item) => getDefaultEditorialItem(item)),
    review: {...HOMEPAGE_EDITORIAL_SUBSCRIPTION_REVIEW},
  };
}

export function getDefaultHomepageDeferred(): HomepageDeferredContent {
  return {
    story: getDefaultHomepageStory(),
    subscriptionTiers: getDefaultSubscriptionTiers(),
    quiz: getDefaultHomepageQuiz(),
    editorial: getDefaultHomepageEditorial(),
  };
}

export function parseHomepageHero(
  hero: HomepageHeroQueryHero,
): HomepageHeroContent | null {
  if (!hero?.id) return null;

  const title = hero.title?.value?.trim();
  if (!title) return null;

  const defaults = getDefaultHomepageHero();

  return {
    title,
    eyebrow: hero.eyebrow?.value?.trim() || null,
    image: parseImage(hero.image),
    primaryCta: parseCta(hero.primaryCta?.reference, defaults.primaryCta),
    secondaryCta: parseCta(hero.secondaryCta?.reference, defaults.secondaryCta),
  };
}

export function parseHomepageStory(
  story: HomepageDeferredStory,
): HomepageStoryContent | null {
  if (!story?.id) return null;

  const defaults = getDefaultHomepageStory();
  const eyebrow = story.eyebrow?.value?.trim();
  const title = story.title?.value?.trim();
  const body = story.body?.value?.trim();
  if (!eyebrow || !title || !body) return null;

  const quoteRef = story.quote?.reference;
  const quoteText =
    quoteRef?.__typename === 'Metaobject'
      ? quoteRef.text?.value?.trim()
      : null;
  const quoteAttribution =
    quoteRef?.__typename === 'Metaobject'
      ? quoteRef.attribution?.value?.trim()
      : null;

  const pillars =
    story.pillars?.references?.nodes
      ?.map(parseStoryPillar)
      .filter((pillar): pillar is HomepageStoryPillar => pillar !== null) ??
    [];

  return {
    eyebrow,
    title,
    body,
    image: parseMediaImageReference(
      story.image?.reference as MediaImageReference | null | undefined,
    ),
    pillars: pillars.length ? pillars : defaults.pillars,
    quote: {
      text: quoteText || defaults.quote.text,
      attribution: quoteAttribution || defaults.quote.attribution,
    },
  };
}

export function parseSubscriptionTier(
  node: HomepageDeferredTier,
): HomepageSubscriptionTierContent | null {
  if (!node?.id) return null;

  const tierId = node.tierId?.value?.trim();
  if (!tierId || !isSubscriptionTierId(tierId)) return null;

  const name = node.name?.value?.trim();
  const bagsLabel = node.bagsLabel?.value?.trim();
  const description = node.description?.value?.trim();
  const priceLabel = node.priceLabel?.value?.trim();
  if (!name || !bagsLabel || !description || !priceLabel) return null;

  const badge = node.badge?.value?.trim();

  return {
    id: tierId,
    name,
    bagsLabel,
    description,
    priceLabel,
    image: parseMediaImageReference(
      node.image?.reference as MediaImageReference | null | undefined,
    ),
    highlighted: parseBooleanField(node.highlighted?.value),
    badge: badge || undefined,
  };
}

export function parseSubscriptionTiers(
  nodes: HomepageDeferredQuery['subscriptionTiers']['nodes'] | null | undefined,
): HomepageSubscriptionTierContent[] {
  const parsed =
    nodes
      ?.map(parseSubscriptionTier)
      .filter(
        (tier): tier is HomepageSubscriptionTierContent => tier !== null,
      ) ?? [];

  if (!parsed.length) return getDefaultSubscriptionTiers();

  const byId = new Map(parsed.map((tier) => [tier.id, tier]));

  return SUBSCRIPTION_TIER_ORDER.map(
    (id) => byId.get(id) ?? getDefaultSubscriptionTiers().find((t) => t.id === id)!,
  ).filter(Boolean);
}

function isEditorialMetaobject(
  node: HomepageDeferredEditorialFeature | HomepageDeferredEditorialSidebarItem,
): boolean {
  if (!node) return false;
  if (node.__typename === 'Metaobject') return true;
  return 'id' in node && Boolean(node.id);
}

function parseEditorialItemNode(
  node: HomepageDeferredEditorialFeature | HomepageDeferredEditorialSidebarItem,
  fallback: HomepageEditorialItemContent,
): HomepageEditorialItemContent | null {
  if (!isEditorialMetaobject(node)) return null;

  const eyebrow = node.eyebrow?.value?.trim();
  const title = node.title?.value?.trim();
  if (!eyebrow || !title) return null;

  const body = node.body?.value?.trim();

  return {
    handle: node.handle ?? fallback.handle,
    eyebrow,
    title,
    body: body || fallback.body,
    image: parseMediaImageReference(
      node.image?.reference as MediaImageReference | null | undefined,
    ),
    cta: parseCta(node.cta?.reference, fallback.cta),
  };
}

function parseEditorialFeature(
  feature: HomepageDeferredEditorialFeature,
): HomepageEditorialItemContent {
  const defaults = getDefaultHomepageEditorial();
  return (
    parseEditorialItemNode(feature, defaults.feature) ?? defaults.feature
  );
}

function parseEditorialSidebar(
  nodes:
    | NonNullable<
        NonNullable<HomepageDeferredQuery['editorialSidebar']>['items']
      >['references']['nodes']
    | null
    | undefined,
): HomepageEditorialItemContent[] {
  const defaults = getDefaultHomepageEditorial();

  const parsed =
    nodes
      ?.map((node) => {
        const handle = node?.__typename === 'Metaobject' ? node.handle ?? '' : '';
        const fallback =
          defaults.sidebar.find((item) => item.handle === handle) ??
          defaults.sidebar[0];
        return parseEditorialItemNode(node, fallback);
      })
      .filter((item): item is HomepageEditorialItemContent => item !== null) ??
    [];

  return parsed.length ? parsed : defaults.sidebar;
}

function parseEditorialContent(
  data: HomepageDeferredQuery,
): HomepageEditorialContent {
  const defaults = getDefaultHomepageEditorial();

  return {
    intro: defaults.intro,
    feature: parseEditorialFeature(data.editorialFeature),
    sidebar: parseEditorialSidebar(data.editorialSidebar?.items?.references?.nodes),
    review: defaults.review,
  };
}

export function parseHomepageQuiz(
  quiz: HomepageDeferredQuiz,
): HomepageQuizContent | null {
  if (!quiz?.id) return null;

  const defaults = getDefaultHomepageQuiz();
  const title = quiz.title?.value?.trim();
  const body = quiz.body?.value?.trim();
  if (!title || !body) return null;

  return {
    title,
    body,
    image: parseMediaImageReference(
      quiz.image?.reference as MediaImageReference | null | undefined,
    ),
    cta: parseCta(quiz.cta?.reference, defaults.cta),
  };
}

export function parseHomepageDeferred(
  data: HomepageDeferredQuery,
): HomepageDeferredContent {
  const defaults = getDefaultHomepageDeferred();

  return {
    story: parseHomepageStory(data.story) ?? defaults.story,
    subscriptionTiers: parseSubscriptionTiers(data.subscriptionTiers?.nodes),
    quiz: parseHomepageQuiz(data.quiz) ?? defaults.quiz,
    editorial: parseEditorialContent(data),
  };
}
