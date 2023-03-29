export type Species = {
	id: number;
	name: string;
	pokemon_v2_pokemons: Pokemon[];
};

export type Pokemon = {
	pokemon_v2_pokemontypes: PokemonType[];
};

export type PokemonType = {
	pokemon_v2_type: Type;
};

export type Type = {
	id: number;
	name: string;
};
