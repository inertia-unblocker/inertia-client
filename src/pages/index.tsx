import { isDesktop } from 'react-device-detect';
import { Text } from '@nextui-org/react';

import { Footer } from '../components/footer/footer';


function InertiaMain() {
	return (
		<>
			{/* {
				isDesktop ? (
					<div style={{ margin: '3rem 2rem 0rem 2rem' }}>
						<URLBar />
					</div>
				) : (
					<>
						<URLBar style={{ marginTop: '1rem' }} isMobile />
					</>
				)
			} */}
			<Text>Test</Text>
		</>
	);
}

export default InertiaMain;