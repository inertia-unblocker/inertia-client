function uv(url) {
	window.navigator.serviceWorker.register('./sw.js', {
		scope: __uv$config.prefix
	}).then(() => {
		window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
	});
}