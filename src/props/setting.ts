import * as nextUI from '@nextui-org/react';
import { ChangeEvent } from 'react';

import { RadioProps } from '.';

export interface SettingProps {
	name: string;
	description: string;
	type: 'switch' | 'select' | 'input';
	selections?: { name: string, value: string }[];
	onChange: (value: boolean | string | ChangeEvent<nextUI.FormElement>) => void;
	css?: nextUI.CSS;
	switchProps?: nextUI.SwitchProps;
	radioProps?: RadioProps;
	inputProps?: nextUI.InputProps;
	radioDisabledValues?: string[];
}