import * as nextUI from '@nextui-org/react';
import { ThemeSwitch } from '@components/switches/themeSwitch';
import { FaSun as LightMode, FaMoon as DarkMode } from 'react-icons/fa';


export function Theme() {
	return (
		<nextUI.Card css={{width: '18.5em', height: '30em', margin: '2em 0em 0em 10.25em', display: 'inline-block', verticalAlign: 'top'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Theme
				</nextUI.Text>
			</nextUI.Card.Header>
			<nextUI.Divider />
			<nextUI.Card.Body>
				<nextUI.Text css={{userSelect: 'none'}}>
					<LightMode size='2em' /> &emsp;&emsp;&emsp;&emsp;
					<ThemeSwitch size='lg' style={{display: 'inline-block'}} /> &emsp;&emsp;&emsp;&emsp;
					<DarkMode size='2em' />
				</nextUI.Text>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}