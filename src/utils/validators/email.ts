import validator from 'validator';

export const EmailValidator = (email: string) => {
	if (!email) return {
		text: '',
		value: ''
	};

	const isValid = validator.isEmail(email);

	return {
		text: isValid ? 'Correct email' : 'Enter a valid email',
		value: isValid ? 'success' : 'error',
	};
};