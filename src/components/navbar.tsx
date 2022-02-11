import * as nextUI from '@nextui-org/react';
import { Icons } from './navbar_items/icons';
import { SiteLink } from './navbar_items/siteLink';

export function Navbar() {
	return (
		<div>
			<div style={{float: 'left', margin: '1em'}}>
				<SiteLink />
			</div>	
			<div style={{float: 'right', marginTop: '2.5em', marginRight: '1.5em'}}>
				<Icons />
			</div>
		</div>
	);
}