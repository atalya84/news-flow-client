import { FC, useEffect } from 'react';
import { IComment } from '../../types/feed';
import { CommentItem } from './CommentItem';
import { Box } from '@mui/material';
import { CommentInput } from './CommentInput';

export const Comments: FC<{ comments: IComment[] }> = ({
	comments,
}: {
	comments: IComment[];
}) => (
	<Box sx={{ marginTop: '1rem' }}>
		<CommentInput />
		{comments
			.sort((a, b) => {
				return new Date(b.created).getTime() - new Date(a.created).getTime();
			})
			.map((comment, index) => (
				<CommentItem comment={comment} key={index} />
			))}
	</Box>
);