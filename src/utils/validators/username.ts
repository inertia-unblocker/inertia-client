export const UsernameValidator = (username: string) => {
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
		text: isValid ? 'Good username' : 'Username can only contain letters, numbers, underscores, dashes and dots',
		value: isValid ? 'success' : 'error',
	};
};