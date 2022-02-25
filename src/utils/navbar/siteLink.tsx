/* eslint-disable @next/next/no-img-element */
import * as nextUI from '@nextui-org/react';

const urlPrefix: string = '/inertia-client';

export function SiteLink() {
	return (
		<>
			<img src={urlPrefix + '/inertia.svg'} width='50px' height='50px' alt='Inertia' />
			<nextUI.Text h1 css={{textGradient: '$gradient', display: 'inline-block'}} weight="bold">
				<nextUI.Link href='/'>Inertia</nextUI.Link>
			</nextUI.Text>
		
		</>
	);
}