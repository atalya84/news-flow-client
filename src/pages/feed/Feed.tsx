import { FC, useContext, useEffect, useState } from 'react';
import './Feed.css';
import FeedItem from '../../ui/FeedItem/FeedItem';
import { IPost } from '../../types/feed.types';
import { Grid, Typography } from '@mui/material';
import { fetchPosts } from '../../services/posts.service';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context';

export const Feed: FC = () => {
	const {user} = useContext(AuthContext)

	if(!user) {
		const navigate = useNavigate()
		navigate('/login')
	}
	
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		fetchPosts()
			.then(setPosts)
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<Grid container justifyContent={'center'}>
			<Grid item xl={6} lg={12}>
				{isLoading ? (
					<Typography variant="h5" color={'white'}>
						Loading...
					</Typography>
				) : posts.length === 0 ? (
					<Typography variant="h5" color={'white'}>
						{'No Posts Found :('}
					</Typography>
				) : (
					posts.map((post, index) => <FeedItem post={post} key={index} />)
				)}
			</Grid>
		</Grid>
	);
};