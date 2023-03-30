/** @type {import('tailwindcss').Config} */
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
		},
	},
	plugins: [],
};
