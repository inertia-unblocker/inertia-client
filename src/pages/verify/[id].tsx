import * as nextUI from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import request from '@lib/request';


function Verify() {
	const router = useRouter();
	const { id, token } = router.query;

	const [loadingStage, setLoadingStage] = useState(0);
	const [loadingText, setLoadingText] = useState('');

	const doVerify = async (): Promise<void> => {
		setLoadingStage(1);
		setLoadingText('Verifying...');
		const response = await request('POST', `/api/user/${id}/verify/complete`, { 'Authorization': `Bearer ${token}` });

		if (response.err) {
			setLoadingStage(2);
			setLoadingText('Error: Bad link. Please click the link from your email.');
			setTimeout(() => router.push('/'), 5000);
			return;
		}

		const setSecondsLeft = (seconds: number) => setLoadingText(`Success! You can now log in. Redirecting to main page in ${seconds} ${seconds == 1 ? 'second' : 'seconds'}...`);

		setLoadingStage(2);
		setSecondsLeft(5);
		setTimeout(() => router.push('/'), 5000);
		for (let i = 4; i >= 0; i--) setTimeout(() => setSecondsLeft(i), (5 - i) * 1000);
		return;
	};

	return (
		<nextUI.Card css={{ margin: '3rem 2rem 2rem 2rem', width: 'calc(100% - 4rem)', position: 'absolute', bottom: 0, top: '5rem' }}>
			<nextUI.Card.Header>
				Verify
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Progress css={{ width: '25%', position: 'absolute', top: 'calc(50% - 2rem)', left: '50%', transform: 'translate(-50%, -50%)' }} max={2} value={loadingStage} />
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
					{
						loadingStage === 0 ? (
							<nextUI.Button css={{ marginTop: '2rem' }} onClick={doVerify} bordered>Verify</nextUI.Button>
						) : (
							<nextUI.Text>{loadingText}</nextUI.Text>
						)
					}
				</div>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}

export default Verify;