import * as nextUI from '@nextui-org/react';
import * as nextThemes from 'next-themes';

export function ProxyHook(): [boolean, React.Dispatch<React.SetStateAction<string>>]  {
	const { setTheme } = nextThemes.useTheme();
	const { isDark } = nextUI.useTheme();

	return [isDark, setTheme];
}