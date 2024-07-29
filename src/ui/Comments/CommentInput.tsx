import { Box, Button } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { ICommentInput } from '../../types/feed';
import TextInput from '../Auth/TextField';
import { Comment, Send } from '@mui/icons-material';
import { commentButtonStyle } from './styles';
import { PostContext } from '../../pages/post/context';
import axios from 'axios';
import { createComment } from '../../services/posts.service';

export const CommentInput: FC = () => {
	const [text, setText] = useState<string>('');
	const context = useContext(PostContext);
	const { post, setPost } = context!;

	const handleSubmit = async () => {
		try {
			const commentInput: ICommentInput = {
				text,
				//TODO: use current user ID
				userId: '6623a0f01c16d9abe2da4fe1',
			};
			if (post) setPost(await createComment(post._id, commentInput));
		} catch (err) {
			if (axios.isAxiosError(err)) console.error(err.message);
			else console.error(err);
		}
	};

	return (
		<Box display={'flex'}>
			<TextInput icon={<Comment />} onChange={setText} title="Add a comment" />
			<Button onClick={handleSubmit} endIcon={<Send />} sx={commentButtonStyle}>
				Comment
			</Button>
		</Box>
	);
};