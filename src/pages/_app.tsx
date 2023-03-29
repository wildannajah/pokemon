import '@/styles/globals.css';
import getQueryClient from '@/utils/getQueryClient';
import type {AppProps} from 'next/app';
import {useState} from 'react';
import {QueryClientProvider} from 'react-query';

export default function App({Component, pageProps}: AppProps) {
	const [queryClient] = useState(getQueryClient);
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
