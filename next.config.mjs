/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edujsgames.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
    experimental: {
      serverActions: {
        bodySizeLimit: '10mb',
      },
    },
};

export default nextConfig;
