import logo from './logo.svg';
import './App.css';

// import nextui
import { NextUIProvider, Button } from '@nextui-org/react';

function App() {
	return (
		<NextUIProvider>
			<Button>Hello NextUI!!!</Button>
		</NextUIProvider>
	);
}

export default App;
