/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    // Anciennes URLs éventuelles -> nouvelles (les slugs principaux sont conservés à l'identique).
    return [
      { source: '/photos', destination: '/realisations', permanent: true },
      { source: '/contact-et-devis', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
