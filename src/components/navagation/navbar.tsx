import { Icons } from '@utils/navbar/icons';
import { SiteLink } from '@utils/navbar/siteLink';

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