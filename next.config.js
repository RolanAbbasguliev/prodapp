/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    swcMinify: true,
    output: 'export',

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
