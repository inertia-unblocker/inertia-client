export default async function request(type: 'POST' | 'GET' | 'DELETE', url: string, headers?: object, body?: object | string, query?: object | string) {
	const sentQuery = query ? typeof query === 'string' ? query : `?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
	const sentBody = body ? typeof body === 'string' ? body : JSON.stringify(body) : '';

	const requestHeaders = new Headers();
	for (const [key, value] of Object.entries(headers || {})) requestHeaders.set(key, value);
	requestHeaders.set('Content-Type', 'application/json');

	if (url.startsWith('/')) url = `${process.env.HOST}${url}`;

	try {
		new URL(url);
	} catch (e) {
		return { err: true, message: 'BAD_URL' };
	}

	switch (type) {
		case 'GET':
			return await fetch(`${url}${sentQuery}`, {
				method: 'GET',
				headers: requestHeaders,
				credentials: 'same-origin'
			}).then(res => res.json());
		case 'POST':
			return await fetch(url, {
				method: 'POST',
				headers: requestHeaders,
				body: sentBody,
				credentials: 'same-origin'
			}).then(res => res.json());
		case 'DELETE':
			return await fetch(url, {
				method: 'DELETE',
				headers: requestHeaders,
				body: sentBody,
				credentials: 'same-origin'
			}).then(res => res.json());
		default:
			return { err: true, message: 'BAD_METHOD' };
	}
}