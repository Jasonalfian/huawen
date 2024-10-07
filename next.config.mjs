/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "huawenmandarin.biz.id", // Your image domain
        port: "", // Leave empty if not using a specific port
        pathname: "/**", // Allow all paths for this domain
      },
    ],
  },
};

export default nextConfig;
