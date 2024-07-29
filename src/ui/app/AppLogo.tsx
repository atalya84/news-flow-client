import './AppLogo.css';

import { FC } from 'react';
import classNames from 'classnames';

interface Props {
	hideTitle?: boolean;
	small?: boolean;
	className?: string;
	onClick?: () => void;
}

export const AppLogo: FC<Props> = ({
	hideTitle,
	small,
	className,
	onClick,
}) => {
	return (
		<div
			className={classNames('app-logo', className, { small, click: !!onClick })}
			onClick={onClick}
		>
			<a href="/">
				<img src="/logo.png" className="logo" alt="App Logo" />
			</a>
			{!hideTitle ? <h2 className="app-logo-title">News Flow</h2> : null}
		</div>
	);
};