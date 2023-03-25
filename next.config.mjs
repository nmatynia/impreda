// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
// eslint-disable-next-line no-unused-expressions
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['s3.eu-west-2.amazonaws.com'],
    remotePatterns: [
      {
        port: '',
        protocol: 'https',
        hostname: 'impreda-bucket.s3.eu-west-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
};
// TODO: Add port property to remotePatterns (?)
export default config;
