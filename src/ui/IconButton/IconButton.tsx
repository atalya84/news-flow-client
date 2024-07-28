import { SvgIconComponent } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
import { buttonStyle } from './styles';

export const IconButton: FC<
	ButtonProps & {
		icon: JSX.Element;
		label?: number | string;
	}
> = (props) => (
	<Button
		variant="contained"
		startIcon={props.icon}
		sx={buttonStyle}
		disableElevation
		{...props}
	>
		{props.label}
	</Button>
);