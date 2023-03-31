import clsx from 'clsx';
import Image from 'next/image';

type BadgeProps = {
	type: string;
	badgeOnly?: boolean;
	className?: string;
};

export default function BadgeType({type, badgeOnly, className}: BadgeProps) {
	const srcImg = `/assets/${type}.svg`;
	return (
		<div
			className={clsx(`flex p-1 rounded bg-type-${type} space-x-1`, className && `${className}`)}
		>
			<Image src={srcImg} width={13} height={13} alt={type} />
			{!badgeOnly && <div className='capitalize'>{type}</div>}
		</div>
	);
}
