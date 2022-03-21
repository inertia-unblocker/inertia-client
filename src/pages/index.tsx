import { URLBar } from '@cards/index/URLBar';
import { Theme } from '@cards/index/theme';
import { Proxy } from '@cards/index/proxy';
import { Analytics } from '@cards/index/analytics';

function InertiaMain() {
	return (
		<>
			<URLBar />
			<Theme />
			<Proxy />
			<Analytics />
		</>
	);
}

export default InertiaMain;