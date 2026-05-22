import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

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
  });

  // Vercel Node: pipeable stream only. Do not statically import react-dom/server
  // renderToReadableStream — it breaks Node ESM (CJS named export) at module load.
  if (process.env.VERCEL) {
    const {handleRequest: vercelHandleRequest} = await import(
      '@vercel/react-router/entry.server'
    );
    const response = await vercelHandleRequest(
      request,
      responseStatusCode,
      responseHeaders,
      reactRouterContext,
      context,
      {nonce},
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
