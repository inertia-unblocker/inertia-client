import * as nextUI from '@nextui-org/react';

import React, { createElement, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSession } from 'next-auth/react';

import { Link } from '@components/link';
import { Premium as PremiumIcon } from '@components/icons';


const CheckPremium = async () => {
	return true;
};

function LockedPage() {
	return (
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
}

function LoadingPage() {
	return (
		<div id='loading'>
			<div style={{ width: '25%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<nextUI.Progress indeterminated />
			</div>
			<div style={{ width: '55%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3rem' }}>
				<nextUI.Text css={{ textAlign: 'center' }}>
					Loading...
				</nextUI.Text>
			</div>
		</div>
	);
}

export function Premium({ children }: { children: React.ReactNode }) {
	const { status } = useSession();
	const [state, setState] = useState('loading');
	const isSet = () => state != 'loading';

	if (!isSet()) {
		if (status != 'authenticated') setState('locked');
		else CheckPremium().then((premium) => setState(premium ? 'unlocked' : 'locked'));
	}

	switch (state) {
		case 'loading': return <LoadingPage />;
		case 'locked': return <LockedPage />;
		case 'unlocked': return <>{children}</>;
		default: return <LoadingPage />;
	}
}