/**
 * Vercel-only SSR entry. Uses renderToPipeableStream (Node pipeable API).
 * Kept separate from app/entry.server.tsx so that file never imports
 * react-dom/server for the Vercel bundle.
 */
import {PassThrough} from 'node:stream';
import {createElement, type ComponentType, type ReactNode} from 'react';
import {createReadableStreamFromReadable} from '@react-router/node';
import {isbot} from 'isbot';
import {renderToPipeableStream} from 'react-dom/server';
import {ServerRouter} from 'react-router';
import type {EntryContext} from 'react-router';
import {streamTimeout} from '@vercel/react-router/entry.server';

export function handleVercelHydrogenRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  nonce: string,
  NonceProvider: ComponentType<{children: ReactNode}>,
): Promise<Response> {
  const vercelDeploymentId = process.env.VERCEL_DEPLOYMENT_ID;
  const vercelSkewProtectionEnabled =
    process.env.VERCEL_SKEW_PROTECTION_ENABLED === '1';

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');
    const readyOption =
      (userAgent && isbot(userAgent)) || reactRouterContext.isSpaMode
        ? 'onAllReady'
        : 'onShellReady';

    const {pipe, abort} = renderToPipeableStream(
      createElement(
        NonceProvider,
        null,
        createElement(ServerRouter, {
          context: reactRouterContext,
          url: request.url,
          nonce,
        }),
      ),
      {
        nonce,
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');
          if (vercelSkewProtectionEnabled && vercelDeploymentId) {
            responseHeaders.append(
              'Set-Cookie',
              `__vdpl=${vercelDeploymentId}; HttpOnly`,
            );
          }
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
