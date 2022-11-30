import validator from 'validator';

export const URLValidator = (url: string): { error: boolean, message?: string } => {
	if (!url) return { error: true };

	if (!validator.isURL(url, { require_protocol: true }))
		return { error: true, message: 'Invalid URL' };

	if (!url.startsWith('https://'))
		return { error: true, message: 'Must be HTTPS' };

	if (!url.endsWith('/'))
		return { error: true, message: 'Must end with a slash (/)' };

	return { error: false };
};