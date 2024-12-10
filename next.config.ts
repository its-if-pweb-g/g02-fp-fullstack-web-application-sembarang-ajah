import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sembarang-aja.com/:shopName/:productsName',
        destination: '/api/:shopName/:productsName',
      },
    ];
  },
  images: {
    domains: ['images.tokopedia.net'],
  },
};

export default nextConfig;