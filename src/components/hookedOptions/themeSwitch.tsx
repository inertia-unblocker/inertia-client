import * as nextUI from '@nextui-org/react';
import useTheme from '@utils/hooks/theme';

export const ThemeSwitch: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const [isDark, handleThemeSwitch] = useTheme();
  
	return (
		<nextUI.Switch size='xl' checked={isDark} onChange={handleThemeSwitch} {...props}/>
	);
};