import Image from 'next/image';
import Link from 'next/link';
import {type Species} from '../../types/pokemonType';

function PokemonCard({id, name, pokemon_v2_pokemons}: Species) {
	const types = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
		item => item.pokemon_v2_type.name,
	);
	const imageUrl =
		'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
	return (
		<Link href={`/pokemon/${name}`} className='rounded-lg bg-slate-500 pokemon-card'>
			<div className='flex items-center justify-between w-full pl-5 pr-1'>
				<div>
					<div>{id}</div>
					<b className='col-span-3 text-xl capitalize'>{name}</b>
					<div className='col-span-2 capitalize'>{types.join(', ')}</div>
				</div>
				<Image
					src={`${imageUrl}/${id}.png`}
					alt={name}
					width={128}
					height={128}
					className='relative right-0'
				/>
			</div>
		</Link>
	);
}

export default PokemonCard;
