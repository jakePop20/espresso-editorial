import {useLoaderData, useSearchParams} from 'react-router';
import type {Route} from './+types/($locale).pages.subscription';
import {SubscriptionPage} from '~/components/subscription/SubscriptionPage';
import {getSubscriptionPageShell} from '~/lib/subscription/content';
import {
  getDefaultSubscriptionDeferred,
  parseSubscriptionDeferred,
} from '~/lib/subscription/parse';
import {SUBSCRIPTION_PRODUCTS_QUERY, SUBSCRIPTION_TIERS_QUERY} from '~/lib/subscription/queries';

export const meta: Route.MetaFunction = ({loaderData}) => [
  {
    title:
      loaderData?.subscriptionShell.metaTitle ??
      'Espresso Editorial | Subscriptions',
  },
];

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/** Static page shell — hero, copy, comparison, testimonials. No Shopify fetch. */
function loadCriticalData(_args: Route.LoaderArgs) {
  return {subscriptionShell: getSubscriptionPageShell()};
}

/** Shopify tier metaobjects and subscription products. Defaults only on failure. */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const subscriptionDeferred = Promise.all([
    storefront.query(SUBSCRIPTION_TIERS_QUERY, {
      cache: storefront.CacheLong(),
    }),
    storefront.query(SUBSCRIPTION_PRODUCTS_QUERY, {
      cache: storefront.CacheShort(),
    }),
  ])
    .then(([tiersData, productsData]) =>
      parseSubscriptionDeferred(tiersData, productsData),
    )
    .catch((error: Error) => {
      console.error('Subscription deferred query failed:', error);
      return getDefaultSubscriptionDeferred();
    });

  return {subscriptionDeferred};
}

export default function SubscriptionRoute() {
  const {subscriptionShell, subscriptionDeferred} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const initialTierId = searchParams.get('tier');

  return (
    <SubscriptionPage
      initialTierId={initialTierId}
      subscriptionDeferred={subscriptionDeferred}
      subscriptionShell={subscriptionShell}
    />
  );
}
