import apiClient from './api-client';
import { IUploadResponse } from '../types/File';
import { config } from '../config/config';

export async function uploadPhoto(formData: FormData): Promise<string> {
	try {
		const response = await apiClient.post<IUploadResponse>(
			'/file/uploadProfile',
			formData,
		);
		return response.data.imgUrl;
	} catch (error) {
		console.log('uploadPhoto:', error);
		throw new Error('Failed to upload photo.');
	}
}

export const uploadPostImage = async (formData: FormData): Promise<string> =>
	(await apiClient.post<IUploadResponse>('/file/uploadPost', formData)).data
		.imgUrl;

export const getPostImageUrl = (url: string): string =>
	config.DOMAIN_BASE.concat('/posts/', url);

export const getUserImageUrl = (url: string): string =>
	config.DOMAIN_BASE.concat('/profiles/', url);