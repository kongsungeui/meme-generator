/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_IMGFLIP_USERNAME: process.env.NEXT_PUBLIC_IMGFLIP_USERNAME,
    NEXT_PUBLIC_IMGFLIP_PASSWORD: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
  },
}

module.exports = nextConfig
