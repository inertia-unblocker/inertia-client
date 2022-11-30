import { CardProps } from '@nextui-org/react';

export interface OnOffType {
	onChange: (value: boolean) => void;
	init: boolean;
}

export interface InputType {
	onChange: (value: string) => void;
	validate?: (value: string) => {
		error: boolean;
		message?: string;
	};
	init: string;
	placeholder?: string;
}

export interface OptionType {
	onChange: (value: string) => void;
	init: string;
	options: {
		label: string;
		value: string;
	}[];
}

export interface SettingProps extends Omit<CardProps, 'children'> {
	name: string;
	description: string;
	setting: OptionType | InputType | OnOffType;
	type: 'onoff' | 'input' | 'option';
	disabled?: boolean;
	disabledMessage?: string;
}