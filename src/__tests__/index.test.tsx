import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home, {getStaticProps} from '@/pages/index';
import getQueryClient from '@/utils/getQueryClient';
import {QueryClient, QueryClientProvider} from 'react-query';

class IntersectionObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver,
});

const queryClient = new QueryClient();

describe('Home', () => {
	it('renders the title and filter', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<Home />
			</QueryClientProvider>,
		);
		expect(screen.getByText('Pokédex')).toBeInTheDocument();
		expect(screen.getByText('Search for Pokémon by name or filter by type')).toBeInTheDocument();
	});
});
