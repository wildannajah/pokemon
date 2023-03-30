export const formatPokemonId = (id: number | string) => String(id).padStart(3, '0');

import {type FlavorText} from '../types/pokemonType';

export function normalizeFlavorText(flavorTexts: FlavorText[]) {
	const sorted = flavorTexts?.sort((a, b) => a.id - b.id);
	const descriptions: string[] = [];
	// eslint-disable-next-line array-callback-return
	sorted?.map(({flavor_text}) => {
		const normalizedText: string = flavor_text
			.replaceAll(/[\n\f]/g, ' ')
			.replaceAll(/POKéMON/g, 'Pokémon');
		const index = descriptions.findIndex(description => {
			const existing = description.toLowerCase().split(' ');
			const existingFirst3words = existing.slice(0, 3).join(' ');
			const existingLast3words = existing.slice(-3).join(' ');

			const current = normalizedText.toLowerCase().split(' ');
			const currentFirst3words = current.slice(0, 3).join(' ');
			const currentLast3words = current.slice(-3).join(' ');

			return existingFirst3words === currentFirst3words || existingLast3words === currentLast3words;
		});

		if (index === -1) {
			descriptions.push(normalizedText);
		} else {
			descriptions[index] = normalizedText;
		}
	});
	return descriptions;
}
