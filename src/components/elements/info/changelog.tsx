import * as nextUI from '@nextui-org/react';


export function ChangelogCard({ ...props }) {
	const bullet = <span>&emsp; - &emsp;&emsp;</span>;

	return (
		<nextUI.Card css={{ width: 'calc(95% - 12em)', height: '85%', display: 'inline-block', verticalAlign: 'top' }} {...props}>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
					Changelog
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Collapse.Group bordered>
					<nextUI.Collapse title='Inertia Client v1.2.0'>
						<nextUI.Text css={{ userSelect: 'none' }}>
							{bullet} [Added] Internal proxy for better support and control		<br />
							{bullet} [Added] Mobile UI											<br />
							{bullet} [Updated] Huge updates to Inertia Browser					<br />
							{bullet} [Updated] PDF of license									<br />
							{bullet} [Known Issue] Firefox rejects headers, breaks Ultraviolet	<br />
						</nextUI.Text>
					</nextUI.Collapse>

					<nextUI.Collapse title='Inertia Client v1.1.0'>
						<nextUI.Text css={{ userSelect: 'none' }}>
							{bullet} [Added] Inertia Browser									<br />
							{bullet} [Added] Guides												<br />
							{bullet} [Fixed] User sees css-less site for a split second			<br />
							{bullet} [Fixed] Google Search										<br />
							{bullet} [Removed] Sunsetted Corrosion								<br />
						</nextUI.Text>
					</nextUI.Collapse>

					<nextUI.Collapse title='Inertia Client v1.0.0'>
						<nextUI.Text css={{ userSelect: 'none' }}>
							{bullet} [Added] Next.js frontend									<br />
							{bullet} [Added] New UI with nextUI									<br />
							{bullet} [Added] User-accessable Analytics							<br />
							{bullet} [Added] Switch between 3 proxies							<br />
						</nextUI.Text>
					</nextUI.Collapse>
				</nextUI.Collapse.Group>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}