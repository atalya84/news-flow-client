import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	borderRadius: '1rem',
	backgroundColor: 'transparent',
	color: 'white',
	paddingX: '1rem',
	paddingY: '5px',
	marginY: '5px',
	boxShadow: 'none',
	':hover': {
		backgroundColor: '#77777711',
	},
};

export const cardBoxStyle: SxProps = {
    display: 'flex',
	flexDirection: 'column',
	height: "100%",
	justifyContent: 'space-between',
	textAlign: "left",
}

export const cardContentStyle: SxProps = {
	marginBottom: "1rem",
	textAlign: "left",
    flex: '1 0 auto'
}

export const headlineStyle: SxProps = {
	display: '-webkit-box',
	overflow: 'hidden',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 2
}

export const linkStyle: SxProps = {
	color: '#DDDDDD',
	textDecoration: 'none',
	':hover': {
		textDecorationLine: 'underline'
	},
	display: '-webkit-box',
	overflow: 'hidden',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 1,
}