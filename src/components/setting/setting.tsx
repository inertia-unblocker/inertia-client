import * as nextUI from '@nextui-org/react';
import { ChangeEvent } from 'react';

export function Setting({ name, description, type, selections, onChange, radioDisabledValues, ...props }: SettingProps) {
	let css: nextUI.CSS = {
		margin: '1rem 2rem 0 2rem',
		width: 'calc(100% - 4rem)',
		minHeight: '3rem'
	};

	let inputCss: nextUI.CSS = {
		float: 'right',
		marginRight: '1rem'
	};

	props.css ? css = { ...css, ...props.css } : null;
	props.inputProps ? props.inputProps.css = { ...inputCss, ...props.inputProps.css } : null;
	props.switchProps ? props.switchProps.css = { ...inputCss, ...props.switchProps.css } : null;
	props.radioProps ? props.radioProps.css = { ...inputCss, ...props.radioProps.css } : null;

	const renderSwitch = (param) => {
		switch (param) {
			case 'switch':
				return <nextUI.Switch onChange={(e) => onChange(e.target.checked)} size='sm' {...props.switchProps} />;
			case 'select':
				return (
					<nextUI.Radio.Group onChange={onChange} orientation='horizontal' size='sm' {...props.radioProps}>
						{
							selections.map((s, index) => (
								<nextUI.Radio key={index} isDisabled={radioDisabledValues.includes(s.value)} value={s.value}>{s.name}</nextUI.Radio>
							))
						}
					</nextUI.Radio.Group>
				);
			case 'input':
				return (
					<nextUI.Input onBlur={onChange} {...props.inputProps} />
				);
		}
	};

	return (
		<nextUI.Card css={css}>
			<nextUI.Card.Body css={{ display: 'inline-block' }}>
				<nextUI.Text css={{ display: 'inline-block', textAlign: 'left', marginLeft: '1rem' }}>{name}</nextUI.Text>
				<div style={{ display: 'inline-block', borderLeft: '1px solid grey', height: '1.75rem', position: 'absolute', left: '11rem' }}></div>
				<nextUI.Text css={{ display: 'inline-block', textAlign: 'left', marginLeft: '1rem', position: 'absolute', left: '11.5rem' }}>{description}</nextUI.Text>
				{renderSwitch(type)}
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}