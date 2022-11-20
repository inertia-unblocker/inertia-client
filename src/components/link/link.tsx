import Router, { useRouter } from 'next/router';

import { Link as NextUILink } from '@nextui-org/react';

import type { LinkProps } from '@props';

export function Link({ href, children, ...props }: LinkProps) {
	const router = useRouter();
	const internal = href.startsWith('/');

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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