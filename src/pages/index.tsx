import { URLBar } from '@components/cards/index/urlbar';
import { Theme } from '@components/cards/index/theme';
import { Proxy } from '@components/cards/index/proxy';
import { Analytics } from '@components/cards/index/analytics';

function InertiaMain() {
	return (
		<>
			<URLBar />
			<Proxy />
			<Theme />
			<Analytics />
		</>
	);
}

export default InertiaMain;