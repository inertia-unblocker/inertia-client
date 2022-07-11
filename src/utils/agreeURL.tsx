import validator from 'validator';

export function agreeURL(url: string) {
	let agreedURL;

	if (validator.isURL(url, { require_protocol: true })) {
		agreedURL = url;
	} else if (validator.isURL(`https://${url}`, { require_protocol: true })) {
		agreedURL = `https://${url}`;
	} else {
		agreedURL = `https://google.com/search?q=${url}`;
	}

	return agreedURL;
}