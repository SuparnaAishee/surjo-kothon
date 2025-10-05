/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'images-assets.nasa.gov',
      'apod.nasa.gov',
      'mars.nasa.gov',
      'api.nasa.gov'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NASA_API_KEY: process.env.NASA_API_KEY || '9FVBcpihm1Pc0cGSZsBWzR0g1Bk988yZQVRUgsfe',
  },
}

module.exports = nextConfig