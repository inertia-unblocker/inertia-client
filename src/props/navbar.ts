import * as nextUI from '@nextui-org/react';

export interface NavbarProps extends nextUI.NavbarProps {
	href?: string;
	mobile?: boolean;
}

export interface NavbarLinkProps extends Omit<nextUI.NavbarLinkProps, 'href'> {
	href: string;
}