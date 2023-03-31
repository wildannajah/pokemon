import PokemonCardDetail from './pokemon-card-detail';

type Props = {
	type: string;
	happiness: number;
	growthRate: string;
	captureRate: number;
	hatchCounter: number;
};

export default function Training({type, happiness, hatchCounter, growthRate, captureRate}: Props) {
	return (
		<PokemonCardDetail heading='Training' type={type}>
			<div className='grid grid-cols-3'>
				<div>Base Happiness</div>
				<div className='col-span-2'>{happiness}</div>
				<div>Catch Rate</div>
				<div className='col-span-2'>{captureRate}</div>
				<div>Hatch Counter</div>
				<div className='col-span-2'>{hatchCounter}</div>
				<div>Growth Rate</div>
				<div className='col-span-2 space-x-1 capitalize'>{growthRate.replaceAll('-', ' ')}</div>
			</div>
		</PokemonCardDetail>
	);
}
