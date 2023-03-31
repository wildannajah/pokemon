import {Icon, type IconifyIcon} from '@iconify/react';
import clsx from 'clsx';

type Props = {
	icon: IconifyIcon | string;
	className?: string;
};

export default function Iconify({icon, className}: Props) {
	return (
		<div className={clsx('text-4xl', className && `${className}`)}>
			<Icon icon={icon} />
		</div>
	);
}
