// next.config.js

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      // Will only be available on the server side
      bodyParser: {
          sizeLimit: '10mb',
      },
  },
  async headers() {
      return [
          {
              // Match all API routes
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // Replace "*" with your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ];
  },
};

module.exports = nextConfig;
