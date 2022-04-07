/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['stock.adobe.com','cdn.pixabay.com','www.google.com','assets.vercel.com', "lh3.googleusercontent.com"],
    formats: ['image/avif', 'image/webp'],
  },
}
