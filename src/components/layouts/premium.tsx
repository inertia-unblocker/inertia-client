import * as nextUI from '@nextui-org/react';

import { createElement, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Link } from '@components/link';
import { Premium as PremiumIcon } from '@components/icons';

const CheckPremium = async (uid: string, token: string) => {
	return true;
};


export function Premium({ children }: { children: React.ReactNode }) {
	const [cookie, _setCookie] = useCookies(['loggedIn', 'uid', 'token']);

	const [page, setPage] = useState(
		<>
			<div style={{ width: '25%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<nextUI.Progress indeterminated />
			</div>
			<div style={{ width: '55%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3rem' }}>
				<nextUI.Text css={{ textAlign: 'center' }}>
					Loading...
				</nextUI.Text>
			</div>
		</>
	);

	const Locked = () => (
		<>
			<div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<PremiumIcon size='32' />
			</div>
			<div style={{ width: '55%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3rem' }}>
				<nextUI.Text css={{ textAlign: 'center' }} h2>
					You must have Inertia Premium to use this site
				</nextUI.Text>
			</div>
			<div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '6.5rem' }}>
				<Link css={{ textAlign: 'center' }} href='/premium/get'>Click here to get Inertia Premium</Link>
			</div>
		</>
	);

	const Lock = () => setPage(<Locked />);

	if (cookie.loggedIn !== 'true') Lock();
	else CheckPremium(cookie.uid, cookie.token).then((hasPremium) => {
		if (!hasPremium) Lock();
		else setPage(createElement('>{children}</'));
	});

	return page;
}