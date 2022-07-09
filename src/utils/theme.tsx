import * as nextUI from '@nextui-org/react';
import * as nextThemes from 'next-themes';

export default function useTheme(): [boolean, () => void]  {
	const { setTheme } = nextThemes.useTheme();
	const { isDark } = nextUI.useTheme();

	const handleThemeSwitch = () => {
		setTheme(isDark ? 'light' : 'dark');
	};

	return [isDark, handleThemeSwitch];
}