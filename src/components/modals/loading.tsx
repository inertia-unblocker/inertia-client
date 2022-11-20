import { Modal, Text } from '@nextui-org/react';
import { useState } from 'react';

import { UseProgress } from '@components/progress';

export function UseLoadingModal(max: number) {
	const [visible, setVisible] = useState(false);
	const [text, setText] = useState('');
	const [setStage, Progress] = UseProgress(max);

	const LoadingModal = () => (
		<Modal
			onClose={() => setVisible(false)}
			open={visible}
			preventClose
		>
			<Modal.Header>
				<Text size={18}>
					Loading
				</Text>
			</Modal.Header>

			<Modal.Body>
				<Progress />
				<Text>{text}</Text>
			</Modal.Body>
		</Modal>
	);

	return [
		setVisible,
		setText,
		setStage,
		LoadingModal
	];
}