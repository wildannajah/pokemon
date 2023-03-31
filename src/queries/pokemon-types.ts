import {apiDocument, apiDocument2} from '@/constant/pokemon';
import {type Type, type PokemonType} from '@/types/pokemonType';
import request from 'graphql-request';
import {type QueryFunctionContext, useQuery} from 'react-query';

type FetchPokemonTypesResponse = {
	pokemon_v2_pokemontype: PokemonType[];
};

type QueryPokemonTypesKey = ['pokemon-types'];
type QueryPokemonTypeData = Type[];

export const fetchPokemonTypes: () => Promise<QueryPokemonTypeData> = async () => {
	const pokemonTypes = `
		query PokemonTypes{
      pokemon_v2_pokemontype(order_by: {type_id: asc}, distinct_on: type_id){
        pokemon_v2_type{
          name
          id
        }
      }
    }
  `;
	const result = await request<FetchPokemonTypesResponse>(apiDocument, pokemonTypes);
	const types = result.pokemon_v2_pokemontype.map(({pokemon_v2_type}) => ({
		id: pokemon_v2_type.id,
		name: pokemon_v2_type.name,
	}));
	return types;
};

export const useQueryPokemonypes = () =>
	useQuery<QueryPokemonTypeData, unknown, QueryPokemonTypeData, QueryPokemonTypesKey>(
		['pokemon-types'],
		fetchPokemonTypes,
	);

export type QueryPokemonTypeRelationKey = ['pokemon-type-relation', string];
export type QueryPokemonTypeRelationData = {
	pokemon: {
		weaknesses: string[];
		resistant: string[];
	};
};

export const fetchPokemonTypeRelation = async (
	ctx: QueryFunctionContext<QueryPokemonTypeRelationKey>,
) => {
	const pokemonTypeRealtion = `
		query pokemon($name: String) {
			pokemon(name: $name) {
				resistant
				weaknesses
			}
		}`;
	const result = await request<QueryPokemonTypeRelationData>(apiDocument2, pokemonTypeRealtion, {
		name: ctx.queryKey[1],
	});
	return result;
};

export const useQueryPokemonTypeRelation = (name: string) =>
	useQuery<
	QueryPokemonTypeRelationData,
	unknown,
	QueryPokemonTypeRelationData,
	QueryPokemonTypeRelationKey
	>({
		queryKey: ['pokemon-type-relation', name],
		queryFn: fetchPokemonTypeRelation,
	});
