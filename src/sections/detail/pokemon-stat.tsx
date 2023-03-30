import {type PokemonStat} from '@/types/pokemonType';

type Props = {
	pokemon_v2_pokemonstats: PokemonStat[];
};

export default function Stat({pokemon_v2_pokemonstats}: Props) {
	const stats = pokemon_v2_pokemonstats.map(({base_stat, pokemon_v2_stat}) => ({
		value: base_stat,
		stat: pokemon_v2_stat.name,
	}));
	return (
		<div className='card'>
			{stats.map(({value, stat}) => (
				<div key={stat}>
					{stat} {value}
				</div>
			))}
		</div>
	);
}
