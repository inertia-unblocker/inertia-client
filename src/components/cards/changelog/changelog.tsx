import * as nextUI from '@nextui-org/react';

export function ChangelogCard() {
	const bullet = <span>&emsp; - &emsp;&emsp;</span>;
	
	return (
		<nextUI.Card css={{width: '80%', height: '50em', margin: '2em 0em 0em 1em', display: 'inline-block', verticalAlign: 'top'}}>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Changelog
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Collapse.Group bordered>	
					<nextUI.Collapse title='Backend Server'>
						<nextUI.Text css={{userSelect: 'none'}} h4>
							Inertia Server v1.0.0 Stable
						</nextUI.Text>
						<nextUI.Text css={{userSelect: 'none'}}>
							{bullet} [Added] 3 Servers, one per proxy						<br />
							{bullet} [Added] Support for Youtube							<br />
							{bullet} [Added] Discord login using username and password		<br />
							{bullet} [Added] OAuth2 Support									<br />
							{bullet} [Added] Partial GeForceNow Support						<br />
						</nextUI.Text>
					</nextUI.Collapse>

					<nextUI.Collapse title='Frontend App (This one)'>
						<nextUI.Text css={{userSelect: 'none'}} h4>
							Inertia Client v1.0.0 Stable
						</nextUI.Text>
						<nextUI.Text css={{userSelect: 'none'}}>
							{bullet} [Added] Next.js frontend								<br />
							{bullet} [Added] New UI with nextUI								<br />
							{bullet} [Added] User-accessable Analytics						<br />
							{bullet} [Added] Switch between 3 proxies						<br />
						</nextUI.Text>
					</nextUI.Collapse>
				</nextUI.Collapse.Group>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}