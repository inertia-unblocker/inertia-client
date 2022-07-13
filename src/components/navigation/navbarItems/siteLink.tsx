/* eslint-disable @next/next/no-img-element */
import * as nextUI from '@nextui-org/react';
import config from '@config';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function SiteLink({ ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div style={{ marginLeft: '1rem', marginTop: '.65rem' }} {...props}>
			<img alt='Inertia' src={config.prefix + '/inertia.svg'} style={{ userSelect: 'none', display: 'inline-block' }} width='50px' />
			<nextUI.Text css={{ textGradient: '$gradient', display: 'inline-block', userSelect: 'none', lineHeight: '3rem', marginLeft: '1rem' }} h1>
				<nextUI.Link href={`${config.prefix}/`}>Inertia</nextUI.Link>
			</nextUI.Text>
		</div>
	);
}