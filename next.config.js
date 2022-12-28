/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `${process.env.NEXT_SERVER_BASE_API_URL}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
