import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Link,
	Typography,
} from '@mui/material';
import { FC } from 'react';
import './styles.ts';
import { cardBoxStyle, cardContentStyle, cardStyle, headlineStyle, linkStyle } from './styles.ts';
import {Comment, Share} from '@mui/icons-material'
import { IconButton } from '../IconButton/IconButton.tsx';
import { IPost } from '../../../types/feed.types.ts';
import { useNavigate } from 'react-router-dom';

const FeedItem: FC<{post: IPost}> = ({post}) => {
	const navigate = useNavigate();

	return (
		<>
			<Card sx={cardStyle} onClick={() => navigate(`/posts/${post._id}`)}>
				<Box sx={cardBoxStyle}>
					<Box sx={cardContentStyle}>
						<Typography component="div" variant="h6" sx={headlineStyle}>
							{post.title}
						</Typography>
						<Chip label={post.country || "No Country"} variant='filled' size='small' sx={{color: 'white', backgroundColor: "#555555"}}/>
					</Box>
					{post.source && <Link href={post.source} target="_blank" rel="noopener" sx={linkStyle}>{post.source}</Link>}
					<Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem'}}>
						<IconButton icon={<Comment />} label={post.comments?.length || 0} />
						<IconButton icon={<Share />} label={'Share'} />
					</Box>
				</Box>
				<CardMedia
					component="img"
					sx={{ width: 150, height: 150, borderRadius: '1rem' }}
					image="./live-from-space.jpg"
					alt="Live from space album cover"
				/>
			</Card>
			<Divider sx={{ backgroundColor: '#555555' }} />
		</>
	);
};

export default FeedItem