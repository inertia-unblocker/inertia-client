import { Dispatch, SetStateAction, useState } from 'react';
import { Link, Modal, Text } from '@nextui-org/react';
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
					<Text>
						Login
						<Link onClick={(e: any) => {
							e.preventDefault();
							signIn('discord');
						}}>lgn</Link>
					</Text>
				</Modal.Body>
			</Modal>
		);
	};

	return [
		setVisible,
		LoginModal
	];
}