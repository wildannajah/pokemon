const nextPWA = require("next-pwa");

const withPWA = nextPWA({
	dest: "public",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.statically.io',
				port: '',
				pathname: '/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
			},
		],
	},
};

module.exports = withPWA(nextConfig);
