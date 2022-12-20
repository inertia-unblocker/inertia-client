import * as nextUI from '@nextui-org/react';

import { FormEvent, useState } from 'react';
import { Premium } from '../icons';
import { SearchbarProps } from '@props';
import { useCookies } from 'react-cookie';
import { useProxyConfig } from '@utils/proxy';
import { useRouter } from 'next/router';


export function Searchbar({ ...props }: SearchbarProps) {
	const config = useProxyConfig();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<nextUI.Card css={{ marginTop: '.25rem', width: '100%' }}>
			<form id='proxyForm' onSubmit={onSubmit} {...props}>
				<nextUI.Input css={{ padding: '1.25rem', width: '100%' }} placeholder='Search Google or enter URL' bordered />
				<nextUI.Input css={{ display: 'none' }} type='submit' />
			</form>

			<div style={{
				display: 'flex',
				flexDirection: 'column',
				margin: '-.25rem 3.25rem 1rem'
			}}>
				<nextUI.Checkbox>Use Browser</nextUI.Checkbox>
				<nextUI.Checkbox>Cyrillic Obfuscation&nbsp;<Premium /></nextUI.Checkbox>
			</div>
		</nextUI.Card>
	);
}
