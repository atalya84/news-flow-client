import axios from 'axios';
import { GeoData } from '../types/weather';
import { config } from '../config/config';

export const apiKey = config.API_KEY;

const weatherClient = axios.create({
	baseURL: config.WEATHER_URL,
});

export const getGeoData = async (name: string): Promise<GeoData[]> =>
	(await weatherClient.get(`/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`))
		.data;