/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : './',
  images: {
    domains: ['img1.doubanio.com', 'img2.doubanio.com', 'img3.doubanio.com', 'img4.doubanio.com', 'img5.doubanio.com', 'img6.doubanio.com', 'img7.doubanio.com', 'img8.doubanio.com', 'img9.doubanio.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
