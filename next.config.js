/** @type {import('next').NextConfig} */
const config = require('./src/config/config.json');
const path = require('path');

module.exports = {
	webpack: (config) => {
		config.experiments = {
			topLevelAwait: true,
			layers: true,
		};
		config.resolve.alias = {
			...config.resolve.alias,
			"@theme": path.resolve(__dirname, 'src/components/theme'),
			"@navigation": path.resolve(__dirname, 'src/components/navigation'),
			"@elements": path.resolve(__dirname, 'src/components/elements'),
			"@utils": path.resolve(__dirname, 'src/utils'),
			"@css": path.resolve(__dirname, 'src/css'),
			"@config": path.resolve(__dirname, 'src/config/config.json'),
		}

		return config;
	},
	basePath: config.prefix,
	assetPrefix: config.prefix,
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
	}
};
