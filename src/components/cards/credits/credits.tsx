import * as nextUI from '@nextui-org/react';

export function CreditsCard() {
	return (
		<nextUI.Card css={{width: 'calc(95% - 12em)', height: '50em', margin: '2em 0em 0em 1em', display: 'inline-block', verticalAlign: 'top'}}>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Credits
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text h3 css={{userSelect: 'none'}}>
					Inertia Development Team
				</nextUI.Text>
				
				<nextUI.Text css={{userSelect: 'none'}}>
					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/TheAlphaReturns'>
						TheAlphaReturns
					</nextUI.Link>					<br />
				
				
					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/Doomcow500'>
						Doomcow500
					</nextUI.Link>					<br /><br /><br />
				</nextUI.Text>

				
				
				<nextUI.Text h3 css={{userSelect: 'none'}}>
					Special Thanks
				</nextUI.Text>
				<nextUI.Text css={{userSelect: 'none'}}>
					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/pg-4919'> 
						pg_4919
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/titaniumnetwork-dev'>
						Titaniumnetwork
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/TompHTTP'>
						TompHTTP
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/jrgarciadev'>
						jrgarciadev
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/nextui-org/nextui/graphs/contributors'>
						nextUI development team and contributors
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;@James Bond (Discord)	<br />
					&emsp; -&emsp;&emsp;@leepicgamer (Discord)	<br />
					&emsp; -&emsp;&emsp;@Necloremius (Discord)	<br />
					&emsp; -&emsp;&emsp;@bubbles (Discord)		<br />
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}