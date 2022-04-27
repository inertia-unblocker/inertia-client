import type { AppProps } from 'next/app';
import * as themes from '@theme/shared';
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';
import { Navbar } from '@components/navagation/navbar';
import { Sidebar } from '@components/navagation/sidebar';
import Head from 'next/head';
import Script from 'next/script';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { SSRProvider } from 'react-bootstrap';
import '@css/global.css';
import { useEffect } from 'react';

function InertiaGlobal({ Component, pageProps }: AppProps) {
	const [cookie, setCookie] = useCookies(['proxy', 'server']);
	const pathname = useRouter().pathname;
	const noNavSideBar = ['/browser'];
	
	if (!['alloy', 'corrosion', 'ultraviolet'].includes(cookie['proxy'])) {
		setCookie('proxy', 'ultraviolet');
	}

	if (isNaN(parseInt(cookie['server']))) {
		setCookie('server', '1');
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

	return (
		<nextThemes.ThemeProvider
			defaultTheme='dark'
			attribute='class'
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
				<Script async defer data-website-id='e5d2fff6-bf12-47d4-8e32-39ee145cb541' src='https://inertia-analytics.vercel.app/umami.js' strategy='beforeInteractive' />
				{
					noNavSideBar.includes(pathname) ?
						'' : (
							<>
								<Navbar />
								<Sidebar />
							</>
						)
				}
				<Component {...pageProps} />
				<div id='blackbox' className='blackoutBox'></div>
			</nextUI.NextUIProvider>
		</nextThemes.ThemeProvider>
	);
}

export default InertiaGlobal;
