/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // useful if deploying Docker or serverless
  typescript: {
    ignoreBuildErrors: false // ensure type errors fail the build
  },
  images: {
    domains: ['res.cloudinary.com'], // allow featured images from Cloudinary
  },
  experimental: {
    appDir: true // using the /app directory structure
  }
};

module.exports = nextConfig;
