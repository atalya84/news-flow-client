import { Button, Grid, Typography } from '@mui/material';
import { FC, useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IPost, IPostInput } from '../../types/feed';
import { createPost, updatePost } from '../../services/posts.service';
import TextInput from '../../ui/Auth/TextField';
import DropFileInput from '../../ui/Auth/ImageInput';
import { getPostImageUrl, uploadPostImage } from '../../services/file-service';
import { getFileExt } from '../../utils';
import axios from 'axios';
import { AuthContext } from '../../Context';

export const Submit: FC = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state }: { state: { post: IPost } } = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [source, setSource] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [imageInfo, setImageInfo] = useState<File | null>(null);
	const [imgUrl, setImgUrl] = useState<string>('');

	useEffect(() => {
		if (!user) {
			const storedUser = JSON.parse(localStorage.getItem('user')!);
			if (!storedUser) {
				navigate('/login');
			}
		}
	}, [user, navigate]);

	useEffect(() => {
		if (state?.post) {
			setIsEdit(true);
			setTitle(state.post.title);
			setCountry(state.post.country);
			setSource(state.post.source);
			setBody(state.post.body || '');
			setImgUrl(state.post.imgUrl);
		}
	}, []);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			let newImgUrl: string = imgUrl;
			if (imageInfo) {
				const formData = new FormData();
				formData.append(
					'file',
					imageInfo!,
					user?._id + '.' + getFileExt(imageInfo?.name),
				);
				newImgUrl = await uploadPostImage(formData);
			}
			const postInput: IPostInput = {
				title,
				country,
				source,
				body,
				imgUrl: newImgUrl,
				userId: user?._id ?? '',
			};
			const postId: string = state?.post
				? (
						await updatePost(state.post._id, {
							...state.post,
							...postInput,
						})
					)._id
				: (await createPost(postInput))._id;
			navigate(`/posts/${postId}`);
		} catch (err: any) {
			if (axios.isAxiosError(err)) console.error(err.message);
			else console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Grid container justifyContent={'center'} sx={{ marginTop: '1rem' }}>
			<Grid item container rowSpacing={2} xl={6} lg={11}>
				<Grid item xs={12}>
					<Typography variant="h4">
						{isEdit ? 'Edit Post' : 'Create Post'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextInput title="Title" value={title} onChange={setTitle} />
				</Grid>
				<Grid item xs={12}>
					<TextInput title="Country" value={country} onChange={setCountry} />
				</Grid>
				<Grid item xs={12}>
					<TextInput title="Link URL" value={source} onChange={setSource} />
				</Grid>
				<Grid item xs={12}>
					<TextInput title="Body" value={body} onChange={setBody} />
				</Grid>
				<Grid item xs={12}>
					<DropFileInput
						src={getPostImageUrl(imgUrl)}
						onChange={setImageInfo}
						error={false}
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