import * as nextUI from '@nextui-org/react';

export function Sidebar() {
	return (
		<div style={{width: '12em'}}>
			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em'}}>
					• &nbsp; &nbsp; <nextUI.Link href='/' css={{color: '#7a7b7c'}} underline>Credits</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>

			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em'}}>
					• &nbsp; &nbsp; <nextUI.Link href='/' css={{color: '#7a7b7c'}} underline>About</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>

			<nextUI.Col>
				<nextUI.Text size={'1.5em'} css={{color: '#7a7b7c', marginLeft: '1.5em'}}>
					• &nbsp; &nbsp; <nextUI.Link href='/' css={{color: '#7a7b7c'}} underline>Changelog</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		</div>
	);
}