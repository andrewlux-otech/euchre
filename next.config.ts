const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/, // Match worker files
      use: { loader: "worker-loader" }, // Use worker-loader for browser workers
    });

    return config;
  },
};

export default nextConfig;
