import { SxProps } from '@mui/material';

export const navButtonStyle: SxProps = {
	color: '#f9b334',
	backgroundColor: 'transparent',
	'&:hover': {
		backgroundColor: '#f9b334',
		borderColor: '#f9b334',
		color: 'rgb(18,21,37)',
	},
	boxShadow: 'none',
	borderColor: 'transparent',
};

export const createButtonStyle: SxProps = {
	...navButtonStyle,
	height: '50px',
	borderRadius: '2rem',
	border: '1px solid #f9b334'
};

export const errorButtonStyle: SxProps = {
	...navButtonStyle,
	height: '50px',
	borderRadius: '2rem',
	border: '1px solid red',
	color: 'red',
	'&:hover': {
		backgroundColor: 'red',
		borderColor: 'red',
		color: 'rgb(18,21,37)',
	},
};

export const selectedNavButton: SxProps = {
	...navButtonStyle,
	borderBottomColor: '#f9b334',
	borderBottomWidth: '2px'
}