export const PasswordValidator = (password: string) => {
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