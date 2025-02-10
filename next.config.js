/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logodownload.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
