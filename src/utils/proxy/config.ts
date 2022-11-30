import { firefox } from '@utils/checks';
import { useCookies } from 'react-cookie';

interface ProxyConfigType {
	location: 'internal' | 'external';
	external: {
		url: string;
		type: 'alloy' | 'ultraviolet'
	}
}

const defaultConfig: ProxyConfigType = {
	location: firefox ? 'external' : 'internal',
	external: {
		url: `https://${firefox ? 'alloy' : 'ultraviolet'}.backends.onlycs.net/`,
		type: firefox ? 'alloy' : 'ultraviolet'
	}
};

export const useProxyConfig = () => {
	const [cookies, setCookies] = useCookies(['proxy', 'firstload1_3_0']);

	const write = (config: ProxyConfigType) =>
		setCookies('proxy', config, { path: '/' });

	if (!cookies.proxy)
		write(defaultConfig);

	if (!cookies.firstload1_3_0) {
		write(defaultConfig);
		setCookies('firstload1_3_0', true, { path: '/' });
	}

	const handler = {
		get: (_target: ProxyConfigType, prop: string, reciever: any) => {
			return Reflect.get(cookies.proxy, prop, reciever);
		},
		set: (_target: ProxyConfigType, prop: string, value: any, reciever: any) => {
			const newConfig = { ...cookies.proxy, [prop]: value };
			write(newConfig);
			return Reflect.set({}, prop, value, reciever);
		}
	};

	return new Proxy(cookies.proxy, handler) as ProxyConfigType;
};