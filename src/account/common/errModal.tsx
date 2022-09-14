import * as nextUI from '@nextui-org/react';

interface ErrorModalProps {
	visible: boolean;
	closeHandler: () => void;
	error: string;
}

export default function ErrorModal({ ...props }: ErrorModalProps) {
	return (
		<nextUI.Modal
			onClose={props.closeHandler}
			open={props.visible}
			closeButton
		>
			<nextUI.Modal.Header>
				<nextUI.Text size={18}>
					Error
				</nextUI.Text>
			</nextUI.Modal.Header>

			<nextUI.Modal.Body>
				<nextUI.Text>
					{props.error}
				</nextUI.Text>
			</nextUI.Modal.Body>
		</nextUI.Modal>
	);
}