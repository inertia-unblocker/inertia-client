import * as nextUI from '@nextui-org/react';
import * as nextThemes from 'next-themes';

export const ThemeSwitch: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const { setTheme } = nextThemes.useTheme();
	const { isDark } = nextUI.useTheme();

	const handleThemeSwitch = () => {
		setTheme(isDark ? 'light' : 'dark');
	};
  
	return (
		<nextUI.Switch size="xl" checked={isDark} onChange={handleThemeSwitch} {...props}/>
	);
};