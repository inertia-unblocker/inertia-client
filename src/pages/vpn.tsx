import * as nextUI from '@nextui-org/react';
import { Premium } from '@components/layouts';

function VPN() {

	const Key = nextUI.styled('kbd');

	return (
		<Premium>
			<nextUI.Card css={{ width: 'calc(100% - 4rem)', margin: '3rem 2rem 0rem' }}>
				<nextUI.Card.Header>
					<nextUI.Text css={{ userSelect: 'none' }} h2>
						Connection Instructions
					</nextUI.Text>
				</nextUI.Card.Header>
				<nextUI.Divider />
				<nextUI.Card.Body>
					<nextUI.Collapse.Group bordered>
						<nextUI.Collapse title='Windows'>
							<nextUI.Text css={{ userSelect: 'none' }}>
								Sorry, the way we authenticate the vpn (making it possible on School Chromebooks)
								means that it is incompatible with Windows.
								There may be a third-party app that can connect. If you find one, please let us know!
								Here are the connection details: <br />

								<nextUI.Text css={{ userSelect: 'all' }}>
									IP: {process.env.VPN_IP} <br />
									PSK: {process.env.VPN_PSK} <br />
								</nextUI.Text>
							</nextUI.Text>
						</nextUI.Collapse>

						<nextUI.Collapse title='Linux'>
							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								1. Please install the Strongswan package for your distro. We can&apos;t list all of them, but here are some common ones <br />
								<code>sudo pacman -S strongswan</code><br />
								<code>sudo apt install strongswan libcharon-extra-plugins</code><br />
								<code>sudo dnf install strongswan</code><br />
								<code>sudo zypper install strongswan</code><br />
								<br />
								2. Run <code>sudo systemctl disable strongswan</code> to make sure the vpn doesn&apos;t start automatically <br />
								3. Copy <nextUI.Link css={{ display: 'inline-block' }} href={process.env.IPSEC_CONF} target='_blank'>this file</nextUI.Link> to <code>/etc/ipsec.conf</code> <br />
								4. Copy <nextUI.Link css={{ display: 'inline-block' }} href={process.env.IPSEC_SECRETS} target='_blank'>this file</nextUI.Link> to <code>/etc/ipsec.secrets</code> <br />
								5. To start the vpn, use <code>sudo systemctl start strongswan-starter</code><br />
								6. To stop the vpn, use <code>sudo systemctl stop strongswan-starter</code><br />
							</nextUI.Text>

							<nextUI.Divider css={{ margin: '1rem' }} />

							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }} h3>
									Linux Troubleshooting
								</nextUI.Text>
								<br />

								- <code>Failed to start strongswan-starter.service: Unit strongswan-starter.service not found.</code>
								<br />
								Try making sure you have the correct package installed or making sure you spelled the command correctly. <br />
								If not, try <code>sudo systemctl (start | stop) strongswan</code>. Note: this may not work. <br /><br />

								- WiFi doesn&apos;t work after connecting to the VPN <br />
								Wait a while<br /><br />

								- How do I check if the connection is activated?<br />
								Google &quot;Whats my ip&quot; and check if it matches {process.env.VPN_IP}
							</nextUI.Text>
						</nextUI.Collapse>

						<nextUI.Collapse title='Chromebook'>
							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								1. In the browser, go to <code>chrome://flags</code><br />
								2. Search for &quot;VPN&quot;<br />
								3. Enable the Strongswan option<br />
								4. Click restart<br />
								5. Open settings<br />
								6. Click &quot;Add Connection&quot;<br />
								7. Click &quot;Add built-in VPN&quot;<br />
								8. Make the service name &quot;Inertia VPN&quot;<br />
								9. Make the provider type &quot;IPsec (IKEv2)&quot;<br />
								10. Make the server hostname <code>{process.env.VPN_IP}</code><br />
								11. Make the authentication type &quot;Pre-shared key&quot;<br />
								12. Make the pre-shared key <code>{process.env.VPN_PSK}</code><br />
								13. Make the local identity anything you want<br />
								14. Make the remote identity <code>{process.env.VPN_IP}</code><br />
								15. Check the save identity and password button<br />
								16. Click connect<br />
							</nextUI.Text>

							<nextUI.Divider css={{ margin: '1rem' }} />

							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }} h3>
									Chromebook Troubleshooting
								</nextUI.Text>
								<br />

								- Fails to connect
								<br />
								Check to make sure you have filled all of the fields in correctly. There may be a
								WiFi policy that doesn&apos;t allow vpns while connecting to it. <br /><br />

								- Googling &quot;Whats my ip&quot; doesn&apos;t show {process.env.VPN_IP}<br />
								WiFi policies might require a direct internet connection proxy.
							</nextUI.Text>
						</nextUI.Collapse>

						<nextUI.Collapse title='Android'>
							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }} h3>
									This guide is written for devices running Android 12 and up
								</nextUI.Text>
								<br />

								1. Open settings<br />
								2. Click &quot;Network & Internet&quot;<br />
								3. Click &quot;VPN&quot;<br />
								4. Click the plus button at the top right
								5. Make the name &quot;Inertia VPN&quot;<br />
								6. Make the type &quot;IKEv2/IPsec PSK&quot;<br />
								7. Make the server address <code>{process.env.VPN_IP}</code><br />
								8. Make the IPsec identifier <code>{process.env.VPN_IP}</code><br />
								9. Make the IPsec pre-shared key <code>{process.env.VPN_PSK}</code><br />
								10. Click save<br />
								11. Connect to the VPN<br />
							</nextUI.Text>

							<nextUI.Divider css={{ margin: '1rem' }} />

							<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }}>
								<nextUI.Text css={{ userSelect: 'none', display: 'inline-block' }} h3>
									Android Troubleshooting
								</nextUI.Text>
								<br />

								- My phone crashes/restarts when trying to connect
								<br />
								Not my fault/google the issue to try and fix
							</nextUI.Text>
						</nextUI.Collapse>
					</nextUI.Collapse.Group>
				</nextUI.Card.Body>
			</nextUI.Card>
		</Premium>
	);
}

export default VPN;