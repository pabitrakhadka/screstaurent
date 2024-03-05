/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    bodyParser: {
      sizeLimit: '10mb',
    },
  }
}

module.exports = nextConfig