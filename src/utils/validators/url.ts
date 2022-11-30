import validator from 'validator';

export const URLValidator = (url: string): { error: boolean, message?: string } => {
	if (!url) return { error: true };

	if (!validator.isURL(url))
		return { error: true, message: 'Invalid URL' };

	return { error: false };
};