import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

type VercelHandlerContext = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

const REQUIRED_ENV_KEYS = [
  'SESSION_SECRET',
  'PUBLIC_STORE_DOMAIN',
  'PUBLIC_STOREFRONT_API_TOKEN',
  'PRIVATE_STOREFRONT_API_TOKEN',
  'PUBLIC_STOREFRONT_ID',
] as const;

function getEnv(): Env {
  const env = process.env as Env;
  const missing = REQUIRED_ENV_KEYS.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing Vercel environment variables: ${missing.join(', ')}. Add them in Project Settings → Environment Variables.`,
    );
  }

  return env;
}

async function handleHydrogenRequest(
  request: Request,
  env: Env,
  executionContext?: ExecutionContext,
): Promise<Response> {
  const hydrogenContext = await createHydrogenRouterContext(
    request,
    env,
    executionContext,
  );

  const handleRequest = createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
    getLoadContext: () => hydrogenContext,
  });

  const response = await handleRequest(request);

  if (hydrogenContext.session.isPending) {
    response.headers.set(
      'Set-Cookie',
      await hydrogenContext.session.commit(),
    );
  }

  if (response.status === 404) {
    return storefrontRedirect({
      request,
      response,
      storefront: hydrogenContext.storefront,
    });
  }

  return response;
}

/**
 * Vercel server entry — must be a function export, not `{fetch}`.
 * @see https://vercel.com/docs/frameworks/react-router#using-a-custom-server-entrypoint
 */
export default async function handler(
  request: Request,
  vercelContext?: VercelHandlerContext,
): Promise<Response> {
  try {
    const executionContext = vercelContext?.waitUntil
      ? ({
          waitUntil: vercelContext.waitUntil.bind(vercelContext),
        } as ExecutionContext)
      : undefined;

    return await handleHydrogenRequest(
      request,
      getEnv(),
      executionContext,
    );
  } catch (error) {
    console.error('[vercel]', error);
    return new Response('An unexpected error occurred', {status: 500});
  }
}
