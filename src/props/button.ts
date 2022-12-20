import { ButtonProps as NextButtonProps } from '@nextui-org/react';

export interface ButtonProps extends Omit<NextButtonProps, 'type'> {
	type?: 'outline' | 'transparent'
}