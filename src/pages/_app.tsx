import { DefaultLayout, ProvidersLayout } from '@elem/layouts';
import { useRouter } from 'next/router';

import App from 'next/app';
import type { AppContext } from 'next/app';

import '@css/global.css';


function InertiaGlobal({ Component, pageProps, cookies, host }) {
	const { pathname } = useRouter();
	const providersOnly = ['/browser', '/_error'];
	const useProvidersOnly = providersOnly.includes(pathname);

	return (
		useProvidersOnly ? (
			<ProvidersLayout cookies={cookies} host={host}>
				<Component {...pageProps} />
			</ProvidersLayout>
		) : (
			<DefaultLayout cookies={cookies} host={host}>
				<Component {...pageProps} />
			</DefaultLayout>
		)
	);
}

InertiaGlobal.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	const { req } = appContext.ctx;
	return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie, host: req?.headers?.host };
};

export default InertiaGlobal;
