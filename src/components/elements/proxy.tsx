import * as nextUI from '@nextui-org/react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


export function Proxy() {
	const [modalVisible, setModalVisible] = useState(false);
	const [cookie, setCookies] = useCookies(['proxyLocation', 'externalProxyURL', 'externalProxyType']);

	const openHandler = () => {
		setModalVisible(true);
	};

	const closeHandler = () => {
		setModalVisible(false);
	};

	const handleProxySwitch = (proxy: string) => {
		setCookies('proxyLocation', proxy);
	};

	const updateExternalURL = (url: string) => {
		let newURL;
		try { newURL = new URL(url); }
		catch { newURL = undefined; }

		if (newURL) setCookies('externalProxyURL', url);
	};

	const updateExternalProxyType = (type: string) => {
		setCookies('externalProxyType', type);
	};

	return (
		<nextUI.Card css={{ height: '30em', margin: '2% 0% 0% 0%', verticalAlign: 'top', order: '2', width: '20%' }} variant='bordered' isHoverable>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
					Proxy
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Radio.Group onChange={handleProxySwitch} value={cookie.proxyLocation}>
					<nextUI.Radio id='internalRadio' value='internal'>Internal</nextUI.Radio>
					<nextUI.Radio id='externalRadio' value='external'>External</nextUI.Radio>
				</nextUI.Radio.Group>
			</nextUI.Card.Body>
			<div style={{ marginBottom: '8em' }} />
			<nextUI.Divider />
			<nextUI.Card.Footer>
				<nextUI.Row justify='center'>
					<nextUI.Button css={{ width: '100%' }} disabled={cookie.proxyLocation == 'internal'} onClick={openHandler} >
						Change External Server Options
					</nextUI.Button>
					<nextUI.Modal aria-labelledby='modal-title' onClose={closeHandler} open={modalVisible} width={'55em'} closeButton>
						<nextUI.Modal.Header>
							<nextUI.Text id='modal-title' size={18} >
								Change External Server Options
							</nextUI.Text>
						</nextUI.Modal.Header>
						<nextUI.Modal.Body>
							<nextUI.Input defaultValue={cookie.externalProxyURL} onChange={(e) => updateExternalURL(e.target.value)} placeholder='Proxy URL' shadow={false} bordered />
							<nextUI.Spacer y={0.25} />
							<nextUI.Radio.Group label='External Proxy Type' onChange={updateExternalProxyType} value={cookie.externalProxyType}>
								<nextUI.Radio value='ultraviolet'>Ultraviolet</nextUI.Radio>
								<nextUI.Radio value='alloy'>Alloy (Depreciated)</nextUI.Radio>
							</nextUI.Radio.Group>
							<nextUI.Spacer y={0.5} />
						</nextUI.Modal.Body>
					</nextUI.Modal>
				</nextUI.Row>
			</nextUI.Card.Footer>
		</nextUI.Card>
	);
}