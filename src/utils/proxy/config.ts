/* eslint-disable react-hooks/rules-of-hooks */
import { useCookies } from 'react-cookie';

export interface ProxyConfigType {
	location: string,
	external: string
}

export class ProxyConfig {
	public static set(cfg: ProxyConfigType) {
		const [_cookies, setCookie] = useCookies(['proxy']);
		setCookie('proxy', JSON.stringify(cfg), { path: '/' });
	}

	public static get(): ProxyConfigType | boolean {
		const [cookies] = useCookies(['proxy']);

		if (!cookies.proxy) return false;
		return JSON.parse(cookies.proxy);
	}
}