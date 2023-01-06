// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

import withPWAFunc from 'next-pwa';

const withPWA = withPWAFunc({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

export default withPWA({
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
});
