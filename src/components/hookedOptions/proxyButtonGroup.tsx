import * as nextUI from '@nextui-org/react';
import { useCookies } from 'react-cookie';

export const ProxyButtonGroup: React.FC<Partial<nextUI.CheckboxGroupProps>> = ({ ...props }) => {
	const [cookie, setCookie] = useCookies();

	const handleProxySwitch = (proxy: string) => {
		setCookie('proxy', proxy);
	};

	return (
		<nextUI.Checkbox.Group color='primary' value={[cookie.proxy]} size='lg' {...props}>
			<nextUI.Checkbox value='ultraviolet' onChange={(e) => {
				if (e.target) handleProxySwitch('ultraviolet');
			}}>
				Ultraviolet
			</nextUI.Checkbox>
			<nextUI.Checkbox value='corrosion' onChange={(e) => {
				if (e.target) handleProxySwitch('corrosion');
			}}>
				Corrosion
			</nextUI.Checkbox>
			<nextUI.Checkbox value='alloy' onChange={(e) => {
				if (e.target) handleProxySwitch('alloy');
			}}>
				Alloy
			</nextUI.Checkbox>
		</nextUI.Checkbox.Group>
	);
};