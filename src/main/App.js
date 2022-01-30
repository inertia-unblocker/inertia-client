import * as React from 'react';
import { NextUIProvider, Button } from '@nextui-org/react';
import { darkTheme, lightTheme } from '../theme/theme';

function App() {
	return (
		<NextUIProvider theme={darkTheme}>
			<Button>Hello NextUI!!!</Button>
		</NextUIProvider>
	);
}

export default App;
