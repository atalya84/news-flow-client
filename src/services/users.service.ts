import axios from 'axios';
import { IUser } from '../types/user.types';

const client = axios.create({
	baseURL: 'http://localhost:4000/users',
});

export const fetchUsers = async (): Promise<IUser[]> =>
	(await client.get<IUser[]>('/')).data;

export const fetchUser = async (userId: string): Promise<IUser> =>
	(await client.get<IUser>(`/${userId}`)).data;

