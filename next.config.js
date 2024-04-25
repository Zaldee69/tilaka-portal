/** @type {import('next').NextConfig} */
const nextConfig = {};
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  }
});
