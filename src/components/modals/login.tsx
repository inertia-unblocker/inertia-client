import { Button, Modal, Text } from '@nextui-org/react';
import { Discord, Github } from '@components/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { signIn } from 'next-auth/react';


export function UseLoginModal(): [Dispatch<SetStateAction<boolean>>, () => JSX.Element] {
	const [visible, setVisible] = useState(false);

	const LoginModal = () => {
		return (
			<Modal
				onClose={() => setVisible(false)}
				open={visible}
				closeButton
			>
				<Modal.Header>
					<Text size={18}>
						Login
					</Text>
				</Modal.Header>

				<Modal.Body>
					<Button icon={<Discord />} onClick={
						(e) => {
							signIn('discord');
						}
					} style={{
						backgroundColor: '#586aea',
					}}>
						<Text b>
							Login with Discord
						</Text>
					</Button>
					<Button icon={<Github />} onClick={
						(e) => {
							signIn('github');
						}
					} style={{
						backgroundColor: '#171515',
						marginBottom: '.75rem'
					}}>
						<Text b>
							Login with Github
						</Text>
					</Button>
				</Modal.Body>
			</Modal>
		);
	};

	return [
		setVisible,
		LoginModal
	];
}