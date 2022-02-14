import { useState } from 'react';

export function ProxyHook(): [string, React.Dispatch<React.SetStateAction<string>>]  {
	const [proxy, setProxy] = useState('');
	return [proxy, setProxy];
}