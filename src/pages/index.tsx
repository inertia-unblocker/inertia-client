import { Analytics } from '@elements/analytics';
import { MobileView } from 'react-device-detect';
import { Proxy } from '@elements/proxy';
import { Theme } from '@elements/theme';
import { URLBar } from '@elements/urlbar';


function InertiaMain() {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'calc(95% - 12em)', marginLeft: '12%' }}>
			<URLBar />
			<Proxy />
			<Theme />
			<Analytics />
			<MobileView>
				<meta content="0; url='./mobile'" httpEquiv="Refresh" />
			</MobileView>
		</div>
	);
}

export default InertiaMain;