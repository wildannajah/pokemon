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
			<input
				type='text'
				placeholder='🔍 Search pokémon'
				maxLength={11}
				onChange={({target}) => {
					setFilter(prev => ({...prev, name: String(target.value)}));
				}}
			/>
			<select
				value={filter.typeId}
				onChange={({target}) => {
					setFilter(prev => ({...prev, typeId: Number(target.value)}));
				}}
			>
				<option value='0'>All types</option>
				{data?.map(({id, name}) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
