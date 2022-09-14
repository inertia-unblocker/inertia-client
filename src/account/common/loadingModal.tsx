import * as nextUI from '@nextui-org/react';

interface LoadingModalProps {
	visible: boolean;
	closeHandler: () => void;
	loadingStage: number;
	loadingText: string;
	loadingMax: number;
}

export default function LoadingModal({ ...props }: LoadingModalProps) {
	return (
		<nextUI.Modal
			onClose={props.closeHandler}
			open={props.visible}
			preventClose
		>
			<nextUI.Modal.Header>
				<nextUI.Text size={18}>
					Loading
				</nextUI.Text>
			</nextUI.Modal.Header>

			<nextUI.Modal.Body>
				<nextUI.Progress max={props.loadingMax} value={props.loadingStage} />
				<nextUI.Text>
					{props.loadingText}
				</nextUI.Text>
			</nextUI.Modal.Body>
		</nextUI.Modal>
	);
}