import { FC, useContext, useEffect, useState } from 'react';
import FeedItem from '../../ui/FeedItem/FeedItem';
import { IPost } from '../../types/feed';
import { Grid, Typography } from '@mui/material';
import { fetchUserPosts } from '../../services/posts.service';
import { AuthContext } from '../../Context';
import { useNavigate } from 'react-router';
import moment from 'moment';

export const MyPosts: FC = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			const storedUser = JSON.parse(localStorage.getItem('user')!);
			if (!storedUser) {
				navigate('/login');
			}
		} else {
			setIsLoading(true);
			fetchUserPosts(user._id!)
				.then(setPosts)
				.catch(console.error)
				.finally(() => setIsLoading(false));
		}
	}, [user, navigate]);

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
					posts
						.sort((a, b) => moment(b.created).diff(moment(a.created)))
						.map((post, index) => <FeedItem post={post} key={index} />)
				)}
			</Grid>
		</Grid>
	);
};