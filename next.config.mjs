/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/SecureLups',
  assetPrefix: '/SecureLups/',
  trailingSlash: true,
};

export default nextConfig;
