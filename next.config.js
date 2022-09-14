/** @type {import('next').NextConfig} */
const config = require('./src/config/config.json');
const path = require('path');
const webpack = require('webpack');

const { parsed: localEnv } = require('dotenv').config();

const nextConfig = {
	webpack: (config) => {
		config.experiments = {
			topLevelAwait: true,
			layers: true,
		};
		config.resolve.alias = {
			...config.resolve.alias,
			'@theme': path.resolve(__dirname, 'src/theme'),
			'@nav': path.resolve(__dirname, 'src/navigation'),
			'@elem': path.resolve(__dirname, 'src/elements'),
			'@util': path.resolve(__dirname, 'src/util'),
			'@css': path.resolve(__dirname, 'src/css'),
			'@icons': path.resolve(__dirname, 'src/icons'),
			'@lib': path.resolve(__dirname, 'lib'),
			'@account': path.resolve(__dirname, 'src/account'),
			'@cfg': path.resolve(__dirname, 'src/config/config.json'),
		};
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		config.externals = [
			...config.externals,
			'child_process',
			'dns',
			'fs',
			'net',
			'tls'
		];
		return config;
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			}
		];
	},
	reactStrictMode: false,
};

config.prefix ? nextConfig.basePath = config.prefix : null;
config.prefix ? nextConfig.assetPrefix = config.prefix : null;
module.exports = nextConfig;