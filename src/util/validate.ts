import validator from 'validator';

export const email = (email: string) => {
	if (!email) return {
		text: '',
		value: ''
	};

	const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

	return {
		text: isValid ? 'Correct email' : 'Enter a valid email',
		value: isValid ? 'success' : 'error',
	};
};

export const username = (username: string) => {
	if (!username) return {
		text: '',
		value: ''
	};

	const hasEnoughCharacters = username.length >= 3 && username.length <= 32;
	const isValid = username.match(/^[a-zA-Z0-9-_.]+$/);


	if (!hasEnoughCharacters) {
		return {
			text: 'Username must be between 3 and 32 characters long',
			value: 'error',
		};
	}

	return {
		text: isValid ? 'Correct username' : 'Username can only contain letters, numbers, underscores, dashes and dots',
		value: isValid ? 'success' : 'error',
	};
};

export const usernameOrEmail = (usernameOrEmail: string) => {
	if (!usernameOrEmail) return {
		text: '',
		value: ''
	};

	return usernameOrEmail.includes('@') ? email(usernameOrEmail) : username(usernameOrEmail);
};

export const password = (password: string) => {
	if (!password) return {
		text: '',
		value: '',
	};

	const hasEightChars = password.length >= 8;
	const hasUppercase = password.match(/[A-Z]/);
	const hasLowercase = password.match(/[a-z]/);
	const hasNumber = password.match(/[0-9]/);
	const hasSpecialChar = password.match(/[!@#$%^&*(),.?":{}|<>]/);

	if (hasEightChars && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
		return {
			text: 'Strong password',
			value: 'success',
		};
	} else if (!hasEightChars) {
		return {
			text: 'Password must have at least 8 characters',
			value: 'error',
		};
	} else if (!hasUppercase) {
		return {
			text: 'Password must have at least 1 uppercase letter',
			value: 'error',
		};
	} else if (!hasLowercase) {
		return {
			text: 'Password must have at least 1 lowercase letter',
			value: 'error',
		};
	} else if (!hasNumber) {
		return {
			text: 'Password must have at least 1 number',
			value: 'error',
		};
	} else if (!hasSpecialChar) {
		return {
			text: 'Password must have at least 1 special character',
			value: 'error',
		};
	}

	return {
		text: '',
		value: '',
	};
};

export const passwordConfirm = (password: string, passwordConfirm: string) => {
	if (!passwordConfirm)
		return {
			text: '',
			value: '',
		};

	const isValid = password === passwordConfirm;

	return {
		text: isValid ? 'Passwords match' : 'Passwords do not match',
		value: isValid ? 'success' : 'error',
	};
};

export const URL = (url: string) => {
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