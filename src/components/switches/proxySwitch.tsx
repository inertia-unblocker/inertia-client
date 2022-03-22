import * as nextUI from '@nextui-org/react';
import { ProxyHook } from '@hooks/proxy';

export const ProxySwitch: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const [proxy, setProxy] = ProxyHook();

	const handleProxySwitch = () => {
		setProxy(proxy === 'ultraviolet' ? 'alloy' : 'ultraviolet');
	};

	return (
		<nextUI.Switch size="xl" checked={proxy === 'ultraviolet'} onChange={handleProxySwitch} {...props}/>
	);
};