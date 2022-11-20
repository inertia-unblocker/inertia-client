import validator from 'validator';

export const URLValidator = (url: string) => {
	if (!url) return {
		text: '',
		value: '',
	};

	const isValid = validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true });

	return {
		text: isValid ? 'Correct URL' : 'Enter a valid URL',
		value: isValid ? 'success' : 'error',
	};
};