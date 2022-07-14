/* eslint-disable @next/next/no-sync-scripts */
import * as nextUI from '@nextui-org/react';

import * as nextThemes from 'next-themes';
import * as themes from '@theme';

import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import { browserIsFirefox, isClientSide } from '@utils/detectors';

import type { AppContext } from 'next/app';
import { Navbar } from '@navigation/navbar';
import { Sidebar } from '@navigation/sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import App from 'next/app';
import Head from 'next/head';

import '@css/global.css';


function InertiaGlobal({ Component, pageProps, cookies, host }) {
	const [cookie, setCookie] = useCookies(['proxyLocation', 'externalProxyType', 'externalProxyURL', 'host']);
	const pathname = useRouter().pathname;
	const barePages = ['/browser', '/mobile'];
	let firstLoad = false;

	if (!browserIsFirefox) {
		if (!cookie.proxyLocation) {
			setCookie('proxyLocation', 'internal');
			firstLoad = true;
		}
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyType) setCookie('externalProxyType', 'ultraviolet');
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyURL) setCookie('externalProxyURL', 'https://is-uv.up.railway.app');
	} else {
		if (!cookie.proxyLocation) {
			setCookie('proxyLocation', 'external');
			firstLoad = true;
		}
		setCookie('externalProxyType', 'alloy');
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyURL) setCookie('externalProxyURL', 'https://is-alloy.up.railway.app');
	}
	setCookie('host', host);

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
				<Sidebar id='sideBar' />
			</>
		);
	};

	if (firstLoad && isClientSide) window.location.reload();

	return (
		<CookiesProvider cookies={isClientSide ? undefined : new Cookies(cookies)}>
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
	const { req } = appContext.ctx;
	return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie, host: req?.headers?.host };
};

export default InertiaGlobal;
