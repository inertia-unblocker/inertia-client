import { createTheme, Theme } from '@nextui-org/react';

export const lightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {
			gradient: '45deg, $yellow600 -20%, $red600 100%'
		}
	}
});

export const darkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			white: '#fff',
			black: '#000',

			// dark color pallette
			blue50: '#020214',
			blue100: '#06061E',
			blue200: '#0A0A25',
			blue300: '#10102E',
			blue400: '#171737',
			blue500: '#202040',
			blue600: '#57578C',
			blue700: '#8A8AC5',
			blue800: '#BCBCEB',
			blue900: '#DCDCF5',

			primaryDark: '$blue500',
			primaryDarkHover: '$blue300',
			primaryDarkActive: '$blue200',
			primaryDarkContrast: '$blue100',
			primary: '$blue500',
			primaryBorder: '$blue400',
			primaryBorderHover: '$blue500',
			primarySolidHover: '$blue400',
			primarySolidContrast: '$white',
			primaryShadow: '$blue500',

			selection: '$blue600',

			gradient: '45deg, $yellow600 -20%, $red600 100%'
		}
	}
});
