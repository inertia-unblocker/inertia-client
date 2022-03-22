import config from './baseConfig.json';

config.umamiUsername = process.env.UMAMI_USERNAME || 'TheAlphaReturns';
config.umamiPassword = process.env.UMAMI_PASSWORD;
config.umamiAPI = process.env.UMAMI_API || 'http://localhost:8081';

export default config;