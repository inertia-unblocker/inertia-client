/* eslint-disable @next/next/no-sync-scripts */
import type { AppContext, AppProps } from 'next/app';
import * as themes from '@theme/shared';
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';
import { Navbar } from '@components/navagation/navbar';
import { Sidebar } from '@components/navagation/sidebar';
import Head from 'next/head';
import { Cookies, useCookies, CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import '@css/global.css';
import { useEffect } from 'react';
import App from 'next/app';

function InertiaGlobal({ Component, pageProps, cookies }) {
	const [cookie, setCookie] = useCookies(['proxyLocation', 'externalProxyType', 'externalProxyURL']);
	const pathname = useRouter().pathname;
	const barePages = ['/browser'];
	const isBrowser = typeof window !== 'undefined';

	// set cookies on first load
	if (!cookie.proxyLocation) setCookie('proxyLocation', 'internal');
	if (cookie.proxyLocation === 'external' && !cookie.externalProxyType) setCookie('externalProxyType', 'ultraviolet');
	if (cookie.proxyLocation === 'external' && !cookie.externalProxyURL) setCookie('externalProxyURL', 'https://is-uv.up.railway.app');

	// overlay until site fully loads
	useEffect(() => {
		const blackBox = document.getElementById('blackbox');

		if (document.readyState == 'complete') blackBox.style.display = 'none';
		else {
			window.addEventListener('load', () => {
				blackBox.style.display = 'none';
			});
		}
	});

	const Navagation = () => {
		if (barePages.includes(pathname)) return null;
		return (
			<>
				<Navbar />
				<Sidebar />
			</>
		);
	};

	return (
		<CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
			<nextThemes.ThemeProvider
				attribute='class'
				defaultTheme='dark'
				value={{
					light: themes.lightTheme.className,
					dark: themes.darkTheme.className
				}}
			>
				<nextUI.NextUIProvider>
					<Head>
						<title>Inertia</title>
						<link href='/inertia.svg' rel='icon' />
						<script data-website-id='e5d2fff6-bf12-47d4-8e32-39ee145cb541' src='https://inertia-analytics.vercel.app/umami.js' async defer />
						<script src='/uv/uv.bundle.js' />
						<script src='/uv/uv.config.js' />
						<script src='/uv.js' />
					</Head>
					<Navagation />
					<Component {...pageProps} />
					<div className='blackoutBox' id='blackbox'></div>
				</nextUI.NextUIProvider>
			</nextThemes.ThemeProvider>
		</CookiesProvider>
	);
}

InertiaGlobal.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
};

export default InertiaGlobal;
