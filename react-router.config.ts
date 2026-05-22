import type {Config} from '@react-router/dev/config';
import {hydrogenPreset} from '@shopify/hydrogen/react-router-preset';
import {vercelPreset} from '@vercel/react-router/vite';

const isVercel = process.env.VERCEL === '1';

const sharedConfig = {
  appDirectory: 'app',
  buildDirectory: 'dist',
  ssr: true,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: false,
    unstable_optimizeDeps: true,
    unstable_subResourceIntegrity: false,
  },
} as const;

/**
 * Vercel: vercelPreset only (generates .vercel/output + server bundles).
 * Local / Oxygen: hydrogenPreset only (incompatible with serverBundles).
 */
export default {
  ...sharedConfig,
  presets: isVercel ? [vercelPreset()] : [hydrogenPreset()],
} satisfies Config;
