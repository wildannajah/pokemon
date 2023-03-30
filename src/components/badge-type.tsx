import Image from 'next/image';

type BadgeProps = {
	type: string;
};

export default function BadgeType({type}: BadgeProps) {
	const srcImg = `/assets/${type}.svg`;
	return (
		<div className={`flex p-1 rounded bg-type-${type} space-x-1`}>
			<Image src={srcImg} width={13} height={13} alt={type} />
			<div className='capitalize'>{type}</div>
		</div>
	);
}
