import {type PokemonAbility, type Specy} from '@/types/pokemonType';
import PokemonCardDetail from './pokemon-card-detail';

type Props = {
	weight: number;
	height: number;
	pokemon_v2_pokemonabilities: PokemonAbility[];
	pokemon_v2_pokemonspecy: Specy;
	type: string;
};

export default function Data({
	pokemon_v2_pokemonspecy,
	weight,
	height,
	pokemon_v2_pokemonabilities,
	type,
}: Props) {
	const {genus} = pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
	const abilities = pokemon_v2_pokemonabilities.map(({pokemon_v2_ability}) => ({
		name: pokemon_v2_ability.name,
		effect: pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect,
	}));
	return (
		<PokemonCardDetail heading='Pokédex' type={type}>
			<div className='grid grid-cols-3'>
				<div>Species</div>
				<div className='col-span-2'>{genus}</div>
				<div>Weight</div>
				<div className='col-span-2'>{weight}</div>
				<div>Weight</div>
				<div className='col-span-2'>{height}</div>
				<div>Ability</div>
				<div className='col-span-2'>
					{abilities.map(({name}) => (
						<div key={name} className='capitalize'>
							{name}
						</div>
					))}
				</div>
			</div>
		</PokemonCardDetail>
	);
}
