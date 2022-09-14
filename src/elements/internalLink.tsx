import * as nextUI from '@nextui-org/react';
import { useRouter } from 'next/router';

interface InternalLinkProps extends nextUI.LinkProps {
	href: string;
}

interface InternalNavbarLinkProps extends nextUI.NavbarLinkProps {
	href: string;
}

export function InternalLink({ href, ...props }: InternalLinkProps) {
	const router = useRouter();

	const redirect = () => {
		router.push(href);
	};

	return (
		<nextUI.Link color='text' css={{ fontSize: '$sm', letterSpacing: '$tight', marginRight: '.5rem' }} onClick={redirect} underline {...props}>
			{props.children}
		</nextUI.Link>
	);
}

export function InternalNavbarLink({ href, ...props }: InternalNavbarLinkProps) {
	const router = useRouter();

	const redirect = () => {
		router.push(href);
	};

	return (
		<nextUI.Navbar.Link color='text' onClick={redirect} underline {...props}>
			{props.children}
		</nextUI.Navbar.Link>
	);
}