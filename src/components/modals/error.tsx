import { Modal, Text } from '@nextui-org/react';

import { useState } from 'react';

export function UseErrorModal() {
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState('');

	const ErrorModal = () => (
		<Modal
			onClose={() => setVisible(false)}
			open={visible}
			closeButton
		>
			<Modal.Header>
				<Text size={18}>
					Error
				</Text>
			</Modal.Header>

			<Modal.Body>
				<Text>
					{error}
				</Text>
			</Modal.Body>
		</Modal>
	);

	return [
		setVisible,
		setError,
		ErrorModal
	];
}