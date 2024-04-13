/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL,
    NEXT_PUBLIC_LOGOUT_URL: process.env.NEXT_PUBLIC_LOGOUT_URL,
    NEXT_PUBLIC_LOGIN_URL_RETURN: process.env.NEXT_PUBLIC_LOGIN_URL_RETURN,
    NEXT_PUBLIC_CHECK_URL: process.env.NEXT_PUBLIC_CHECK_URL,
  },
};

module.exports = nextConfig;
