/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to enable API routes and SSR on Cloudflare Pages
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_IMGFLIP_USERNAME: process.env.NEXT_PUBLIC_IMGFLIP_USERNAME,
    NEXT_PUBLIC_IMGFLIP_PASSWORD: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
  },
}

module.exports = nextConfig
