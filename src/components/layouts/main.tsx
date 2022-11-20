import type { NextPage } from 'next';

import { HomeProps } from '@props';
import { Providers } from '@components/layouts';

import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';


export const Main: NextPage<HomeProps> = ({ children, ...props }: HomeProps) => {
	return (
		<>
			<Providers {...props}>
				<Navbar />
				{children}
				<Footer />
			</Providers>
		</>
	);
};