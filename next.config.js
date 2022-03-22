/** @type {import('next').NextConfig} */
const config = require('./src/config/baseConfig.json');

module.exports = {
	webpack: (config, options) => {
	  config.experiments = {
		topLevelAwait: true,
	  };
	  return config;
	},
	basePath: config.prefix,
	assetPrefix: config.prefix,

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${config.umamiAPI}/api/:path*`,
			}
		]
	}
};
