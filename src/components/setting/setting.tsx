import { Card, Text } from '@nextui-org/react';
import { SettingProps } from '@props';


export function Setting({ name, description, setting }: SettingProps) {
	return (
		<Card css={{
			margin: '1rem 2rem 0 2rem',
			width: 'calc(100% - 4rem)',
			height: '4rem',
			display: 'flex'
		}}>
			Test
		</Card>
	);
}