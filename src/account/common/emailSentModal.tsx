import * as nextUI from '@nextui-org/react';

interface EmailModalProps {
	visible: boolean;
	closeHandler: () => void;
}

export default function EmailModal({ ...props }: EmailModalProps) {
	return (
		<nextUI.Modal
			onClose={props.closeHandler}
			open={props.visible}
			closeButton
		>
			<nextUI.Modal.Header>
				<nextUI.Text size={18}>
					Email sent
				</nextUI.Text>
			</nextUI.Modal.Header>

			<nextUI.Modal.Body>
				<nextUI.Text>
					An email has been sent to you. Please check your inbox and spam folder.
				</nextUI.Text>
			</nextUI.Modal.Body>
		</nextUI.Modal>
	);
}