import * as nextThemes from 'next-themes';
import * as nextUI from '@nextUI-org/react';

export const ThemeToggle: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const { setTheme } = nextThemes.useTheme();
	const { isDark } = nextUI.useTheme();
  
	const handleToggleTheme = () => {
		setTheme(isDark ? 'light' : 'dark');
	};
  
	return (
		<nextUI.Switch size="xl" checked={isDark} onChange={handleToggleTheme} {...props}/>
	);
};