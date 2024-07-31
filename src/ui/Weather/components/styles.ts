import { SxProps } from '@mui/material';

export const weatherInput: SxProps = {
	'& .MuiInput-root': {
		fontFamily: 'Helvetica, sans-serif',
		fontWeight: 300,
		fontSize: 'x-large',
		letterSpacing: '2px',
		color: '#fff',
		'&:before': {
			borderColor: 'white',
		},
		'&:hover::before': {
			borderColor: 'white',
		},
	},
};