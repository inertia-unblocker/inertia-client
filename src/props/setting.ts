import { CardProps } from '@nextui-org/react';

export interface OnOffSettingProps {
	onChange: (value: boolean) => void;
	init: boolean;
}

export interface InputSettingProps {
	onChange: (value: string) => void;
	validate?: (value: string) => {
		error: boolean;
		message?: string;
	};
	init: string;
	placeholder?: string;
}

export interface SelectSettingProps {
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
	setting: SelectSettingProps | InputSettingProps | OnOffSettingProps;
}