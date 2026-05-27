import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {SubscriptionTierId} from '~/lib/homepage/content';
import type {SubscriptionFrequencyId} from '~/lib/subscription/types';

/** One Shopify product per tier × delivery frequency. */
export const SUBSCRIPTION_PRODUCT_HANDLES: Record<
  SubscriptionTierId,
  Record<SubscriptionFrequencyId, string>
> = {
  discover: {
    weekly: 'discovery-weekly-coffee-subscription',
    biweekly: 'discovery-bi-weekly-coffee-subscription',
    monthly: 'discovery-monthly-coffee-subscription',
  },
  enthusiast: {
    weekly: 'enthusiast-weekly-coffee-subscription',
    biweekly: 'enthusiast-bi-weekly-coffee-subscription',
    monthly: 'enthusiast-monthly-coffee-subscription',
  },
  master: {
    weekly: 'master-weekly-coffee-subscription',
    biweekly: 'master-bi-weekly-coffee-subscription',
    monthly: 'master-monthly-coffee-subscription',
  },
};

export const ALL_SUBSCRIPTION_PRODUCT_HANDLES = Object.values(
  SUBSCRIPTION_PRODUCT_HANDLES,
).flatMap((byFrequency) => Object.values(byFrequency));

const TIER_TAG_BY_ID: Record<SubscriptionTierId, string> = {
  discover: 'discovery',
  enthusiast: 'enthusiast',
  master: 'master',
};

export type SubscriptionCheckoutOption = {
  merchandiseId: string;
  sellingPlanId: string;
  priceAmount: number;
  currencyCode: string;
  productHandle: string;
};

export type SubscriptionCommerceTier = {
  tierId: SubscriptionTierId;
  options: Partial<Record<SubscriptionFrequencyId, SubscriptionCheckoutOption>>;
};

type SellingPlanNode = {
  id: string;
  name: string;
  options: Array<{name?: string | null; value?: string | null}>;
};

export type SubscriptionProductNode = {
  handle: string;
  tags: string[];
  variants: {nodes: Array<{id: string; price: {amount: string; currencyCode: string}}>};
  sellingPlanGroups: {
    nodes: Array<{sellingPlans: {nodes: SellingPlanNode[]}}>;
  };
};

function inferFrequency(product: SubscriptionProductNode): SubscriptionFrequencyId | null {
  const handle = product.handle.toLowerCase();
  const tags = product.tags.map((tag) => tag.toLowerCase());

  if (tags.includes('bi-weekly') || handle.includes('bi-weekly')) return 'biweekly';
  if (tags.includes('weekly') || handle.includes('weekly')) return 'weekly';
  if (tags.includes('monthly') || handle.includes('monthly')) return 'monthly';

  return null;
}

function resolveTierId(product: SubscriptionProductNode): SubscriptionTierId | null {
  const tags = product.tags.map((tag) => tag.toLowerCase());

  for (const [tierId, tag] of Object.entries(TIER_TAG_BY_ID) as Array<
    [SubscriptionTierId, string]
  >) {
    if (tags.includes(tag)) return tierId;
  }

  const handle = product.handle.toLowerCase();
  if (handle.includes('discovery') || handle.includes('discover')) return 'discover';
  if (handle.includes('enthusiast')) return 'enthusiast';
  if (handle.includes('master')) return 'master';

  return null;
}

function firstSellingPlan(product: SubscriptionProductNode): SellingPlanNode | null {
  for (const group of product.sellingPlanGroups.nodes) {
    const plan = group.sellingPlans.nodes[0];
    if (plan) return plan;
  }
  return null;
}

export function parseSubscriptionCommerce(
  products: SubscriptionProductNode[] | null | undefined,
): SubscriptionCommerceTier[] {
  if (!products?.length) return [];

  const byTier = new Map<SubscriptionTierId, SubscriptionCommerceTier>();

  for (const product of products) {
    const tierId = resolveTierId(product);
    const frequency = inferFrequency(product);
    const variant = product.variants.nodes[0];
    const plan = firstSellingPlan(product);

    if (!tierId || !frequency || !variant || !plan) continue;

    const option: SubscriptionCheckoutOption = {
      merchandiseId: variant.id,
      sellingPlanId: plan.id,
      priceAmount: Number.parseFloat(variant.price.amount),
      currencyCode: variant.price.currencyCode,
      productHandle: product.handle,
    };

    const existing = byTier.get(tierId) ?? {tierId, options: {}};
    existing.options[frequency] = option;
    byTier.set(tierId, existing);
  }

  return [...byTier.values()];
}

export function getCheckoutOption(
  commerce: SubscriptionCommerceTier[],
  tierId: SubscriptionTierId,
  frequency: SubscriptionFrequencyId,
): SubscriptionCheckoutOption | null {
  const tier = commerce.find((entry) => entry.tierId === tierId);
  return tier?.options[frequency] ?? null;
}

export function getShipmentPrice(
  commerce: SubscriptionCommerceTier[],
  tierId: SubscriptionTierId,
  frequency: SubscriptionFrequencyId,
): MoneyV2 | null {
  const option = getCheckoutOption(commerce, tierId, frequency);
  if (!option) return null;

  return {
    amount: String(option.priceAmount),
    currencyCode: option.currencyCode as MoneyV2['currencyCode'],
  };
}

export function isSubscriptionProductHandle(handle: string) {
  return ALL_SUBSCRIPTION_PRODUCT_HANDLES.includes(handle);
}
