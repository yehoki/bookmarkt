/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['books.google.com'],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
