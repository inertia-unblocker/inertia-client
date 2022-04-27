import * as nextUI from '@nextui-org/react';
import browserStyles from '@css/browser.module.css';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import tldEnum from 'tld-enum';
import config from '@config';

export function InertiaBrowser() {
	const [cookie, _setCookies] = useCookies(['proxy', 'server']);
	const [input, setInput] = useState('');
	const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';
	const serverUrl = config.servers.ultraviolet.filter(serverData => serverData.id == parseInt(cookie.server))[0].url;

	function handleURL(url: string) {
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

		console.log(url);
		console.log(`${config.servers.ultraviolet[0].url}/?url=${url}`);
		return(`${serverUrl}/?url=${url}`);
	}

	function handleProxyChange(url) {
		const loading = document.getElementById('loading');
		const vport = document.getElementById('viewport');
		loading.style.visibility = 'visible';		
		
		console.log(url);
		url = handleURL(url);

		if (isIFrame(vport)) {
			vport.src = url;
		}
	}

	function handleInput(e) {
		e.preventDefault();
		handleProxyChange(input);
	}

	
	useEffect(() => {
		const vport = document.getElementById('viewport');
		const loading = document.getElementById('loading');

		if (isIFrame(vport)) {
			vport.addEventListener('load', () => {
				loading.style.visibility = 'hidden';
			});
		}
	});

	return (
		<>
			<nextUI.Card css={{width: '100%', overflow: 'hidden', borderRadius: '0px'}} >
				<nextUI.Card.Header css={{height: '6em', display: 'inline-block'}}>
					<nextUI.Text h1 css={{textGradient: '$gradient', marginLeft: '.5em', display: 'inline-block', userSelect: 'none', width: '20%'}} weight="bold">
						<nextUI.Link href={`${config.prefix}/`}>Inertia</nextUI.Link>
						<nextUI.Link href={`${config.prefix}/browser`}>&nbsp;Browser</nextUI.Link>
					</nextUI.Text>
				
					<div style={{display: 'inline-flex', alignItems: 'center', width: '75%'}} >
						<nextUI.Loading id='loading' css={{width: '2em', height: '2em'}} color='secondary' />
						<div style={{width: '100%'}} >
							<form onSubmit={handleInput} style={{width: '100%'}} >
								<nextUI.Input css={{width: '100%', marginLeft: '3em'}} placeholder='Search Google or Enter URL' onChange={(e) => setInput(e.target.value)} bordered />
								<nextUI.Input type='submit' css={{display: 'none'}} />
							</form>
						</div>
					</div>
				</nextUI.Card.Header>
			</nextUI.Card>
			<div className={browserStyles.viewportContainer} style={{width: '100%'}} >
				<iframe src={`${serverUrl}?url=https://google.com`} id='viewport' className={browserStyles.viewport} name='viewport' sandbox='allow-downloads-without-user-activation
                    allow-downloads
                    allow-forms
                    allow-modals
                    allow-orientation-lock
                    allow-pointer-lock
                    allow-popups
                    allow-popups-to-escape-sandbox
                    allow-presentation
                    allow-same-origin
                    allow-scripts
                    allow-storage-access-by-user-activation
                    allow-top-navigation
                    allow-top-navigation-by-user-activation'
				allow='fullscreen'></iframe>
			</div>
		</>
	);
}