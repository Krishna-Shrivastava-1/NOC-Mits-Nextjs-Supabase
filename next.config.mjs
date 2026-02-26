/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdms.mitsgwalior.in',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
