/* eslint-disable @next/next/no-img-element */
import * as nextUI from '@nextui-org/react';
import config from '@config';

export function SiteLink() {
	return (
		<>
			<img alt='Inertia' height='50px' src={config.prefix + '/inertia.svg'} style={{ userSelect: 'none' }} width='50px' />
			<nextUI.Text css={{ textGradient: '$gradient', display: 'inline-block', userSelect: 'none' }} h1>
				<nextUI.Link href={`${config.prefix}/`}>Inertia</nextUI.Link>
			</nextUI.Text>
		</>
	);
}