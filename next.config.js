/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
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
