/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;