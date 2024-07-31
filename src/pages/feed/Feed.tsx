import { FC, useContext, useEffect, useState } from 'react';
import './Feed.css';
import FeedItem from '../../ui/FeedItem/FeedItem';
import { IPost } from '../../types/feed';
import { Grid, Typography } from '@mui/material';
import { fetchPosts } from '../../services/posts.service';
import { useNavigate } from 'react-router';
import { AuthContext, WeatherContext } from '../../Context';
import moment from 'moment';
import ReactWeather from '../../ui/Weather/components/ReactWeather';
import useOpenWeather from '../../ui/Weather/hooks/useOpenWeather';
import { apiKey, getGeoData } from '../../services/weather.service';

export const Feed: FC = () => {
	const { user } = useContext(AuthContext);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isFeedLoading, setIsFeedLoading] = useState<boolean>(true);
	const [location, setLocation] = useContext(WeatherContext);
	const [label, setLabel] = useState<string>(location);
	const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(
		null,
	);
	const navigate = useNavigate();
	const { data, isLoading, errorMessage } = useOpenWeather({
		key: apiKey,
		lat: coords?.lat,
		lon: coords?.lon,
		lang: 'en',
		unit: 'metric',
	});

	useEffect(() => {
		if (!user) {
			const storedUser = JSON.parse(localStorage.getItem('user')!);
			if (!storedUser) {
				navigate('/login');
			}
		} else {
			fetchPosts()
				.then(setPosts)
				.catch(console.error)
				.finally(() => setIsFeedLoading(false));
		}
	}, [user, navigate]);

	useEffect(() => {
		getGeoData(location)
			.then((result) => {
				setCoords({ lat: result[0]?.lat, lon: result[0]?.lon });
				setLabel(result[0]?.name);
			})
			.catch(console.error);
	}, [location]);

	if (!user) return null;

	return (
		<Grid container columnSpacing={1} rowSpacing={1}>
			<Grid item xl={3} lg={12}>
				<ReactWeather
					isLoading={isLoading}
					data={data}
					locationLabel={label}
					setLocation={setLocation}
					unitsLabels={{ temperature: 'C°', windSpeed: 'Km/h' }}
					errorMessage={errorMessage}
				/>
			</Grid>
			<Grid item xl={6} lg={12}>
				{isFeedLoading ? (
					<Typography variant="h5" color={'white'}>
						Loading...
					</Typography>
				) : posts.length === 0 ? (
					<Typography variant="h5" color={'white'}>
						{'No Posts Found :('}
					</Typography>
				) : (
					posts
						.sort((a, b) => moment(b.created).diff(moment(a.created)))
						.map((post, index) => <FeedItem post={post} key={index} />)
				)}
			</Grid>
		</Grid>
	);
};