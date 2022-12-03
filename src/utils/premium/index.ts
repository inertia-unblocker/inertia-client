import { useSession } from 'next-auth/react';
import { useState } from 'react';

const checkPremium = async () => {
	return true;
};

export const usePremium = () => {
	const [allow, setAllow] = useState<boolean | undefined>(undefined);

	const { status } = useSession();

	if (allow != undefined) return allow;
	if (status != 'authenticated') setAllow(true);
	else checkPremium().then((premium) => {
		setAllow(premium);
	});

	return allow;
};