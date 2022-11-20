import { createTheme, Theme } from '@nextui-org/react';


export const Light = createTheme({
	type: 'light',
	theme: {
		colors: {
			gradient: '45deg, $yellow600 -20%, $red600 100%'
		}
	}
});

export const Dark = createTheme({
	type: 'dark',
	theme: {
		colors: {
			white: '#fff',
			black: '#000',

			// dark color pallette
			purple100: '#17073E',
			purple200: '#210B4B',
			purple300: '#2F125D',
			purple400: '#3F1B6F',
			purple500: '#522582',
			purple600: '#8653B4',
			purple700: '#B27CD9',
			purple800: '#D8ADF2',
			purple900: '#EDD5F8',

			primaryDark: '$purple500',
			primaryDarkHover: '$purple300',
			primaryDarkActive: '$purple200',
			primaryDarkContrast: '$purple100',
			primary: '$purple500',
			primaryBorder: '$purple400',
			primaryBorderHover: '$purple500',
			primarySolidHover: '$purple400',
			primarySolidContrast: '$white',
			primaryShadow: '$purple500',

			selection: '$purple600',

			gradient: '45deg, $yellow600 -20%, $red600 100%'
		}
	}
});
