import {type FlavorText} from '@/types/pokemonType';
import {normalizeFlavorText} from '@/utils/pokemon';
import PokemonCardDetail from './pokemon-card-detail';

type Props = {
	pokemon_v2_pokemonspeciesflavortexts: FlavorText[];
	type: string;
};

export default function About({pokemon_v2_pokemonspeciesflavortexts, type}: Props) {
	const flavorTexts = normalizeFlavorText(pokemon_v2_pokemonspeciesflavortexts);
	return (
		<PokemonCardDetail heading='About' type={type}>
			<div>{flavorTexts[0]}</div>
		</PokemonCardDetail>
	);
}
