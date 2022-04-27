import * as nextUI from '@nextui-org/react';

export function GuidesCard() {
	const Bullet = ({index}) => {
		return (
			<span>{(index.toString().length == 1) ? '\xa0\xa0' : ''}&emsp; {index}.&emsp;&emsp;</span>
		);
	};
	
	return (
		<nextUI.Card css={{width: 'calc(95% - 12em)', height: '50em', margin: '2em 0em 0em 1em', display: 'inline-block', verticalAlign: 'top'}}>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Guides
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Collapse.Group bordered>	
					<nextUI.Collapse title='GeforceNow on Inertia'>
						<nextUI.Text css={{userSelect: 'none'}} h4>
							Setup
						</nextUI.Text>
						<nextUI.Text css={{userSelect: 'none'}}>
							<Bullet index={1} /> Have a Steam account
							<br /><Bullet index={2} /> On your HOME COMPUTER, go to <nextUI.Link href='https://play.geforcenow.com' target='_blank'>GeforceNow</nextUI.Link>
							<br /><Bullet index={3} /> Click &quot;Log in&quot;, click Nvidia, enter your HOME email address
							<br /><Bullet index={4} /> Fill out your Gamertag, change your DOB so you are at least 18+, then make a password.
							<br /><Bullet index={5} /> Click &quot;Create Account&quot;, and in a NEW TAB go to your email, open the Nvidia conformation email and &quot;Verify email address&quot;.
							<br /><Bullet index={6} /> Go back to the old tab, deselect all the checkboxes, and click &quot;Submit&quot;
							<br /><Bullet index={7} /> Close that tab, and go to <nextUI.Link href='https://play.geforcenow.com' target='_blank'>GeforceNow</nextUI.Link> again on your HOME COMPUTER.
							<br /><Bullet index={8} /> Click the account name on the top-right, then click account
							<br /><Bullet index={9} /> Deselect all the options, and click Submit
							<br /><Bullet index={10} /> Click the &quot;Create a new account&quot; button
							<br /><Bullet index={11} /> Scroll down to GeforceNow, and click &quot;Join&quot;
							<br /><Bullet index={12} /> Select &quot;Free&quot; and launch &quot;Chrome&quot;
							<br /><Bullet index={13} /> Under &quot;My Library&quot;, click &quot;Connect your store accounts&quot;
							<br /><Bullet index={14} /> Click &quot;Connect&quot;, and select &quot;Steam&quot;, then link your account.
							<br /><Bullet index={15} /> ON YOUR SCHOOL CHROMEBOOK, using Inertia go to https://play.geforcenow.com/
							<br /><Bullet index={16} /> Click &quot;Log in&quot;, click Nvidia, enter your HOME email address, then enter your password.
							<br /><Bullet index={17} /> USING YOUR PHONE, open your email app (Gmail or otherwise) and click the Nvidia conformation link.
							<br /><Bullet index={18} /> This will log you in on your school chromebook.
							<br /><br />
						</nextUI.Text>
						<nextUI.Text css={{userSelect: 'none'}} h4>
							Playing Games
						</nextUI.Text>
						<nextUI.Text css={{userSelect: 'none'}}>
							<Bullet index={1} /> When you play a game, you might get a Network Error. It will fix itself if you rejoin a few times.
							If you want to stop this from happening completely, you can plug in your Chromebook.
						</nextUI.Text>
					</nextUI.Collapse>
				</nextUI.Collapse.Group>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}