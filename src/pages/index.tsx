import {fetchPokemons, type QueryPokemonFilter, useInfQueryPokemons} from '@/queries/pokemons';
import PokemonCard from '@/sections/home/pokemon-card';
import PokemonListFilter from '@/sections/home/pokemon-list-filter';
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
		<div className='p-8 space-y-5'>
			<div className='pt-8 my-2 space-y-2'>
				<div className='text-3xl font-bold'>Pokédex</div>
				<div>Search for Pokémon by name or using the National Pokédex Number</div>{' '}
			</div>
			<PokemonListFilter filter={filter} setFilter={setFilter} />

			<div className='pokemon-card-container'>
				{pokemonSpecies.map(({id, name, pokemon_v2_pokemons}) => (
					<PokemonCard
						key={id}
						id={id}
						name={name}
						pokemon_v2_pokemons={pokemon_v2_pokemons}
					></PokemonCard>
				))}
			</div>
		</div>
	);
}
