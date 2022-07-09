import * as nextUI from '@nextui-org/react';
import useTheme from '@utils/theme';

export const ThemeSwitch: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const [isDark, handleThemeSwitch] = useTheme();

	return (
		<nextUI.Switch checked={isDark} onChange={handleThemeSwitch} size='xl' {...props} />
	);
};