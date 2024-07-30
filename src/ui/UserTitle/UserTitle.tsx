import { Grid, Typography } from '@mui/material';
import moment, { Moment } from 'moment';
import { FC } from 'react';
import { IUser } from '../../types/user.types';
import { AsyncImage } from 'loadable-image';
import { userImageStyle } from './styles';

export const UserTitle: FC<{
	user: IUser;
	timestamp: Moment | Date | string;
}> = ({
	user,
	timestamp,
}: {
	user: IUser;
	timestamp: Moment | Date | string;
}) => {
	return (
		<Grid item xs={12} container alignItems={'center'}>
			<AsyncImage src={user.imgUrl || ''} style={userImageStyle} />
			<Typography variant="subtitle1">
				{user.name}{' '}
				<span style={{ color: '#FFFFFF77' }}>
					• {moment(timestamp).fromNow()}
				</span>
			</Typography>
		</Grid>
	);
};