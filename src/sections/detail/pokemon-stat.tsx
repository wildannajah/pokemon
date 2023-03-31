import {type PokemonStat} from '@/types/pokemonType';
import PokemonCardDetail from './pokemon-card-detail';

type Props = {
	pokemon_v2_pokemonstats: PokemonStat[];
	type: string;
};

export default function Stat({pokemon_v2_pokemonstats, type}: Props) {
	const stats = pokemon_v2_pokemonstats.map(({base_stat, pokemon_v2_stat}) => ({
		value: base_stat,
		stat: pokemon_v2_stat.name,
	}));
	const maxStats = 255;
	let total = 0;
	return (
		<PokemonCardDetail heading='Base Stat' type={type}>
			<div className='space-y-1 text-sm'>
				{stats.map(({value, stat}) => {
					const newStatName = stat.split(/[\W]/g);
					if (newStatName[0] === 'special') {
						newStatName[0] = 'sp. ';
						if (newStatName[1] === 'attack') {
							newStatName[1] = 'atk';
						}

						if (newStatName[1] === 'defense') {
							newStatName[1] = 'def';
						}
					}

					total += value;
					return (
						<div key={stat} className='flex items-center'>
							<div className='w-24 capitalize'>{newStatName}</div>
							<div className='mr-2.5 w-7 text-right font-semibold'>{value}</div>
							<div className='flex-1 w-full h-2 overflow-hidden rounded-full bg-slate-200'>
								<div
									className={`h-full bg-elm-${type} transition-all`}
									style={{
										width: `${(value / maxStats) * 100}%`,
									}}
								/>
							</div>
							<div className='mx-2.5 w-7 text-right font-bold'>255</div>
						</div>
					);
				})}

				<div className='flex items-center'>
					<div className='w-24'>Total</div>
					<div className='mr-2.5 w-7 text-right font-semibold'>{total}</div>
					<div className='flex-1 w-full h-2 overflow-hidden rounded-full bg-inherit'></div>
					<div className='mr-2.5 w-7 text-right font-bold'>Max</div>
				</div>
			</div>
		</PokemonCardDetail>
	);
}
