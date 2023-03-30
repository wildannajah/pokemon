export type Species = {
	id: number;
	name: string;
	pokemon_v2_pokemons: Pokemon[];
};

export type Specy = {
	pokemon_v2_pokemon: Pokemon[];
	pokemon_v2_pokemonspeciesflavortexts: FlavorText[];
	pokemon_v2_pokemonspeciesnames: SpeciesName[];
};

export type Pokemon = {
	id: number;
	name: string;
	height: number;
	weight: number;
	pokemon_v2_pokemontypes: PokemonType[];
	pokemon_v2_pokemonstats: PokemonStat[];
	pokemon_v2_pokemonabilities: PokemonAbility[];
	pokemon_v2_pokemonmoves: PokemonMove[];
	pokemon_v2_pokemonspecy: Specy;
};

export type PokemonType = {
	pokemon_v2_type: Type;
};

export type Type = {
	id: number;
	name: string;
};

export type PokemonStat = {
	stat_id: number;
	base_stat: number;
	pokemon_v2_stat: Stat;
};

export type Stat = {
	name: string;
};

export type PokemonAbility = {
	pokemon_v2_ability: Ability;
};

export type Ability = {
	name: string;
	pokemon_v2_abilityeffecttexts: AbilityEffectText[];
};

export type AbilityEffectText = {
	short_effect: string;
};

export type PokemonMove = {
	pokemon_v2_move: Move;
};

export type Move = {
	name: string;
	type_id: number;
	power?: number;
	accuracy?: number;
	pp: number;
	pokemon_v2_movedamageclass: MoveDamageClass;
};

export type MoveDamageClass = {
	name: string;
};

export type FlavorText = {
	id: number;
	flavor_text: string;
};

export type SpeciesName = {
	genus: string;
};
