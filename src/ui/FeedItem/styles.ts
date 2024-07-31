import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

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

export const reducedCardStyle: SxProps = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	borderRadius: '1rem',
	backgroundColor: 'transparent',
	color: 'white',
	paddingY: '5px',
	marginY: '8px',
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
	color: '#f9b334',
	textDecoration: 'none',
	':hover': {
		textDecorationLine: 'underline'
	},
	display: '-webkit-box',
	overflow: 'hidden',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 1,
}

export const bodyStyle: CSSProperties= {
	color: '#DDDDDD',
}

export const feedItemImageStyle: CSSProperties = {width: 150, height: 150, borderRadius: '1rem'}
export const reducedFeedItemImageStyle: CSSProperties = {width: 130, height: 120, borderRadius: '1rem'}