import * as nextUI from '@nextui-org/react';
import { ProxyButtonGroup } from '@components/hookedOptions/proxyButtonGroup';
import { useState } from 'react';
import { ServerTable } from '@components/hookedOptions/serverTable';


export function Proxy() {
	const [modalVisible, setModalVisible] = useState(false);

	const openHandler = () => {
		setModalVisible(true);
	};

	const closeHandler = () => {
		setModalVisible(false);
	};

	return (
		<nextUI.Card css={{height: '30em', margin: '1em 0em 0em 0em', verticalAlign: 'top', order: '2', width: '20%'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Proxy
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<ProxyButtonGroup />
			</nextUI.Card.Body>
			<div style={{marginBottom: '8em'}} />
			<nextUI.Divider />
			<nextUI.Card.Footer>
				<nextUI.Row justify="center">
					<nextUI.Button css={{width: '100%'}} auto onClick={openHandler}>
						Change Server
					</nextUI.Button>
					<nextUI.Modal closeButton aria-labelledby="modal-title" open={modalVisible} onClose={closeHandler} width={'55em'}>
						<nextUI.Modal.Header>
							<nextUI.Text id="modal-title" size={18}>
								Change Server
							</nextUI.Text>
						</nextUI.Modal.Header>
						<nextUI.Modal.Body>
							<ServerTable disallowEmptySelection />
						</nextUI.Modal.Body>
					</nextUI.Modal>
				</nextUI.Row>
			</nextUI.Card.Footer>
		</nextUI.Card>
	);
}