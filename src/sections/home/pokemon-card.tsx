import {type Species} from '../../types/pokemonType';

function PokemonCard({name, pokemon_v2_pokemons}: Species) {
	const types = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
		item => item.pokemon_v2_type.name,
	);
	return (
		<div>
			<div>{name}</div>
			<div className='flex gap-1'>
				{types.map(type => (
					<div key={type}>{type}</div>
				))}
			</div>
		</div>
	);
}

export default PokemonCard;
