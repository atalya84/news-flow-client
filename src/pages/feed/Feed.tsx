import { FC, useContext, useEffect, useState } from 'react';
import './Feed.css';
import FeedItem from '../../ui/FeedItem/FeedItem';
import { IPost } from '../../types/feed';
import { Grid, Typography } from '@mui/material';
import { fetchPosts } from '../../services/posts.service';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context';
import moment from 'moment';

export const Feed: FC = () => {
	const { user } = useContext(AuthContext);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(user)
		if (!user) {
			console.log(user)
			navigate('/login');
		} else {
			fetchPosts()
				.then(setPosts)
				.catch(console.error)
				.finally(() => setIsLoading(false));
		}
	}, [user, navigate]);

	if (!user) {
        return <div>Loading...</div>;
    }
	if (!user) return null;

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