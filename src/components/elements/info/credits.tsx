import * as nextUI from '@nextui-org/react';


export function CreditsCard({ ...props }) {
	return (
		<nextUI.Card css={{ width: 'calc(95% - 12em)', height: '85%', display: 'inline-block', verticalAlign: 'top' }} {...props}>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
					Credits
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body css={{ marginLeft: '.25rem' }}>
				<nextUI.Text css={{ userSelect: 'none' }} h3>
					Inertia Development Team
				</nextUI.Text>

				<nextUI.Text css={{ userSelect: 'none' }}>
					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/TheAlphaReturns'>
						TheAlphaReturns
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/pg-4919'>
						pg_4919
					</nextUI.Link>					<br />

					&emsp; -&emsp;&emsp;<nextUI.Link href='https://github.com/Doomcow500'>
						Doomcow500
					</nextUI.Link>					<br /><br />
				</nextUI.Text>



				<nextUI.Text css={{ userSelect: 'none' }} h3>
					Special Thanks
				</nextUI.Text>
				<nextUI.Text css={{ userSelect: 'none' }}>
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
					&emsp; -&emsp;&emsp;@Necloremius (Discord)	<br />
					&emsp; -&emsp;&emsp;@bubbles (Discord)		<br />
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}