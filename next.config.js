/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : './',
}

module.exports = nextConfig
