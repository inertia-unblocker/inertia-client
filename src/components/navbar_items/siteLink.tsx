import * as nextUI from '@nextui-org/react';
import Image from 'next/image';

export function SiteLink() {
	return (
		<>
			<Image src={'/inertia.svg'} width='50px' height='50px' alt='Inertia' />
			<nextUI.Text h1 css={{textGradient: '$gradient', display: 'inline-block'}} weight="bold">
				<nextUI.Link href='/'>Inertia</nextUI.Link>
			</nextUI.Text>
		
		</>
	);
}