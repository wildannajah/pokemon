import {type PokemonAbility, type Specy} from '@/types/pokemonType';

type Props = {
	weight: number;
	height: number;
	pokemon_v2_pokemonabilities: PokemonAbility[];
	pokemon_v2_pokemonspecy: Specy;
};

export default function Data({
	pokemon_v2_pokemonspecy,
	weight,
	height,
	pokemon_v2_pokemonabilities,
}: Props) {
	const {genus} = pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
	const abilities = pokemon_v2_pokemonabilities.map(({pokemon_v2_ability}) => ({
		name: pokemon_v2_ability.name,
		effect: pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect,
	}));
	return (
		<div className='card'>
			<div className='grid grid-cols-2'>
				<div>Species</div>
				<div>{genus}</div>
				<div>Weight</div>
				<div>{weight}</div>
				<div>Weight</div>
				<div>{height}</div>
				<div>Ability</div>
				<div>
					{abilities.map(({name}) => (
						<div key={name} className='capitalize'>
							{name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
