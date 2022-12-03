import { useMemo, useState } from 'react';

import { Card, FormElement, Input, Radio, Text, Tooltip } from '@nextui-org/react';
import { InputType, OnOffType, OptionType, SettingProps } from '@props';


export function Setting({ name, description, setting, type, disabled, info, ...props }: SettingProps) {
	if (disabled == undefined) disabled = false;
	if (info == undefined) info = '';

	const onoffSetting = setting as OnOffType;
	const inputSetting = setting as InputType;
	const optionSetting = setting as OptionType;

	const [value, setValue] = useState(inputSetting.init || '');
	const inputHelper = useMemo(() => inputSetting.validate?.(value) || { error: false }, [inputSetting, value]);
	const inputOnChange = (e: React.ChangeEvent<FormElement>) => {
		e.preventDefault();
		setValue(e.target.value);
		if (inputSetting.validate?.(e.target.value).error) return;
		inputSetting.onChange(e.target.value);
	};


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
				marginLeft: '13rem',
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'nowrap',
				alignItems: 'center'
			}}>
				<div style={{ borderRight: '1px solid gray', height: '2rem' }}></div>
				<Text css={{ marginLeft: '.75rem' }} weight='thin'>{description}</Text>
			</div>
			<div style={{
				marginLeft: 'auto',
				marginRight: '1.75rem',
			}}>
				<Tooltip content={info} css={{ textAlign: 'center', width: '15rem' }}>
					{(() => {
						switch (type) {
							case 'onoff':
								return (
									<Radio.Group
										defaultValue={onoffSetting.init.toString()}
										isDisabled={disabled}
										onChange={(v) => onoffSetting.onChange(v === 'true')}
										orientation='horizontal'
										size='sm'
									>
										<Radio value='true'>On</Radio>
										<Radio value='false'>Off</Radio>
									</Radio.Group>
								);
							case 'input':
								return (
									<Input
										color={inputHelper.error ? 'error' : undefined}
										css={{ width: '20rem', marginBottom: inputHelper.message ? '.8rem' : 0, marginRight: '-.75rem' }}
										disabled={disabled}
										helperColor={inputHelper.error ? 'error' : 'success'}
										helperText={inputHelper.message || undefined}
										onChange={inputOnChange}
										placeholder={inputSetting.placeholder}
										size='md'
										value={value}
										bordered
									/>
								);
							case 'option':
								return (
									<Radio.Group
										defaultValue={optionSetting.init}
										isDisabled={disabled}
										onChange={optionSetting.onChange}
										orientation='horizontal'
										size='sm'
									>
										{optionSetting.options.map((option, index) => (
											<Radio key={index} isDisabled={option.disabled} value={option.value}>
												<Tooltip
													content={option.info}
													css={{ textAlign: 'center', width: '15rem' }}
													placement={
														index == optionSetting.options.length - 1
															? 'topEnd'
															: 'top'
													}
												>
													{option.label}
												</Tooltip>
											</Radio>
										))}
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