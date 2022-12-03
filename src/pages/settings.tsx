import { useState } from 'react';

import { Divider } from '@nextui-org/react';
import { firefox } from '@utils/checks';
import { Setting } from '@components/setting';
import { URLValidator } from '@utils/validators';

import { useProxyConfig } from '@utils/proxy';
import { useTheme } from '@components/theme';


function Settings() {
	const { isDark, setTheme } = useTheme();
	const proxyConfig = useProxyConfig();


	const onThemeChange = (dark: boolean) => setTheme(dark ? 'dark' : 'light');
	const onLocationChange = (location: string) => proxyConfig.location = location as 'internal' | 'external';
	const onExternalTypeChange = (type: string) => proxyConfig.external.type = type as 'alloy' | 'ultraviolet';
	const onURLChange = (url: string) => proxyConfig.external.url = url;

	return (
		<>
			<Setting
				description='Enable dark mode to keep your eyes from burning'
				name='Dark Mode'
				setting={{
					onChange: onThemeChange,
					init: isDark || true
				}}
				type='onoff'
			/>

			<Divider css={{ margin: '1rem 1.25rem', width: 'calc(100% - 2.5rem)' }} />

			<Setting
				description='Choose external to use your own proxy with the options below'
				name='Proxy Location'
				setting={{
					onChange: onLocationChange,
					options: [
						{ label: 'Internal', value: 'internal', disabled: firefox, info: 'Firefox does not support this option' },
						{ label: 'External', value: 'external' }
					],
					init: proxyConfig.location ? 'external' : 'internal'
				}}
				type='option'
			/>

			<Setting
				description='The URL of the proxy'
				disabled={proxyConfig.location !== 'external'}
				info={
					proxyConfig.location === 'internal'
						? 'Set "Proxy Location" to external to change this'
						: ''
				}
				name='External Proxy URL'
				setting={{
					onChange: onURLChange,
					init: proxyConfig.external.url,
					validate: URLValidator
				}}
				type='input'
			/>

			<Setting
				description='The type of proxy you are using'
				disabled={proxyConfig.location !== 'external'}
				info={
					proxyConfig.location === 'internal'
						? 'Set "Proxy Location" to external to change this'
						: ''
				}
				name='External Proxy Type'
				setting={{
					onChange: onExternalTypeChange,
					options: [
						{ label: 'Alloy', value: 'alloy' },
						{ label: 'Ultraviolet', value: 'ultraviolet', disabled: firefox, info: 'Firefox does not support this option' }
					],
					init: proxyConfig.external.type
				}}
				type='option'
			/>
		</>
	);
}

export default Settings;