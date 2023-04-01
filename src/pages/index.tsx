import {fetchPokemons, type QueryPokemonFilter, useInfQueryPokemons} from '@/queries/pokemons';
import PokemonCard from '@/sections/home/pokemon-card';
import PokemonCardLoader from '@/sections/home/pokemon-card-loader';
import PokemonListFilter from '@/sections/home/pokemon-list-filter';
import getQueryClient from '@/utils/getQueryClient';
import {type GetStaticPropsResult} from 'next';
import {useEffect, useRef, useState} from 'react';
import {dehydrate, type DehydratedState} from 'react-query';

const initialState = {name: '', typeId: 0};

type Result = GetStaticPropsResult<{dehydratedState: DehydratedState}>;

export async function getStaticProps(): Promise<Result> {
	const queryClient = getQueryClient();
	await queryClient.fetchInfiniteQuery(['pokemons', initialState], fetchPokemons);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

	return {
		props: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			dehydratedState,
		},
	};
}

export default function Home() {
	const [filter, setFilter] = useState<QueryPokemonFilter>(initialState);
	const {data, fetchNextPage, isFetching, isFetchingNextPage} = useInfQueryPokemons(filter);
	const {pages} = data ?? {};
	const pokemonSpecies = pages?.flat();
	const isLoading = isFetching || isFetchingNextPage;
	const loadMoreRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		const observer = new IntersectionObserver(entries => {
			entries.forEach(async entry => {
				if (entry.isIntersecting) {
					await fetchNextPage();
				}
			});
		});

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [fetchNextPage, filter]);
	return (
		<div className='p-8 space-y-5'>
			<div className='pt-8 my-2 space-y-2'>
				<div className='text-3xl font-bold'>Pokédex</div>
				<div>Search for Pokémon by name or filter by type</div>{' '}
			</div>
			<PokemonListFilter filter={filter} setFilter={setFilter} />
			<div className='pokemon-card-container'>
				{pokemonSpecies?.map(({id, name, pokemon_v2_pokemons}) => (
					<PokemonCard
						key={id}
						id={id}
						name={name}
						pokemon_v2_pokemons={pokemon_v2_pokemons}
					></PokemonCard>
				))}
				{isLoading &&
					Array.from({length: 6}).map((_, index) => (
						<PokemonCardLoader key={index} />
						// <div key={index} className='w-full h-40 bg-gray-600 rounded-lg animate-pulse'></div>
					))}
			</div>
			<div ref={loadMoreRef} />
		</div>
	);
}
