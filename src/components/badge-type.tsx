import Image from 'next/image';

type BadgeProps = {
	type: string;
	badgeOnly?: boolean;
};

export default function BadgeType({type, badgeOnly}: BadgeProps) {
	const srcImg = `/assets/${type}.svg`;
	return (
		<div className={`flex p-1 rounded bg-type-${type} space-x-1 justify-center w-fit mx-auto`}>
			<Image src={srcImg} width={13} height={13} alt={type} />
			{!badgeOnly && <div className='capitalize'>{type}</div>}
		</div>
	);
}
