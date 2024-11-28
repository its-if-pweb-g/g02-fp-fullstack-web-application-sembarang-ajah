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
};

export default nextConfig;
