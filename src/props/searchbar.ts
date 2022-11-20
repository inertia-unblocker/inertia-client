import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearchbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	mobile?: boolean;
}