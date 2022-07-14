import { URLBar } from '@elements/urlbar';
import { Theme } from '@elements/theme';
import { Proxy } from '@elements/proxy';
import { Analytics } from '@elements/analytics';
import { MobileView } from 'react-device-detect';

function InertiaMain() {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'calc(95% - 12em)', marginLeft: '12%' }}>
			<URLBar />
			<Proxy />
			<Theme />
			<Analytics />
			<MobileView>
				<meta httpEquiv="Refresh" content="0; url='./mobile'" />
			</MobileView>
		</div>
	);
}

export default InertiaMain;