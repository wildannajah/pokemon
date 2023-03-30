import {type QueryFunctionContext, useQuery} from 'react-query';
import request from 'graphql-request';
import {apiDocument} from '../constant/pokemon';
import {type Pokemon} from '../types/pokemonType';

type FetchPokemonResponse = {
	pokemon_v2_pokemon: Pokemon[];
};

const pokemon = /* GraphQL */ `
	query Pokemon($name: String) {
		pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
			id
			name
			height
			weight
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
				}
			}
			pokemon_v2_pokemonstats {
				stat_id
				base_stat
				pokemon_v2_stat {
					name
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_ability {
					name
					pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: 9}}) {
						short_effect
					}
				}
			}
			pokemon_v2_pokemonmoves(distinct_on: move_id) {
				pokemon_v2_move {
					name
					type_id
					power
					accuracy
					pp
					pokemon_v2_movedamageclass {
						name
					}
				}
			}
			pokemon_v2_pokemonspecy {
				pokemon_v2_pokemonspeciesflavortexts(
					where: {language_id: {_eq: 9}}
					distinct_on: flavor_text
				) {
					flavor_text
					language_id
				}
				pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
					genus
					language_id
				}
			}
		}
	}
`;

export type QueryPokemonKey = ['pokemon', string];
export type QueryPokemonData = FetchPokemonResponse['pokemon_v2_pokemon'][0];

export const fetchPokemon = async (ctx: QueryFunctionContext<QueryPokemonKey>) => {
	const result = await request<FetchPokemonResponse>(apiDocument, pokemon, {name: ctx.queryKey[1]});
	return result.pokemon_v2_pokemon[0];
};

export const useQueryPokemon = (name: string) =>
	useQuery<QueryPokemonData, unknown, QueryPokemonData, QueryPokemonKey>({
		queryKey: ['pokemon', name],
		queryFn: fetchPokemon,
	});
