import { Icons } from '@components/navagation/navbarItems/icons';
import { SiteLink } from '@components/navagation/navbarItems/siteLink';

export function Navbar() {
	return (
		<div style={{height: '100px'}}>
			<div style={{float: 'left', margin: '1em 0em 1.35em 1em'}}>
				<SiteLink />
			</div>	
			<div style={{float: 'right', marginTop: '2.5em', marginRight: '1.5em'}}>
				<Icons />
			</div>
		</div>
	);
}