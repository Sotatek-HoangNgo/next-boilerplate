const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "./")],
	},
	webpack: (config) => {
		config.resolve.alias["@"] = path.resolve(__dirname);
		return config;
	},
};

module.exports = nextConfig;
