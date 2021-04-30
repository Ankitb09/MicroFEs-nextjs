const path = require("path");
module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config, options) => {
    const { isServer, webpack } = options;
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false
        }
      };
    }

    const { ModuleFederationPlugin } = webpack.container;
    config.plugins.push(
      new ModuleFederationPlugin({
        name: "customer-portal",
        remotes: {
          app2:
            "app2@https://kevinmfe.s3.amazonaws.com/app2/dist/remoteEntry.js",
          app1: "app1@http://localhost:3001/_next/static/runtime/remoteEntry.js"
        },
        shared: []
      })
    );
    if (!isServer) {
      config.output.publicPath = "http://localhost:3002/_next/";
    }
    return config;
  }
};
