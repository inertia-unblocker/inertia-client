import { isDesktop } from 'react-device-detect';

import { Footer } from '@elem/footer';
import { URLBar } from '@elem/urlbar';


function InertiaMain() {
	return (
		<>
			{
				isDesktop ? (
					<div style={{ margin: '3rem 2rem 0rem 2rem' }}>
						<URLBar />
					</div>
				) : (
					<>
						<URLBar style={{ marginTop: '1rem' }} isMobile />
					</>
				)
			}
		</>
	);
}

export default InertiaMain;