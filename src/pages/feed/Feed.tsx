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
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchPosts()
                .then(setPosts)
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    }, [user, navigate]);

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
					posts.map((post, index) => <FeedItem post={post} key={index} />)
				)}
			</Grid>
		</Grid>
	);
};