/** @type {import('next').NextConfig} */
const config = require('./src/config/config.json');

const nextConfig = {
	basePath: config.prefix,
	assetPrefix: config.prefix,
};

module.exports = nextConfig;
