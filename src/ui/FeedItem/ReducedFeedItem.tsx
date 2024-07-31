import {
	Box,
	Card,
	CardMedia,
	Chip,
	Divider,
	Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import './styles.ts';
import {
	cardBoxStyle,
	cardContentStyle,
	reducedCardStyle,
	reducedFeedItemImageStyle,
	headlineStyle,
} from './styles.ts';
import { IPost } from '../../types/feed.ts';
import { useNavigate } from 'react-router-dom';
import { AsyncImage } from 'loadable-image';
import { IUser } from '../../types/user.types.ts';
import { fetchUser } from '../../services/users.service.ts';
import axios from 'axios';
import { IconButton } from '../IconButton/IconButton.tsx';
import { Comment } from '@mui/icons-material';

const ReducedFeedItem: FC<{ post: IPost }> = ({ post }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		(async () => {
			try {
				setUser(await fetchUser(post.userId));
			} catch (err) {
				if (axios.isAxiosError(err)) console.error(err.message);
				else console.error(err);
			}
		})();
	}, []);

	return (
		<>
			<Card sx={reducedCardStyle} onClick={() => navigate(`/posts/${post._id}`)}>
				<Box sx={cardBoxStyle}>
					<Box sx={cardContentStyle}>
						<Typography component="div" variant="h6" sx={headlineStyle}>
							{post.title}
						</Typography>
						<Chip
							label={post.country || 'No Country'}
							variant="filled"
							size="small"
							sx={{
								color: 'white',
								backgroundColor: '#555555',
								marginTop: '1rem',
							}}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							marginTop: '1rem',
						}}
					>
						<IconButton icon={<Comment />} label={post.comments?.length || 0} />
					</Box>
				</Box>
				<CardMedia>
					<AsyncImage
						src={post.imgUrl}
						alt="Post Image"
						style={reducedFeedItemImageStyle}
					/>
				</CardMedia>
			</Card>
			<Divider sx={{ backgroundColor: '#555555' }} />
		</>
	);
};

export default ReducedFeedItem;