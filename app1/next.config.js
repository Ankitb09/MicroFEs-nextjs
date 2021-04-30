const { join, resolve } = require("path");
module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config, options) => {
    const { isServer, webpack } = options;
    const { ModuleFederationPlugin } = webpack.container;

    config.plugins.push(
      new ModuleFederationPlugin({
        name: "app1",
        filename: "static/runtime/remoteEntry.js",
        exposes: {
          "./Button": "./components/Button"
        },
        remotes: {
          // SPA: "spa@http://localhost:3004/spa/remoteEntry.js",
          // app2:
          //   "app2@https://kevinmfe.s3.amazonaws.com/app2/dist/remoteEntry.js",
        },
        shared: []
      })
    );
    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
    }
    return config;
  }
};
