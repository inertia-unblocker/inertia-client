function uv(url) {
	window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

window.addEventListener('load', () => {
	window.navigator.serviceWorker.getRegistrations().then(registrations => {
		if (registrations.length > 0) {
			return;
		} else {
			window.navigator.serviceWorker.register('./sw.js', {
				scope: __uv$config.prefix
			});
		}
	});
});