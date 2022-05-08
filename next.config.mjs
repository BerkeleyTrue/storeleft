/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      'lodash/fp': {
        transform: 'lodash/fp/{{ member }}'
      },
      '@mui/material': {
        transform: '@mui/material/{{ member }}'
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{ member }}'
      },
    }
  }
};

export default nextConfig;
