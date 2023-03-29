import {fetchPokemons, useInfQueryPokemons} from '@/queries/pokemons';
import getQueryClient from '@/utils/getQueryClient';
import {type GetStaticPropsResult} from 'next';
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
	const {data} = useInfQueryPokemons(initialState);
	const {pages} = data ?? {};
	const pokemonSpecies = pages!.flat();
	return (
		<div>
			<h1>
				{pokemonSpecies.map(({id, name}) => (
					<div key={id}>{name}</div>
				))}
			</h1>
		</div>
	);
}
