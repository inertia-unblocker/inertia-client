import { Button as NextButton } from '@nextui-org/react';

import { ButtonProps } from '@props';
import styles from '@css/button.module.css';

export function Button({ type, children, ...props }: ButtonProps) {
	if (!type) type = 'outline';

	if (type == 'transparent') {
		return (
			<button className={styles.button} {...props}>
				{children}
			</button>
		);
	}

	return (
		<Button className={styles.button} {...props}>
			{children}
		</Button>
	);
}