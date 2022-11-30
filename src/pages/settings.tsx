import { Setting } from '@components/setting';
import { URLValidator } from '@utils/validators';
import { useTheme } from '@components/theme';

function Settings() {
	const { isDark, setTheme } = useTheme();

	const themeOnChange = (dark: boolean) => setTheme(dark ? 'dark' : 'light');

	return (
		<>
			<Setting
				description='Enable dark mode to keep your eyes from burning'
				name='Dark Mode'
				setting={{
					onChange: themeOnChange,
					init: isDark || true
				}}
				type='onoff'
			/>
		</>
	);
}

export default Settings;