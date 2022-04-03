/** @type {import('next').NextConfig} */
const config = require('./src/config/config');

module.exports = {
	webpack: (config, options) => {
	  config.experiments = {
		topLevelAwait: true,
		layers: true,
	  };
	  return config;
	},
	basePath: config.prefix,
	assetPrefix: config.prefix,
};
