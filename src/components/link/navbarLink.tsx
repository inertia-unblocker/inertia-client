import Router, { useRouter } from 'next/router';

import { Navbar } from '@nextui-org/react';

import type { NavbarLinkProps } from '@props';

export function NavbarLink({ href, children, ...props }: NavbarLinkProps) {
	const router = useRouter();
	const internal = href.startsWith('/');
	const { Link: NextUILink } = Navbar;

	const handleClick: React.MouseEventHandler<HTMLLIElement | HTMLAnchorElement> = (e) => {
		e.preventDefault();

		if (internal) router.push(href);
		else router.push('/redirect?url=' + href);
	};

	return (
		<NextUILink {...props} onClick={handleClick}>
			{children}
		</NextUILink>
	);
}