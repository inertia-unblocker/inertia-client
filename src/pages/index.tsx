import { URLBar } from '@components/cards/index/urlbar';
import { Theme } from '@components/cards/index/theme';
import { Proxy } from '@components/cards/index/proxy';
import { Analytics } from '@components/cards/index/analytics';

function InertiaMain() {
	return (
		<div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '80%'}}>
			<URLBar />
			<Proxy />
			<Theme />
			<Analytics />
		</div>
	);
}

export default InertiaMain;