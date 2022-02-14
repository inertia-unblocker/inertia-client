import * as nextUI from '@nextui-org/react';
import { ProxyHook } from '@hooks/proxy';
import tldEnum from 'tld-enum';
import { useEffect } from 'react';
import config from '@repoRoot/package.json';

export function URLBar() {
	const [proxy, _setProxy] = ProxyHook();

	function handleURL(url: string) {
		if (!config.inertiaCfg.proxyLocation.endsWith('/')) throw new Error('Backend URL must end with /');

		if (proxy == 'corrosion') {
			useEffect(() => {
				window.location.assign(config.inertiaCfg.proxyLocation + 'corrosion/gateway?url=' + url);
			});
		} else {
			useEffect(() => {
				window.location.assign(config.inertiaCfg.proxyLocation + 'alloy-gateway?url=' + url);
			});
		}
	}
	
	function modifyURL(url: string) {
		let tlds = [];
		tldEnum.forEach(tld => tlds.push('.' + tld));

		let search = false;
		for (let i of tlds) {
			let domain = i;
			let has = i + '/';

			if (url.endsWith(domain) || url.includes(has)) {
				search = false;
				break;
			} else {
				search = true;
			}
		}

		if (search) {
			url
				.replaceAll(' ', '+')
				.replaceAll('#', '%23')
				.replaceAll('$', '%24')
				.replaceAll('%', '%25')
				.replaceAll('&', '%26')
				.replaceAll('\'', '%27')
				.replaceAll('@', '%40')
				.replaceAll('+', '%2B')
				.replaceAll(',', '%2C')
				.replaceAll('/', '%2F')
				.replaceAll(':', '%3A')
				.replaceAll(';', '%3B')
				.replaceAll('=', '%3D')
				.replaceAll('?', '%3F')
				.replaceAll('[', '%5B')
				.replaceAll('\\', '%5C')
				.replaceAll(']', '%5D')
				.replaceAll('{', '%7B')
				.replaceAll('|', '%7C')
				.replaceAll('}', '%7D');

			url = `https://google.com/search?q=${url}`;
		}

		if (!url.startsWith("https://") || !url.startsWith("http://")) url = 'http://' + url;
		if (url.endsWith('/')) url = url.substring(0, url.length - 1);

		return url;
	}

	return;
}