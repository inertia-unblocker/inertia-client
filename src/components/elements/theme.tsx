import * as nextUI from '@nextui-org/react';

import { MdDarkMode as DarkMode, MdLightMode as LightMode } from 'react-icons/md';
import { ThemeSwitch } from '../theme/themeSwitch';


export function Theme() {
	return (
		<nextUI.Card css={{ height: '25em', margin: '2% 0% 0% 1%', verticalAlign: 'top', order: '2', width: '20%' }} variant='bordered' isHoverable>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
					Theme
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text css={{ userSelect: 'none' }}>
					<nextUI.Text css={{ textAlign: 'left', float: 'left', width: '33.33%' }}>
						<LightMode size='2em' />
					</nextUI.Text>

					<nextUI.Text css={{ textAlign: 'center', float: 'left', width: '33.33%' }}>
						<ThemeSwitch size='lg' />
					</nextUI.Text>

					<nextUI.Text css={{ textAlign: 'right', float: 'left', width: '33.33%' }}>
						<DarkMode size='2em' />
					</nextUI.Text>
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}