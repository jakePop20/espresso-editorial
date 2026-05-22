import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

type VercelHandlerContext = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

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

async function vercelHandler(
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
      process.env as Env,
      executionContext,
    );
  } catch (error) {
    console.error(error);
    return new Response('An unexpected error occurred', {status: 500});
  }
}

const oxygenHandler = {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      return await handleHydrogenRequest(request, env, executionContext);
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};

/**
 * Vercel: Web API handler (function export).
 * Oxygen / mini-oxygen: Workers-style `{ fetch }` object.
 */
export default process.env.VERCEL === '1' ? vercelHandler : oxygenHandler;
