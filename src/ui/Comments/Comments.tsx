import { FC } from 'react';
import { IComment } from '../../types/feed.types';
import { CommentItem } from './CommentItem';
import { Box } from '@mui/material';

export const Comments: FC<{ comments: IComment[] }> = ({
	comments,
}: {
	comments: IComment[];
}) => {
	return (
		<Box sx={{ marginTop: '1rem' }}>
			{comments.map((comment, index) => (
				<CommentItem comment={comment} key={index} />
			))}
		</Box>
	);
};