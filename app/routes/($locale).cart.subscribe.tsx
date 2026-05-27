import {data, redirect} from 'react-router';
import type {Route} from './+types/($locale).cart.subscribe';
import type {SubscriptionTierId} from '~/lib/homepage/content';
import type {SubscriptionFrequencyId} from '~/lib/subscription/types';
import {
  getCheckoutOption,
  parseSubscriptionCommerce,
} from '~/lib/subscription/commerce';
import type {SubscriptionProductNode} from '~/lib/subscription/commerce';
import {SUBSCRIPTION_PRODUCTS_QUERY} from '~/lib/subscription/queries';

const VALID_TIER_IDS = new Set<SubscriptionTierId>([
  'discover',
  'enthusiast',
  'master',
]);

const VALID_FREQUENCIES = new Set<SubscriptionFrequencyId>([
  'weekly',
  'biweekly',
  'monthly',
]);

export async function action({request, context}: Route.ActionArgs) {
  const {cart, storefront} = context;
  const formData = await request.formData();

  const tierId = formData.get('tierId');
  const frequency = formData.get('frequency');

  if (
    typeof tierId !== 'string' ||
    !VALID_TIER_IDS.has(tierId as SubscriptionTierId) ||
    typeof frequency !== 'string' ||
    !VALID_FREQUENCIES.has(frequency as SubscriptionFrequencyId)
  ) {
    return data({error: 'Invalid subscription selection.'}, {status: 400});
  }

  const productsData = await storefront.query(SUBSCRIPTION_PRODUCTS_QUERY, {
    cache: storefront.CacheNone(),
  });

  const products: SubscriptionProductNode[] =
    productsData?.products?.nodes?.map((product) => ({
      handle: product.handle,
      tags: product.tags,
      variants: product.variants,
      sellingPlanGroups: product.sellingPlanGroups,
    })) ?? [];

  const commerce = parseSubscriptionCommerce(products);
  const checkoutOption = getCheckoutOption(
    commerce,
    tierId as SubscriptionTierId,
    frequency as SubscriptionFrequencyId,
  );

  if (!checkoutOption) {
    return data(
      {
        error:
          'This subscription is not available for the selected delivery frequency.',
      },
      {status: 400},
    );
  }

  const result = await cart.create({
    lines: [
      {
        merchandiseId: checkoutOption.merchandiseId,
        sellingPlanId: checkoutOption.sellingPlanId,
        quantity: 1,
        attributes: [{key: '_subscription', value: 'true'}],
      },
    ],
  });

  if (result.errors?.length || !result.cart) {
    return data(
      {error: result.errors?.[0]?.message ?? 'Could not start checkout.'},
      {status: 400},
    );
  }

  const headers = cart.setCartId(result.cart.id);
  const checkoutUrl = result.cart.checkoutUrl;

  if (!checkoutUrl) {
    return data({error: 'Checkout is unavailable right now.'}, {status: 503});
  }

  return redirect(checkoutUrl, {headers, status: 303});
}

export default function CartSubscribeRoute() {
  return null;
}
