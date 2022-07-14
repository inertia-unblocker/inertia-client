import * as nextUI from '@nextui-org/react';


export function LicenseCard({ ...props }) {
	return (
		<nextUI.Card css={{ width: 'calc(95% - 12em)', display: 'inline-block', verticalAlign: 'top', height: '85%' }} {...props}>
			<nextUI.Card.Header>
				<br /><br /><nextUI.Text css={{ userSelect: 'none' }} h2>
					License
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body css={{ height: '92.25%' }} >
				<iframe src='/gpl-3.0.pdf' style={{ width: '100%', height: '100%', border: 'none', borderRadius: '0 0 1rem 1rem' }} />
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}