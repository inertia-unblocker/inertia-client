import * as nextUI from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Password } from '@icons';
import { sha256 } from 'js-sha256';
import { useRouter } from 'next/router';
import { password as validatePassword } from '@util/validate';

import request from '@lib/request';


function PasswordReset() {
	const router = useRouter();
	const { id, token } = router.query;

	const { value, reset, bindings } = nextUI.useInput('');
	const [loadingStage, setLoadingStage] = useState(0);
	const [loadingText, setLoadingText] = useState('');

	const passwordHelper = useMemo(() => validatePassword(value), [value]) as { text: string; value: 'success' | 'error' };

	const doErr = () => {
		setLoadingStage(2);
		setLoadingText('Error: Bad link. Please click the link from your email.');
		setTimeout(() => router.push('/'), 5000);
	};

	const setSecondsLeft = (seconds: number) => setLoadingText(`Success! You can now log in. Redirecting to main page in ${seconds} ${seconds == 1 ? 'second' : 'seconds'}...`);

	const doVerify = async (): Promise<void> => {
		setLoadingStage(1);
		setLoadingText('Grabbing salt...');

		const saltResponse = await request('GET', `/api/user/${id}/read/salt`, { 'Authorization': `Bearer ${token}` });
		if (saltResponse.err) { doErr(); return; }

		setLoadingStage(2);
		setLoadingText('Encrypting password...');

		const { salt } = saltResponse;
		const encryptedPassword = sha256(`${value}${salt}`);

		setLoadingStage(3);
		setLoadingText('Resetting password...');

		const resetResponse = await request('POST', `/api/user/${id}/update/password`, { 'Authorization': `Bearer ${token}` }, { password: encryptedPassword });
		if (resetResponse.err) { doErr(); return; }

		setLoadingStage(2);
		setSecondsLeft(5);
		setTimeout(() => router.push('/'), 5000);
		for (let i = 4; i >= 0; i--) setTimeout(() => setSecondsLeft(i), (5 - i) * 1000);
		return;
	};

	return (
		<nextUI.Card css={{ margin: '3rem 2rem 2rem 2rem', width: 'calc(100% - 4rem)', position: 'absolute', bottom: 0, top: '5rem', marginBottom: '5rem' }}>
			<nextUI.Card.Header>
				Password Reset
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Progress css={{ width: '25%', position: 'absolute', top: 'calc(50% - 2rem)', left: '50%', transform: 'translate(-50%, -50%)' }} max={3} value={loadingStage} />
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, ${loadingStage == 0 ? '10%' : '-50%'})` }}>
					{
						loadingStage === 0 ? (
							<div>
								<nextUI.Input.Password
									color={passwordHelper.value}
									contentLeft={<Password fill='currentColor' />}
									css={{ marginBottom: passwordHelper.text == '' ? '0' : '1rem' }}
									helperColor={passwordHelper.value}
									helperText={passwordHelper.text}
									onReset={reset}
									placeholder='Password'
									size='lg'
									status={passwordHelper.value}
									bordered
									clearable
									fullWidth
									{...bindings}
								/>
								<nextUI.Button css={{ marginTop: '1rem', transform: 'translate(40%)' }} onClick={doVerify} bordered>Reset</nextUI.Button>
							</div>
						) : (
							<nextUI.Text>{loadingText}</nextUI.Text>
						)
					}
				</div>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}

export default PasswordReset;