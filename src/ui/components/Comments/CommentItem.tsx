import { AccountCircle } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IComment } from '../../../types/feed.types';
import moment from 'moment';
import { IUser } from '../../../types/user.types';
import { fetchUser } from '../../../services/users.service';
import { commentBoxStyle, userIconStyle } from './styles';

export const CommentItem: FC<{ comment: IComment }> = ({
	comment,
}: {
	comment: IComment;
}) => {
	const [user, setUser] = useState<IUser>();
	console.log(comment);

	useEffect(() => {
		(async () => {
			try {
				setUser(await fetchUser(comment.userId));
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<Grid container rowSpacing={2} sx={{ minHeight: '5vh' }}>
			{!user ? (
				<Typography variant="caption">[Could not retrieve comment]</Typography>
			) : (
				<>
					<Grid item xs={12} container alignItems={'center'}>
						<AccountCircle sx={userIconStyle} />
						<Typography variant="caption">
							{'username'}{' '}
							<span style={{ color: '#FFFFFF77' }}>
								• {moment(comment.created).fromNow()}
							</span>
						</Typography>
					</Grid>
					<Grid item container xs={12} sx={commentBoxStyle}>
						<Typography variant="body2">{comment.text}</Typography>
					</Grid>
				</>
			)}
		</Grid>
	);
};