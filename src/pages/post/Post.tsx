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
import { FC, useEffect, useRef, useState } from 'react';
import { IPost } from '../../types/feed';
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
import { postCardStyle, postImageStyle } from './styles';
import { AsyncImage } from 'loadable-image';
import { getPostImageUrl } from '../../services/file-service';
import { PostContext } from './context';

export const Post: FC = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState<IPost>();
	const [user, setUser] = useState<IUser>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const post: IPost = await fetchPost(postId!);
				const user: IUser = await fetchUser(post.userId);
				setPost(post);
				setUser(user);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [postId]);
	console.log('Post:', post?.comments)

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleDeletePost = async (postId: string) => {
		await deletePost(postId);
		navigate('/')
	}

	return (
		<PostContext.Provider value={{post, setPost}}>
			<Grid
				container
				justifyContent={'center'}
				sx={{ paddingTop: '2rem', color: 'white' }}
			>
				<Grid item lg={8} xl={5}>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{!post ? (
								<h5>No Post Found</h5>
							) : (
								<Grid container>
									<Grid item xs={11}>
										{user && <UserTitle user={user} timestamp={post.created} />}
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
											sx={postCardStyle}
										>
											<CardMedia
												image={getPostImageUrl(post.imgUrl)}
											>
												<AsyncImage src={getPostImageUrl(post.imgUrl)} style={postImageStyle}/>
											</CardMedia>
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
									<Grid item xs={12}>
										<Comments comments={post.comments || []}/>
									</Grid>
								</Grid>
							)}
						</>
					)}
				</Grid>
			</Grid>
			{/* TODO: replace with current user ID */}
			{post?.userId === '6623a0f01c16d9abe2da4fe1' && <PostMenu anchorRef={anchorRef} open={open} setOpen={setOpen} handleDeletePost={handleDeletePost} post={post}/>}
		</PostContext.Provider>
	);
};