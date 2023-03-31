import {type ReactNode} from 'react';

type Props = {
	heading: string;
	children: ReactNode;
	type: string;
};

export default function PokemonCardDetail({heading, children, type}: Props) {
	return (
		<div className='card'>
			{heading && <h2 className={`pb-2.5 text-xl font-bold text-elm-${type}`}>{heading}</h2>}
			<div className='text-sm'>{children}</div>
		</div>
	);
}
