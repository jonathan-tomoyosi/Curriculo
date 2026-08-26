import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // @react-pdf/renderer usa APIs de Node e não deve ser empacotado pelo bundler do servidor.
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    dirs: ['src'],
  },
}

export default nextConfig
