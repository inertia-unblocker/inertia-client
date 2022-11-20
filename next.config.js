/** @type {import('next').NextConfig} */
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
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@props': path.resolve(__dirname, 'src/props'),
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

module.exports = nextConfig;