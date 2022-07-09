import * as nextUI from '@nextui-org/react';

export function ContactCard() {
	return (
		<nextUI.Card css={{width: 'calc(95% - 12em)', height: '50em', margin: '2em 0em 0em 1em', display: 'inline-block', verticalAlign: 'top'}}>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Contact
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text css={{userSelect: 'none'}} h3>
					GitHub Issues
				</nextUI.Text>
				
				<nextUI.Text css={{userSelect: 'none'}}>
					The best way to report bugs, request features, and suggest improvments 
					is to <nextUI.Link href='https://github.com/inertia-unblocker/inertia-client/issues/new' target='_blank'>create an issue</nextUI.Link> on 
					GitHub.
					<br />
					<br />
				</nextUI.Text>

				<nextUI.Text css={{userSelect: 'none'}} h3>
					Email
				</nextUI.Text>
				<br />
				<nextUI.Text css={{userSelect: 'none'}}>
					If you need to contact us that is not for a bug or feature request,
					please email us at <nextUI.Link href='mailto:inertia.ub@gmail.com' target='_blank'>inertia.ub@gmail.com</nextUI.Link>.
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}