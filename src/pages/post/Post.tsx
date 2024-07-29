import {
	Card,
	CardActionArea,
	CardMedia,
	ClickAwayListener,
	Grid,
	Grow,
	IconButton,
	Link,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Typography,
} from '@mui/material';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { IPost } from '../../types/feed.types';
import { useNavigate, useParams } from 'react-router';
import { deletePost, fetchPost } from '../../services/posts.service';
import { fetchUser } from '../../services/users.service';
import { IUser } from '../../types/user.types';
import moment from 'moment';
import { linkStyle } from '../../ui/FeedItem/styles';
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { Comments } from '../../ui/Comments/Comments';
import { UserTitle } from '../../ui/UserTitle/UserTitle';
import { PostMenu } from '../../ui/PostMenu/PostMenu';
import { AuthContext } from '../../Context';

export const Post: FC = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const {user} = useContext(AuthContext)

	const [post, setPost] = useState<IPost>();
	const [userName, setUserName] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const post: IPost = await fetchPost(postId!);
				console.log("post", post)
				const user: IUser = await fetchUser(post.userId!);
				console.log("user", user)
				setPost(post);
				setUserName(`${user.name}`);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [postId]);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleDeletePost = async (postId: string) => {
		await deletePost(postId);
		navigate('/')
	}

	return (
		<>
			<Grid
				container
				justifyContent={'center'}
				sx={{ paddingTop: '2rem', color: 'white' }}
			>
				<Grid item lg={8} xl={6}>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{!post ? (
								<h5>No Post Found</h5>
							) : (
								<Grid container>
									<Grid item xs={11}>
										<UserTitle username={userName} timestamp={post.created} />
									</Grid>
									<Grid item container xs={1} justifyContent={'end'}>
										<IconButton
											ref={anchorRef}
											id="composition-button"
											aria-controls={open ? 'composition-menu' : undefined}
											aria-expanded={open ? 'true' : undefined}
											aria-haspopup="true"
											onClick={handleToggle}
											sx={{ color: 'white' }}
										>
											<MoreHoriz />
										</IconButton>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="h5">{post.title}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Card
											variant={'outlined'}
											sx={{
												marginTop: '1rem',
												borderColor: '#333333',
												backgroundColor: 'transparent',
												boxShadow: 'none',
												borderRadius: '1rem',
											}}
										>
											<CardMedia
												component={'img'}
												image={
													'https://s.france24.com/media/display/eeb18444-4b2d-11ef-950d-005056bf30b7/w:980/p:16x9/000_364Y2P9.jpg'
												}
											/>
											<CardActionArea>
												{post.source && (
													<Typography variant="subtitle1">
														<Link
															href={post.source}
															target="_blank"
															rel="noopener"
															sx={{
																...linkStyle,
																padding: '10px',
															}}
														>
															{post.source}
														</Link>
													</Typography>
												)}
											</CardActionArea>
										</Card>
									</Grid>
									<Comments comments={post.comments || []} />
								</Grid>
							)}
						</>
					)}
				</Grid>
			</Grid>
			{/* TODO: replace with current user ID */}
			{post?.userId === user?._id && <PostMenu anchorRef={anchorRef} open={open} setOpen={setOpen} handleDeletePost={handleDeletePost} post={post}/>}
		</>
	);
};