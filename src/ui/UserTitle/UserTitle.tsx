import { Typography } from '@mui/material';
import moment, { Moment } from 'moment';
import { FC } from 'react';

export const UserTitle: FC<{
	username: string;
	timestamp: Moment | Date | string;
}> = ({
	username,
	timestamp,
}: {
	username: string;
	timestamp: Moment | Date | string;
}) => {
	return (
		<Typography variant="subtitle1">
			{username}{' '}
			<span style={{ color: '#FFFFFF77' }}>
				• {moment(timestamp).fromNow()}
			</span>
		</Typography>
	);
};