import Iconify from '@/components/iconify';
import {useQueryPokemonypes} from '@/queries/pokemon-types';
import {type QueryPokemonFilter} from '@/queries/pokemons';
import {type Dispatch, type SetStateAction} from 'react';

type Props = {
	filter: QueryPokemonFilter;
	setFilter: Dispatch<SetStateAction<QueryPokemonFilter>>;
};

export default function PokemonListFilter({filter, setFilter}: Props) {
	const {data} = useQueryPokemonypes();
	return (
		<div>
			<div className='relative flex items-center text-gray-400 focus-within:text-gray-600'>
				<Iconify
					icon={'material-symbols:search'}
					className='absolute mx-3 text-xl pointer-events-none'
				/>
				<input
					data-testid='name'
					type='text'
					name='search'
					placeholder='Search pokémon'
					className='w-full py-2 pl-10 border rounded-md pr-3text-black'
					onChange={({target}) => {
						setFilter(prev => ({...prev, name: String(target.value)}));
					}}
				></input>

				<select
					value={filter.typeId}
					onChange={({target}) => {
						setFilter(prev => ({...prev, typeId: Number(target.value)}));
					}}
					className='py-2 mx-2 border rounded-md'
				>
					<option value='0'>All types</option>
					{data?.map(({id, name}) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
