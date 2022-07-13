import * as nextUI from '@nextui-org/react';
import useTheme from '@utils/theme';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeSwitch({ iconOnly = false, size = 1.5, ...props }) {
	const [isDark, handleThemeSwitch] = useTheme();

	const StyledButton = nextUI.styled('button', {
		dflex: 'center',
		cursor: 'pointer',
		background: 'transparent',
		border: 'none',
		padding: 0,
		'& .theme-selector-icon': {
			color: '$colors$accents6'
		},
		'@xsMax': {
			px: '$2'
		}
	});

	if (iconOnly) {
		return (
			<StyledButton onClick={handleThemeSwitch} {...props}>
				{isDark ? (
					<MdLightMode size={`${size}rem`} />
				) : (
					<MdDarkMode size={`${size}rem`} />
				)}
			</StyledButton>
		);
	}

	return (
		<nextUI.Switch checked={isDark} onChange={handleThemeSwitch} size='xl' {...props} />
	);
}



