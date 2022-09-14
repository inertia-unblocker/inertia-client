import * as nextUI from '@nextui-org/react';
import { Mail, Password, User } from '@icons';
import { useMemo, useState } from 'react';
import { email as validateEmail, password as validatePassword, passwordConfirm as validatePasswordConfirm, username as validateUsername } from '@util/validate';
import { useCookies } from 'react-cookie';

import EmailModal from './common/emailSentModal';
import ErrorModal from './common/errModal';
import LoadingModal from './common/loadingModal';
import request from '@lib/request';


interface SignupModalProps {
	visible: boolean;
	closeHandler: () => void;
}

export default function SignupModal({ ...props }: SignupModalProps) {
	const { value: usernameValue, reset: usernameReset, bindings: usernameBindings } = nextUI.useInput('');
	const { value: emailValue, reset: emailReset, bindings: mailBindings } = nextUI.useInput('');
	const { value: passwordValue, reset: passwordReset, bindings: passwordBindings } = nextUI.useInput('');
	const { value: confirmPasswordValue, reset: confirmPasswordReset, bindings: confirmPasswordBindings } = nextUI.useInput('');
	const [username, setUsername] = useState('');
	const [_cookies, setCookie] = useCookies(['token']);

	const [loadingStage, setLoadingStage] = useState(0);
	const [loadingText, setLoadingText] = useState('');
	const [error, setError] = useState('');

	const [emailModalVisible, setEmailModalVisible] = useState(false);
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [loadingModalVisible, setLoadingModalVisible] = useState(false);

	const closeEmailModal = () => setEmailModalVisible(false);
	const closeErrorModal = () => setErrorModalVisible(false);
	const closeLoadingModal = () => setLoadingModalVisible(false);

	const usernameHelper = useMemo(() => validateUsername(usernameValue), [usernameValue]) as { text: string; value: 'success' | 'error' };
	const mailHelper = useMemo(() => validateEmail(emailValue), [emailValue]) as { text: string; value: 'success' | 'error' };
	const passwordHelper = useMemo(() => validatePassword(passwordValue), [passwordValue]) as { text: string; value: 'success' | 'error' };
	const passwordConfirmHelper = useMemo(() => validatePasswordConfirm(passwordValue, confirmPasswordValue), [passwordValue, confirmPasswordValue]) as { text: string; value: 'success' | 'error' };

	const signupAndClose = async () => {
		const emailValidate = validateEmail(emailValue);
		const passwordValidate = validatePassword(passwordValue);
		const passwordsMatch = passwordValue === confirmPasswordValue;

		if (!(emailValidate.value === 'success') || !(passwordValidate.value === 'success') || !passwordsMatch || !username) return;

		setLoadingModalVisible(true);

		setLoadingStage(1);
		setLoadingText('Signing up...');

		const response = await request('POST', '/api/user', {}, {
			username: username,
			email: emailValue,
			password: passwordValue
		});

		setLoadingStage(2);
		setLoadingText('Checking creds...');

		if (response.err) {
			if (response.err == 'EMAIL_EXISTS') {
				setLoadingModalVisible(false);
				setError('Email already exists');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			} else if (response.err == 'USERNAME_EXISTS') {
				setLoadingModalVisible(false);
				setError('Username already exists');
				props.closeHandler();
				setErrorModalVisible(true);
				return;
			}
		}

		setLoadingStage(3);
		setLoadingText('Sending verification email...');

		const { id } = response;
		const sendEmailResponse = await request('GET', `/api/user/${id}/verify/send`);

		props.closeHandler();

		if (sendEmailResponse.err) {
			setLoadingModalVisible(false);
			setError('Failed to send verification email');
			setErrorModalVisible(true);
			return;
		}

		setLoadingModalVisible(false);
		setEmailModalVisible(true);

		usernameReset();
		emailReset();
		passwordReset();
		confirmPasswordReset();
	};

	return (
		<>
			<nextUI.Modal
				onClose={props.closeHandler}
				open={props.visible}
				closeButton
			>
				<nextUI.Modal.Header>
					<nextUI.Text id='modal-title' size={18}>
						Sign Up
					</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body css={{ overflow: 'visible' }}>
					<nextUI.Input
						color={usernameHelper.value}
						contentLeft={<User />}
						helperColor={usernameHelper.value}
						helperText={usernameHelper.text}
						onReset={usernameReset}
						placeholder='Username'
						size='lg'
						status={usernameHelper.value}
						bordered
						clearable
						fullWidth
						{...usernameBindings}
					/>
					<nextUI.Input
						color={mailHelper.value}
						contentLeft={<Mail fill='currentColor' />}
						css={{ marginTop: usernameHelper.text != '' ? '1rem' : 'auto' }}
						helperColor={mailHelper.value}
						helperText={mailHelper.text}
						onReset={emailReset}
						placeholder='Email'
						size='lg'
						status={mailHelper.value}
						bordered
						clearable
						fullWidth
						{...mailBindings}
					/>
					<nextUI.Input.Password
						color={passwordHelper.value}
						contentLeft={<Password fill='currentColor' />}
						css={{ marginTop: mailHelper.text != '' ? '1rem' : 'auto', marginBottom: passwordHelper.text != '' ? '2.25rem' : '1.25rem' }}
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
					<nextUI.Input.Password
						color={passwordConfirmHelper.value}
						contentLeft={<Password fill='currentColor' />}
						helperColor={passwordConfirmHelper.value}
						helperText={passwordConfirmHelper.text}
						onReset={confirmPasswordReset}
						placeholder='Confirm Password'
						size='lg'
						status={passwordConfirmHelper.value}
						bordered
						clearable
						fullWidth
						{...confirmPasswordBindings}
					/>
				</nextUI.Modal.Body>
				<nextUI.Modal.Footer css={{ marginTop: '1.25rem' }}>
					<nextUI.Button color='error' onClick={props.closeHandler} auto flat>
						Close
					</nextUI.Button>
					<nextUI.Button onClick={signupAndClose} auto>
						Sign in
					</nextUI.Button>
				</nextUI.Modal.Footer>
			</nextUI.Modal>

			<ErrorModal closeHandler={closeErrorModal} error={error} visible={errorModalVisible} />
			<LoadingModal closeHandler={closeLoadingModal} loadingMax={3} loadingStage={loadingStage} loadingText={loadingText} visible={loadingModalVisible} />
			<EmailModal closeHandler={closeEmailModal} visible={emailModalVisible} />
		</>
	);
}