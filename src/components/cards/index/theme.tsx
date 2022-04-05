import * as nextUI from '@nextui-org/react';
import { ThemeSwitch } from '@components/hookedOptions/themeSwitch';
import { FaSun as LightMode, FaMoon as DarkMode } from 'react-icons/fa';


export function Theme() {
	return (
		<nextUI.Card css={{height: '25em', margin: '1em 0em 0em 1em', verticalAlign: 'top', order: '2', width: '20%'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Theme
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text css={{userSelect: 'none'}}>
					<nextUI.Text css={{textAlign: 'left', float: 'left', width: '33.33%'}}>
						<LightMode size='2em' />
					</nextUI.Text>

					<nextUI.Text css={{textAlign: 'center', float: 'left', width: '33.33%'}}>
						<ThemeSwitch size='lg'/>
					</nextUI.Text>
					
					<nextUI.Text css={{textAlign: 'right', float: 'left', width: '33.33%'}}>
						<DarkMode size='2em' />
					</nextUI.Text>
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}