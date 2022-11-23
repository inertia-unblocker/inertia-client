import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { ThemeProvider } from 'next-themes';

import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import Head from 'next/head';

import { client, firefox } from '@utils/checks';
import { Dark as DarkTheme, Light as LightTheme } from '@components/theme';
import { ProxyConfig } from '@utils/proxy';

import type { HomeProps } from '@props';
import type { NextPage } from 'next';


export const Providers: NextPage<HomeProps> = ({ children, cookies, session, host }: HomeProps) => {
	const [_cookies, _setCookie, removeCookie] = useCookies();

	if (!ProxyConfig.get()) {

		const RemoveAllCookies = () => {
			const [cookie] = useCookies();

			for (const name in cookie)
				removeCookie(name);

			if (Object.keys(cookie).length > 0) {
				if (client) window.location.reload();
				RemoveAllCookies();
			}
		};

		RemoveAllCookies();
		ProxyConfig.set({
			location: firefox ? 'external' : 'internal',
			external: firefox ? 'alloy' : 'ultraviolet'
		});
	}

	// useEffect(() => {
	// 	const blackBox = document.getElementById('blackbox');

	// 	if (document.readyState == 'complete') blackBox.style.display = 'none';
	// 	else {
	// 		window.addEventListener('load', () => {
	// 			blackBox.style.display = 'none';
	// 		});
	// 	}
	// });

	return (
		<>
			<SSRProvider>
				<SessionProvider session={session}>
					<CookiesProvider cookies={client ? undefined : new Cookies(cookies)}>
						<ThemeProvider
							attribute='class'
							defaultTheme='dark'
							value={{
								light: LightTheme.className,
								dark: DarkTheme.className
							}}
						>
							<NextUIProvider>
								<main style={{ width: '100%', height: '100%' }}>{children}</main>
								<div className='blackoutBox' id='blackbox'></div>
							</NextUIProvider>
						</ThemeProvider>
					</CookiesProvider>
				</SessionProvider>
			</SSRProvider>
		</>
	);
};