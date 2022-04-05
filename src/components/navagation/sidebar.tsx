import * as nextUI from '@nextui-org/react';
import config from '@config';

export function Sidebar() {
	return (
		<div style={{width: '30%'}}>
			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none'}}>
					• &nbsp; &nbsp; <nextUI.Link href={`${config.prefix}/credits`} css={{color: '#7a7b7c'}} underline>Credits</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>

			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none'}}>
					• &nbsp; &nbsp; <nextUI.Link href={`${config.prefix}/about`} css={{color: '#7a7b7c'}} underline>About</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>

			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none'}}>
					• &nbsp; &nbsp; <nextUI.Link href={`${config.prefix}/changelog`} css={{color: '#7a7b7c'}} underline>Changelog</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		</div>
	);
}