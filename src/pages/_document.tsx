import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';


export default function Document() {
	return (
		<Html>
			<Head>
				<link href='/favicon.svg' rel='icon' />
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script data-website-id='e5d2fff6-bf12-47d4-8e32-39ee145cb541' src='https://inertia-analytics.vercel.app/umami.js' async defer />
				<Script src='/uv/uv.bundle.js' />
				<Script src='/uv/uv.config.js' />
				<Script src='/uv.js' />
			</body>
		</Html>
	);
}