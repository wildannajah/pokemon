import BadgeType from '@/components/badge-type';
import {formatPokemonId} from '@/utils/pokemon';
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
		<Link href={`/pokemon/${name}`} className={`pokemon-card bg-elm-${types[0]}`}>
			<div className='flex items-center justify-between w-full pl-5 pr-1'>
				<div className='w-full space-y-1'>
					<div>#{formatPokemonId(id)}</div>
					<b className='col-span-3 text-2xl text-white capitalize'>{name}</b>
					<div className='flex space-x-2 text-sm text-white'>
						{types.map(type => (
							<BadgeType key={type} type={type} />
						))}
					</div>
				</div>
				<Image
					src={`${imageUrl}/${id}.png`}
					alt={name}
					width={128}
					height={128}
					className='relative right-0 drop-shadow-lg'
				/>
			</div>
		</Link>
	);
}

export default PokemonCard;
