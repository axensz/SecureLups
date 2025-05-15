/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/SecureLups',
  assetPrefix: '/SecureLups/',
  trailingSlash: true,
  distDir: 'out',
};

export default nextConfig;
