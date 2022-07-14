import * as nextUI from '@nextui-org/react';


export function AboutCard({ ...props }) {
	return (
		<nextUI.Card css={{ width: 'calc(95% - 12em)', height: '85%', display: 'inline-block', verticalAlign: 'top' }} {...props}>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
					About
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body css={{ marginLeft: '.25rem' }}>
				<nextUI.Text css={{ userSelect: 'none' }} h3>
					A history
				</nextUI.Text>

				<nextUI.Text css={{ userSelect: 'none' }}>
					When Inertia started, it was a personal project called &quot;Betterproxy.&quot;
					It was very small and early in development, only using Titaniumnetwork&apos;s brand-new (and pretty buggy) Alloy for its backend.

					After that, it was &quot;Unblocked Sites&quot;, which was... pretty strange to say the least.
					When I was designing it, I kept making it darker (more black) and it ended up looking pretty bad.
					Moreover, it was still using Titaniumnetwork&apos;s Alloy, when their new Corrosion had been up for awhile

					Then, Inertia was born. Doomcow500 helped me with this one, to create a good UI. I still needed to update the backend
					to work with Titaniumnetwork&apos;s new Corrosion.

					When I was working on this iteration, Ultraviolet was released, just a few months after Corrosion. After fixing up the backend
					to work with it, I started work on this frontend. I used Next.js and nextUI to build this one (more info in credits)
					<br />
					<br />
				</nextUI.Text>

				<nextUI.Text css={{ userSelect: 'none' }} h3>
					This version
				</nextUI.Text>
				<br />
				<nextUI.Text css={{ userSelect: 'none' }}>
					This version of Inertia brings a completely redesigned UI to the table.
					We used <nextUI.Link href='https://nextui.org'>nextUI</nextUI.Link>, a very
					new user-interface library, along with <nextUI.Link href='https://nextjs.org'>Next.js</nextUI.Link> and <nextUI.Link href='https://reactjs.org'>React</nextUI.Link>.
					The backend has also had some improvments. It can now use Alloy, Corrosion, and Ultraviolet (You can choose between them before you use the proxy).
					We hope you enjoy this version of Inertia.

					<br /><br />
					Made with love from the Inertia Development Team!
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}