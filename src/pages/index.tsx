import {useInfQueryPokemons} from '@/queries/pokemons';

export default function Home() {
	const filter = {name: '', typeId: 0};
	const {data} = useInfQueryPokemons(filter);
	const {pages} = data ?? {};
	const pokemonSpecies = pages!.flat();
	return (
		<div>
			<h1>
				{pokemonSpecies.map(({id, name}) => (
					<div key={id}>{name}</div>
				))}
			</h1>
		</div>
	);
}
