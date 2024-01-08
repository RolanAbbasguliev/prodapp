/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: process.env.PRODUCTAPP_OUTPUT ? 'build_phone' : 'build',
    reactStrictMode: false,
    swcMinify: true,
    output: process.env.PRODUCTAPP_OUTPUT ? 'export' : undefined,

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
