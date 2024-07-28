import { AccountCircle } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IComment } from '../../types/feed.types';
import moment from 'moment';
import { IUser } from '../../types/user.types';
import { fetchUser } from '../../services/users.service';
import { commentBoxStyle, userIconStyle } from './styles';
import { UserTitle } from '../UserTitle/UserTitle';

export const CommentItem: FC<{ comment: IComment }> = ({
	comment,
}: {
	comment: IComment;
}) => {
	const [user, setUser] = useState<IUser>();

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
						<UserTitle
							username={`${user.name} ${user.lastName}`}
							timestamp={comment.created}
						/>
					</Grid>
					<Grid item container xs={12} sx={commentBoxStyle}>
						<Typography variant="body1">{comment.text}</Typography>
					</Grid>
				</>
			)}
		</Grid>
	);
};