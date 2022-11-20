import { Main, Providers } from '@components/layouts';
import { useRouter } from 'next/router';

import App from 'next/app';
import type { AppContext } from 'next/app';
import { getSession } from 'next-auth/react';

// too afraid to static type these arguments
function InertiaGlobal({ Component, pageProps, cookies, host, session }: any) {
	const { pathname } = useRouter();
	const providersOnly = ['/browser', '/_error'];
	const useProvidersOnly = providersOnly.includes(pathname);

	return (
		useProvidersOnly ? (
			<Providers cookies={cookies} host={host} session={session}>
				<Component {...pageProps} />
			</Providers>
		) : (
			<Main cookies={cookies} host={host} session={session}>
				<Component {...pageProps} />
			</Main>
		)
	);
}

InertiaGlobal.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	const { req } = appContext.ctx;
	const session = await getSession(appContext.ctx);
	return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie, host: req?.headers?.host, session };
};

export default InertiaGlobal;
