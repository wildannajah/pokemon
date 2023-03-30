/** @type {import('tailwindcss').Config} */

const elements = [
	'undefined',
	'bug',
	'dark',
	'dragon',
	'electric',
	'fairy',
	'fighting',
	'fire',
	'flying',
	'ghost',
	'grass',
	'ground',
	'ice',
	'normal',
	'poison',
	'psychic',
	'rock',
	'steel',
	'water',
	'unknown',
	'shadow',
];

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				pokecard: `
					url('/assets/pokeBG.svg'), url('/assets/pokeBG2.svg')
					
        `,
			},
			backgroundPosition: {
				pokecard: '40% 0%, right',
			},
			colors: {
				elm: Object.fromEntries(elements.map(current => [current, `var(--${current})`])),
				type: Object.fromEntries(elements.map(current => [current, `var(--type-${current})`])),
			},
		},
	},
	plugins: [],
	safelist: [...elements.map(elm => `bg-elm-${elm}`)],
};
