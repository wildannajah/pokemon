import {type FlavorText} from '@/types/pokemonType';
import {normalizeFlavorText} from '@/utils/pokemon';

type Props = {
	pokemon_v2_pokemonspeciesflavortexts: FlavorText[];
};

export default function About({pokemon_v2_pokemonspeciesflavortexts}: Props) {
	const flavorTexts = normalizeFlavorText(pokemon_v2_pokemonspeciesflavortexts);
	return (
		<div className='card'>
			<div>{flavorTexts[0]}</div>
		</div>
	);
}
