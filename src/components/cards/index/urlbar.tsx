import * as nextUI from '@nextui-org/react';
import { useCookies } from 'react-cookie';
import tldEnum from 'tld-enum';
import { useRouter } from 'next/router';
import config from '@config';
import { useState } from 'react';

export function URLBar() {
	const [cookie, setCookie] = useCookies(['proxy', 'server']);
	const [input, setInput] = useState('');
	const router = useRouter();

	function handleURL(url: string) {
		console.log(config.servers[cookie.proxy].filter(server => server.hoster == 'Heroku'));
		let serverURL = config.servers[cookie.proxy].filter(serverData => serverData.id == parseInt(cookie.server))[0].url;
		
		if (cookie.proxy == 'ultraviolet') {
			router.push(`${serverURL}/?url=${url}`);
		} else if (cookie.proxy == 'corrosion') {
			router.push(`${serverURL}/corrosion/gateway?url=${url}`);
		} else if (cookie.proxy == 'alloy') {
			router.push(`${serverURL}/alloy-gateway?url=${url}`);
		} else {
			router.push(`https://inertia-server-ultraviolet.herokuapp.com/?url=${url}`);
		}
	}
	
	function modifyURL(url: string) {
		let tlds = [];
		tldEnum.list.forEach(tld => tlds.push('.' + tld));

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

		if (!url.startsWith('https://') && !url.startsWith('http://')) url = 'http://' + url;
		if (url.endsWith('/')) url = url.substring(0, url.length - 1);

		return url;
	}

	function handleInput(e) {
		e.preventDefault();
		let url = modifyURL(input);
		handleURL(url);
	}

	return (
		<nextUI.Card css={{marginTop: '3em', order: '1', width: '100%'}} hoverable>
			<form onSubmit={handleInput}>
				<nextUI.Input placeholder='Search Google or enter URL' css={{padding: '1em 2em', width: '100%'}} onChange={(e) => setInput(e.target.value)} bordered />
				<nextUI.Input type='submit' css={{display: 'none'}} />
			</form>
		</nextUI.Card>
	);
}
