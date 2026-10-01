/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@supabase/ssr'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/guidance',
                destination: '/news',
                permanent: true,
            },
            {
                source: '/guidance/:path*',
                destination: '/news',
                permanent: true,
            },
            {
                source: '/contact',
                destination: '/',
                permanent: false,
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig


