import * as nextUI from '@nextui-org/react';
import { ProxySwitch } from '@components/switches/proxySwitch';


export function Proxy() {
	return (
		<nextUI.Card css={{width: '18.5em', height: '25em', margin: '2em 0em 0em 1em', display: 'inline-block', verticalAlign: 'top'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Proxy
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text css={{userSelect: 'none', fontSize: '1.5em'}}>
					Alloy &nbsp;&nbsp;&nbsp;
					<ProxySwitch size='lg' style={{display: 'inline-block'}} /> &nbsp;&nbsp;&nbsp;
					Ultraviolet
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}