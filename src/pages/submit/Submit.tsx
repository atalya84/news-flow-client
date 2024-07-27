import { Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { textFieldStyle } from './styles';
import { useLocation, useNavigate } from 'react-router';
import { IPost, IPostInput } from '../../types/feed.types';
import { createPost, updatePost } from '../../services/posts.service';

export const Submit: FC = () => {
	const navigate = useNavigate();
	const { state }: { state: { post: IPost } } = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [source, setSource] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [isEdit, setIsEdit] = useState<boolean>(false);

	useEffect(() => {
		if (state?.post) {
			setIsEdit(true);
			setTitle(state.post.title);
			setCountry(state.post.country);
			setSource(state.post.source);
			setBody(state.post.body || '');
		}
	}, []);

	const handleSubmit = async () => {
		console.log('submit');
		setIsLoading(true);
		const postInput: IPostInput = {
			title,
			country,
			source,
			body,
			userId: '6623a0f01c16d9abe2da4fe1',
			imgUrl: 'aaa',
		};
		try {
			const postId: string = state?.post
				? (
						await updatePost(state.post._id, {
							...state.post,
							...postInput,
						})
					)._id
				: (await createPost(postInput))._id;
			navigate(`/posts/${postId}`);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Grid container justifyContent={'center'}>
			<Grid item container rowSpacing={4} xl={6} lg={12}>
				<Grid item xs={12}>
					<Typography variant="h4">Create Post</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						placeholder="Title"
						sx={textFieldStyle}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						placeholder="Country"
						sx={textFieldStyle}
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						placeholder="Link URL"
						sx={textFieldStyle}
						value={source}
						onChange={(e) => setSource(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						placeholder="Body"
						multiline
						sx={textFieldStyle}
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={handleSubmit}>
						{isEdit ? 'Edit' : 'Post'}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};