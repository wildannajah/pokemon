import {fetchPokemon, useQueryPokemon} from '@/queries/Pokemon';
import getQueryClient from '@/utils/getQueryClient';
import {
	type GetStaticPathsResult,
	type GetStaticPropsContext,
	type GetStaticPropsResult,
} from 'next';
import {useRouter} from 'next/router';
import {dehydrate, type DehydratedState} from 'react-query';

type Context = GetStaticPropsContext<{name: string}>;
type Result = GetStaticPropsResult<{
	dehydratedState: DehydratedState;
}>;

export async function getStaticProps({params}: Context): Promise<Result> {
	const {name} = params!;
	try {
		const queryClient = getQueryClient();
		await queryClient.fetchQuery(['pokemon', name], fetchPokemon);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
		return {
			props: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				dehydratedState,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: ['bulbasaur', 'charmander', 'squirtle', 'pikachu'].map(pokemonName => ({
			params: {name: pokemonName},
		})),
		fallback: 'blocking',
	};
}

export default function PokemonDetail() {
	const router = useRouter();
	const {name = ''} = router.query;
	const pokemonName = Array.isArray(name) ? name[0].toString() : name.toString();
	const {data} = useQueryPokemon(pokemonName);
	const pokemon = data!;
	return <div>{pokemon.name}</div>;
}
