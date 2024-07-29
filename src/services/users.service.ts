import apiClient from './api-client';
import { IUser } from '../types/user.types';

export const fetchUsers = async (): Promise<IUser[]> =>
	(await apiClient.get<IUser[]>('/users')).data;

export const fetchUser = async (userId: string): Promise<IUser> =>
	(await apiClient.get<IUser>(`/users/${userId}`)).data;