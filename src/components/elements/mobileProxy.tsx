import * as nextUI from '@nextui-org/react';

import { FiSettings as Fiproxy } from "react-icons/fi";

import { browserIsFirefox } from '@utils/detectors';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

export function MProxy() {

	interface IconProps extends nextUI.GridContainerProps {
		hasThemeSwitch?: boolean;
		/*size?: number;*/
	}

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
		<nextUI.Card css={{ width: '1.5rem', height: '1.5rem', verticalAlign: 'top', order: '2' }} isHoverable>
			<Fiproxy size={'24px'} onClick={openHandler} />
			<nextUI.Modal aria-labelledby='modal-title' onClose={closeHandler} open={modalVisible} width={'55em'} closeButton>
				<nextUI.Modal.Header>
					<nextUI.Text id='modal-title' >
						Change External Server Options
					</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Radio.Group onChange={handleProxySwitch} value={cookie.proxyLocation}>
						<nextUI.Radio id='internalRadio' value='internal'>Internal</nextUI.Radio>
						<nextUI.Radio id='externalRadio' value='external'>External</nextUI.Radio>
					</nextUI.Radio.Group>
					<nextUI.Input id='externalUrlInput' onChange={(e) => updateExternalURL(e.target.value)} placeholder='Proxy URL' shadow={false} value={cookie.externalProxyURL} bordered />
					<nextUI.Spacer y={0.25} />
					<nextUI.Radio.Group label='External Proxy Type' onChange={updateExternalProxyType} value={cookie.externalProxyType}>
						<nextUI.Radio value='ultraviolet'>Ultraviolet</nextUI.Radio>
						<nextUI.Radio value='alloy'>Alloy</nextUI.Radio>
					</nextUI.Radio.Group>
					<nextUI.Spacer y={0.5} />
				</nextUI.Modal.Body>
			</nextUI.Modal>
		</nextUI.Card>
		
	);
}