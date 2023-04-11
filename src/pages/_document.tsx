import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/icons/pokemon-128.png'></link>
				<meta name='theme-color' content='#fff' />
				<link rel='icon' href='/icons/pokemon-128.png' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
