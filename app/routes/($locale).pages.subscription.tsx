import {useLoaderData, useSearchParams} from 'react-router';
import type {Route} from './+types/($locale).pages.subscription';
import {SubscriptionPage} from '~/components/subscription/SubscriptionPage';
import {
  getDefaultSubscriptionPageContent,
  parseSubscriptionPage,
} from '~/lib/subscription/parse';
import {SUBSCRIPTION_PRODUCTS_QUERY, SUBSCRIPTION_TIERS_QUERY} from '~/lib/subscription/queries';

export const meta: Route.MetaFunction = ({loaderData}) => [
  {
    title:
      loaderData?.subscription.metaTitle ??
      'Espresso Editorial | Subscriptions',
  },
];

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  try {
    const [tiersData, productsData] = await Promise.all([
      storefront.query(SUBSCRIPTION_TIERS_QUERY, {
        cache: storefront.CacheLong(),
      }),
      storefront.query(SUBSCRIPTION_PRODUCTS_QUERY, {
        cache: storefront.CacheShort(),
      }),
    ]);

    return {subscription: parseSubscriptionPage(tiersData, productsData)};
  } catch (error) {
    console.error('Subscription page query failed:', error);
    return {subscription: getDefaultSubscriptionPageContent()};
  }
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function SubscriptionRoute() {
  const {subscription} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const initialTierId = searchParams.get('tier');

  return (
    <SubscriptionPage
      initialTierId={initialTierId}
      subscription={subscription}
    />
  );
}
