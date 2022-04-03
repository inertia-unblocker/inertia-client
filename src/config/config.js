let config = {
	prefix: '',
	analyticsDataServer: 'https://analytics-requester-production.up.railway.app/getData',
	servers: {
		ultraviolet: [
			{
				id: 1,
				hoster: 'Heroku',
				status: 'Official',
				url: 'https://inertia-server-ultraviolet.herokuapp.com'
			}
		],
		corrosion: [
			{
				id: 1,
				hoster: 'Heroku',
				status: 'Official',
				url: 'https://inertia-server-corrosion.herokuapp.com'
			}
		],
		alloy: [
			{
				id: 1,
				hoster: 'Heroku',
				status: 'Official',
				url: 'https://inertia-server-alloy.herokuapp.com'
			}
		]
	}
}

module.exports = config;