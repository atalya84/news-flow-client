import {
	Box,
	Card,
	CardMedia,
	Chip,
	Divider,
	Link,
	Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import './styles.ts';
import {
	cardBoxStyle,
	cardContentStyle,
	cardStyle,
	feedItemImageStyle,
	headlineStyle,
	linkStyle,
} from './styles.ts';
import { Comment, Share } from '@mui/icons-material';
import { IconButton } from '../IconButton/IconButton.tsx';
import { IPost } from '../../types/feed.ts';
import { useNavigate } from 'react-router-dom';
import { AsyncImage } from 'loadable-image';
import { getPostImageUrl } from '../../services/file-service.ts';
import { IUser } from '../../types/user.types.ts';
import { fetchUser } from '../../services/users.service.ts';
import axios from 'axios';
import { UserTitle } from '../UserTitle/UserTitle.tsx';

const FeedItem: FC<{ post: IPost }> = ({ post }) => {
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
			<Card sx={cardStyle} onClick={() => navigate(`/posts/${post._id}`)}>
				<Box sx={cardBoxStyle}>
					{user && <UserTitle user={user} timestamp={post.created} />}
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
					{post.source && (
						<Link
							href={post.source}
							target="_blank"
							rel="noopener"
							sx={linkStyle}
							onClick={(e) => e.stopPropagation()}
						>
							{post.source}
						</Link>
					)}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							marginTop: '1rem',
						}}
					>
						<IconButton icon={<Comment />} label={post.comments?.length || 0} />
						<IconButton
							icon={<Share />}
							onClick={(e) => e.stopPropagation()}
							label={'Share'}
						/>
					</Box>
				</Box>
				<CardMedia>
					<AsyncImage
						src={getPostImageUrl(post.imgUrl)}
						alt="Post Image"
						style={feedItemImageStyle}
					/>
				</CardMedia>
			</Card>
			<Divider sx={{ backgroundColor: '#555555' }} />
		</>
	);
};

export default FeedItem;