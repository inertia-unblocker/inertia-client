/* eslint-disable @next/next/no-img-element */
import * as nextUI from '@nextui-org/react';
import config from '@config';

export function SiteLink() {
	return (
		<>
			<img src={config.prefix + '/inertia.svg'} width='50px' height='50px' style={{userSelect: 'none'}} alt='Inertia' />
			<nextUI.Text h1 css={{textGradient: '$gradient', display: 'inline-block', userSelect: 'none'}} weight="bold">
				<nextUI.Link href={`${config.prefix}/`}>Inertia</nextUI.Link>
			</nextUI.Text>
		
		</>
	);
}