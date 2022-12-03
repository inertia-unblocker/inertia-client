import { useSession } from 'next-auth/react';
import { useState } from 'react';

const checkPremium = async () => {
	return true;
};

export const usePremium = () => {
	const [allow, setAllow] = useState<boolean | undefined>(undefined);

	const { data: session, status } = useSession();

	if (status != 'authenticated') setAllow(false);

	checkPremium().then((premium) => {
		setAllow(premium);
	});

	return allow;
};