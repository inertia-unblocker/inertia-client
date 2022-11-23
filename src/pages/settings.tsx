import * as nextUI from '@nextui-org/react';

// import { browserIsFirefox } from '@util/detectors';
// import { Internet } from '@icons';
// import { Setting } from '@elem/setting';
// import { useCookies } from 'react-cookie';
// import { useMemo } from 'react';
// import { URL as validateURL } from '@util/validate';

// import useTheme from '@utils/client/theme';


function Settings() {
	// const [cookies, setCookie] = useCookies(['proxyLocation', 'externalProxyType', 'externalProxyURL']);
	// const [isDark, handleThemeSwitch] = useTheme();

	// const { value, reset, bindings } = nextUI.useInput(cookies.externalProxyURL);
	// const URLHelper = useMemo(() => validateURL(value), [value]) as { text: string; value: 'success' | 'error' };

	// const defaultSwitchProps = { animated: true, preventDefault: false, bordered: false, shadow: false, squared: false, disabled: false };
	// const defaultInputProps = { disabled: false, readOnly: false, rounded: true, animated: true, underlined: false, shadow: true, contentClickable: true, contentRightStyling: true, contentLeftStyling: true, required: false, width: '', autoComplete: '', className: '', initialValuets: '', initialValue: '' };

	// const handleProxyLocationChange = (value: string) => {

	// };

	// const handleProxyTypeChange = (value: string) => {

	// };

	// const handleProxyURLChange = (value) => {
	// 	value.preventDefault();



	// 	if (URLHelper.value === 'success') {
	// 		setCookie('externalProxyURL', value.target.value, { path: '/' });
	// 	}
	// };

	// return (
	// 	<>
	// 		<Setting
	// 			css={{ marginTop: '2rem' }}
	// 			description='Enable dark mode and keep your eyes from burning'
	// 			name='Dark Mode'
	// 			onChange={(_value) => handleThemeSwitch()}
	// 			switchProps={{ ...defaultSwitchProps, initialChecked: isDark }}
	// 			type='switch'
	// 		/>

	// 		<Setting
	// 			description='Switch the location of the proxy. Cannot switch to internal if using Firefox. Internal is recommended'
	// 			name='Location'
	// 			onChange={handleProxyLocationChange}
	// 			radioDisabledValues={browserIsFirefox ? ['internal'] : []}
	// 			radioProps={{ defaultValue: cookies.proxyLocation }}
	// 			selections={[{ name: 'Internal', value: 'internal' }, { name: 'External', value: 'external' }]}
	// 			type='select'
	// 		/>

	// 		<Setting
	// 			description='Switch the type of proxy used by Inertia. Cannot switch to Ultraviolet if using Firefox. Cannot change if using internal proxy'
	// 			name='Proxy Type'
	// 			onChange={handleProxyTypeChange}
	// 			radioDisabledValues={browserIsFirefox ? ['uv'] : cookies.proxyLocation == 'internal' ? ['uv', 'alloy'] : []}
	// 			radioProps={{ defaultValue: cookies.externalProxyType }}
	// 			selections={[{ name: 'Ultraviolet', value: 'uv' }, { name: 'Alloy', value: 'alloy' }]}
	// 			type='select' />

	// 		<Setting
	// 			description='Change the URL of the external proxy. Cannot change if using internal proxy'
	// 			inputProps={{
	// 				...defaultInputProps,
	// 				color: URLHelper.value,
	// 				contentLeft: <Internet />,
	// 				helperColor: URLHelper.value,
	// 				helperText: URLHelper.text,
	// 				onReset: reset,
	// 				placeholder: 'URL',
	// 				size: 'sm',
	// 				status: URLHelper.value,
	// 				bordered: true,
	// 				clearable: true,
	// 				fullWidth: false,
	// 				width: '20rem',
	// 				disabled: cookies.proxyLocation == 'internal',
	// 				borderWeight: 'normal',
	// 				...bindings
	// 			}}
	// 			name='External Proxy URL'
	// 			onChange={handleProxyURLChange}
	// 			type='input'
	// 		/>
	// 	</>
	// );

	return (
		<nextUI.Text>Awaiting refactor</nextUI.Text>
	);
}

export default Settings;