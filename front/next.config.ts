import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      // Anciennes URLs secteurs/solutions -> /solutions/[slug]
      {
        source: '/secteurs/:slug/solutions/:solutionSlug',
        destination: '/solutions/:solutionSlug',
        permanent: true,
      },
      // Anciennes URLs secteurs -> page d'accueil section solutions
      {
        source: '/secteurs/:path*',
        destination: '/#solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
