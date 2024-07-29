import { SxProps } from '@mui/material';

export const textFieldStyle: SxProps = {
	width: '100%',
	'& .MuiOutlinedInput-root': {
		borderRadius: '1rem',
		'&:hover': { borderColor: '#77777777' },
	},
	'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
		borderColor: '#77777777',
		'&:hover': { borderColor: '#77777777' },
	},
	'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#777777',
	},
	'& .MuiOutlinedInput-input': {
		color: 'white',
	},
	'& .MuiOutlinedInput-root .MuiOutlinedInpit-multiline': {
		height: '50px',
	},
};