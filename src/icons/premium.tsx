import { FaCrown } from 'react-icons/fa';
import type { IconBaseProps } from 'react-icons';

export function PremiumLogo({ ...props }: IconBaseProps) {
	return (
		<FaCrown color={'yellow'} {...props} />
	);
}