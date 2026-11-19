/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Canonical host is www (see lib/business.ts). Enforce apex -> www with a
  // permanent 308 so Google consolidates signals onto one host. The Vercel
  // domain-level redirect was observed as a 307 (temporary), which never
  // consolidates; this guarantees the permanent redirect at the app layer too.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'acdmold.com' }],
        destination: 'https://www.acdmold.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
