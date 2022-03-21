import type { AppProps } from 'next/app';
import * as themes from '@theme/shared';
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';
import { Navbar } from '@components/navagation/navbar';
import { Sidebar } from '@components/navagation/sidebar';
import Head from 'next/head';

function InertiaGlobal({ Component, pageProps }: AppProps) {
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
				<Navbar />	
				<Sidebar />
				<Component {...pageProps} />
			</nextUI.NextUIProvider>
		</nextThemes.ThemeProvider>
	);
}

export default InertiaGlobal;
