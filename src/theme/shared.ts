import { createTheme, Theme } from '@nextui-org/react';

export const lightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {
			gradient: '15deg, $yellow500, $red500'
		}
	}
});

export const darkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			selection: '$purple700',
			gradient: '15deg, $yellow500, $red500'
		}
	}
});
