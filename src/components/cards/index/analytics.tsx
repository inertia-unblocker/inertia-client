import * as nextUI from '@nextui-org/react';

export function Analytics() {
	return (
		<nextUI.Card css={{display: 'inline-block', width: '45em', height: '40em', margin: '2em 0em 0em 1em', verticalAlign: 'top'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Analytics
				</nextUI.Text>
			</nextUI.Card.Header>
			
			<nextUI.Divider />

			<nextUI.Card.Body>
				Coming soon...
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}