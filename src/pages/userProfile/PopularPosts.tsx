import { FC, useContext, useEffect, useState } from 'react';
import ReducedFeedItem from '../../ui/FeedItem/ReducedFeedItem';
import { IPost } from '../../types/feed';
import { Grid, Typography } from '@mui/material';
import { fetchPopPosts } from '../../services/posts.service';
import { AuthContext } from '../../Context';

export const PopularPosts: FC = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);
		fetchPopPosts(user!._id!)
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
					posts.map((post, index) => <ReducedFeedItem post={post} key={index} />)
				)}
			</Grid>
		</Grid>
	);
};