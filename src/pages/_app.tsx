import ProgressBar from '@/components/progress-bar';
import '@/styles/globals.css';
import getQueryClient from '@/utils/getQueryClient';
import type {AppProps} from 'next/app';
import {useState} from 'react';
import {Hydrate, QueryClientProvider} from 'react-query';

type Props = AppProps<{
	dehydratedState: unknown;
}>;

export default function App({Component, pageProps}: Props) {
	const [queryClient] = useState(getQueryClient);
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ProgressBar />
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}
