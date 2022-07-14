import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Icons } from '@navigation/navbarItems/icons';
import { SiteLink } from '@navigation/navbarItems/siteLink';


export function Navbar({ ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div style={{ height: '100px' }} {...props}>
			<SiteLink style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem', marginLeft: '2rem', alignItems: 'flex-end', float: 'left' }} />
			<div style={{ float: 'right', marginTop: '2.5em', marginRight: '1.5em' }}>
				<Icons />
			</div>
		</div>
	);
}