import * as nextUI from '@nextui-org/react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { agreeURL } from '@utils/agreeURL';

export function URLBar() {
	const [cookie, _setCookie] = useCookies(['proxyLocation', 'externalProxyURL', 'externalProxyType']);
	const [input, setInput] = useState('');
	const router = useRouter();

	const proxify = (url: string) => {
		if (cookie.proxyLocation === 'internal') {
			// @ts-ignore
			uv(url);
		} else if (cookie.proxyLocation === 'external') {
			if (cookie.externalProxyType === 'ultraviolet') {
				router.push(`${cookie.externalProxyURL}?url=${url}`);
			} else if (cookie.externalProxyType === 'alloy') {
				router.push(`${cookie.externalProxyURL}/alloy-gateway?url=${url}`);
			}
		}
	};

	const handleInput = (e) => {
		e.preventDefault();
		let url = agreeURL(input);
		proxify(url);
	};

	return (
		<nextUI.Card css={{ marginTop: '3em', order: '1', width: '100%' }} variant='flat' isHoverable>
			<form id='proxyForm' onSubmit={handleInput}>
				<nextUI.Input css={{ padding: '1em 2em', width: '100%' }} onChange={(e) => setInput(e.target.value)} placeholder='Search Google or enter URL' bordered />
				<nextUI.Input css={{ display: 'none' }} type='submit' />
			</form>
		</nextUI.Card>
	);
}
