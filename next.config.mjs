/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      'lodash/fp': {
        transform: 'lodash/fp/{{ member }}'
      },
    }
  }
};

export default nextConfig;
