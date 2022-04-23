import type { AppProps } from 'next/app';
import * as themes from '@theme/shared';
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';
import { Navbar } from '@components/navagation/navbar';
import { Sidebar } from '@components/navagation/sidebar';
import Head from 'next/head';
import Script from 'next/script';
import { useCookies } from 'react-cookie';

function InertiaGlobal({ Component, pageProps }: AppProps) {
	const [cookie, setCookie] = useCookies(['proxy', 'server']);
	if (!['alloy', 'corrosion', 'ultraviolet'].includes(cookie['proxy'])) {
		setCookie('proxy', 'ultraviolet');
	}

	if (isNaN(parseInt(cookie['server']))) {
		setCookie('server', '1');
	}

	return (
		<nextThemes.ThemeProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: themes.lightTheme.className,
				dark: themes.darkTheme.className
			}}
		>
			<nextUI.NextUIProvider>
				<Head>
					<title>Inertia</title>
					<link rel='icon' href='/inertia.svg' />
				</Head>
				<Script async defer data-website-id="e5d2fff6-bf12-47d4-8e32-39ee145cb541" src="https://inertia-analytics.vercel.app/umami.js" strategy='beforeInteractive' />
				<Navbar />	
				<Sidebar />
				<Component {...pageProps} />
			</nextUI.NextUIProvider>
		</nextThemes.ThemeProvider>
	);
}

export default InertiaGlobal;
