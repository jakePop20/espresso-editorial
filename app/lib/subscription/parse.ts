import type {HomepageSubscriptionTierContent} from '~/lib/homepage/types';
import {parseSubscriptionTiers} from '~/lib/homepage/parse';
import type {
  SubscriptionPageTiersQuery,
  SubscriptionProductsQuery,
} from 'storefrontapi.generated';
import {parseSubscriptionCommerce} from '~/lib/subscription/commerce';
import type {SubscriptionProductNode} from '~/lib/subscription/commerce';
import {
  getDefaultSubscriptionPage,
  SUBSCRIPTION_DEFAULT_TIERS,
} from '~/lib/subscription/content';
import type {SubscriptionPageContent} from '~/lib/subscription/types';

function parseBasePrice(priceLabel: string): number | null {
  const match = priceLabel.match(/\$(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function mergeTier(
  fallback: (typeof SUBSCRIPTION_DEFAULT_TIERS)[number],
  cms?: HomepageSubscriptionTierContent,
) {
  if (!cms) return fallback;

  const parsedPrice = parseBasePrice(cms.priceLabel);

  return {
    ...fallback,
    name: cms.name || fallback.name,
    basePrice: parsedPrice ?? fallback.basePrice,
    image: cms.image ?? fallback.image,
    highlighted: cms.highlighted ?? fallback.highlighted,
    badge: cms.badge ?? fallback.badge,
  };
}

export function parseSubscriptionPage(
  data: SubscriptionPageTiersQuery | null | undefined,
  productsData?: SubscriptionProductsQuery | null,
): SubscriptionPageContent {
  const defaults = getDefaultSubscriptionPage();
  const cmsTiers = parseSubscriptionTiers(data?.subscriptionTiers?.nodes);
  const cmsById = new Map(cmsTiers.map((tier) => [tier.id, tier]));

  const tiers = SUBSCRIPTION_DEFAULT_TIERS.map((fallback) =>
    mergeTier(fallback, cmsById.get(fallback.id)),
  );

  const products: SubscriptionProductNode[] =
    productsData?.products?.nodes?.map((product) => ({
      handle: product.handle,
      tags: product.tags,
      variants: product.variants,
      sellingPlanGroups: product.sellingPlanGroups,
    })) ?? [];

  return {
    ...defaults,
    tiers,
    commerce: parseSubscriptionCommerce(products),
  };
}

export function getDefaultSubscriptionPageContent() {
  return getDefaultSubscriptionPage();
}
