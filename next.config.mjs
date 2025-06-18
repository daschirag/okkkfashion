/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add headers for video files
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/project1',
        destination: '/project1',
      },
      {
        source: '/project2',
        destination: '/project2',
      },
      {
        source: '/project3',
        destination: '/project3',
      },
      {
        source: '/project4',
        destination: '/project4',
      },
    ]
  },
}

export default nextConfig
