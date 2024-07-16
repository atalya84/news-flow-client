import { FC } from 'react';
import './Feed.css';
import FeedItem from '../../ui/components/FeedItem/FeedItem';

export const Feed: FC = () => {
	return (
		<div className="App">
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
		</div>
	);
};