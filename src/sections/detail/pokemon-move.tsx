import {type PokemonMove} from '@/types/pokemonType';

type Props = {
	pokemon_v2_pokemonmoves: PokemonMove[];
};

export default function Move({pokemon_v2_pokemonmoves}: Props) {
	const moves = pokemon_v2_pokemonmoves.map(({pokemon_v2_move}) => ({
		name: pokemon_v2_move.name,
		accuracy: pokemon_v2_move.accuracy,
		power: pokemon_v2_move.power,
		pp: pokemon_v2_move.pp,
		typeId: pokemon_v2_move.type_id,
		damage: pokemon_v2_move.pokemon_v2_movedamageclass.name,
	}));
	return (
		<div className='card'>
			{moves.map(({name, accuracy}) => (
				<div key={name}>
					{name}
					{accuracy}
				</div>
			))}
		</div>
	);
}
