import * as nextUI from '@nextui-org/react';

import { DetailedHTMLProps, FormEvent, FormEventHandler, HTMLAttributes, useState } from 'react';
import { fixurl } from '@utils/proxy';
import { Premium } from '../icons';
import { SearchbarProps } from '@props';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export function Searchbar({ ...props }: SearchbarProps) {
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

	const handleInput = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		proxify(fixurl(input));
	};

	return (
		<nextUI.Card css={{ marginTop: '.25rem', width: '100%' }} variant='flat' isHoverable>
			<form id='proxyForm' onSubmit={handleInput} {...props}>
				<nextUI.Input css={{ padding: '1em 2em', width: '100%' }} onChange={(e) => setInput(e.target.value)} placeholder='Search Google or enter URL' bordered />
				<nextUI.Input css={{ display: 'none' }} type='submit' />
			</form>

			<nextUI.Divider />

			<nextUI.Checkbox css={{ margin: '1rem 0rem 0rem 2rem' }}>Use Browser</nextUI.Checkbox>
			<nextUI.Checkbox css={{ margin: '1rem 0rem 1rem 2rem' }}>Cyrillic Obufiscation&nbsp;<Premium /></nextUI.Checkbox>
		</nextUI.Card>
	);
}
