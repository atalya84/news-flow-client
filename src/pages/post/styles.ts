import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const postCardStyle: SxProps = {
	marginTop: '1rem',
	borderColor: '#333333',
	backgroundColor: 'transparent',
	boxShadow: 'none',
	borderRadius: '1rem',
};

export const postImageStyle: CSSProperties = {
	width: '100%',
	height: '55vh',
	objectFit: 'contain',
	backdropFilter: 'blur(30px)',
	WebkitBackdropFilter: 'blur(30px)'
}