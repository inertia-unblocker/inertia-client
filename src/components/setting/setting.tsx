import { Card, Text } from '@nextui-org/react';
import { OnOffType, SettingProps } from '@props';


export function Setting({ name, description, setting, type, ...props }: SettingProps) {
	return (
		<Card css={{
			margin: '1rem 2rem 0 2rem',
			width: 'calc(100% - 4rem)',
			height: '4rem',
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'nowrap',
			alignItems: 'center'
		}} {...props}>
			<Text css={{ marginLeft: '1.75rem'  }} b>{name}</Text>
			<div style={{
				position: 'absolute',
				marginLeft: '11rem',
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'nowrap',
				alignItems: 'center'
			}}>
				<div style={{ borderRight: '1px solid gray', height: '1.25rem' }}></div>
				<Text css={{ marginLeft: '1rem' }} weight='thin'>{description}</Text>
			</div>
			<div style={{
				marginLeft: 'auto',
				marginRight: '1.75rem',
			}}>
				{(() => {
					switch (type) {
						case 'onoff':
							setting = setting as OnOffType;
							return (
								<>
									foo
								</>
							);
						default:
							return <>bar</>;
					}
				})()}
			</div>
		</Card>
	);
}