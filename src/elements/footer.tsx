import * as nextUI from '@nextui-org/react';

import { Discord, Github } from '@icons';

export function Footer() {
	return (
		<div style={{ margin: '3rem 2rem 0rem 2rem' }}>
			<div style={{ position: 'absolute', bottom: '0', marginBottom: '1rem', display: 'inline-block' }}>
				<nextUI.Grid.Container gap={2}>
					<nextUI.Grid>
						<nextUI.Tooltip content='Discord'>
							<nextUI.Link css={{ color: '$text' }} href='https://discord.gg/r28EPhaMSx'>
								<Discord color={'#fff'} size={'1.25rem'} />
							</nextUI.Link>
						</nextUI.Tooltip>
					</nextUI.Grid>
					<nextUI.Grid>
						<nextUI.Tooltip content='GitHub'>
							<nextUI.Link css={{ color: '$text' }} href='https://github.com/inertia-unblocker/'>
								<Github color={'#fff'} size={'1.25rem'} />
							</nextUI.Link>
						</nextUI.Tooltip>
					</nextUI.Grid>
				</nextUI.Grid.Container>
			</div>
			<div style={{ position: 'absolute', bottom: '0', right: '0', marginBottom: '1.5rem', marginRight: '2rem', display: 'inline-block' }}>
				<nextUI.Text>
					&copy;{new Date().getFullYear()}&nbsp;&nbsp;Inertia Unblocker
				</nextUI.Text>
			</div>
		</div>
	);
}