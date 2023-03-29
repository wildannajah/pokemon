/* eslint-disable @typescript-eslint/indent */
import {apiDocument, limit} from '@/constant/pokemon';
import request from 'graphql-request';
import {useInfiniteQuery, type QueryFunctionContext} from 'react-query';
import {type Species} from '../types/pokemonType';

type QueryPokemonFilter = {
	name: string;
	typeId?: number;
};

type FetchPokemonsResponse = {
	pokemon_v2_pokemonspecies: Species[];
};

type QueryPokemonsKey = ['pokemons', QueryPokemonFilter];
type QeuryPokemonData = FetchPokemonsResponse['pokemon_v2_pokemonspecies'];

export const fetchPokemons = async (ctx: QueryFunctionContext<QueryPokemonsKey>) => {
	const {name, typeId} = ctx.queryKey[1];
	const pageParam = ctx.pageParam as number;
	const pokemons = `
    query Pokemons {
      pokemon_v2_pokemonspecies(
        order_by: { id: asc }
        offset: ${pageParam || 0}
        where: {
          name: { _ilike: "%${name}%" }
          ${
						typeId
							? `pokemon_v2_pokemons: { pokemon_v2_pokemontypes: { type_id: { _eq: ${typeId} } } }`
							: ''
					}
        }
        limit: ${limit}
      ) {
        id
        name
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
  `;
	const result = await request<FetchPokemonsResponse>(apiDocument, pokemons);
	return result.pokemon_v2_pokemonspecies;
};

export const useInfQueryPokemons = (filter: QueryPokemonFilter) =>
	useInfiniteQuery<QeuryPokemonData, unknown, QeuryPokemonData, QueryPokemonsKey>({
		queryKey: ['pokemons', filter],
		queryFn: fetchPokemons,
		keepPreviousData: true,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length < limit ? undefined : allPages.length * limit,
	});
