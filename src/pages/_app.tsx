import type { AppProps } from 'next/app';
import * as themes from '../theme/shared';
import * as nextThemes from 'next-themes';
import * as nextUI from '@nextui-org/react';

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
				<Component {...pageProps} />
			</nextUI.NextUIProvider>
		</nextThemes.ThemeProvider>
	);
}

export default InertiaGlobal;
