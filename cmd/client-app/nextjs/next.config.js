/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",

    // Use the CDN in production and localhost for development.
    assetPrefix: process.env.ASSET_PREFIX_CDN,
    publicRuntimeConfig: {
        assetPrefix: process.env.ASSET_PREFIX_CDN,
    },

    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
