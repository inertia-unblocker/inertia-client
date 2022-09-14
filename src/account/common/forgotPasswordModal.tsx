import * as nextUI from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Mail } from '@icons';
import { email as validateEmail } from '@util/validate';

import EmailModal from './emailSentModal';
import ErrorModal from './errModal';
import LoadingModal from './loadingModal';
import request from '@lib/request';


interface ForgotPasswordModalProps {
	visible: boolean;
	closeHandler: () => void;
	parentCloseHandler: () => void;
}

export default function ForgotPasswordModal({ ...props }: ForgotPasswordModalProps) {
	const { value: emailValue, reset: emailReset, bindings: mailBindings } = nextUI.useInput('');
	const emailHelper = useMemo(() => validateEmail(emailValue), [emailValue]) as { text: string; value: 'success' | 'error' };

	const [error, setError] = useState('');
	const [loadingText, setLoadingText] = useState('');
	const [loadingStage, setLoadingStage] = useState(0);

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [loadingModalVisible, setLoadingModalVisible] = useState(false);
	const [emailSentModalVisible, setEmailSentModalVisible] = useState(false);

	const closeErrorModal = () => setErrorModalVisible(false);
	const closeLoadingModal = () => setLoadingModalVisible(false);
	const closeEmailSentModal = () => setEmailSentModalVisible(false);

	const closeAndRecover = async () => {
		const emailValidate = validateEmail(emailValue);
		if (!(emailValidate.value === 'success')) return;

		props.closeHandler();
		props.parentCloseHandler();

		setLoadingModalVisible(true);
		setLoadingStage(1);
		setLoadingText('Sending email...');
		const response = await request('POST', '/api/auth/recover', {}, {
			email: emailValue,
		});

		setLoadingStage(2);
		setLoadingText('Checking for errors...');
		if (response.err) {
			if (response.message == 'USER_NOT_FOUND') {
				props.closeHandler();
				props.parentCloseHandler();

				setError('User not found');
				setErrorModalVisible(true);
				setLoadingModalVisible(false);
				return;
			} else if (response.message == 'USER_NOT_VERIFIED') {
				props.closeHandler();
				props.parentCloseHandler();

				setError('Email not verified. Please check your email and spam folder for a verification link.');
				setErrorModalVisible(true);
				setLoadingModalVisible(false);
				return;
			}
		}

		setLoadingModalVisible(false);
		setEmailSentModalVisible(true);
	};

	return (
		<>
			<nextUI.Modal
				onClose={props.closeHandler}
				open={props.visible}
				closeButton
			>
				<nextUI.Modal.Header>
					<nextUI.Text size={18}>
						Password Recovery
					</nextUI.Text>
				</nextUI.Modal.Header>

				<nextUI.Modal.Body css={{ overflow: 'visible', marginBottom: emailHelper.text == '' ? '.5rem' : '1.5rem' }}>
					<nextUI.Input
						color={emailHelper.value}
						contentLeft={<Mail fill='currentColor' />}
						helperColor={emailHelper.value}
						helperText={emailHelper.text}
						onReset={emailReset}
						placeholder='Email'
						size='lg'
						status={emailHelper.value}
						bordered
						clearable
						fullWidth
						{...mailBindings}
					/>
				</nextUI.Modal.Body>
				<nextUI.Modal.Footer>
					<nextUI.Button color='error' onClick={props.closeHandler} auto flat>
						Cancel
					</nextUI.Button>
					<nextUI.Button onClick={closeAndRecover} auto>
						Recover
					</nextUI.Button>
				</nextUI.Modal.Footer>
			</nextUI.Modal>

			<ErrorModal closeHandler={closeErrorModal} error={error} visible={errorModalVisible} />
			<LoadingModal closeHandler={closeLoadingModal} loadingMax={2} loadingStage={loadingStage} loadingText={loadingText} visible={loadingModalVisible} />
			<EmailModal closeHandler={closeEmailSentModal} visible={emailSentModalVisible} />
		</>
	);
}