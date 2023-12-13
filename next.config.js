/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:[
      'images.prismic.io', 'images.unsplash.com'
    ]
  },
  typescript:{
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
