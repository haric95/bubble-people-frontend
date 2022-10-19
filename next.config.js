/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
