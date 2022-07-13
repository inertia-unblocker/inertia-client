import { URLBar } from '@elements/urlbar';
import { Icons } from '@navigation/navbarItems/icons';
import { SiteLink } from '@navigation/navbarItems/siteLink';


function Mobile() {
	return (
		<>
			<SiteLink style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', alignItems: 'flex-end' }} />
			<URLBar style={{ marginTop: '1rem' }} isMobile />
			<div style={{ float: 'right', position: 'absolute', bottom: 0, display: 'inline-block' }}>
				<Icons css={{ marginLeft: '.5rem', marginBottom: '-.15rem' }} gap={1} size={1} hasThemeSwitch />
			</div>
		</>
	);
}

export default Mobile;