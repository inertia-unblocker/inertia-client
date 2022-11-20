import * as nextUI from '@nextui-org/react';

export interface RadioProps {
	defaultValue: string;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	css?: nextUI.CSS
}