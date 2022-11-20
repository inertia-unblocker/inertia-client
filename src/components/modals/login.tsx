import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Text } from '@nextui-org/react';


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