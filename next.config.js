/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Phase 1: No Supabase, so no image domains needed
  // Phase 2: Add Supabase image domains when ready
  images: {
    domains: [],
    remotePatterns: [
      // Uncomment when using Supabase:
      // {
      //   protocol: 'https',
      //   hostname: '**.supabase.co',
      // },
    ],
  },
  eslint: {
    // Allow production builds to complete even if there are ESLint warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Allow production builds to complete even if there are TypeScript errors
    ignoreBuildErrors: false,
  },
  // Optimize for Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig

