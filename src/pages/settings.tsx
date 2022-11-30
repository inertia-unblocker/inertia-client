import { Setting } from '@components/setting';

function Settings() {
	return (
		<Setting
			description="Enable dark mode and keep your eyes from burning"
			name="Dark Mode"
			setting={{
				onChange: () => {},
				init: true
			}}
			type='onoff'
		/>
	);
}

export default Settings;