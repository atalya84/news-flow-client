import { FC, useContext, useEffect, useState } from 'react';
import FeedItem from '../../ui/FeedItem/FeedItem';
import { IPost } from '../../types/feed';
import { Grid, Typography } from '@mui/material';
import { fetchUserPosts } from '../../services/posts.service';
import { AuthContext } from '../../Context';

export const MyPosts: FC = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useContext(AuthContext);

	if (user) {
		console.log('user is', user, 'in Submit.tsx');
	}

	useEffect(() => {
		setIsLoading(true);
		fetchUserPosts(user?._id ?? '')
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