import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

const cspDirectives = {
  styleSrc: ['https://fonts.googleapis.com'],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    ...cspDirectives,
  });

  // Vercel Node: pipeable stream only — never import react-dom/server here.
  // renderToReadableStream breaks Node ESM (CJS named export) at module load.
  // Vercel SSR lives in ~/lib/vercel-ssr.server (dynamic import below).
  if (process.env.VERCEL) {
    const {handleVercelHydrogenRequest} = await import('~/lib/vercel-ssr.server');
    const response = await handleVercelHydrogenRequest(
      request,
      responseStatusCode,
      responseHeaders,
      reactRouterContext,
      nonce,
      NonceProvider,
    );
    response.headers.set('Content-Security-Policy', header);
    return response;
  }

  const [{renderToReadableStream}, {ServerRouter}, {isbot}] = await Promise.all([
    import('react-dom/server'),
    import('react-router'),
    import('isbot'),
  ]);

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
