/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    reactStrictMode: true,
    swcMinify: true,

    images: {
        unoptimized: true,
    },
    transpilePackages: [
        '@ionic/react',
        '@ionic/core',
        '@stencil/core',
        'ionicos',
    ],
}

module.exports = nextConfig
