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
import { IPost } from '../../types/feed.types';
import { useNavigate, useParams } from 'react-router';
import { fetchPost } from '../../services/posts.service';
import { fetchUser } from '../../services/users.service';
import { IUser } from '../../types/user.types';
import moment from 'moment';
import { linkStyle } from '../../ui/components/FeedItem/styles';
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { Comments } from '../../ui/components/Comments/Comments';

export const Post: FC = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState<IPost>();
	const [userName, setUserName] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const post: IPost = await fetchPost(postId!);
				const user: IUser = await fetchUser(post.userId);
				setPost(post);
				setUserName(`${user.name} ${user.lastName}`);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [postId]);

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
										<Typography variant="subtitle1">
											{userName}{' '}
											<span style={{ color: '#FFFFFF77' }}>
												• {moment(post.created).fromNow()}
											</span>
										</Typography>
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
													<Typography variant="h6">
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
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
								>
									<MenuItem onClick={(e) => {
										handleClose(e);
										navigate('/posts/submit', {state: {post}})
									}}
									>
										<ListItemIcon>
											<Edit />
										</ListItemIcon>
										<ListItemText>
											Edit
										</ListItemText>
									</MenuItem>
									<MenuItem onClick={handleClose}>
									<ListItemIcon>
											<Delete />
										</ListItemIcon>
										<ListItemText>
											Delete
										</ListItemText>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};