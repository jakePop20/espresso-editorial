import type {SubscriptionTierId} from '~/lib/homepage/content';
import {
  HOMEPAGE_HERO,
  HOMEPAGE_STORY,
  HOMEPAGE_SUBSCRIPTION_TIERS,
} from '~/lib/homepage/content';
import {SUBSCRIPTION_TIER_ORDER} from '~/lib/homepage/constants';
import type {
  HomepageCta,
  HomepageDeferredContent,
  HomepageHeroContent,
  HomepageImage,
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

export function getDefaultHomepageDeferred(): HomepageDeferredContent {
  return {
    story: getDefaultHomepageStory(),
    subscriptionTiers: getDefaultSubscriptionTiers(),
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

export function parseHomepageDeferred(
  data: HomepageDeferredQuery,
): HomepageDeferredContent {
  const defaults = getDefaultHomepageDeferred();

  return {
    story: parseHomepageStory(data.story) ?? defaults.story,
    subscriptionTiers: parseSubscriptionTiers(data.subscriptionTiers?.nodes),
  };
}
