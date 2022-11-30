import { Card, Radio, Text, Tooltip } from '@nextui-org/react';
import { OnOffType, SettingProps } from '@props';

interface RawSettingProps {
	disabled: boolean;
	type: 'onoff' | 'input' | 'options';
}


export function Setting({ name, description, setting: rsetting, type, disabled, disabledMessage, ...props }: SettingProps) {
	if (disabled == undefined) disabled = false;
	if (disabledMessage == undefined) disabledMessage = '';
	if (disabledMessage && !disabled) throw new Error('disabledMessage is set but disabled is not set to true');

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
			<Text css={{ marginLeft: '1.75rem' }} b>{name}</Text>
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
				<Tooltip content={disabledMessage}>
					{(() => {
						switch (type) {
							case 'onoff':
								const setting = rsetting as OnOffType;
								return (
									<Radio.Group
										defaultValue={setting.init.toString()}
										isDisabled={disabled}
										onChange={(value) => setting.onChange(value === 'true')}
										orientation='horizontal'
										size='sm'
									>
										<Radio value='true'>On</Radio>
										<Radio value='false'>Off</Radio>
									</Radio.Group>
								);
							default:
								return <>Error: invalid setting type</>;
						}
					})()}
				</Tooltip>
			</div>
		</Card>
	);
}