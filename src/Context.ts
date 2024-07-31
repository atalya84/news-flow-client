import { createContext, Dispatch, SetStateAction } from 'react';
import { IUser } from './types/user.types';
import { IPost } from './types/feed';
import { config } from './config/config.js';

export const AuthContext = createContext<{
	user: IUser | null;
	setUser: Function;
}>({
	user: null,
	setUser: () => {},
});

export const WeatherContext = createContext<
	[string, Dispatch<SetStateAction<string>>]
>([config.DEFAULT_LOCATION, () => {}]);

export const PostContext = createContext<{
	post: IPost | undefined;
	setPost: Dispatch<SetStateAction<IPost | undefined>>;
} | null>(null);