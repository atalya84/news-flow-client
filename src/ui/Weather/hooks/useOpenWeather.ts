import { useEffect, useReducer, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { getIcon } from './iconsMap';
import { config } from '../../../config/config';

export const formatDate = (dte, lang = 'en') => {
	if (lang && lang !== 'en') {
		dayjs.locale(lang.replace('_', '-'));
	}
	if (dte && dayjs(dte).isValid()) {
		return dayjs.unix(dte).format('ddd D MMMM');
	}
	return '';
};

export const mapCurrent = (day, lang = 'en') => ({
	date: formatDate(day.dt, lang),
	description: day.weather[0] ? day.weather[0].description : null,
	icon: day.weather[0] && getIcon(day.weather[0].icon),
	temperature: day.main.temp.toFixed(0),
	wind: day.wind.speed.toFixed(0),
	humidity: day.main.humidity,
});

export const mapData = (data) => {
	const mapped: any = {};
	if (data) {
		mapped.current = mapCurrent(data);
	}
	return mapped;
};

export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const initialState = {
	data: null,
	errorMessage: null,
};

export const fetchReducer = (state, { type, payload }) => {
	switch (type) {
		case SUCCESS:
			return {
				data: payload,
				errorMessage: null,
			};
		case FAILURE:
			return { data: null, errorMessage: payload };
		default:
			return state;
	}
};

const useOpenWeather = (options) => {
	const endpoint = config.WEATHER_URL + '/data/2.5/weather';
	const [state, dispatch] = useReducer(fetchReducer, initialState);
	const { data, errorMessage } = state;
	const [isLoading, setIsLoading] = useState(false);
	const { unit, lang, key, lon, lat } = options;
	const params = {
		appid: key,
		lang,
		units: unit,
		lat,
		lon,
	};

	const fetchData = async () => {
		if (lat && lon) {
			setIsLoading(true);
			try {
				const data = (await axios.get(endpoint, { params })).data;
				const payload = mapData(data);
				dispatch({
					type: SUCCESS,
					payload,
				});
			} catch (error: any) {
				console.error(error.message);
				dispatch({ type: FAILURE, payload: error.message || error });
			}
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, [lon, lat]);
	return { data, isLoading, errorMessage, fetchData };
};

export default useOpenWeather;