/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withWorkbox = require('next-with-workbox');

const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
};

module.exports = withPlugins([
  withWorkbox,
  nextConfig,
  {
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  },
]);
