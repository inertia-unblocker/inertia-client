/* eslint-disable @next/next/no-sync-scripts */
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';
import * as themes from '@theme';

import { browserIsFirefox, isClientSide } from '@util/detectors';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

import { Footer } from '@elem/footer';
import { InternalLink } from './internalLink';
import { Navbar } from '@nav';
import { Premium } from '@icons';
import { useRouter } from 'next/router';

import checkPremium from '@lib/checkPremium';
import Head from 'next/head';

import type { NextPage } from 'next';

interface HomeProps {
	children: any;
	cookies: any;
	host: string;
}

export const ProvidersLayout: NextPage<HomeProps> = ({ children, cookies, host }: HomeProps) => {
	const [cookie, setCookie, removeCookie] = useCookies(['proxyLocation', 'externalProxyType', 'externalProxyURL', 'host', 'loggedIn', 'uid', 'token']);
	const router = useRouter();
	let firstLoad = false;

	if (!browserIsFirefox) {
		if (!cookie.proxyLocation) {
			setCookie('proxyLocation', 'internal', { path: '/' });
			firstLoad = true;
		}
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyType) setCookie('externalProxyType', 'ultraviolet', { path: '/' });
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyURL) setCookie('externalProxyURL', 'https://is-uv.up.railway.app', { path: '/' });
	} else {
		if (!cookie.proxyLocation) {
			setCookie('proxyLocation', 'external', { path: '/' });
			firstLoad = true;
		}
		setCookie('externalProxyType', 'alloy', { path: '/' });
		if (cookie.proxyLocation === 'external' && !cookie.externalProxyURL) setCookie('externalProxyURL', 'https://is-alloy.up.railway.app', { path: '/' });
	}
	setCookie('host', host, { path: '/' });

	if (!cookie.loggedIn) {
		setCookie('loggedIn', false);
		setCookie('uid', '', { path: '/' });
		setCookie('token', '', { path: '/' });
	}

	if (firstLoad && router.pathname !== '/') {
		removeCookie('proxyLocation');
		removeCookie('externalProxyType');
		removeCookie('externalProxyURL');
		removeCookie('token');
		removeCookie('uid');
		removeCookie('loggedIn');
		removeCookie('host');

		router.push('/');
	}

	useEffect(() => {
		const blackBox = document.getElementById('blackbox');

		if (document.readyState == 'complete') blackBox.style.display = 'none';
		else {
			window.addEventListener('load', () => {
				blackBox.style.display = 'none';
			});
		}
	});

	if (firstLoad && isClientSide) window.location.reload();

	return (
		<>
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
						<main style={{ width: '100%', height: '100%' }}>{children}</main>
						<div className='blackoutBox' id='blackbox'></div>
					</nextUI.NextUIProvider>
				</nextThemes.ThemeProvider>
			</CookiesProvider>
		</>
	);
};

export const DefaultLayout: NextPage<HomeProps> = ({ children, cookies, host }: HomeProps) => {
	return (
		<>
			<ProvidersLayout cookies={cookies} host={host}>
				<Navbar />
				{children}
				<Footer />
			</ProvidersLayout>
		</>
	);
};

export function PremiumLockedPage({ children }) {
	const [cookie, _setCookie] = useCookies(['loggedIn', 'uid', 'token']);
	const [returnElem, setReturnElem] = useState(
		<>
			<div style={{ width: '25%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<nextUI.Progress indeterminated />
			</div>
			<div style={{ width: '55%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3rem' }}>
				<nextUI.Text css={{ textAlign: 'center' }}>
					Loading...
				</nextUI.Text>
			</div>
		</>
	);


	const Locked = () => (
		<>
			<div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<Premium size='32' />
			</div>
			<div style={{ width: '55%', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3rem' }}>
				<nextUI.Text css={{ textAlign: 'center' }} h2>
					You must have Inertia Premium to use this site
				</nextUI.Text>
			</div>
			<div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '6.5rem' }}>
				<InternalLink href='/premium/get' style={{ textAlign: 'center' }}>Click here to get Inertia Premium</InternalLink>
			</div>
		</>
	);

	const Lock = () => setReturnElem(<Locked />);

	if (cookie.loggedIn !== 'true') Lock();

	checkPremium(cookie.uid, cookie.token).then((hasPremium) => {
		if (!hasPremium) {
			Lock();
			return;
		}
		setReturnElem(
			<>
				{children}
			</>
		);
	});

	return returnElem;
}