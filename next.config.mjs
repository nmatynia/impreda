// @ts-check
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? // eslint-disable-next-line import/no-extraneous-dependencies
      (await import('@next/bundle-analyzer')).default({
        enabled: true
      })
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config => config;

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
        protocol: 'https',
        hostname: 'impreda-bucket.s3.eu-west-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
};

export default withBundleAnalyzer(config);
