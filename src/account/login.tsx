import * as nextUI from '@nextui-org/react';
import { Password, User } from '@icons';
import { useMemo, useState } from 'react';
import { password as validatePassword, usernameOrEmail as validateUe } from '@util/validate';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import ErrorModal from './common/errModal';
import ForgotPasswordModal from './common/forgotPasswordModal';
import LoadingModal from './common/loadingModal';
import ResendModal from './common/resendEmailModal';

import request from '@lib/request';

interface LoginModalProps {
	visible: boolean;
	closeHandler: () => void;
}

export default function LoginModal({ ...props }: LoginModalProps) {
	const { value: ueValue, reset: ueReset, bindings: ueBindings } = nextUI.useInput('');
	const { value: passwordValue, reset: passwordReset, bindings: passwordBindings } = nextUI.useInput('');
	const [_cookies, setCookie] = useCookies(['token', 'loggedIn', 'uid']);

	const [loadingStage, setLoadingStage] = useState(0);
	const [loadingText, setLoadingText] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [loadingModalVisible, setLoadingModalVisible] = useState(false);
	const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
	const [resendModalVisible, setResendModalVisible] = useState(false);

	const closeErrorModal = () => setErrorModalVisible(false);
	const closeLoadingModal = () => setLoadingModalVisible(false);
	const closeForgotPasswordModal = () => setForgotPasswordModalVisible(false);
	const closeResendModal = () => setResendModalVisible(false);

	const passwordHelper = useMemo(() => validatePassword(passwordValue), [passwordValue]) as { text: string; value: 'success' | 'error' };
	const ueHelper = useMemo(() => validateUe(ueValue), [ueValue]) as { text: string; value: 'success' | 'error' };

	const loginAndClose = async () => {
		const emailValidate = validateUe(ueValue);
		const passwordValidate = validatePassword(passwordValue);

		if (!(emailValidate.value === 'success') || !(passwordValidate.value === 'success')) return;

		setLoadingModalVisible(true);

		setLoadingStage(1);
		setLoadingText('Logging in...');
		const response = await request('POST', '/api/auth/login', {}, {
			usernameOrEmail: ueValue,
			password: passwordValue,
		});

		console.log(response);
		setLoadingStage(2);
		setLoadingText('Checking credentials...');
		if (response.err) {
			if (response.message == 'USER_NOT_FOUND') {
				setLoadingModalVisible(false);
				setError('User not found');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			} else if (response.message == 'BAD_PASSWORD') {
				setLoadingModalVisible(false);
				setError('Incorrect password');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			} else if (response.message == 'EMAIL_NOT_VERIFIED') {
				setLoadingModalVisible(false);
				setError('Email not verified. Please check your email and spam folder for a verification link.');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			} else {
				setLoadingModalVisible(false);
				setError('Oops, something went wrong');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			}
		}

		setLoadingStage(3);
		setLoadingText('Setting cookies...');
		const { token, uid } = response;
		setCookie('token', token, { expires: new Date(Date.now() + 12096e5), path: '/' });
		setCookie('uid', uid, { expires: new Date(Date.now() + 12096e5), path: '/' });
		setCookie('loggedIn', true, { expires: new Date(Date.now() + 12096e5), path: '/' });
		router.reload();
		setLoadingModalVisible(false);
		props.closeHandler();
	};

	const handleResendEmail = () => setResendModalVisible(true);
	const handleForgotPassword = () => setForgotPasswordModalVisible(true);

	return (
		<>
			<nextUI.Modal
				onClose={props.closeHandler}
				open={props.visible}
				closeButton
			>
				<nextUI.Modal.Header>
					<nextUI.Text id='modal-title' size={18}>
						Login
					</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Input
						color={ueHelper.value}
						contentLeft={<User />}
						helperColor={ueHelper.value}
						helperText={ueHelper.text}
						onReset={ueReset}
						placeholder='Username or Email'
						size='lg'
						status={ueHelper.value}
						bordered
						clearable
						fullWidth
						{...ueBindings}
					/>
					<nextUI.Input.Password
						color={passwordHelper.value}
						contentLeft={<Password fill='currentColor' />}
						css={{ marginTop: ueHelper.text != '' ? '1rem' : 'auto', marginBottom: passwordHelper.text != '' ? '2.25rem' : '1.25rem' }}
						helperColor={passwordHelper.value}
						helperText={passwordHelper.text}
						onReset={passwordReset}
						placeholder='Password'
						size='lg'
						status={passwordHelper.value}
						bordered
						clearable
						fullWidth
						{...passwordBindings}
					/>
					<nextUI.Row justify='space-between'>
						<nextUI.Text />
						<nextUI.Link color='text' css={{ fontSize: '$sm', letterSpacing: '$tight', marginRight: '.5rem' }} onClick={handleForgotPassword} underline>Forgot password?</nextUI.Link>
					</nextUI.Row>
					<nextUI.Row justify='space-between'>
						<nextUI.Text />
						<nextUI.Link color='text' css={{ fontSize: '$sm', letterSpacing: '$tight', marginRight: '.5rem' }} onClick={handleResendEmail} underline>Resend verification email</nextUI.Link>
					</nextUI.Row>
				</nextUI.Modal.Body>
				<nextUI.Modal.Footer>
					<nextUI.Button color='error' onClick={props.closeHandler} auto flat>
						Close
					</nextUI.Button>
					<nextUI.Button onClick={loginAndClose} auto>
						Sign in
					</nextUI.Button>
				</nextUI.Modal.Footer>
			</nextUI.Modal>

			<ErrorModal closeHandler={closeErrorModal} error={error} visible={errorModalVisible} />
			<LoadingModal closeHandler={closeLoadingModal} loadingMax={3} loadingStage={loadingStage} loadingText={loadingText} visible={loadingModalVisible} />
			<ForgotPasswordModal closeHandler={closeForgotPasswordModal} parentCloseHandler={props.closeHandler} visible={forgotPasswordModalVisible} />
			<ResendModal closeHandler={closeResendModal} parentCloseHandler={props.closeHandler} visible={resendModalVisible} />
		</>
	);
}