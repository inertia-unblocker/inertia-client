import * as nextUI from '@nextui-org/react';

import { browserIsFirefox } from '@util/detectors';
import { useCookies } from 'react-cookie';
import { useState } from 'react';


export function Proxy() {
	const [modalVisible, setModalVisible] = useState(false);
	const [ffxModalVisible, setFFXModalVisible] = useState(false);
	const [cookie, setCookies] = useCookies(['proxyLocation', 'externalProxyURL', 'externalProxyType']);

	const openHandler = () => {
		setModalVisible(true);
	};

	const closeHandler = () => {
		setModalVisible(false);

		try {
			new URL(cookie.externalProxyURL);
		} catch (e) {
			if (cookie.externalProxyType == 'alloy') {
				setCookies('externalProxyURL', 'https://is-alloy.up.railway.app');
			} else {
				setCookies('externalProxyURL', 'https://is-uv.up.railway.app');
			}
		}
	};

	const ffxCloseHandler = () => {
		setFFXModalVisible(false);
	};

	const handleProxySwitch = (proxyLocation: string) => {
		if (proxyLocation == 'internal' && browserIsFirefox) {
			setFFXModalVisible(true);
			return;
		}

		if (proxyLocation == 'external') {
			updateExternalProxyType('ultraviolet');
			updateExternalURL('https://is-uv.up.railway.app');
		}

		setCookies('proxyLocation', proxyLocation);
	};

	const updateExternalURL = (url: string) => {
		setCookies('externalProxyURL', url);
	};

	const updateExternalProxyType = (type: string) => {
		if (type == 'ultraviolet' && browserIsFirefox) {
			setFFXModalVisible(true);
			return;
		}

		if (type == 'ultraviolet') {
			updateExternalURL('https://is-uv.up.railway.app');
		} else {
			updateExternalURL('https://is-alloy.up.railway.app');
		}

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
							<nextUI.Input id='externalUrlInput' onChange={(e) => updateExternalURL(e.target.value)} placeholder='Proxy URL' shadow={false} value={cookie.externalProxyURL} bordered />
							<nextUI.Spacer y={0.25} />
							<nextUI.Radio.Group label='External Proxy Type' onChange={updateExternalProxyType} value={cookie.externalProxyType}>
								<nextUI.Radio value='ultraviolet'>Ultraviolet</nextUI.Radio>
								<nextUI.Radio value='alloy'>Alloy</nextUI.Radio>
							</nextUI.Radio.Group>
							<nextUI.Spacer y={0.5} />
						</nextUI.Modal.Body>
					</nextUI.Modal>
					<nextUI.Modal aria-labelledby='modal-title' onClose={ffxCloseHandler} open={ffxModalVisible} width={'30em'} closeButton>
						<nextUI.Modal.Header>
							<nextUI.Text id='modal-title' size={18} >
								Error: Firefox
							</nextUI.Text>
						</nextUI.Modal.Header>
						<nextUI.Modal.Body>
							<nextUI.Text css={{ marginBottom: '2rem' }}>
								Sadly, Firefox is incompatible with Ultraviolet and the internal
								proxy. This is due to Firefox rejecting headers that the bare server
								sends, causing a NetworkError. We are sorry for the inconvenience.
								Please, create an issue or a pull request on
								the <nextUI.Link href='https://github.com/inertia-unblocker/inertia-server/' target={'_blank'} >GitHub</nextUI.Link> if
								you have found a fix for this issue.
							</nextUI.Text>
						</nextUI.Modal.Body>
					</nextUI.Modal>
				</nextUI.Row>
			</nextUI.Card.Footer>
		</nextUI.Card>
	);
}