import validator from 'validator';

export function fixurl(url: string) {
	return validator.isURL(url, { require_protocol: true })
		? url
		: validator.isURL(url, { require_protocol: false })
			? `http://${url}`
			: `https://google.com/search?q=${url}`;
}