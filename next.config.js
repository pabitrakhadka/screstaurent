const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  images: {
    domains: [
      'media.istockphoto.com',
      'www.shutterstock.com',
      'img.freepik.com',
      'www.google.com',
      'cdn-icons-png.flaticon.com',
      'www.seekpng.com',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // These modules are server-side only, set them to false in webpack for the client-side
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
