import {fetchPokemons, type QueryPokemonFilter, useInfQueryPokemons} from '@/queries/pokemons';
import PokemonListFilter from '@/sections/pokemon-list-filter';
import getQueryClient from '@/utils/getQueryClient';
import {type GetStaticPropsResult} from 'next';
import {useEffect, useState} from 'react';
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
	const {data} = useInfQueryPokemons(filter);
	const {pages} = data ?? {};
	const pokemonSpecies = pages!.flat();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [filter]);
	return (
		<div>
			<PokemonListFilter filter={filter} setFilter={setFilter} />
			<h1>
				{pokemonSpecies.map(({id, name}) => (
					<div key={id}>{name}</div>
				))}
			</h1>
		</div>
	);
}
