import * as nextUI from '@nextui-org/react';
import { ProxyHook } from '@hooks/proxy';

export const ProxySwitch: React.FC<Partial<nextUI.SwitchProps>> = ({ ...props }) => {
	const [proxy, setProxy] = ProxyHook();

	const handleProxySwitch = () => {
		setProxy(proxy === 'corrosion' ? 'alloy' : 'corrosion');
	};

	return (
		<nextUI.Switch size="xl" checked={proxy === 'corrosion'} onChange={handleProxySwitch} {...props}/>
	);
};