import { useContext } from 'react';
import { AuthContext } from '../Context';
import { IUser } from '../types/user.types';
import apiClient from './api-client';
import { CredentialResponse } from '@react-oauth/google';

export async function getActiveUser(): Promise<IUser | null> {
	if (!localStorage.getItem('accessToken')) return null;
	const res = await apiClient.get('/users/self');
	localStorage.setItem('user', JSON.stringify(res.data.user));
	console.log(res.data.user);
	return res.data.user;
}

export const registrUser = (user: IUser) => {
	return new Promise<IUser>((resolve, reject) => {
		console.log('Registering user...');
		apiClient
			.post('/auth/register', user)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const loginUser = (user: IUser) => {
	return new Promise<IUser>((resolve, reject) => {
		console.log('Loging user...');
		const email = user.email;
		const password = user.password;
		apiClient
			.post('/auth/login', { email, password })
			.then((response) => {
				localStorage.setItem('refreshToken', response.data.refreshToken);
				localStorage.setItem('accessToken', response.data.accessToken);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				resolve(response.data.user);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export async function signOut(): Promise<string> {
	try {
		apiClient.get('/auth/logout').then((response) => {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
			window.location.href = '/';
		});
		return 'User signed out successfully';
	} catch (error) {
		return 'An error occurred during sign out';
	}
}

export async function editUser(user: IUser): Promise<IUser> {
	return new Promise<IUser>((resolve, reject) => {
		console.log('Updating user...');
		apiClient
			.put(`/users/${user._id}`, user)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function registerGoogle(credentialResponse: CredentialResponse): Promise<any> {
    return new Promise<IUser>((resolve, reject) => {
        console.log("google: registerGoogle ...");
        apiClient.post("/auth/google", credentialResponse).then((response) => {
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
			localStorage.setItem('user', JSON.stringify(response.data.user));
            resolve(response.data.user);
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
}